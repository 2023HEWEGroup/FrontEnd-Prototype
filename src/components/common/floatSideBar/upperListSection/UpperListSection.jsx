import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupIcon from "@mui/icons-material/Group";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ListItem, ListItemText, Tooltip, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";

const UpperListSection = (props) => {
  const theme = useTheme();

  return (
    <>
      <SListBlock>
        <SListItem>
          <Tooltip title="ホーム" placement="right" arrow={true}>
            <SLink to={"/home"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/home"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/home" ? (
                  <SHomeIcon color="secondary" />
                ) : (
                  <SHomeOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="ホーム"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="商品" placement="right" arrow={true}>
            <SLink to={"/product"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/product"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/product" ? (
                  <SShoppingCartIcon color="secondary" />
                ) : (
                  <SShoppingCartOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="商品"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="通知" placement="right" arrow={true}>
            <SLink to={"/notify"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/notify"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/notify" ? (
                  <SNotificationsIcon color="secondary" />
                ) : (
                  <SNotificationsOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="通知"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="プロフィール" placement="right" arrow={true}>
            <SLink to={"/profile"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/profile"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/profile" ? (
                  <SAccountCircleIcon color="secondary" />
                ) : (
                  <SAccountCircleOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="プロフィール"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="フォロー中" placement="right" arrow={true}>
            <SLink to={"/following"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/following"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/following" ? (
                  <SGroupIcon color="secondary" />
                ) : (
                  <SGroupOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="フォロー中"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="グループ" placement="right" arrow={true}>
            <SLink to={"/group"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/group"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/group" ? (
                  <SFolderSharedIcon color="secondary" />
                ) : (
                  <SFolderSharedOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="グループ"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="アドミン" placement="right" arrow={true}>
            <SLink to={"/admin"}>
              <SListElements theme={theme}>
                <SDashboard theme={theme} />
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.admin }}
                  primary="アドミン"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
      </SListBlock>
    </>
  );
};

const SListItem = S(ListItem)`
    && {
        justify-content: center;
        height: 45px;
        width: 230px;
        padding: 0;
    }
`;

const SListItemText = S(ListItemText)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

const SListBlock = styled.div`
    padding 15px 0;

    &:nth-child(1) {
        padding-top: 0;
    }
`;

const SLink = S(Link)`
    && {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #000;
        text-decoration: none;
    }
`;

const SListElements = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 100%;
  width: 95%;
  padding-left: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.background.hover};
  }
`;

const SHomeIcon = S(HomeIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SHomeOutlinedIcon = S(HomeOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SShoppingCartIcon = S(ShoppingCartIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SShoppingCartOutlinedIcon = S(ShoppingCartOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SGroupIcon = S(GroupIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SGroupOutlinedIcon = S(GroupOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SFolderSharedIcon = S(FolderSharedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SFolderSharedOutlinedIcon = S(FolderSharedOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SNotificationsIcon = S(NotificationsIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SNotificationsOutlinedIcon = S(NotificationsOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SAccountCircleIcon = S(AccountCircleIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SAccountCircleOutlinedIcon = S(AccountCircleOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SDashboard = S(Dashboard)`
    && {
        width: 25px;
        height: 25px;
        color: ${(props) => props.theme.palette.icon.admin};
    }
`;

export default UpperListSection;
