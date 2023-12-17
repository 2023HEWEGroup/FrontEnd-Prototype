import { ArrowForwardIos, ExitToApp, Shop } from '@mui/icons-material'
import { Avatar, Card, CardHeader, Chip, Grid, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setWindowScrollable } from '../redux/features/windowScrollaleSlice'
import TopModal from '../components/top/topModal/TopModal'
import IsProgress from '../components/common/isProgress/IsProgress'
// import particle from "../layouts/particles/topParticles.json"
// import Particles from 'react-tsparticles'
import VerifiedBadge from '../layouts/badges/VerifiedBadge'
import TopBack from '../components/top/topBack/TopBack'
import { useGlitch } from 'react-powerglitch'


const Top = () => {

  const location = useLocation();
  const glitch = useGlitch();
  const searchParams = new URLSearchParams(location.search);
  const recommend = searchParams.get('recommend');
  const back = searchParams.get('back');
  const [isTopModalOpen, setIsTopModalOpen] = useState(recommend === "true" ? true : false);
  const [isRequesting, setIsRequesting] = useState(false);
  const user = useSelector((state) => state.user.value);
  const isScrollable = useSelector((state => state.windowScrollable.value));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;

  const UserBadge = () => {
    return (
      <div style={{display: "flex", alignItems: "center", gap: "2px"}}>
        {user ? (
          user.isAuthorized ? (
            <>
              <VerifiedBadge fontSize="small"/>
              <span>{user.username}</span>
            </>
          ) : (
            <span>{user.username}</span>
          )
        )
        :
        (
          <>
            <span>ログイン</span>
          </>
        )
        }
      </div>
    );
  };

  // // 読み込み時に背景パーティクルをユーザーのテーマに変更、なければJSONデフォルトの色を適応
  // useEffect(() => {
  //   if (user) {
  //     particle.particles.color = theme.palette.particle.top;
  //     particle.particles.links.color = theme.palette.particle.top;
  //   }
  // }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTopModalOpen = () => {
    setIsTopModalOpen(true);
  }

  const handleTopModalClose = () => {
    setIsTopModalOpen(false);
    if (recommend === "true") {
      navigate(back);
    }
  }

  const handleIsLogin = () => {
    if (!user) {
      setIsTopModalOpen(true);
    }
  }

  useEffect(() => {
    glitch.setOptions({
      playMode: "hover"
    },)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 同様にスクロール可否を問う。Poppr展開中に遷移した場合ポッパーは遷移に伴って強制的にデフォルトの閉じ状態になる(正式な閉じる手順を踏まない)
  // ため、ページマウント時にスクロールをuseEffectで可能とセットして、もう一つのseEffectでスクロール状態をdispatchする。
  // ページマウント時は必ずスクロール可能とする
  useEffect(() => {
    dispatch(setWindowScrollable(true));
  }, [dispatch])

  useEffect(() => {
    if (!isScrollable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isScrollable]);

  useEffect(() => {
    // Topページがマウントされたときに限定して背景部分の色を変更する
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        background-color: ${theme.palette.background.top};
      }
    `;
    document.head.appendChild(style);
    // コンポーネントのアンマウント時にスタイルを元に戻す
    return () => {
      document.head.removeChild(style);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <StyledFullScrean>
      <StyledTopHeader>
        <Link to={"/home"} style={{ display: 'inline-flex'}} ref={glitch.ref}>
          <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo_reversal.svg`} alt='LMAPロゴ' />
        </Link>
        <StyledAccountHeader>
          <StyledCard theme={theme} elevation={0}>
            <Link to={user ? `/user/${user._id}` : "#"} style={{textDecoration: "none"}} onClick={handleIsLogin}>
                <StyledCardHeader sx={{display: "flex", overflow: "hidden", "& .MuiCardHeader-content": {overflow: "hidden"}}} avatar={<Avatar sx={{ width: 40, height: 40 }} src={user ? user.icon ? `http://localhost:5000/uploads/userIcons/$user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}` : null}/>}
                title={UserBadge()} titleTypographyProps={{ noWrap: true, color: theme.palette.text.main2, fontSize: "1.1rem"}} action={<ArrowForwardIos style={{color: theme.palette.icon.main}}/>}
                subheader={user ? "@"+user.userId : "@aaaa"} subheaderTypographyProps={{ noWrap: true, color: theme.palette.text.sub}}>
                </StyledCardHeader>
            </Link>
          </StyledCard>
        </StyledAccountHeader>
      </StyledTopHeader>

      <StyledWelcomeZone $isSmallScreen={isSmallScreen}>
        <StyledWelcomeMessage $isSmallScreen={isSmallScreen} theme={theme}>Welcome<br/>To The<br/>LMAP</StyledWelcomeMessage>
        <StyledButtons $isSmallScreen={isSmallScreen}>
          <StyledLink to={"/home"}>
            <StyledGoToShopLabel ref={glitch.ref} theme={theme} icon={<Shop style={{color: theme.palette.top.secondary}}/>} label="ショップを見てみる" clickable/>
          </StyledLink>
          <StyledLoginLabel ref={glitch.ref} theme={theme} icon={<ExitToApp style={{color: theme.palette.top.main}}/>} label="アカウント" clickable onClick={handleTopModalOpen}/>
        </StyledButtons>
      </StyledWelcomeZone>

        <TopModal isTopModalOpen={isTopModalOpen} setIsTopModalOpen={setIsTopModalOpen} handleTopModalClose={handleTopModalClose} isRequesting={isRequesting} setIsRequesting={setIsRequesting}/>

        <IsProgress isProgress={isRequesting} style={{zIndex: 9000}}/>

        <TopBack />

    </StyledFullScrean>

    {/* <Particles options={particle}/> */}

    </>
  )
}


const StyledFullScrean = styled.div`
  z-index: 10;
  width: 100%;
  max-width: 2000px;
  height: 100%;
  margin: 0 auto;
`

const StyledTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
`

const StyledLmapLogo = styled.img`
    width: 150px;
    margin-left: 15px;
    cursor: pointer;
`;

const StyledAccountHeader = styled.div`
  height: 100%;
  width: 300px;
`

const StyledCard = styled(Card)`
  && {
    background-color: transparent;
    height: 100%;
    width: 100%;
    padding-left: 5%;
  }
`

const StyledCardHeader = styled(CardHeader)`
  && {
    height: 100%;
  }
`

const StyledWelcomeZone = styled.div`
  display: ${(props) => props.$isSmallScreen ? "flex" : "block"};
  align-items: ${(props) => props.$isSmallScreen ? "center" : "normal"};
  flex-direction: ${(props) => props.$isSmallScreen ? "column" : "row"};
  width: 100%;
  height: calc(100% - 55px);
  margin-top: 55px;
  padding: ${(props) => props.$isSmallScreen ? "100px 0 0 0" : "100px 0 0 100px"};
`

const StyledWelcomeMessage = styled.div`
  text-align: ${(props) => props.$isSmallScreen ? "center" : "left"};
  line-height: 1.2;
  font-size: 5.5rem;
  font-weight: bold;
  font-family: 'Michroma', sans-serif;
  color: ${(props) => props.theme.palette.top.title};
  user-select: none;
  width: ${(props) => props.$isSmallScreen ? "95%" : "fit-content"};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: ${(props) => props.$isSmallScreen ? "center" : "normal"};
  flex-direction: ${(props) => props.$isSmallScreen ? "column" : "row"};
  gap: ${(props) => props.$isSmallScreen ? "15px" : "25px"};
  width: ${(props) => props.$isSmallScreen ? "95%" : "fit-content"};
  margin: ${(props) => props.$isSmallScreen ? "75px auto 0 auto" : "75px 0"};
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
    background-color: ${(props => props.theme.palette.top.tabHover)};
    &:hover {
      background-color: ${(props => props.theme.palette.top.tabHover)};
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
    background-color: ${(props => props.theme.palette.top.tabHover)};
    &:hover {
      background-color: ${(props => props.theme.palette.top.tabHover)};
    }
  }
`


export default Top