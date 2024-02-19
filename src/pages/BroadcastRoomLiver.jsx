import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import BroadcastRoomInner from '../components/broadcastRoom/BroadcastRoomInner';
import { useEnv } from '../provider/EnvProvider';


const BroadcastRoomLiver = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const groupId = searchParams.get('groupId');
    const [socket, setSocket] = useState(null);
    const [peerConnections, setPeerConnections] = useState([]);
    const [isSockedIdUpdated, setIsSockedIdUpdated] = useState(false); // LiverWindow展開時に配信者socketIdが更新されたらtureとなる。(1度しか呼ばないため)
    const [roomInfo, setRoomInfo] = useState(null);
    const [newComerFlag, setNewComerFlag] = useState(false); // 参加者が増える度にtrueとfalseが入れ替わる参加検知state。これを元に配信者の設定しているミュート情報などがuseEffectにより発火する
    const [isMic, setIsMic] = useState(true);
    const [isVideo, setIsVideo] = useState(true);
    const { roomId } = useParams();
    const videoRef = useRef(null);
    const { socketPath } = useEnv();
    console.log(peerConnections)

    useEffect(() => {
        if (socket) {
            // windowが別だとsocketIdも別(別クライアントとして認識されるため)なので、Liver展開時に配信情報の配信者socketIDを更新する。(一度だけ実行)
            if (!isSockedIdUpdated) {
                socket.emit(`updateLiverSocketId`, roomId);
                setIsSockedIdUpdated(true);
            };

            // 配信者に新たな参加者が来たことを通知(offerを促すcallを受け取る)
            socket.on('newAudience', async (audienceSocketId)  => {
                const pc = new RTCPeerConnection();
                console.log(`New audience joined with socket ID: ${audienceSocketId}`);
                // オファーを作成して新たな参加者に送信する
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                stream.getTracks().forEach(track => pc.addTrack(track, stream));
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                setPeerConnections((prev) => [...prev, {id: audienceSocketId, pc: pc}]);
                socket.emit('offerToNewAudience', audienceSocketId, pc.localDescription);
            });

            // 配信者からのアンサーを受け取る
            socket.on('answer', async (answer, audienceSocketId) => {
                console.log("Received answer from sender with socket ID:", audienceSocketId);
                // アンサーを自身のピア接続に設定
                let pcEntry;
                for (const key in peerConnections) {
                    if (peerConnections[key].id === audienceSocketId) {
                        pcEntry = peerConnections[key];
                        break;
                    }
                }
                if (pcEntry) {
                    await pcEntry.pc.setRemoteDescription(answer);
                    console.log("Remote description set successfully.");
                } else {
                    console.log("Remote description set failed.");
                }
                setNewComerFlag((prev) => !prev);
                // これ以降、ピア接続を介してデータの送受信が可能
            });

            // 参加者からのICEを受け取る
            socket.on('iceFromAudience', (ICE, audienceSocketId) => {
                for (const key in peerConnections) {
                    const pcEntry = peerConnections[key];
                    if (pcEntry.id === audienceSocketId) {
                        console.log("ICE received for audience with socket ID:", audienceSocketId);
                        pcEntry.pc.addIceCandidate(ICE)
                            .then(() => {
                                console.log("ICE candidate added successfully.");
                            })
                            .catch(error => {
                                console.error("Failed to add ICE candidate:", error);
                            });
                        break; // 一致するものが見つかったらループを終了
                    }
                }
            });

            // 配信windowを閉じる要求を受け取った場合、閉じる。
            socket.on('closeWindow', ()=> {
                window.close();
            });

            // ルームの情報が更新されたり作成されたら受け取り、stateで管理
            socket.on('roomInfo', (roomInfo) => {
                setRoomInfo(roomInfo);
            })
        }
        return () => {
            // リスナーを解除
            if (socket) {
                socket.off('newAudience');
                socket.off('answer');
                socket.off('iceFromAudience');
                socket.off('roomInfo');
            }
        };
    }, [socket, peerConnections]); // eslint-disable-line react-hooks/exhaustive-deps

    if (peerConnections && peerConnections.length > 0) {
        // peerConnections 配列内の各 peerConnection に対して ICE 送信リスナーを設定
        peerConnections.forEach(pc => {
            pc.onicecandidate = (e) => {
                const ice = e.candidate;
                socket.emit("iceFromPeer", ice, pc.id); // pc.id を使って対応する audienceSocketId を送信
            };
        });
    }

    useEffect(() => { // 配信者がマイクやカメラの設定を切り替えた場合、全視聴者に対してミュートもしくは解除、動画共有の開始や停止の切り替えを行う
        const handleDevice = async () => {
            if (peerConnections.length > 0 && videoRef.current && socket) {
                peerConnections.forEach(entry => {
                    const pc = entry.pc;
                    pc.getSenders().forEach(sender => {
                        if (sender && sender.track) {
                            if (sender.track.kind === 'audio') {
                                sender.track.enabled = isMic;
                                socket.emit('isMute', roomId, isMic); // マイクの設定変更を通知
                            } else if (sender.track.kind === 'video') {
                                sender.track.enabled = isVideo;
                                socket.emit('isShare', roomId, isVideo); // 動画共有設定変更を通知
                            }
                        }
                    });
                });
            }
        };
        handleDevice();
    }, [isMic, isVideo, peerConnections, videoRef, newComerFlag, socket, roomId]);

    useEffect(() => { // 上のeffectと分けたのは、配信者が何らかの参加者とconnectして無くても画面のon offは反映させたいため
        const handleVideo = async () => {
            if (videoRef.current) {
                if (isVideo) {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    videoRef.current.srcObject = stream;
                } else {
                    videoRef.current.srcObject = null;
                }
            }
        }
        handleVideo();
    }, [isVideo]);

    useEffect(() => {
        // サーバーとの接続を確立
        const newSocket = io(socketPath);
        setSocket(newSocket);
        // クリーンアップ関数で接続を解除
        return () => {
            newSocket.disconnect();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const initMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };
        initMediaStream();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {/* ルーム情報が読み込まれてからルームを表示 */}
        {roomInfo && <BroadcastRoomInner videoRef={videoRef} roomInfo={roomInfo} currentUser={props.currentUser} socket={socket} groupId={groupId}
                        isMic={isMic} setIsMic={setIsMic} isVideo={isVideo} setIsVideo={setIsVideo} liversMic={isMic} liversShare={isVideo}/>}
        </>
    )
}


export default BroadcastRoomLiver