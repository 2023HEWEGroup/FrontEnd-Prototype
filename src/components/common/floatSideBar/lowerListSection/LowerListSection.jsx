import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpIcon from "@mui/icons-material/Help";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ListItem, ListItemText, Tooltip, useTheme } from "@mui/material";

const LowerListSection = (props) => {
  const theme = useTheme();

  return (
    <>
      <SListBlock>
        <SListItem>
          <Tooltip title="設定" placement="right" arrow={true}>
            <SLink to={"/setting"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/setting"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/setting" ? (
                  <SSettingsIcon color="secondary" />
                ) : (
                  <SSettingsOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="設定"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="インフォメーション" placement="right" arrow={true}>
            <SLink to={"/info"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/info"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/info" ? (
                  <SInfoIcon color="secondary" />
                ) : (
                  <SInfoOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="インフォメーション"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="ヘルプ" placement="right" arrow={true}>
            <SLink to={"/help"}>
              <SListElements
                theme={theme}
                style={
                  props.page === "/help"
                    ? { backgroundColor: theme.palette.background.hover }
                    : null
                }
              >
                {props.page === "/help" ? (
                  <SHelpIcon color="secondary" />
                ) : (
                  <SHelpOutlinedIcon color="icon" />
                )}
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="ヘルプ"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="トップページ" placement="right" arrow={true}>
            <SLink to={"/"}>
              <SListElements theme={theme}>
                <SArrowBackIcon color="icon" />
                <SListItemText
                  primaryTypographyProps={{ color: theme.palette.text.main }}
                  primary="トップページ"
                />
              </SListElements>
            </SLink>
          </Tooltip>
        </SListItem>
        <SListItem>
          <Tooltip title="ログアウト" placement="right" arrow={true}>
            <SListElements theme={theme}>
              <SLogoutIcon color="icon" />
              <SListItemText
                primaryTypographyProps={{ color: theme.palette.text.main }}
                primary="ログアウト"
              />
            </SListElements>
          </Tooltip>
        </SListItem>
      </SListBlock>
    </>
  );
};

const SListBlock = S.div`
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

const SListItem = S(ListItem)`
    && {
        justify-content: center;
        height: 45px;
        width: 230px;
        padding: 0;
    }
`;

const SListElements = S.div`
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

const SListItemText = S(ListItemText)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

const SSettingsIcon = S(SettingsIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SSettingsOutlinedIcon = S(SettingsOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SHelpIcon = S(HelpIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SHelpOutlinedIcon = S(HelpOutlineOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SLogoutIcon = S(LogoutIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SInfoIcon = S(InfoIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;
const SInfoOutlinedIcon = S(InfoOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SArrowBackIcon = S(ArrowBackIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

export default LowerListSection;
