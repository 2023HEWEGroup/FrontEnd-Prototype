import { ArrowBackIosNew, EmojiEmotions, ExpandLess, ExpandMore, Inventory, MoreVert, People, Send, Star } from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, IconButton, InputAdornment, LinearProgress, Tab, Tabs, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import Broadcasts from '../components/group/Broadcasts';
import { useEnv } from '../provider/EnvProvider';
import TimeLine from '../components/group/TimeLine';
import { StyledTextField } from '../utils/StyledTextField';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';


const Group = (props) => {

  const { groupId } = useParams("groupId");
  const [socket, setSocket] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState({});
  const [truncatedDesc, setTruncatedDesc] = useState("");
  const [lineCount, setLineCount] = useState(NaN);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [chatHeight, setChatHeight] = useState("calc(100vh - 105px)");
  const [chat, setChat] = useState("");
  const [isEmoji, setIsEmoji] = useState(false);
  const [chatBottom, setChatBottom] = useState(true); // チャット欄が要り番したまでスクロールされたかどうか(スクロールで変動:初回は下まで下げるのでtrue)
  const { backendAccessPath, socketPath } = useEnv();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const chatRef = useRef();
  const chatInputRef = useRef();
  const emojiRef = useRef();
  const emojiButtonRef = useRef();

  const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
  }

  const formatDate = (arg) => {
    const date = new Date(arg);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault(); // Enter キーのデフォルトの動作をキャンセル
        handleChatSend();
    }
}

  const handleChatSend = () => {
    if (chat.length === 0 || !socket) return;
    socket.emit('groupChat', chat, groupId, props.currentUser);
    setChat("");
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
  } , [group.chat]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (socket) {
        // socketが設定されていることを確認しそのグループのルームに参加する
        socket.emit("enterGroup", groupId);

        // グループの更新された情報を取得
        socket.on('newGroup', (newGroup) => {
          setGroup(newGroup);
        });

        // クリーンアップ関数でイベントリスナーを削除する
        return () => {
            socket.off('enterGroup');
            socket.off('newGroup');
        };
    }
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const fetchGroup = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendAccessPath}/client/group/getGroup/${groupId}`);
        setGroup(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroup();
  }, [groupId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (group && group.desc) {
        setTruncatedDesc(isExpanded ? group.desc : group.desc.split('\n').slice(0, 10).join('\n'))
        setLineCount(group.desc.split('\n').length);
    }
  }, [group, isExpanded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const downChat = () => {
      console.log(1)
      // 要素が存在しない場合は何もしない
      if (!chatRef.current || !tabValue === 0) return;
      console.log(2)
      // 要素のy座標のスクロール位置を最大まで下げる
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 1000);
    }
    downChat();
  }, [chatHeight, tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const calculateHeight = () => {
      if (chatInputRef.current && emojiRef.current) {
        const newHeight = isSmallScreen ? "fit-content" : `calc(100vh - ${chatInputRef.current.clientHeight + 105}px)`;
        setChatHeight(newHeight);
        }
    };
    // レンダリング後に高さを計算する(position: absoluteの絵文字部分のレンダリングを待つ)
    setTimeout(calculateHeight, 0);
  }, [isSmallScreen, tabValue, chat, chatInputRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // サーバーとの接続を確立
    const newSocket = io(socketPath);
    setSocket(newSocket);
    // クリーンアップ関数で接続を解除
    return () => {
        newSocket.disconnect();
    };
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {!isLoading ?
    <StyledGroup>
      <StyledBox display="flex" gap="5px">
        <Link to="/groups">
          <StyledIconButton theme={theme}>
            <ArrowBackIosNew style={{color: "#fff"}} fontSize='small'/>
          </StyledIconButton>
        </Link>
        <StyledIconButton theme={theme}>
          <MoreVert style={{color: "#fff"}} fontSize='small'/>
        </StyledIconButton>
      </StyledBox>

      <Grid container>

        <Grid height={isSmallScreen ? "fit-content" : "calc(100vh - 55px)" } item xs={12} sm={12} md={6} lg={6} xl={6} style={{position: "stickey", top: "55px", overflowY: isSmallScreen ? "visible" : "scroll"}}>

          <StyledGroupHeader theme={theme} backHeader={`${backendAccessPath}/uploads/groupHeaders/${group.header ? group.header : null}`}></StyledGroupHeader>

            <Box width="90%" margin="0 auto" display="flex" flexDirection="column" borderBottom={`solid 1px ${theme.palette.line.disable}`}>
              <Box display="flex" alignItems="center" width="100%" padding="30px 0" gap="25px">
                <StyledAvatarZone>
                  <Avatar variant='square' src={`${backendAccessPath}/uploads/groupIcons/${group.icon ? group.icon : null}`} sx={{width: "100%", height: "100%"}}/>
                </StyledAvatarZone>
                <Box display="flex" flexDirection="column" gap="10px" width="80%">
                  <Typography sx={{wordBreak: "break-all"}} variant='h5' color={theme.palette.text.main}>{group.name}</Typography>
                  <Typography sx={{wordBreak: "break-all"}} variant='body1' color={theme.palette.text.sub}>{group.subTitle}</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="end" gap="20px" paddingBottom="5px" color={theme.palette.text.main}>
                <Box display="flex" gap="2px" sx={{cursor: "pointer"}}><People style={{color: theme.palette.icon.comment}} fontSize='small'/><div>{formatNumber(group.member.length)}</div></Box>
                <Box display="flex" gap="2px" sx={{cursor: "pointer"}}><Inventory style={{color: theme.palette.icon.inventory}} fontSize='small'/><div>{formatNumber(group.products.length)}</div></Box>
                <Box display="flex" gap="2px" sx={{cursor: "pointer"}}><Star style={{color: theme.palette.icon.star}} fontSize='small'/><div>{formatNumber(group.star)}</div></Box>
              </Box>
            </Box>

            <Box width="90%" padding="30px 0" margin="0 auto" display="flex" gap="15px" flexDirection="column" borderBottom={`solid 1px ${theme.palette.line.disable}`}>
              <Typography sx={{wordBreak: "break-all", whiteSpace: 'pre-line'}} variant='body1' color={theme.palette.text.sub}>{truncatedDesc}</Typography>
              {lineCount > 10 &&
              <StyledMoreRead theme={theme} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ?
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0", margin: "0 auto"}}><div>折りたたむ</div><ExpandLess color="secondary"/></div>
                :
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0", margin: "0 auto"}}><div>すべて表示</div><ExpandMore color="secondary"/></div>}
              </StyledMoreRead>
              }
              <Box display="flex" flexWrap="wrap" gap="15px" padding="15px 0">
                {group.tags.map((tag, index) =>
                  <StyledTagChip key={index} theme={theme} clickable label={`# ${tag}`}/>
                )}
              </Box>
              <Box display="flex" flexDirection="column" alignItems="end">
                <Typography sx={{wordBreak: "break-all"}} variant='body2' color={theme.palette.text.sub}>作成： {formatDate(group.createdAt)}</Typography>
                <Typography sx={{wordBreak: "break-all"}} variant='body2' color={theme.palette.text.sub}>オーナー： {group.owner.username}</Typography>
              </Box>
            </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box width="100%" margin="0 auto">
          <StyledTabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} indicatorColor='secondary' theme={theme}>
            <StyledTab theme={theme} label="タイムライン"></StyledTab>
            <StyledTab theme={theme} label="メンバー"></StyledTab>
            <StyledTab theme={theme} label="商品"></StyledTab>
            <StyledTab theme={theme} label="配信"></StyledTab>
          </StyledTabs>
          <Box ref={chatRef} onScroll={handleChatScroll} height={isSmallScreen ? "fit-content" : tabValue === 0 ? chatHeight : "calc(100vh - 105px)"} style={{overflowY: isSmallScreen ? "scroll" : "scroll"}}>
            {tabValue === 0 && <TimeLine chatRef={chatRef} handleChatScroll={handleChatScroll} group={group} currentUser={props.currentUser}/>}
            {tabValue === 3 && <Broadcasts group={group} currentUser={props.currentUser}/>}
          </Box>
          {tabValue === 0 &&
            <Box position="relative" display="flex" gap="10px" justifyContent="center" alignItems="center" margin="0 auto" padding="15px 0" width="95%" ref={chatInputRef}>
              <Tooltip title="絵文字" placement='top'><EmojiEmotions onClick={() => setIsEmoji((prev) => !prev)} ref={emojiButtonRef} style={{color: isEmoji ? theme.palette.secondary.main : theme.palette.text.sub, cursor: "pointer"}}/></Tooltip>
              <StyledTextField onKeyDown={handleKeyDown} fullWidth value={chat} theme={theme} multiline inputProps={{maxLength: 500, placeholder: "チャットを入力"}} maxRows={5}
                onChange={(e) => setChat(e.target.value)} InputProps={{endAdornment: (<InputAdornment position="end">{<Tooltip title="Ctrl + Enter" placement='top'><Send onClick={handleChatSend} style={{color: theme.palette.text.sub, cursor: "pointer"}}/></Tooltip>}</InputAdornment>)}}/>

                <StyledEmojiArea $isSmallScreen={isSmallScreen} ref={emojiRef}>
                  <EmojiPicker open={isEmoji} onEmojiClick={handleEmojiClick} theme={theme.palette.broadcast.emojiTheme}/>
                </StyledEmojiArea>
            </Box>
          }
        </Box>
        </Grid>

      </Grid>

    </StyledGroup>
    :
    <LinearProgress color='secondary' style={{backgroundColor: "transparent"}}/>
    }
    </>
  )
}


const StyledGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 3000px;
  margin: 0 auto;
  overflow: hidden;
`

const StyledGroupHeader = styled.div`
  width: 100%;
  aspect-ratio: 5/1;
  background-image: url(${(props => props.backHeader)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledBox = styled(Box)`
  && {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`

const StyledIconButton = styled(IconButton)`
  && {
    background-color: ${(props) => props.theme.palette.background.slideHover};
  }
`

const StyledAvatarZone = styled.div`
  aspect-ratio: 1/1;
  width: 20%;
  overflow: hidden;
`

const StyledMoreRead = styled.div`
    display: flex;
    justify-contet: center;
    align-items: center;
    color: ${(props) => props.theme.palette.secondary.main};
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;
    overflow: hidden;
    user-select: none;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover2};
    }
`

const StyledTagChip = styled(Chip)`
  && {
    height: 30px;
    color: ${(props) => props.theme.palette.secondary.main};
    border-radius: 5px;
    background-color: ${(props) => props.theme.palette.background.pop};

    &&:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
  }
`

const StyledTabs = styled(Tabs)`
    && {
      width: 100%;
      margin: 0 auto;
      .MuiTabs-indicator {
        bottom: 0;
      }
    }
`

const StyledTab = styled(Tab)`
    && {
      flex: 1 1 0;
      max-width: 25%;
      height: 50px;
      color: ${(props) => props.theme.palette.text.sub};
      border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};

      &.Mui-selected {
        color: ${(props) => props.theme.palette.text.main};
      }
    }
`

const StyledEmojiArea = styled.div`
    position: absolute;
    ${(props) => props.$isSmallScreen ?
      `
      left: 0;
      top: 0;
      transform: translateY(-100%);
      `
      :
      `
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      `
    }
`

export default Group