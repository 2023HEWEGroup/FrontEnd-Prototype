import { ArrowBackIosNew, Chat, EmojiEmotions, ExpandLess, ExpandMore, Inventory, LiveTv, MoreVert, People, Send, Star, StarBorder } from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, IconButton, InputAdornment, LinearProgress, Paper, Popper, Tab, Tabs, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import Broadcasts from '../components/group/Broadcasts';
import { useEnv } from '../provider/EnvProvider';
import TimeLine from '../components/group/TimeLine';
import GroupMember from '../components/group/GroupMember';
import { StyledTextField } from '../utils/StyledTextField';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import GroupFixModal from '../components/group/GroupFixModal';
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';
import IsProgress from '../components/common/isProgress/IsProgress';
import { debounce } from 'lodash';
import VerifiedBadge from '../layouts/badges/VerifiedBadge';
import LoginRequiredModal from '../components/common/loginRequiredModal/LoginRequiredModal';


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
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);

  const [isProgress, setIsProgress] = useState(false);
  const [isFixModal, setIsFixModal] = useState(false);
  const [fixInfo, setFixInfo] = useState({name: "", subTitle: "", desc: "", tags: []});
  const [groupError, setGroupError] = useState({name: false, desc: false});
  const [isErrorSnack, setIsErrorSnack] = useState(false);
  const [snackWarning, setSnackWarning] = useState("");
  const [tag, setTag] = useState("");
  const [groupHelper, setGroupHelper] = useState({name: false, desc: false});
  const [isIconDelete, setIsIconDelete] = useState(false);
  const [isHeaderDelete, setIsHeaderDelete] = useState(false);
  const [previewHeader, setPreviewHeader] = useState(""); // トリミング結果
  const [originalHeader, setOriginalHeader] = useState(""); // オリジナルデータ(トリミング開始時に使用)
  const [binaryHeader, setBinaryHeader] = useState(""); // バイナリデータ(送信に使用)
  // これらはそれぞれの履歴。トリミング中にキャンセルが発生した場合、これらの履歴があれば適用する。
  const [previewPrevHeader, setPreviewPrevHeader] = useState();
  const [originalPrevHeader, setOriginalPrevHeader] = useState();
  const [binaryPrevHeader, setBinaryPrevHeader] = useState();
  const [headerCrop, setHeaderCrop] = useState({x: 0, y: 0});
  const [headerZoom, setHeaderZoom] = useState(1);

  const [previewIcon, setPreviewIcon] = useState(""); // トリミング結果
  const [originalIcon, setOriginalIcon] = useState(""); // オリジナルデータ(トリミング開始時に使用)
  const [binaryIcon, setBinaryIcon] = useState(""); // バイナリデータ(送信に使用)
  // これらはそれぞれの履歴。トリミング中にキャンセルが発生した場合、これらの履歴があれば適用する。
  const [previewPrevIcon, setPreviewPrevIcon] = useState();
  const [originalPrevIcon, setOriginalPrevIcon] = useState();
  const [binaryPrevIcon, setBinaryPrevIcon] = useState();
  const [iconCrop, setIconCrop] = useState({x: 0, y: 0});
  const [iconZoom, setIconZoom] = useState(1);

  const [isLoginModal, setIsLoginModal] = useState(false);

  const { siteAssetsPath, backendAccessPath, socketPath } = useEnv();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const chatRef = useRef();
  const chatInputRef = useRef();
  const emojiRef = useRef();
  const emojiButtonRef = useRef();
  const popperRef = useRef();

  const returnBadgeName = (owner) => {
    if (owner.isAuthorized) {
      return (<span style={{display: "flex", alignItems: "center", gap: "2px"}}><VerifiedBadge fontSize="small" />{owner.username}</span>)
    } else {
      return (<span style={{display: "flex", alignItems: "center", gap: "2px"}}>{owner.username}</span>)
    }
  }

  const handleNameChange = (e) => {
    setFixInfo((prev) => ({...prev, name: e.target.value}));
    setGroupError((prev) => ({...prev, name: false}));
    setGroupHelper((prev) => ({...prev, name: ""}));
    if (e.target.value.length === 0) {
        setGroupError((prev) => ({...prev, name: false}));
        setGroupHelper((prev) => ({...prev, name: ""}));
    } else if (e.target.value.trim() === "") {
        setGroupError((prev) => ({...prev, name: true}));
        setGroupHelper((prev) => ({...prev, name: "空白のみの入力はできません"}));
    }
};

