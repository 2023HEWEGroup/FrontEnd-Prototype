import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  AccountCircleOutlined,
  AdsClick,
  ArrowBack,
  AssessmentOutlined,
  CachedOutlined,
  CreditCard,
  FavoriteBorder,
  HelpOutlineOutlined,
  InfoOutlined,
  Inventory2Outlined,
  Logout,
} from "@mui/icons-material";
import { isWindowScrollable } from "../../../../../redux/features/windowScrollaleSlice";
import { useDispatch } from "react-redux";

const ProfilePopper = () => {
  const [isProfilePopperOpen, setIsProfilePopperOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const profilePopperRef = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleProfilePopper = (e) => {
    if (!isProfilePopperOpen) {
      setProfileAnchorEl(e.currentTarget);
      setIsProfilePopperOpen(true);
    } else {
      setProfileAnchorEl(null);
      setIsProfilePopperOpen(false);
    }
  };

  useEffect(() => {
    const handleProfilePopperClose = (e) => {
      if (
        profileAnchorEl &&
        !profileAnchorEl.contains(e.target) &&
        !profilePopperRef.current.contains(e.target)
      ) {
        setProfileAnchorEl(null);
        setIsProfilePopperOpen(false);
      }
    };
    document.addEventListener("click", handleProfilePopperClose);

    return () => {
      document.removeEventListener("click", handleProfilePopperClose);
    };
  }, [profileAnchorEl]);

  useEffect(() => {
    if (isProfilePopperOpen) {
      // ポッパーが展開されたときにスクロールを無効化
      dispatch(isWindowScrollable());
    } else {
      dispatch(isWindowScrollable());
    }
  }, [isProfilePopperOpen, dispatch]);

  return (
    <>
      <Tooltip title="アカウント管理" placement="bottom" arrow={true}>
        <SIconButtonRight
          size="small"
          onClick={handleProfilePopper}
          theme={theme}
        >
          {isProfilePopperOpen ? (
            <SAccountCircleOutlinedIcon color="secondary" />
          ) : (
            <SAccountCircleOutlinedIcon color="icon" />
          )}
        </SIconButtonRight>
      </Tooltip>

      <SPopper
        open={isProfilePopperOpen}
        anchorEl={profileAnchorEl}
        placement="bottom-end"
        ref={profilePopperRef}
      >
        <SProfilePopperPaper elevation={3} theme={theme}>
          <SPopperInner>
            <SLink to={"/profile"}>
              <SProfileListHeader>
                <SProfileAvatar />
                <SAccountIntro>
                  <SProfileAccountName
                    style={{ color: theme.palette.text.main }}
                  >
                    aaaaaあああああああaaあああああああああああああああああああああああああああああ
                  </SProfileAccountName>
                  <SProfileAccountId style={{ color: theme.palette.text.sub }}>
                    @xyzyxyxZZZZZZ____________
                  </SProfileAccountId>
                </SAccountIntro>
              </SProfileListHeader>
            </SLink>

            <SFollowHeader>
              <SFollowings theme={theme}>
                <Sspan theme={theme}>NaN</Sspan> フォロー
              </SFollowings>
              <SFollowers theme={theme}>
                <Sspan theme={theme}>NaN</Sspan> フォロワー
              </SFollowers>
            </SFollowHeader>

            <SProfilePointHeader>
              <SPointAmountLabel
                label="NaN ポイント"
                variant="outlined"
                color="secondary"
                clickable
              />
            </SProfilePointHeader>

            <Divider
              style={{
                borderBottom: `solid 0.25px ${theme.palette.line.main}`,
                width: "95%",
                margin: "0 auto",
              }}
            />
            <List>
              <SProfileListBlock>
                <SProfileListElements theme={theme}>
                  <FavoriteBorder color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="いいね"
                  />
                </SProfileListElements>
                <SProfileListElements theme={theme}>
                  <Inventory2Outlined color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="出品中"
                  />
                </SProfileListElements>
                <SProfileListElements theme={theme}>
                  <CachedOutlined color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="取引中"
                  />
                </SProfileListElements>
              </SProfileListBlock>
            </List>
            <Divider
              style={{
                borderBottom: `solid 0.25px ${theme.palette.line.main}`,
                width: "95%",
                margin: "0 auto",
              }}
            />
            <List>
              <SProfileListBlock>
                <SProfileListElements theme={theme}>
                  <AdsClick color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="広告"
                  />
                </SProfileListElements>
                <SProfileListElements theme={theme}>
                  <CreditCard color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="クレジットカード"
                  />
                </SProfileListElements>
                <SProfileListElements theme={theme}>
                  <AssessmentOutlined color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="ログ"
                  />
                </SProfileListElements>
              </SProfileListBlock>
            </List>
            <Divider
              style={{
                borderBottom: `solid 0.25px ${theme.palette.line.main}`,
                width: "95%",
                margin: "0 auto",
              }}
            />
            <List>
              <SProfileListBlock>
                <SProfileListElements theme={theme}>
                  <InfoOutlined color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="インフォメーション"
                  />
                </SProfileListElements>
                <SProfileListElements theme={theme}>
                  <HelpOutlineOutlined color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="ヘルプ"
                  />
                </SProfileListElements>
                <SLink to={"/"}>
                  <SProfileListElements theme={theme}>
                    <ArrowBack color="icon" />
                    <ListItemText
                      primaryTypographyProps={{
                        color: theme.palette.text.main,
                      }}
                      primary="トップページ"
                    />
                  </SProfileListElements>
                </SLink>
                <SProfileListElements theme={theme}>
                  <Logout color="icon" />
                  <ListItemText
                    primaryTypographyProps={{ color: theme.palette.text.main }}
                    primary="ログアウト"
                  />
                </SProfileListElements>
              </SProfileListBlock>
            </List>
          </SPopperInner>
        </SProfilePopperPaper>
      </SPopper>
    </>
  );
};

const SIconButtonRight = S(IconButton)`
  && {
    margin-right: -10px;

    .MuiTouchRipple-child {
      background-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

const SAccountCircleOutlinedIcon = S(AccountCircleOutlined)`
  && {
    width: 35px;
    height: 35px;
  }
`;

const SPopper = S(Popper)`
  && {
    z-index: 200;
  }
`;

const SProfilePopperPaper = S(Paper)`
  && {
    width: 325px;
    max-height: calc(100vh - 55px);
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 15px;
    background-color: ${(props) => props.theme.palette.background.pop};

    &::-webkit-scrollbar {
      display: none;
    }

    &:hover {
      &::-webkit-scrollbar {
        display: inline;
      }
    }
  }
`;

const SPopperInner = S.div`
  width: 315px;
  height: 100%;
`;

const SProfileListHeader = S.div`
  && {
    display: flex;
    gap: 15px;
    align-items: center;
    width: 95%;
    margin: 0 auto;
    padding: 20px 10px 5px 10px;
  }
`;

const SProfileAvatar = S(Avatar)`
  && {
    width: 45px;
    height: 45px;
  }
`;

const SAccountIntro = S.div`
  width: calc(100% - 45px);
`;

const SProfileAccountName = S.div`
  font-weight: bold;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SProfileAccountId = S.div`
  font-weight: bold;
  font-size: 0.9rem;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SFollowHeader = S.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  width: 85%;
  margin: 10px auto;
`;

const SFollowings = S.div`
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
`;

const SFollowers = S.div`
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
`;

const Sspan = S.span`
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

const SProfilePointHeader = S.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 10px;
`;

const SPointAmountLabel = S(Chip)`
  && {
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

const SProfileListBlock = S.div`
  width: 95%;
  margin: 0 auto;
`;

const SLink = S(Link)`
  && {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

const SProfileListElements = S.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  height: 45px;
  width: 100%;
  border-radius: 10px;
  color: ${(props) => props.theme.palette.text.main};

  &:hover {
    background-color: ${(props) => props.theme.palette.background.hover};
  }
`;

export default ProfilePopper;
