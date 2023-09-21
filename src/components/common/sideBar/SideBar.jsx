import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import React from "react";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { Dashboard } from "@mui/icons-material";

const SideBar = (props) => {
  const theme = useTheme();

  return (
    <SSideBar style={{ backgroundColor: theme.palette.primary.main }}>
      <SSideBarCell>
        <Tooltip title="ホーム" placement="right" arrow={true}>
          <SLink to={"/home"}>
            <SSideBarElements
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
              <SIconName style={{ color: theme.palette.text.main }}>
                ホーム
              </SIconName>
            </SSideBarElements>
          </SLink>
        </Tooltip>
      </SSideBarCell>

      <SSideBarCell>
        <Tooltip title="商品" placement="right" arrow={true}>
          <SLink to={"/product"}>
            <SSideBarElements
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
              <SIconName style={{ color: theme.palette.text.main }}>
                商品
              </SIconName>
            </SSideBarElements>
          </SLink>
        </Tooltip>
      </SSideBarCell>

      <SSideBarCell>
        <Tooltip title="フォロー中" placement="right" arrow={true}>
          <SLink to={"/following"}>
            <SSideBarElements
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
              <SIconName style={{ color: theme.palette.text.main }}>
                フォロー中
              </SIconName>
            </SSideBarElements>
          </SLink>
        </Tooltip>
      </SSideBarCell>

      <SSideBarCell>
        <Tooltip title="グループ" placement="right" arrow={true}>
          <SLink to={"/group"}>
            <SSideBarElements
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
              <SIconName style={{ color: theme.palette.text.main }}>
                グループ
              </SIconName>
            </SSideBarElements>
          </SLink>
        </Tooltip>
      </SSideBarCell>

      <SSideBarCell>
        <Tooltip title="アドミン" placement="right" arrow={true}>
          <SLink to={"/admin"}>
            <SSideBarElements theme={theme}>
              <SDashboard theme={theme} />
              <SIconName style={{ color: theme.palette.text.admin }}>
                アドミン
              </SIconName>
            </SSideBarElements>
          </SLink>
        </Tooltip>
      </SSideBarCell>
    </SSideBar>
  );
};

const SSideBar = styled.div`
  z-index: 100;
  position: fixed;
  width: 75px;
  height: 100vh;
  padding: 5px;
`;

const SSideBarCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
`;

const SLink = S(Link)`
  && {
    width: 100%;
    height: 100%;
    color: #000;
    text-decoration: none;
  }
`;

const SSideBarElements = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.palette.background.hover};
  }
`;

const SHomeIcon = S(HomeIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SHomeOutlinedIcon = S(HomeOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SShoppingCartIcon = S(ShoppingCartIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;
const SShoppingCartOutlinedIcon = S(ShoppingCartOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SGroupIcon = S(GroupIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SGroupOutlinedIcon = S(GroupOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SFolderSharedIcon = S(FolderSharedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SFolderSharedOutlinedIcon = S(FolderSharedOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`;

const SDashboard = S(Dashboard)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
      color: ${(props) => props.theme.palette.icon.admin};
    }
`;

const SIconName = styled.p`
    width: 100%;
    font-size 0.7rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export default SideBar;