const handleSubTitleChange = (e) => {
  setFixInfo((prev) => ({...prev, subTitle: e.target.value}));
};

const handleDescChange = (e) => {
  setFixInfo((prev) => ({...prev, desc: e.target.value}));
    setGroupError((prev) => ({...prev, desc: false}));
    setGroupHelper((prev) => ({...prev, desc: ""}));
    if (e.target.value.length === 0) {
        setGroupError((prev) => ({...prev, desc: false}));
        setGroupHelper((prev) => ({...prev, desc: ""}));
    } else if (e.target.value.length < 5) {
        setGroupError((prev) => ({...prev, desc: true}));
        setGroupHelper((prev) => ({...prev, desc: "グループ説明は最低で5文字必要です"}));
    } else if (e.target.value.trim() === "") {
        setGroupError((prev) => ({...prev, desc: true}));
        setGroupHelper((prev) => ({...prev, desc: "空白のみの入力はできません"}));
    }
};

const handleTagAdd = () => {
    const newTag = tag;
    setFixInfo((prev) => ({...prev, tags: [...prev.tags, newTag]}));
    setTag("");
};

const handleTagDelete = (index) => {
    const updatedTags = fixInfo.tags.filter((tag, i) => i !== index);
    setFixInfo((prev) => ({...prev, tags: updatedTags}));
};

const handleTagInput = (event) => {
    const tagWithoutSpaces = event.target.value.replace(/\s/g, "");
    setTag(tagWithoutSpaces);
}

const handleCheck = () => {
    let flag = true;
    if (fixInfo.name.length === 0) {
        setGroupError((prev) => ({...prev, name: true}));
        setGroupHelper((prev) => ({...prev, name: "グループ名を入力して下さい"}));
        flag = false;
    } else if (fixInfo.name.trim() === "") {
        setGroupError((prev) => ({...prev, name: true}));
        setGroupHelper((prev) => ({...prev, name: "空白のみの入力はできません"}));
        flag = false;
    }
    if (fixInfo.desc.length === 0) {
        setGroupError((prev) => ({...prev, desc: true}));
        setGroupHelper((prev) => ({...prev, desc: "グループ説明を入力して下さい"}));
        flag = false;
    } else if (fixInfo.desc.length < 5) {
        setGroupError((prev) => ({...prev, desc: true}));
        setGroupHelper((prev) => ({...prev, desc: "グループ説明は最低で5文字必要です"}));
        flag = false;
    } else if (fixInfo.desc.trim() === "") {
        setGroupError((prev) => ({...prev, desc: true}));
        setGroupHelper((prev) => ({...prev, desc: "空白のみの入力はできません"}));
        flag = false;
    }
    if (!flag) {
        setSnackWarning("入力内容が誤っています。");
        setIsErrorSnack(true);
        return;
    } else {
      handleProfleUpdate();
    }
}

