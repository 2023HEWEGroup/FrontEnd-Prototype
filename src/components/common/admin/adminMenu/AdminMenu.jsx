import {
  AccountCircleOutlined,
  AdsClick,
  AttachMoney,
  CurrencyExchange,
  Dashboard,
  FolderSharedOutlined,
  HelpOutlineOutlined,
  HomeOutlined,
  InfoOutlined,
  Inventory2Outlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminMenu = (props) => {
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();

  return (
    <SMenu>
      <SItem>
        <STitle theme={theme} $isXsScreen={isXsScreen}>
          管理
        </STitle>
        <SLink
          theme={theme}
          to="/admin"
          style={{
            backgroundColor:
              props.page === "/admin" ? theme.palette.background.hover : "",
          }}
        >
          <Dashboard color={props.page === "/admin" ? "secondary" : ""} />
          <SListItemTitle $isXsScreen={isXsScreen}>管理トップ</SListItemTitle>
        </SLink>
        <SLink
          theme={theme}
          to="/admin/user"
          style={{
            backgroundColor:
              props.page === "/admin/user"
                ? theme.palette.background.hover
                : "",
          }}
        >
          <AccountCircleOutlined
            color={props.page === "/admin/user" ? "secondary" : ""}
          />
          <SListItemTitle $isXsScreen={isXsScreen}>ユーザー管理</SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <Inventory2Outlined />
          <SListItemTitle $isXsScreen={isXsScreen}>商品管理</SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <CurrencyExchange />
          <SListItemTitle $isXsScreen={isXsScreen}>取引管理</SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <FolderSharedOutlined />
          <SListItemTitle $isXsScreen={isXsScreen}>グループ管理</SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <AttachMoney />
          <SListItemTitle $isXsScreen={isXsScreen}>収益</SListItemTitle>
        </SLink>
      </SItem>
      <SItem>
        <STitle $isXsScreen={isXsScreen} theme={theme}>
          サイトコンテンツ
        </STitle>
        <SLink theme={theme} to="/home">
          <AdsClick />
          <SListItemTitle $isXsScreen={isXsScreen}>広告</SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <InfoOutlined />
          <SListItemTitle $isXsScreen={isXsScreen}>
            インフォメーション
          </SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <HelpOutlineOutlined />
          <SListItemTitle $isXsScreen={isXsScreen}>ヘルプ</SListItemTitle>
        </SLink>
      </SItem>
      <SItem>
        <STitle $isXsScreen={isXsScreen} theme={theme}>
          その他
        </STitle>
        <SLink theme={theme} to="/home">
          <HomeOutlined />
          <SListItemTitle $isXsScreen={isXsScreen}>ホーム</SListItemTitle>
        </SLink>
        <SLink theme={theme} to="/home">
          <SettingsOutlined />
          <SListItemTitle $isXsScreen={isXsScreen}>アドミン管理</SListItemTitle>
        </SLink>
      </SItem>
    </SMenu>
  );
};

const SMenu = S.div`
    width: 100%;
`;

const SItem = S.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const STitle = S.span`
    font-size: 12px;
    font-weight: 200;
    margin-bottom: 10px;
    color: ${(props) => props.theme.palette.text.sub};
    white-space: nowrap;
    ${(props) => (props.$isXsScreen ? "display: none" : null)};
`;

const SLink = S(Link)`
    && {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 5px;
        color: ${(props) => props.theme.palette.text.sub};
        text-decoration: none;

        &:hover {
            background-color: ${(props) =>
              props.theme.palette.background.hover};
        }
    }
`;

const SListItemTitle = S.span`
    white-space: nowrap;
    ${(props) => (props.$isXsScreen ? "display: none" : null)};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export default AdminMenu;
