import { AspectRatio, CallEnd, Chat, Circle, EmojiEmotions, Headset, HeadsetOff, Mic, MicOff, RecordVoiceOver, ScreenShare, Send, StopScreenShare, Videocam, VideocamOff, VoiceOverOff } from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react';


const BroadcastRoomInner = (props) => {

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isAudio, setIsAudio] = useState(true);
    const [liver, setLiver] = useState(null); // 配信者のすべて
    const [isEmoji, setIsEmoji] = useState(false);
    const [chat, setChat] = useState("");
    const [isSpeech, setIsSpeech] = useState(true);
    const [chatBottom, setChatBottom] = useState(true); // チャット欄が要り番したまでスクロールされたかどうか(スクロールで変動:初回は下まで下げるのでtrue)
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const emojiRef = useRef();
    const chatRef = useRef();
    const emojiButtonRef = useRef();
    const theme = useTheme();

    const handleWindowClose = () => {
        window.close();
    }

    const handleEmojiClick = (e) => {
        const emojiCode = e.unified.split("-");
        let codeArray = [];
        emojiCode.forEach((el) => codeArray.push("0x" + el));
        const emoji = String.fromCodePoint(...codeArray);
        if (chat.length <= 498) {
            setChat((prev) => prev + emoji);
        }
    }

    const handleChatSend = () => {
        if (chat.length === 0) return;
        props.socket.emit('broadcastChat', chat, props.groupId, props.roomInfo.roomId, props.currentUser);
        setChat("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault(); // Enter キーのデフォルトの動作をキャンセル
            handleChatSend();
        }
    }

    const handleChatScroll = () => { // チャット欄のスクロールを検知
        if (!chatRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
        if (scrollHeight - (scrollTop + clientHeight) <= 5) { // 誤差5px許容
            setChatBottom(true); // 下までスクロールしたらtrue
        } else {
            setChatBottom(false); // でなければfalse
        }
    }

    useEffect(() => {
        // チャット欄が一番下までスクロールされており、チャット欄が更新された場合、スクロールを最下部に更新
        if (chatBottom && chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        // 追加されたメッセージを読み上げ
        if (isSpeech && props.roomInfo.chat.length > 0) { // チャットが1件以上ないとchatフィールドが読めずにエラーになるので
            const uttr = new SpeechSynthesisUtterance(props.roomInfo.chat[props.roomInfo.chat.length - 1].chat);
            uttr.pitch = 1.5;
            window.speechSynthesis.speak(uttr);
        }
    } , [props.roomInfo.chat]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleKeyPress = (event) => {
        if (event.key === 'Escape' && !isSmallScreen) {
            setIsFullScreen((prev) => !prev);
        }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    })

    useEffect(() => {
        const handleEmojiClose = (e) => {
            if (emojiRef.current && emojiButtonRef.current && !emojiRef.current.contains(e.target) && !emojiButtonRef.current.contains(e.target)) {
                setIsEmoji(false);
            }
        }
        document.addEventListener('click', handleEmojiClose);
    
        return () => {
            document.removeEventListener('click', handleEmojiClose);
        }
    }, []);

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

    useEffect(() => {
        // 配信ルームがマウントされたら、チャット欄を最新の位置までスクロールさせる
        // 要素が存在しない場合は何もしない
        if (!chatRef.current) return;
        // 要素のy座標のスクロール位置を最大まで下げる
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, []);

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
                                    <Box width="100px" maxWidth="20vw" style={{aspectRatio: "1/1"}}>
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
                                <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare style={{color: "#fff"}} /> : <ScreenShare style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                <Tooltip title={props.isVideo ? "共有を停止" : "画面を共有"} placement="top"><Avatar onClick={() => props.setIsVideo((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{props.isVideo ? <Videocam style={{color: "#fff"}} /> : <VideocamOff style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                <Tooltip title={props.isMic ? "マイクをオフ" : "マイクをオン"} placement="top"><Avatar onClick={() => props.setIsMic((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{props.isMic ? <Mic style={{color: "#fff"}} /> : <MicOff style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                <Tooltip title={isSpeech ? "読み上げオフ" : "読み上げオン"} placement="top"><Avatar onClick={() => setIsSpeech((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSpeech ? <RecordVoiceOver style={{color: "#fff"}} /> : <VoiceOverOff style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                </>
                                :
                                <>
                                <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare style={{color: "#fff"}} /> : <ScreenShare style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                <Tooltip title={isAudio ? "音声をオフ" : "音声をオン"} placement="top"><Avatar onClick={() => setIsAudio((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonNormalScreen}}>{isAudio ? <Headset style={{color: "#fff"}}/> : <HeadsetOff style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                <Tooltip title={isSpeech ? "読み上げオフ" : "読み上げオン"} placement="top"><Avatar onClick={() => setIsSpeech((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSpeech ? <RecordVoiceOver style={{color: "#fff"}} /> : <VoiceOverOff style={{color: "#fff"}}/>}</Avatar></Tooltip>
                                </>
                                }
                                <Tooltip title={props.currentUser._id === props.roomInfo.liverId ? "配信を終了" : "ルームを出る"} placement="top"><Avatar sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: "#f22"}} onClick={handleWindowClose}><CallEnd style={{color: "#fff"}}/></Avatar></Tooltip>
                            </Box>
                        </Box>
                    </StyledBroadcastDesc>

                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <StyledCommentArea $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}>

                        <Box width="100%" height="calc(75vh - 10px)">
                            {(!isSmallScreen && !isFullScreen) &&
                            <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px 15px" width="100%" height="45px" backgroundColor={theme.palette.broadcast.subSection}>
                                <StyledTypography style={{userSelect: "none"}} variant='body1' fontWeight="bold" color={theme.palette.text.sub}>チャット</StyledTypography>
                                <Chat style={{marginRight: "10px", color: theme.palette.text.sub, cursor: "pointer"}} />
                            </Box>
                            }

                            <StyledChatArea ref={chatRef} onScroll={handleChatScroll} $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}>
                                {props.roomInfo.chat.map((chat, index) =>
                                    <StyledChatBox key={index} display="flex" alignItems={chat.chat.split('\n').length === 1 ? "center" : "start"} gap="10px" padding="10px 15px" width="100%" borderRadius={(!isSmallScreen && !isFullScreen) ? "0px" : "10px"} theme={theme} chat={chat} liverid={props.roomInfo.liverId} $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen}>
                                        <Avatar sx={{width: "30px", height: "30px"}} src={chat.userInfo.icon ? `http://localhost:5000/uploads/userIcons/${chat.userInfo.icon}` : `${siteAssetsPath}/default_icons/${chat.userInfo.defaultIcon}`} />
                                        <Typography style={{wordBreak: "break-all"}} variant="body2" color={props.roomInfo.liverId === chat.userInfo._id ? theme.palette.broadcast.main : theme.palette.text.sub}>
                                            {chat.userInfo.username}
                                            <span style={{color: theme.palette.text.main, marginLeft: "10px", wordBreak: "break-all", whiteSpace: "pre-line"}}>{chat.chat}</span>
                                        </Typography>
                                    </StyledChatBox>
                                )}
                            </StyledChatArea>
                        </Box>

                        <Box position="relative" zIndex={200} display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="100%" height="calc(25vh - 10px)" padding="1vh 1vw" borderRadius="10px" backgroundColor={(!isSmallScreen && !isFullScreen) ? theme.palette.broadcast.subSection : "transparent"}>
                            <Box display="flex" width="100%" alignItems="center" gap="10px" height="20%">
                                <div style={{height: "100%", aspectRatio: "1/1"}}>
                                    <Avatar sx={{width: "100%", height: "100%"}} src={props.currentUser.icon ? `http://localhost:5000/uploads/userIcons/${props.currentUser.icon}` : `${siteAssetsPath}/default_icons/${props.currentUser.defaultIcon}`}/>
                                </div>
                                <StyledTypography theme={theme} variant="body1" color={(isSmallScreen || isFullScreen) ? theme.palette.text.main2 : theme.palette.text.sub}>{props.currentUser.username}</StyledTypography>
                            </Box>

                            <Box display="flex" width="100%" padding="10px 0" justifyContent="center" alignItems="center" flexDirection="column" height="60%">
                                <StyledTextArea $isSmallScreen={isSmallScreen} $isFullScreen={isFullScreen} onChange={(e) => setChat(e.target.value)} onKeyDown={handleKeyDown} value={chat} theme={theme} maxLength={500} variant='standard' color='broadcast' fullWidth placeholder="メッセージを入力"/>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" height="20%">
                                <div style={{height: "100%", aspectRatio: "1/1"}}>
                                    <Tooltip title='絵文字' placement='top'><EmojiEmotions ref={emojiButtonRef} onClick={() => setIsEmoji((prev) => !prev)} style={{marginRight: "10px", color: isEmoji ? theme.palette.broadcast.main : (isSmallScreen || isFullScreen) ? theme.palette.text.main2 : theme.palette.text.sub, cursor: "pointer"}}/></Tooltip>
                                </div>
                                <Box display="flex" alignItems="center" height="100%" gap="10px">
                                    <span style={{color: (isSmallScreen || isFullScreen) ? theme.palette.text.main2 : theme.palette.text.sub, height: "100%"}}>{`${chat.length}/500`}</span>
                                    <div style={{height: "100%", aspectRatio: "1/1"}}>
                                        <Tooltip title='送信(Enter+Shift)' placement='top'><Send onClick={handleChatSend} style={{marginRight: "10px", color: (isSmallScreen || isFullScreen) ? theme.palette.text.main2 : theme.palette.text.sub, cursor: "pointer"}}/></Tooltip>
                                    </div>
                                </Box>
                            </Box>

                            <StyledEmojiArea ref={emojiRef}>
                                <EmojiPicker open={isEmoji} onEmojiClick={handleEmojiClick} theme={theme.palette.broadcast.emojiTheme}/>
                            </StyledEmojiArea>
                            
                        </Box>

                    </StyledCommentArea>
                </Grid>

            </Grid>

            {(isSmallScreen || isFullScreen) &&
                <Box position="absolute" top="0" left="0" display="flex" justifyContent="center" alignItems="end" width="100%" height="100%">
                    <Box display="flex" justifyContent="center" alignItems="center" gap="15px" width="100%" padding="2vh 0">
                        {props.currentUser._id === props.roomInfo.liverId ?
                            <>
                            {(!isSmallScreen) && <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare style={{color: "#fff"}} /> : <ScreenShare style={{color: "#fff"}} />}</Avatar></Tooltip>}
                            <Tooltip title={props.isVideo ? "共有を停止" : "画面を共有"} placement="top"><Avatar onClick={() => props.setIsVideo((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{props.isVideo ? <Videocam style={{color: "#fff"}} /> : <VideocamOff style={{color: "#fff"}} />}</Avatar></Tooltip>
                            <Tooltip title={props.isMic ? "マイクをオフ" : "マイクをオン"} placement="top"><Avatar onClick={() => props.setIsMic((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{props.isMic ? <Mic style={{color: "#fff"}} /> : <MicOff style={{color: "#fff"}} />}</Avatar></Tooltip>
                            <Tooltip title={isSpeech ? "読み上げオフ" : "読み上げオン"} placement="top"><Avatar onClick={() => setIsSpeech((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSpeech ? <RecordVoiceOver style={{color: "#fff"}} /> : <VoiceOverOff style={{color: "#fff"}} />}</Avatar></Tooltip>
                            </>
                            :
                            <>
                            {(!isSmallScreen) && <Tooltip title={isSmallScreen || isFullScreen ? "縮小(Esc)" : "全画面(Esc)"} placement="top"><Avatar onClick={() => setIsFullScreen((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSmallScreen || isFullScreen ? <StopScreenShare style={{color: "#fff"}} /> : <ScreenShare style={{color: "#fff"}} />}</Avatar></Tooltip>}
                            <Tooltip title={isAudio ? "音声をオフ" : "音声をオン"} placement="top"><Avatar onClick={() => setIsAudio((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isAudio ? <Headset style={{color: "#fff"}} /> : <HeadsetOff style={{color: "#fff"}} />}</Avatar></Tooltip>
                            <Tooltip title={isSpeech ? "読み上げオフ" : "読み上げオン"} placement="top"><Avatar onClick={() => setIsSpeech((prev) => !prev)} sx={{width: "55px", height: "55px", cursor: "pointer", backgroundColor: theme.palette.broadcast.commandButtonFullScreen}}>{isSpeech ? <RecordVoiceOver style={{color: "#fff"}} /> : <VoiceOverOff style={{color: "#fff"}} />}</Avatar></Tooltip>
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
    width: 100%;
    height: 100%;
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
        bottom: 2vh;
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
`

const StyledTypography = styled(Typography)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const StyledCommentArea = styled.div`
    z-index: 250;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "fixed" : "static"};
    top: 0;
    right: 0;
    padding 10px 0;
    width: ${(props) => props.$isSmallScreen || props.$isFullScreen ? "30%" : "100%"};
    min-width: 150px;
    max-width: 100vw;
    height: 100vh;
`

const StyledChatArea = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: ${(props) => (!props.$isSmallScreen && !props.$isFullScreen) ? "0px" : "10px"};
    width: 100%;
    padding: 15px;
    height: ${(props) => (!props.$isSmallScreen && !props.$isFullScreen) ? "calc(100% - 45px)" : "100%"};
    overflow-y: scroll;
    overflow-x: hidden;
`

const StyledChatBox = styled(Box)`
    && {
        background-color: ${(props) => (props.liverid === props.chat.userInfo._id && !props.$isSmallScreen && !props.$isFullScreen) ? props.theme.palette.broadcast.liverComment : (props.$isSmallScreen || props.$isFullScreen) ? props.theme.palette.broadcast.fullScreenComment : "transparent"};
        transition: background 0.1s ease;
        ${StyledCommentArea}:hover & {
            background: ${(props) => (!props.$isSmallScreen && !props.$isFullScreen) ? null : props.theme.palette.broadcast.fullScreenCommentHover};
        }
    }
`

const StyledTextArea = styled.textarea`
    width: calc(100% - 30px);
    height: 100%;
    padding: 15px 10px;
    color: ${(props) => (props.$isSmallScreen || props.$isFullScreen) ? props.theme.palette.text.main2 : props.theme.palette.text.main};
    background-color: transparent;
    outline: solid 1px ${(props) => (props.$isSmallScreen || props.$isFullScreen) ? props.theme.palette.text.main2 : props.theme.palette.text.main};
    border-radius: 10px;
    border: none;
    resize: none;
    font-size: 100%;
    font-weight: normal;
    font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;

    transition: background 0.1s ease;
    ${StyledCommentArea}:hover & {
        background: ${(props) => (!props.$isSmallScreen && !props.$isFullScreen) ? null : "rgba(0, 0, 0, 0.5)"};
    }

    &:focus-within {
        outline: solid 2px ${(props) => props.theme.palette.broadcast.main};
    }
`

const StyledEmojiArea = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
`


export default BroadcastRoomInner