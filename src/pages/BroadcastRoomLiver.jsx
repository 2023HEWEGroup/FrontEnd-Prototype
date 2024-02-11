import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


const BroadcastRoomLiver = () => {

    const [socket, setSocket] = useState(null);
    const [isSockedIdUpdated, setIsSockedIdUpdated] = useState(false); // LiverWindow展開時に配信者socketIdが更新されたらtureとなる。(1度しか呼ばないため)
    const { roomId } = useParams();
    const videoRef = useRef(null);

    // useEffect(() => {
    //     let peerConnection = null;
    
    //     const initializeOffer = async () => {
    //         try {
    //             // オファーの作成
    //             const offer = await peerConnection.createOffer();
    //             // オファーをセット
    //             await peerConnection.setLocalDescription(offer);
    //             // オファーをシグナリングサーバーを介して送信
    //             socket.emit('offer', peerConnection.localDescription);
    //         } catch (error) {
    //             console.error('Error creating offer:', error);
    //         }
    //     };
    
    //     // メディアストリーム取得。
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //     .then((stream) => {
    //         // WebRTCセットアップを行う
    //         peerConnection = new RTCPeerConnection();
    //         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    //         initializeOffer();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    
    //     return () => {
    //         if (peerConnection) {
    //             peerConnection.close();
    //         }
    //     };
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (socket) {
            // windowが別だとsocketIdも別(別クライアントとして認識されるため)なので、Liver展開時に配信情報の配信者socketIDを更新する。(一度だけ実行)
            if (!isSockedIdUpdated) {
                socket.emit(`updateLiverSocketId`, roomId);
                setIsSockedIdUpdated(true);
            }

            // 配信者に新たな参加者が来たことを通知(offerを促すcallを受け取る)
            socket.on('newAudience', (audienceSocketId) => {
                console.log(`New audience joined with socket ID: ${audienceSocketId}`);
                // オファーを作成して送信する
                const peerConnection = new RTCPeerConnection();
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
                    return peerConnection.createOffer();
                })
                .then((offer) => {
                    return peerConnection.setLocalDescription(offer);
                })
                .then(() => {
                    // 新しい参加者にオファーを送信する
                    socket.emit('offerToNewAudience', audienceSocketId, peerConnection.localDescription);
                })
                .catch((error) => {
                    console.error('Error creating and sending offer:', error);
                });

                // 配信者からのアンサーを受け取る
                socket.on('answer', (answer, audienceSocketId) => {
                    console.log("Received answer from sender with socket ID:", audienceSocketId);
                    // アンサーを自身のピア接続に設定
                    peerConnection.setRemoteDescription(answer)
                    .then(() => {
                        console.log("Remote description set successfully.");
                        // これ以降、ピア接続を介してデータの送受信が可能
                    })
                    .catch((error) => {
                        console.error("Error setting remote description:", error);
                    });
                });
            });
        }
    }, [socket, roomId]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // サーバーとの接続を確立
        const newSocket = io('http://localhost:5001');
        setSocket(newSocket);
        // クリーンアップ関数で接続を解除
        return () => {
            newSocket.disconnect();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <video playsInline autoPlay muted ref={videoRef} style={{ width: "600px", height: "400px" }} />
        </>
    )
}


export default BroadcastRoomLiver