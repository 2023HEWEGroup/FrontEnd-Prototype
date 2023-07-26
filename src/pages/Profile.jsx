import { ContentCopy, MoreVert, Notifications } from '@mui/icons-material';
import { Alert, Avatar, Chip, Grid, Hidden, IconButton, Slide, Snackbar, Tab, Tabs, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'


const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};


const Profile = () => {

  const [isLinkSnack, setIsLinkSnack] = useState(false);
  const [isFollowSnack, setIsFollowSnack] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const handleLinkCopy = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setIsLinkSnack(!isLinkSnack);
      })
    }
  }

  const handleFollowSnack = () => {
    setIsFollowSnack(true);
  }

  const handleLinkSnackClose = () => {
    setIsLinkSnack(false)
  };

  const handleFollowSnackClose = () => {
    setIsFollowSnack(false);
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
    <StyledProfile>
      <StyledHeaderZone backHeader={`${siteAssetsPath}/tanoc_header.png`} theme={theme}>
        <StyledButtons $isSmallScreen={isSmallScreen}>
          <Tooltip title="リンクコピー" placement='top' arrow={true}>
            <StyledIconButton theme={theme} onClick={handleLinkCopy}>
              <ContentCopy />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="その他" placement='top' arrow={true}>
            <StyledIconButton theme={theme}>
              <MoreVert />
            </StyledIconButton>
          </Tooltip>
        </StyledButtons>
      </StyledHeaderZone>

      <StyledUserInfo $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
        <Grid container>
          <Hidden only={["xs"]}>
            <StyledUserGridItemLeft item xs={0} sm={2} md={2} $isXsScreen={isXsScreen}>
              <StyledAvatar src={`${siteAssetsPath}/tanoc_icon.png`} $isSmallScreen={isSmallScreen}/>
            </StyledUserGridItemLeft>
          </Hidden>
          <StyledUserGridItemCenter item xs={6} sm={5} md={6} $isXsScreen={isXsScreen}>
            <StyledNameAndId>
              <StyledUsername theme={theme} $isSmallScreen={isSmallScreen}>HARDCORE TANO*C</StyledUsername>
              <StyledUserId theme={theme} $isSmallScreen={isSmallScreen}>@tanoc_net</StyledUserId>
            </StyledNameAndId>
          </StyledUserGridItemCenter>
          <StyledUserGridItemRight item xs={6} sm={5} md={4} $isXsScreen={isXsScreen}>
            <StyledFollowAndNotify>
              <Tooltip title="フォローする" placement='top' arrow={true}>
                <StyledFollowTab label="フォロー" variant="outlined" color="secondary" clickable onClick={handleFollowSnack}/>
              </Tooltip>
              <Tooltip title="通知" placement='top' arrow={true}>
                <StyledNotifyIconButton theme={theme}>
                  <Notifications />
                </StyledNotifyIconButton>
              </Tooltip>
            </StyledFollowAndNotify>
          </StyledUserGridItemRight>
        </Grid>
      </StyledUserInfo>

      <StyledUserInfoBar $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
        <Grid container>
          <Hidden only={["xs"]}>
            <Grid item xs={0} sm={2}></Grid>
          </Hidden>
          <StyledStatusGrid item xs={12} sm={10}>
          <StyledStatus theme={theme}><StyledSpan theme={theme}>NaN</StyledSpan> フォロー</StyledStatus>
          <StyledStatus theme={theme}><StyledSpan theme={theme}>NaN</StyledSpan> フォロワー</StyledStatus>
          </StyledStatusGrid>
        </Grid>
      </StyledUserInfoBar>

      <StyledTabs value={tabValue} onChange={handleTabChange} indicatorColor='secondary' $isSmallScreen={isSmallScreen} theme={theme}>
        <Tooltip title="ユーザー" placement='top' arrow><StyledTab theme={theme} label="ユーザー"></StyledTab></Tooltip>
        <Tooltip title="商品" placement='top' arrow><StyledTab theme={theme} label="商品"></StyledTab></Tooltip>
        <Tooltip title="グループ" placement='top' arrow><StyledTab theme={theme} label="グループ"></StyledTab></Tooltip>
        <Tooltip title="いいね" placement='top' arrow><StyledTab theme={theme} label="いいね"></StyledTab></Tooltip>
      </StyledTabs>
    </StyledProfile>

    <Snackbar open={isLinkSnack} onClose={handleLinkSnackClose} TransitionComponent={SlideTransition} autoHideDuration={3000}>
      <Alert severity='success'>リンクをコピーしました</Alert>
    </Snackbar>
    <Snackbar open={isFollowSnack} onClose={handleFollowSnackClose} TransitionComponent={SlideTransition} autoHideDuration={10000}>
      <Alert severity='info'>username さんをフォローしました</Alert>
    </Snackbar>
    </>
  )
}