const handleProfleUpdate = async () => {
  try {
      setIsProgress(true);
      if (fixInfo.name !== group.name || fixInfo.desc !== group.desc || fixInfo.subTitle !== group.subTitle || fixInfo.tags !== group.tags) {
          // 内容に変更があれば名前やプロフィールを更新
          console.log("プロフィールアプデ")
          await axios.put(`${backendAccessPath}/client/group/update/${group?._id}`, {name: fixInfo.name.trim(), desc: fixInfo.desc.trim(), subTitle: fixInfo.subTitle.trim(), tags: fixInfo.tags});
      }
      if (binaryIcon) {
          // アイコンに変更があれば(props.binaryIcon: 送る実データがあれば)API実行
          const formData = new FormData();
          formData.append("groupIcon", binaryIcon);
          await axios.put(`${backendAccessPath}/client/group/updateIcon/${group?._id}`, formData);
          // // アイコン更新情報を初期化
          setOriginalIcon();
          setBinaryIcon();
          console.log("アイコン変更")
      }
      if (binaryHeader) {
          // ヘッダーに変更があれば(props.binaryHeader: 送る実データがあれば)API実行
          const formData = new FormData();
          formData.append("groupHeader", binaryHeader);
          await axios.put(`${backendAccessPath}/client/group/updateHeader/${group?._id}`, formData);
          // // アイコン更新情報を初期化
          setOriginalHeader();
          setBinaryHeader();
          console.log("ヘッダー変更")
      }
      if (isIconDelete) {
          // アイコンが削除されていたら実行
          await axios.delete(`${backendAccessPath}/client/group/deleteIcon/${group?._id}`);
          console.log("アイコンsakuzyo")
      }
      if (isHeaderDelete) {
          // ヘッダーが削除されていたら実行
          await axios.delete(`${backendAccessPath}/client/group/deleteHeader/${group?._id}`);
          console.log("ヘッダーsakuzyo")
      }
      const newGroup = await axios.get(`${backendAccessPath}/client/group/getGroup/${group?._id}`);
      setGroup(newGroup.data);
      setIsFixModal(false);
      setIsProgress(false);
  } catch (err) {
      setIsProgress(false);
      if (err.response) {
          console.log(err);
      } else if (err.request) {
          setSnackWarning("サーバーとの通信がタイムアウトしました。");
          setIsErrorSnack(true);
      } else {
          console.log(err);
      }
  }
}

  const handlePopper = (e) => {
    e.preventDefault();
    if (!isPopperOpen) {
      setIsPopperOpen(true);
      setPopperAnchorEl(e.currentTarget)
    } else {
      setIsPopperOpen(false);
      setPopperAnchorEl(null);
    }
}

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
    if (!props.currentUser) {
      setIsLoginModal(true);
      return;
    }
    if (chat.length === 0 || !socket || chat.trim('') === '') return;
    socket.emit('groupChat', chat.trim(''), groupId, props.currentUser);
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

const handleJoinGroup = debounce(async () => {
  try {
    if (!props.currentUser) return;
    const response = await axios.put(`${backendAccessPath}/client/group/join/${group?._id}`, {_id: props.currentUser._id});
    setGroup(response.data);
  } catch (err) {
      if (err.response) {
          console.log(err);
      } else if (err.request) {
          setSnackWarning("サーバーとの通信がタイムアウトしました。");
          setIsErrorSnack(true);
      } else {
          console.log(err);
      }
  }
}, 250);

const handleStar = debounce(async () => {
  try {
    if (!props.currentUser) return;
    const response = await axios.put(`${backendAccessPath}/client/group/star/${group?._id}`, {_id: props.currentUser._id});
    setGroup(response.data);
  } catch (err) {
    setIsProgress(false);
      if (err.response) {
          console.log(err);
      } else if (err.request) {
          setSnackWarning("サーバーとの通信がタイムアウトしました。");
          setIsErrorSnack(true);
      } else {
          console.log(err);
      }
  }
}, 250);

useEffect(() => {
  setFixInfo({name: group?.name, subTitle: group?.subTitle, desc: group?.desc, tags: group?.tags})
}, [group]);

