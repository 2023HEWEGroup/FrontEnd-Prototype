import { AspectRatio, CallEnd, Circle, Headset, HeadsetOff, Mic, MicOff, ScreenShare, StopScreenShare, Videocam, VideocamOff } from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const BroadcastRoomInner = (props) => {

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isAudio, setIsAudio] = useState(true);
    const [liver, setLiver] = useState(null); // 配信者のすべて
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();

    const handleWindowClose = () => {
        window.close();
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setIsFullScreen((prev) => !prev);
        }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    })

    useEffect(() => {
        const fetchLiver = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/client/user/getById/${props.roomInfo.liverId}`);
            setLiver(response.data);
        } catch (err) {
            console.log(err);
        }
        }
        fetchLiver();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledInner>
            <Grid container>

                <Grid item xs={12} sm={12} md={isFullScreen ? 12 : 8} lg={isFullScreen ? 12 : 8} xl={isFullScreen ? 12 : 8}>

                    <StyledVideoArea $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}>
                        <Box width="100%" height="100%" style={{position: "relative", borderRadius: isSmallScreen || isFullScreen ? "0px" : "10px", overflow: "hidden"}}>
                            <StyledVideo
                                playsInline
                                autoPlay
                                muted={props.currentUser._id === props.roomInfo.liverId || !isAudio}
                                ref={props.videoRef} />
                            <StyledLiverLabel icon={props.liversMic ? <Mic style={{color: "#fff"}} fontSize='small'/> : <MicOff style={{color: "#f00"}} fontSize='small'/>} label={props.roomInfo.liverName}/>
                            <StyledIconOpacity onClick={() => !isFullScreen ? setIsFullScreen(true) : ""} style={{display: isSmallScreen || isFullScreen ? "none" : "flex"}}>
                                <Tooltip title="全画面(Esc)" placement='top'><AspectRatio fontSize='large' style={{color: "#fff"}}/></Tooltip>
                            </StyledIconOpacity>
                            {!props.liversShare && liver &&
                                <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" position="absolute" top="0" left="0" style={{backgroundColor: "#000"}}>
                                    <Box width="100px" aspectRatio="1/1" maxWidth="20vw">
                                        <Avatar sx={{width: "100%", height: "100%"}} src={liver.icon ? `http://localhost:5000/uploads/userIcons/${liver.icon}` : `${siteAssetsPath}/default_icons/${liver.defaultIcon}`}/>
                                    </Box>
                                </Box>
                            }
                        </Box>
                    </StyledVideoArea>

                    <StyledBroadcastDesc $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}>
                        <StyledTypography variant='h5' color={theme.palette.text.main}>{props.roomInfo.name}</StyledTypography>
                        <Box display="flex" gap="5px" alignItems="center" mt="5px">
                            <Circle style={{color: "#f00", fontSize: "15px"}} />
                            <StyledTypography variant='body1' color={theme.palette.text.sub}>{props.roomInfo.users.length - 1}人が視聴中</StyledTypography>
                        </Box>
                        <Box display="flex" justifyContent="end" alignItems="end" height="70px">
                            <Box display="flex" alignItems="center" gap="15px">
                                {props.currentUser._id === props.roomInfo.liverId ?
                                <>
                                <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare /> : <ScreenShare />}</Avatar></Tooltip>
                                <Tooltip title={props.isVideo ? "共有を停止" : "画面を共有"} placement="top"><Avatar onClick={() => props.setIsVideo((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{props.isVideo ? <Videocam /> : <VideocamOff />}</Avatar></Tooltip>
                                <Tooltip title={props.isMic ? "マイクをオフ" : "マイクをオン"} placement="top"><Avatar onClick={() => props.setIsMic((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{props.isMic ? <Mic /> : <MicOff />}</Avatar></Tooltip>
                                </>
                                :
                                <>
                                <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare /> : <ScreenShare />}</Avatar></Tooltip>
                                <Tooltip title={isAudio ? "音声をオフ" : "音声をオン"} placement="top"><Avatar onClick={() => setIsAudio((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{isAudio ? <Headset/> : <HeadsetOff />}</Avatar></Tooltip>
                                </>
                                }
                                <Tooltip title={props.currentUser._id === props.roomInfo.liverId ? "配信を終了" : "ルームを出る"} placement="top"><Avatar sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: "#f22"}} onClick={handleWindowClose}><CallEnd style={{color: "#fff"}}/></Avatar></Tooltip>
                            </Box>
                        </Box>
                    </StyledBroadcastDesc>

                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <StyledCommentArea $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}></StyledCommentArea>
                </Grid>

            </Grid>

            {(isSmallScreen || isFullScreen) &&
                <Box position="absolute" top="0" left="0" display="flex" justifyContent="center" alignItems="end" width="100%" height="100%">
                    <Box display="flex" justifyContent="center" alignItems="center" gap="15px" width="100%" maxHeight="20vh" padding="20px 0">
                    {props.currentUser._id === props.roomInfo.liverId ?
                        <>
                        <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare /> : <ScreenShare />}</Avatar></Tooltip>
                        <Tooltip title={props.isVideo ? "共有を停止" : "画面を共有"} placement="top"><Avatar onClick={() => props.setIsVideo((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{props.isVideo ? <Videocam /> : <VideocamOff />}</Avatar></Tooltip>
                        <Tooltip title={props.isMic ? "マイクをオフ" : "マイクをオン"} placement="top"><Avatar onClick={() => props.setIsMic((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{props.isMic ? <Mic /> : <MicOff />}</Avatar></Tooltip>
                        </>
                        :
                        <>
                        <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare /> : <ScreenShare />}</Avatar></Tooltip>
                        <Tooltip title={isAudio ? "音声をオフ" : "音声をオン"} placement="top"><Avatar onClick={() => setIsAudio((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isAudio ? <Headset/> : <HeadsetOff />}</Avatar></Tooltip>
                        </>
                    }
                    <Tooltip title={props.currentUser._id === props.roomInfo.liverId ? "配信を終了" : "ルームを出る"} placement="top"><Avatar sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: "#f22"}} onClick={handleWindowClose}><CallEnd style={{color: "#fff"}}/></Avatar></Tooltip>
                    </Box>
                </Box>
            }

        </StyledInner>
        </>
    )
}


const StyledInner = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const StyledVideoArea = styled.div`
    position: relative;
    width: 100%;
    height: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "100vh" : "75vh"};
    padding: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "0%" : "1%"};
    overflow: hidden;
`

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #000;
`

const StyledLiverLabel = styled(Chip)`
    && {
        z-index: 100;
        position: absolute;
        bottom: 10px;
        left: 10px;
        padding: 0 10px;
        color: #fff;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.7);
    }
`

const StyledIconOpacity = styled.div`
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: end;
    align-items: end;
    width: 100%;
    height: 100%;
    padding: 0 1% 1% 0;
    opacity: 0;
    overflow: hidden;
    cursor: pointer;
    transition: opacity ease 0.2s;
    &:hover {
        opacity: 1;
    }
`

const StyledBroadcastDesc = styled.div`
    display: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "none" : "block"};
    width: 100%;
    height: 25vh;
    padding: 15px 30px;
    overflow-y: scroll;
    // background-color: #ffa;
`

const StyledTypography = styled(Typography)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const StyledCommentArea = styled.div`
    position: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "fixed" : "static"};
    top: 0;
    right: 0;
    width: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "25%" : "100%"};
    min-width: 150px;
    max-width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "transparent" : "#aaa"};
`


export default BroadcastRoomInner