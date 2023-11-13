import { ExitToApp, Shop } from '@mui/icons-material'
import { AppBar, Chip, Grid, Toolbar, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { setWindowScrollable } from '../redux/features/windowScrollaleSlice'
import TopModal from '../components/top/topModal/TopModal'
import IsProgress from '../components/common/isProgress/IsProgress'


const Top = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const recommend = searchParams.get('recommend');
  const [isTopModalOpen, setIsTopModalOpen] = useState(recommend === "true" ? true : false);
  const [isRequesting, setIsRequesting] = useState(false);
  const isScrollable = useSelector((state => state.windowScrollable.value));
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleTopModalOpen = () => {
    setIsTopModalOpen(true);
  }

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

        <TopModal isTopModalOpen={isTopModalOpen} setIsTopModalOpen={setIsTopModalOpen} isRequesting={isRequesting} setIsRequesting={setIsRequesting}/>

        <IsProgress isProgress={isRequesting} style={{zIndex: 9000}}/>
        
    </StyledFullScrean>
  )
}


const StyledFullScrean = styled.div`
  width: 100vw;
  height: 2000px;
  overflow-y: scroll;
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


export default Top