useEffect(() => {
  const handlePopperClose = (e) => {
      if (popperAnchorEl && !popperAnchorEl.contains(e.target) && !popperRef.current.contains(e.target)) {
          setPopperAnchorEl(null);
          setIsPopperOpen(false);
      }
  }
  document.addEventListener('click', handlePopperClose);

  return () => {
      document.removeEventListener('click', handlePopperClose);
  }
}, [popperAnchorEl]);

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
      // 要素が存在しない場合は何もしない
      if (!chatRef.current || tabValue === 1 || tabValue === 2 || tabValue === 3) return;
      // 要素のy座標のスクロール位置を最大まで下げる
      setTimeout(() => {
        if (chatRef.current && tabValue !== 1 && tabValue !== 2 && tabValue !== 3) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
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
        {props.currentUser &&
          <StyledIconButton theme={theme} onClick={handlePopper}>
            <MoreVert style={{color: "#fff"}} fontSize='small'/>
          </StyledIconButton>
        }

        {props.currentUser &&
        <Popper sx={{zIndex: 60}} open={isPopperOpen} anchorEl={popperAnchorEl} placement="bottom-start" theme={theme} ref={popperRef}>
          <StyledPopperPaper elevation={3} theme={theme}>
              {props.currentUser._id === group.owner._id && <StyledPopperItem theme={theme} onClick={() => setIsFixModal(true)} style={{color: theme.palette.text.main}}>グループを編集</StyledPopperItem>}
              {props.currentUser._id !== group.owner._id && !group.member.find(member => member._id.toString() === props.currentUser._id) && <StyledPopperItem theme={theme} onClick={handleJoinGroup} style={{color: theme.palette.text.main}}>グループに参加</StyledPopperItem>}
              {props.currentUser._id !== group.owner._id && group.member.find(member => member._id.toString() === props.currentUser._id) && <StyledPopperItem theme={theme} onClick={handleJoinGroup} style={{color: theme.palette.text.error}}>グループを離脱</StyledPopperItem>}
              <StyledPopperItem theme={theme} onClick={handleStar} style={{color: theme.palette.text.main}}>{group.starUser.includes(props.currentUser._id) ? "お気に入り解除" : "お気に入り"}</StyledPopperItem>
          </StyledPopperPaper>
        </Popper>
        }
      </StyledBox>

      <Grid container>

        <StyledGrid theme={theme} height={isSmallScreen ? "fit-content" : "calc(100vh - 55px)" } item xs={12} sm={12} md={6} lg={6} xl={6} style={{position: "stickey", top: "55px", overflowY: isSmallScreen ? "visible" : "scroll", overflowX: "hidden"}}>

          <StyledGroupHeader theme={theme} backHeader={`${backendAccessPath}/uploads/groupHeaders/${group.header ? group.header : null}`}></StyledGroupHeader>

            <Box width="90%" margin="0 auto" display="flex" flexDirection="column" borderBottom={`solid 1px ${theme.palette.line.disable}`}>
              <Box display="flex" alignItems="center" width="100%" padding="30px 0" gap="25px">
                <StyledAvatarZone>
                  <Avatar variant='square' src={group.icon ? `${backendAccessPath}/uploads/groupIcons/${group.icon}` : `${siteAssetsPath}/default_group_icons/${group.defaultIcon}`} sx={{width: "100%", height: "100%"}}/>
                </StyledAvatarZone>
                <Box display="flex" flexDirection="column" gap="10px" width="80%">
                  <Typography sx={{wordBreak: "break-all"}} variant='h5' color={theme.palette.text.main}>{group.name}</Typography>
                  <Typography sx={{wordBreak: "break-all"}} variant='body1' color={theme.palette.text.sub}>{group.subTitle}</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="end" gap="20px" paddingBottom="5px" color={theme.palette.text.main}>
                <Chat style={{color: theme.palette.icon.comment, cursor: "pointer"}} onClick={() => setTabValue(0)}/>
                <Box display="flex" gap="2px" sx={{cursor: "pointer"}} onClick={() => setTabValue(1)}><People style={{color: theme.palette.icon.comment}} fontSize='small'/><div>{formatNumber(group.member.length)}</div></Box>
                <Box display="flex" gap="2px" sx={{cursor: "pointer"}} onClick={() => setTabValue(2)}><Inventory style={{color: theme.palette.icon.inventory}} fontSize='small'/><div>{formatNumber(group.products.length)}</div></Box>
                <Box display="flex" gap="2px" sx={{cursor: "pointer"}} onClick={handleStar}>{group.starUser.includes(props.currentUser?._id) ? <Star style={{color: theme.palette.icon.star}} fontSize='small'/> : <StarBorder style={{color: theme.palette.text.sub}} fontSize='small'/>}<div>{formatNumber(group.starUser.length)}</div></Box>
                <LiveTv style={{color: theme.palette.broadcast.main, cursor: "pointer", paddingBottom: "3px"}} onClick={() => setTabValue(3)}/>
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
                <Typography sx={{wordBreak: "break-all", display: "flex", alignItems: "center"}} variant='body2' color={theme.palette.text.sub}>オーナー： {returnBadgeName(group.owner)}</Typography>
              </Box>
            </Box>
        </StyledGrid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box width="100%" margin="0 auto">
          <StyledTabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} indicatorColor='secondary' theme={theme}>
            <StyledTab theme={theme} label="タイムライン"></StyledTab>
            <StyledTab theme={theme} label="メンバー"></StyledTab>
            <StyledTab theme={theme} label="商品"></StyledTab>
            <StyledTab theme={theme} label="配信"></StyledTab>
          </StyledTabs>
          <StyledScrollBox theme={theme} ref={chatRef} onScroll={handleChatScroll} height={isSmallScreen ? "fit-content" : tabValue === 0 ? chatHeight : "calc(100vh - 105px)"} style={{overflowY: isSmallScreen ? "scroll" : "scroll", overflowX: "hidden"}}>
            {tabValue === 0 && <TimeLine chatRef={chatRef} handleChatScroll={handleChatScroll} group={group} currentUser={props.currentUser}/>}
            {tabValue === 1 && <GroupMember group={group} currentUser={props.currentUser} chatBottom={chatBottom}/>}
            {tabValue === 3 && <Broadcasts group={group} currentUser={props.currentUser}/>}
          </StyledScrollBox>
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

    {isFixModal && <GroupFixModal open={isFixModal} setOpen={setIsFixModal} group={group} fixInfo={fixInfo} setFixInfo={setFixInfo} groupError={groupError} groupHelper={groupHelper}
    
    handleNameChange={handleNameChange} handleSubTitleChange={handleSubTitleChange} handleDescChange={handleDescChange}
    handleTagAdd={handleTagAdd} handleTagDelete={handleTagDelete} handleTagInput={handleTagInput} tag={tag} handleCheck={handleCheck}

    previewHeader={previewHeader} setPreviewHeader={setPreviewHeader} originalHeader={originalHeader} setOriginalHeader={setOriginalHeader}
    binaryHeader={binaryHeader} setBinaryHeader={setBinaryHeader}
    headerCrop={headerCrop} setHeaderCrop={setHeaderCrop} headerZoom={headerZoom} setHeaderZoom={setHeaderZoom}
    originalPrevHeader={originalPrevHeader} setOriginalPrevHeader={setOriginalPrevHeader} previewPrevHeader={previewPrevHeader} setPreviewPrevHeader={setPreviewPrevHeader}
    binaryPrevHeader={binaryPrevHeader} setBinaryPrevHeader={setBinaryPrevHeader}

    previewIcon={previewIcon} setPreviewIcon={setPreviewIcon} originalIcon={originalIcon} setOriginalIcon={setOriginalIcon}
    binaryIcon={binaryIcon} setBinaryIcon={setBinaryIcon}
    iconCrop={iconCrop} setIconCrop={setIconCrop} iconZoom={iconZoom} setIconZoom={setIconZoom}
    originalPrevIcon={originalPrevIcon} setOriginalPrevIcon={setOriginalPrevIcon} previewPrevIcon={previewPrevIcon} setPreviewPrevIcon={setPreviewPrevIcon}
    binaryPrevIcon={binaryPrevIcon} setBinaryPrevIcon={setBinaryPrevIcon}
    
    isIconDelete={isIconDelete} setIsIconDelete={setIsIconDelete} isHeaderDelete={isHeaderDelete} setIsHeaderDelete={setIsHeaderDelete}/>}

    <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

    <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>

    <LoginRequiredModal open={isLoginModal} onClose={setIsLoginModal} header="ログインが必要です。" desc={"グループチャットに参加しますか？ログインしてグループに参加しましょう！"}/>
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

const StyledGrid = styled(Grid)`
  && {
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
  }

  &:hover {
      &::-webkit-scrollbar-thumb {
          background-color: ${(props) => props.theme.palette.background.scrollBar};
      }
  }
  }
`

const StyledScrollBox = styled(Box)`
  && {
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
  }

  &:hover {
      &::-webkit-scrollbar-thumb {
          background-color: ${(props) => props.theme.palette.background.scrollBar};
      }
  }
  }
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


const StyledPopperPaper = styled(Paper)`
    && {
        width: 150px;
        padding: 5px 0;
        border-radius: 10px;
        background-color: ${(props) => props.theme.palette.background.commandPop};
    }
`

const StyledPopperItem = styled.div`
    width: 95%;
    margin: 0 auto;
    padding: 7px 0 7px 3px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
    &:active {
        background-color: transparent;
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