const StyledProfile = styled.div`
  width: 100%;
  height: 2000px;
`

const StyledHeaderZone = styled.div`
  position: relative;
  aspect-ratio: 6/1;
  width: 100%;
  background-image: url(${(props => props.backHeader)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.palette.background.pop};
`

const StyledButtons = styled.div`
  position: absolute;
  bottom: ${(props) => (props.$isSmallScreen ? 0 : "15px")};
  right: ${(props) => (props.$isSmallScreen ? 0 : "15px")};
  display: flex;
  gap: 15px;
  width: fit-content;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.3);
`

const StyledIconButton = styled(IconButton)`
  && {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);

    .MuiTouchRipple-child {
      background-color: transparent;
  }

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
      background-color: rgba(255, 255, 255, 0.1);
  }
  }
`

const StyledUserInfo = styled.div`
  width: ${(props) => (props.$isSmallScreen ? "100%" : "90%")};
  height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  margin: ${(props) => (props.$isSmallScreen ? "15px" : "30px")} auto 0 auto;
`

const StyledUserGridItemLeft = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  }
`

const StyledUserGridItemCenter = styled(Grid)`
  && {
    display: flex;
    justify-content: start;
    align-items: center;
    height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  }
`

const StyledUserGridItemRight = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  }
`

const StyledAvatar = styled(Avatar)`
  && {
    height: ${(props) => (props.$isSmallScreen ? "100px" : "130px")};
    width: ${(props) => (props.$isSmallScreen ? "100px" : "130px")};
  }
`

const StyledNameAndId = styled.div`
  height: fit-content;
  width: 100%;
  padding: 30px;
  margin: 0 auto;
`

const StyledUsername = styled.div`
  font-size: ${(props) => (props.$isSmallScreen ? "1.5rem" : "1.7rem")};
  color: ${(props) => props.theme.palette.text.main};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const StyledUserId = styled.div`
  font-size: ${(props) => (props.$isSmallScreen ? "1.2rem" : "1.4rem")};
  color: ${(props) => props.theme.palette.text.sub};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledFollowAndNotify = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
  width: 100%;
`

const StyledFollowTab = styled(Chip)`
  && {
    width: 200px;
    height: 50px;
    font-size: 1rem;
    font-weight: bold;
  }
`

const StyledNotifyIconButton = styled(IconButton)`
  && {
    width: 50px;
    height: 50px;
    color: ${(props) => props.theme.palette.text.sub};
    border: solid 1px ${(props) => props.theme.palette.text.sub};
    background-color: transparent;

    &:hover {
      background-color: ${(props) => props.theme.palette.background.hover};
    }
  }
`

const StyledUserInfoBar = styled.div`
  width: ${(props) => (props.$isSmallScreen ? "100%" : "90%")};
  height: fit-content;
  margin: ${(props) => (props.$isXsScreen ? "20px" : 0)} auto;
`

const StyledStatusGrid = styled(Grid)`
  && {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    padding: 0 30px;
  }
`

const StyledStatus = styled.div`
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
    &:active {
        text-decoration: none;
    }
`

const StyledTabs = styled(Tabs)`
    && {
      width: ${(props) => (props.$isSmallScreen ? "100%" : "90%")};
      margin: 30px auto 0 auto;
      .MuiTabs-indicator {
        bottom: 0;
      }
    }
`

const StyledTab = styled(Tab)`
    && {
      width: 25%;
      color: ${(props) => props.theme.palette.text.tab};
      border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};

      &.Mui-selected {
        color: ${(props) => props.theme.palette.text.main};
      }
    }
`


export default Profile