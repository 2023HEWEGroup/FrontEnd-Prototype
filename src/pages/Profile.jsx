import { ContentCopy, MoreVert, Notifications } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Chip,
  Grid,
  Hidden,
  IconButton,
  Slide,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};

const Profile = () => {
  const [isLinkSnack, setIsLinkSnack] = useState(false);
  const [isFollowSnack, setIsFollowSnack] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();

  const handleLinkCopy = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setIsLinkSnack(!isLinkSnack);
      });
    }
  };

  const handleFollowSnack = () => {
    setIsFollowSnack(true);
  };

  const handleLinkSnackClose = () => {
    setIsLinkSnack(false);
  };

  const handleFollowSnackClose = () => {
    setIsFollowSnack(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <SProfile $isSmallScreen={isSmallScreen}>
        <SHeaderZone
          backHeader={`${siteAssetsPath}/tanoc_header.png`}
          theme={theme}
        >
          <SButtons $isSmallScreen={isSmallScreen}>
            <Tooltip title="リンクコピー" placement="top" arrow={true}>
              <SIconButton theme={theme} onClick={handleLinkCopy}>
                <ContentCopy />
              </SIconButton>
            </Tooltip>
            <Tooltip title="その他" placement="top" arrow={true}>
              <SIconButton theme={theme}>
                <MoreVert />
              </SIconButton>
            </Tooltip>
          </SButtons>
        </SHeaderZone>

        <SUserInfo $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
          <Grid container>
            <Hidden only={["xs"]}>
              <SUserGridItemLeft
                item
                xs={0}
                sm={2}
                md={2}
                $isXsScreen={isXsScreen}
              >
                <SAvatar
                  src={`${siteAssetsPath}/tanoc_icon.png`}
                  $isSmallScreen={isSmallScreen}
                />
              </SUserGridItemLeft>
            </Hidden>
            <SUserGridItemCenter
              item
              xs={6}
              sm={5}
              md={6}
              $isXsScreen={isXsScreen}
            >
              <SNameAndId>
                <SUsername theme={theme} $isSmallScreen={isSmallScreen}>
                  HARDCORE TANO*C
                </SUsername>
                <SUserId theme={theme} $isSmallScreen={isSmallScreen}>
                  @tanoc_net
                </SUserId>
              </SNameAndId>
            </SUserGridItemCenter>
            <SUserGridItemRight
              item
              xs={6}
              sm={5}
              md={4}
              $isXsScreen={isXsScreen}
            >
              <SFollowAndNotify>
                <Tooltip title="フォローする" placement="top" arrow={true}>
                  <SFollowTab
                    label="フォロー"
                    variant="outlined"
                    color="secondary"
                    clickable
                    onClick={handleFollowSnack}
                  />
                </Tooltip>
                <Tooltip title="通知" placement="top" arrow={true}>
                  <SNotifyIconButton theme={theme}>
                    <Notifications />
                  </SNotifyIconButton>
                </Tooltip>
              </SFollowAndNotify>
            </SUserGridItemRight>
          </Grid>
        </SUserInfo>

        <SUserInfoBar $isXsScreen={isXsScreen}>
          <Grid container>
            <Hidden only={["xs"]}>
              <Grid item xs={0} sm={2}></Grid>
            </Hidden>
            <SStatusGrid item xs={12} sm={10}>
              <SStatus theme={theme}>
                <SSpan theme={theme}>NaN</SSpan> フォロー
              </SStatus>
              <SStatus theme={theme}>
                <SSpan theme={theme}>NaN</SSpan> フォロワー
              </SStatus>
            </SStatusGrid>
          </Grid>
        </SUserInfoBar>

        <STabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          theme={theme}
        >
          <Tooltip title="ユーザー" placement="top" arrow>
            <STab theme={theme} label="ユーザー"></STab>
          </Tooltip>
          <Tooltip title="商品" placement="top" arrow>
            <STab theme={theme} label="商品"></STab>
          </Tooltip>
          <Tooltip title="グループ" placement="top" arrow>
            <STab theme={theme} label="グループ"></STab>
          </Tooltip>
          <Tooltip title="いいね" placement="top" arrow>
            <STab theme={theme} label="いいね"></STab>
          </Tooltip>
        </STabs>
      </SProfile>

      <Snackbar
        open={isLinkSnack}
        onClose={handleLinkSnackClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
      >
        <Alert severity="success">リンクをコピーしました</Alert>
      </Snackbar>
      <Snackbar
        open={isFollowSnack}
        onClose={handleFollowSnackClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={10000}
      >
        <Alert severity="info">username さんをフォローしました</Alert>
      </Snackbar>
    </>
  );
};

const SProfile = S.div`
  width: ${(props) => (props.$isSmallScreen ? "100%" : "90%")};
  max-width: 3000px;
  height: 2000px;
  margin: 0 auto;
`;

const SHeaderZone = S.div`
  position: relative;
  aspect-ratio: 6/1;
  width: 100%;
  background-image: url(${(props) => props.backHeader});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.palette.background.pop};
`;

const SButtons = S.div`
  position: absolute;
  bottom: ${(props) => (props.$isSmallScreen ? 0 : "15px")};
  right: ${(props) => (props.$isSmallScreen ? 0 : "15px")};
  display: flex;
  gap: 15px;
  width: fit-content;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const SIconButton = S(IconButton)`
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
`;

const SUserInfo = S.div`
  width: 100%;
  height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  margin: ${(props) => (props.$isSmallScreen ? "15px" : "30px")} auto 0 auto;
`;

const SUserGridItemLeft = S(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  }
`;

const SUserGridItemCenter = S(Grid)`
  && {
    display: flex;
    justify-content: start;
    align-items: center;
    height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  }
`;

const SUserGridItemRight = S(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.$isXsScreen ? "100px" : "150px")};
  }
`;

const SAvatar = S(Avatar)`
  && {
    height: ${(props) => (props.$isSmallScreen ? "100px" : "130px")};
    width: ${(props) => (props.$isSmallScreen ? "100px" : "130px")};
  }
`;

const SNameAndId = S.div`
  height: fit-content;
  width: 100%;
  padding: 30px;
  margin: 0 auto;
`;

const SUsername = S.div`
  font-size: ${(props) => (props.$isSmallScreen ? "1.5rem" : "1.7rem")};
  color: ${(props) => props.theme.palette.text.main};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SUserId = S.div`
  font-size: ${(props) => (props.$isSmallScreen ? "1.2rem" : "1.4rem")};
  color: ${(props) => props.theme.palette.text.sub};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SFollowAndNotify = S.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
  width: 100%;
`;

const SFollowTab = S(Chip)`
  && {
    width: 200px;
    height: 50px;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const SNotifyIconButton = S(IconButton)`
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
`;

const SUserInfoBar = S.div`
  width: 100%;
  height: fit-content;
  margin: ${(props) => (props.$isXsScreen ? "20px" : 0)} auto;
`;

const SStatusGrid = S(Grid)`
  && {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    padding: 0 30px;
  }
`;

const SStatus = S.div`
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
`;

const SSpan = S.span`
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
    &:active {
        text-decoration: none;
    }
`;

const STabs = S(Tabs)`
    && {
      width: 100%;
      margin: 30px auto 0 auto;
      .MuiTabs-indicator {
        bottom: 0;
      }
    }
`;

const STab = S(Tab)`
    && {
      flex: 1 1 0;
      max-width: 25%;
      color: ${(props) => props.theme.palette.text.tab};
      border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};

      &.Mui-selected {
        color: ${(props) => props.theme.palette.text.main};
      }
    }
`;

export default Profile;
