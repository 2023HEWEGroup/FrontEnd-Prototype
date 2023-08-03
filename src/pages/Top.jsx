import { ExitToApp, HighlightOff, OpenInNew, Shop } from '@mui/icons-material'
import { AppBar, Button, Chip, Grid, Modal, TextField, Toolbar, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { LoadingButton } from "@mui/lab"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setWindowScrollable } from '../redux/features/windowScrollaleSlice'


const Top = () => {

  const [isTopModalOpen, setIsTopModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isUserIdLogin, setIsUserIdLogin] = useState(true);
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isScrollable = useSelector((state => state.windowScrollable.value));
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleTopModalOpen = () => {
    setIsTopModalOpen(true);
  }

  const handleTopModalClose = () => {
    setIsTopModalOpen(false);
  }

  const handleUserIdLogin = () => {
    setIsUserIdLogin(!isUserIdLogin);
  }

  const handleUserIdInput = (e) => {
    setUserId(e.target.value);
  }

  const handleMailAddressInput = (e) => {
    setMailAddress(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }

  // トップページでもCommonLayout同様、スクロール可否を問う。
  useEffect(() => {
    if ((isSmallScreen && isSideOpen) || (!isScrollable)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSmallScreen, isSideOpen, isScrollable]);

  useEffect(() => {
    // Topページがマウントされたときに限定してスクロールバーのトラック部分の色を変更する
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        background-color: #000;
      }
    `;
    document.head.appendChild(style);
    // コンポーネントのアンマウント時にスタイルを元に戻す
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // トップページマウント時は必ずスクロール可能とする
  useEffect(() => {
    dispatch(setWindowScrollable(true));
  }, [dispatch])

  return (
    <StyledFullScrean>
      <StyledAppBar>
        <Toolbar>
          
        </Toolbar>
      </StyledAppBar>
        <StyledGridContainer container>
          <StyledGridItem item xs={12} sm={12} md={12} lg={6}>
            <StyledWelcomeZone>
              <StyledWelcomeMessage theme={theme}>Welcome<br/>To The<br/>LMAP</StyledWelcomeMessage>
              <StyledButtons>
                <StyledLink to={"/home"}>
                  <StyledGoToShopLabel theme={theme} icon={<Shop style={{color: theme.palette.top.secondary}}/>} label="ショップを見てみる" clickable/>
                </StyledLink>
                <StyledLoginLabel theme={theme} icon={<ExitToApp style={{color: theme.palette.top.main}}/>} label="アカウント" clickable onClick={handleTopModalOpen}/>
              </StyledButtons>
            </StyledWelcomeZone>
          </StyledGridItem>
          <StyledGridItem item xs={12} sm={12} md={12} lg={6}>
          </StyledGridItem>
        </StyledGridContainer>

        <Modal open={isTopModalOpen} keepMounted>
          <StyledTopModalInner>
            <Tooltip title="閉じる" placement='top'>
              <StyledHighlightOff onClick={handleTopModalClose}/>
            </Tooltip>
            <Styledform noValidate>
              <StyledModalIntro>
                マーケットにログインしましょう
              </StyledModalIntro>
              {isUserIdLogin ? 
              <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="ユーザーID (3~20字)"
                autoComplete='off' variant='outlined' inputProps={{maxLength: 20}} value={userId} onChange={handleUserIdInput}/>
              :
              <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="メールアドレス (3~20字)"
                autoComplete='off' variant='outlined' value={mailAddress} onChange={handleMailAddressInput}/>
              }
              <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="パスワード (8~20字)"
                autoComplete='off' variant='outlined' type='password' inputProps={{maxLength: 20}} onChange={handlePasswordInput}/>
              <div style={{width: "100%"}}>
                <StyledOptionChange onClick={handleUserIdLogin}>または{isUserIdLogin ? "メールアドレス" : "ユーザーID"}でログインする</StyledOptionChange>
              </div>
              <LoadingButton color='top' fullWidth type='submit' variant='outlined'>ログイン</LoadingButton>
              <Button color='top'>アカウントをお持ちではありませんか？<OpenInNew style={{marginLeft: "5px"}}/>新規登録</Button>
            </Styledform>
          </StyledTopModalInner>
        </Modal>
    </StyledFullScrean>
  )
}


const StyledFullScrean = styled.div`
  width: 100vw;
  height: 100vh;
`

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #222;
    height: 55px;
  }
`

const StyledGridContainer = styled(Grid)`
  && {
    margin-top: 55px;
    padding: 100px 0;
  }
`

const StyledGridItem = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledWelcomeZone = styled.div`
  width: 80%;
`

const StyledWelcomeMessage = styled.div`
  text-align: left;
  line-height: 1.2;
  font-size: 5.5rem;
  font-weight: bold;
  font-family: 'Michroma', sans-serif;

  display: inline-block;
  background: linear-gradient(90deg, ${(props => props.theme.palette.top.titleGradation)});
  background: -webkit-linear-gradient(0deg, ${(props => props.theme.palette.top.titleGradation)});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledButtons = styled.div`
  display: flex;
  gap: 25px;
  width: fit-content;
  margin-top: 75px;
`

const StyledLink = styled(Link)`
  && {
    text-decoration: none;
  }
`

const StyledGoToShopLabel = styled(Chip)`
  && {
    height: 50px;
    padding: 0 25px;
    color: ${(props => props.theme.palette.top.secondary)};
    border: solid 2px ${(props => props.theme.palette.top.secondary)};
    border-radius: 25px;
    &:hover {
      background-color: ${(props => props.theme.palette.top.secondaryHover)};
    }
  }
`

const StyledLoginLabel = styled(Chip)`
  && {
    height: 50px;
    padding: 0 25px;
    color: ${(props => props.theme.palette.top.main)};
    border: solid 2px ${(props => props.theme.palette.top.main)};
    border-radius: 25px;
    &:hover {
      background-color: ${(props => props.theme.palette.top.mainHover)};
    }
  }
`

const StyledTopModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  min-width: 400px;
  height: 550px;
  border-radius: 15px;
  border: solid 1px #444;
  background-color: #111;
`

const StyledHighlightOff = styled(HighlightOff)`
  && {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 35px;
    height: 35px;
    color: #444;
    cursor: pointer;
  }
`

const Styledform = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`

const StyledModalIntro = styled.div`
  margin-bottom: 60px;
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  font-weight: bold;
`

const StyledTextField = styled(TextField)(({ theme }) => ({

  '& .MuiInputBase-input': {
    color: '#777', // 入力文字の色
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#777', // 通常時のボーダー色(アウトライン)
    },
    '&:hover:not(.Mui-disabled) fieldset': {
      borderColor: '#777', // 非フォーカス時のホバー時のボーダー色(アウトライン)
    },
    '&.Mui-focused:hover fieldset': {
      borderColor: theme.palette.top.main, // フォーカス時にホバーしたときのボーダー色(アウトライン)
    },
    '&:focus-within fieldset': {
      borderColor: theme.palette.top.main, // フォーカス時のボーダー色(アウトライン)
    },
  },
  '& .MuiInputLabel-root': {
    color: '#777', // ラベルの通常時の色
    '&.Mui-focused': {
      color: theme.palette.top.main, // フォーカス時のラベルの色
    },
  },
}));

const StyledOptionChange = styled.div`
  margin-bottom: 15px;
  width: fit-content;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
  }
`


export default Top