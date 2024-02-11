import { Grow, Modal } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import io from 'socket.io-client';


const BroadcastModal = (props) => {

    const videoRef = useRef(null);
    const constraints = {video: true, audio: true};

    useEffect(() => {
        let stream = null;
        const socket = io('http://localhost:5001');
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            videoRef.current.srcObject = stream;
            socket.emit('stream', stream);
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
        <Modal open={props.open}>
            <Grow in={props.open} timeout={1000}>
                <StyledModalInner>
                    <video playsInline autoPlay ref={videoRef} style={{width: "600px", aspectRatio: "16/9"}}/>
                </StyledModalInner>
            </Grow>
        </Modal>
        </>
    )
}


const StyledModalInner = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #000;
`


export default BroadcastModal