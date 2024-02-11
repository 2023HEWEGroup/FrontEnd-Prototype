import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


const BroadcastRoomAudience = () => {

    const [socket, setSocket] = useState(null);
    const [isSockedIdUpdated, setIsSockedIdUpdated] = useState(false); // AudienceWindow展開時に参加者socketIdが更新されたらtureとなる。(1度しか呼ばないため)
    const { roomId } = useParams();
    const videoRef = useRef(null);

    // 配信者から受け取ったオファーをRemote Descriptionとして設定する関数
    // Remote Description = WebRTC における接続の相手側の SDP（Session Description Protocol）情報
    const handleOffer = async (offer, liverSocketId) => {
        try {
            // Peer Connection を作成
            const peerConnection = new RTCPeerConnection();
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
    };

    useEffect(() => {
        if (socket) {
            // windowが別だとsocketIdも別(別クライアントとして認識されるため)なので、Audience展開時に配信情報の参加者socketIDを更新する。(一度だけ実行)
            if (!isSockedIdUpdated) {
                socket.emit(`updateAudienceSocketId`, roomId);
                setIsSockedIdUpdated(true);
            }

            // 配信者からのofferを受け取る
            socket.on('offer', (offer, liverSocketId) => {
                console.log("offer received!");
                handleOffer(offer, liverSocketId);
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
        <video playsInline autoPlay ref={videoRef} style={{width: "600px", height: "600px"}}/>
        </>
    )
}


export default BroadcastRoomAudience