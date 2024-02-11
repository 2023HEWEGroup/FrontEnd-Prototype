import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';


const BroadcastRoom = () => {

    const videoRef = useRef(null);

    useEffect(() => {
        let stream = null;
        const socket = io('http://localhost:5001');
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
            videoRef.current.srcObject = stream;
            socket.emit('stream', stream);
            // WebRTCセットアップを行う
            const peerConnection = new RTCPeerConnection();
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        })
        .catch((error) => {
            console.log(error);
        })
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                socket.disconnect();
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <video playsInline autoPlay ref={videoRef} style={{width: "600px", height: "600px"}}/>
        </>
    )
}


export default BroadcastRoom