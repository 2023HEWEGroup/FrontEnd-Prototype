import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


const BroadcastRoomAudience = () => {

    const [socket, setSocket] = useState(null);
    const [liverSocketId, setLiverSocketId] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isSockedIdUpdated, setIsSockedIdUpdated] = useState(false); // AudienceWindow展開時に参加者socketIdが更新されたらtureとなる。(1度しか呼ばないため)
    const { roomId } = useParams();
    const videoRef = useRef(null);

    useEffect(() => {
        if (socket && peerConnection) {
            // windowが別だとsocketIdも別(別クライアントとして認識されるため)なので、Audience展開時に配信情報の参加者socketIDを更新する。(一度だけ実行)
            if (!isSockedIdUpdated) {
                socket.emit(`updateAudienceSocketId`, roomId);
                setIsSockedIdUpdated(true);
            }

            // 配信者からのofferを受け取る
            socket.on('offer', async (offer, liverSocketId) => {
                setLiverSocketId(liverSocketId);
                console.log("offer received!");
                try {
                    // 受け取ったオファーをRemote Descriptionとして設定
                    await peerConnection.setRemoteDescription(offer);
                    // Answerを生成 (相手側(この場合はここの参加者)からの返答)
                    const answer = await peerConnection.createAnswer();
                    // 生成したAnswerをLocal Descriptionとして設定 (Answerは逆にこちら側の自分の情報として保持、相手に返す。配信者はofferを持つ)
                    await peerConnection.setLocalDescription(answer);
                    // Answerを相手に送信
                    socket.emit('answerForLiver', answer, liverSocketId);
                } catch (error) {
                    console.error('Error handling offer:', error);
                }
            });

            // 配信者からのICEを受け取る
            socket.on('iceFromLiver', (ICE, liverSocketId) => {
                console.log("ICE received!");
                peerConnection.addIceCandidate(ICE);
            });
        }
        return () => {
            // リスナーを解除
            if (socket) {
                socket.off('offer');
                socket.off('iceFromLiver');
            }
        };
    }, [socket, peerConnection]); // eslint-disable-line react-hooks/exhaustive-deps

    if (peerConnection) {
        // 配信者にICE送信
        peerConnection.onicecandidate = (e) => {
            const ice = e.candidate;
            socket.emit("iceFromAudience", ice, liverSocketId);
        };
    }

    if (peerConnection) {
        // 接続のステータス
        peerConnection.onconnectionstatechange = () => {
            console.log(peerConnection.connectionState);
        };
    }

    if (peerConnection) {
        peerConnection.ontrack = async (event) => {
            console.log("ストリーム検知");
            const stream = event.streams[0];
            videoRef.current.srcObject = stream;
        };
    }

    useEffect(() => {
        // サーバーとの接続を確立
        const newSocket = io('http://localhost:5001');
        const pc = new RTCPeerConnection();
        setSocket(newSocket);
        setPeerConnection(pc);
        // クリーンアップ関数で接続を解除
        return () => {
            newSocket.disconnect();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <video playsInline autoPlay ref={videoRef} style={{width: "600px", height: "600px"}}/>
        </>
    )
}


export default BroadcastRoomAudience