import { AspectRatio, CallEnd, Circle, MicNone, MicOff, Podcasts, Videocam, VideocamOff } from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


const BroadcastRoomInner = (props) => {

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isAudio, setIsAudio] = useState(true);
    const [isShare, setIsShare] = useState(true);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
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

    return (
        <>
        <StyledInner>
            <Grid container>

                <Grid item xs={12} sm={12} md={isFullScreen ? 12 : 8} lg={isFullScreen ? 12 : 8} xl={isFullScreen ? 12 : 8}>

                    <StyledVideoArea $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}>
                        <Box width="100%" height="100%" style={{position: "relative", borderRadius: isSmallScreen || isFullScreen ? "0px" : "10px", overflow: "hidden"}}>
                            <StyledVideo playsInline autoPlay muted ref={props.videoRef} />
                            <StyledLiverLabel icon={<Podcasts style={{color: "#f00"}} fontSize='small'/>} label={props.roomInfo.liverName}/>
                            <StyledIconOpacity onClick={() => !isFullScreen ? setIsFullScreen(true) : ""} style={{display: isSmallScreen || isFullScreen ? "none" : "flex"}}>
                                <Tooltip title="全画面(Esc)" placement='top'><AspectRatio fontSize='large' style={{color: "#fff"}}/></Tooltip>
                            </StyledIconOpacity>
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
                                <Tooltip title={isShare ? "共有を停止" : "画面を共有"} placement="top"><Avatar onClick={() => setIsShare((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer"}}>{isShare ? <VideocamOff /> : <Videocam />}</Avatar></Tooltip>
                                <Tooltip title={isAudio ? "マイクをオフ" : "マイクをオン"} placement="top"><Avatar onClick={() => setIsAudio((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer"}}>{isAudio ? <MicOff /> : <MicNone />}</Avatar></Tooltip>
                                <Tooltip title={"配信を終了 ルームを出る"} placement="top"><Avatar sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: "#f22"}} onClick={handleWindowClose}><CallEnd style={{color: "#fff"}}/></Avatar></Tooltip>
                            </Box>
                        </Box>
                    </StyledBroadcastDesc>

                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <StyledCommentArea $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}></StyledCommentArea>
                </Grid>

            </Grid>
        </StyledInner>
        </>
    )
}


const StyledInner = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const StyledVideoArea = styled.div`
    width: 100%;
    height: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "100vh" : "75vh"};
    // background-color: #afa;
    padding: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "0%" : "1%"};
`

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #000;
`

const StyledLiverLabel = styled(Chip)`
    && {
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
    background-color: #aaa;
`


export default BroadcastRoomInner