import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NotifyPopper from "./notifyPopper/NotifyPopper";
import ProfilePopper from "./profilePopper/ProfilePopper";

const GridRight = () => {
  const theme = useTheme();

  return (
    <>
      <Tooltip title="出品する" placement="bottom" arrow={true}>
        <SLink to={"/exhibit"}>
          <SIconButton size="small" theme={theme}>
            <SAddBoxOutlinedIcon color="icon" />
          </SIconButton>
        </SLink>
      </Tooltip>

      <NotifyPopper />

      <ProfilePopper />
    </>
  );
};

const SAddBoxOutlinedIcon = S(AddBoxOutlinedIcon)`
    && {
        width: 35px;
        height: 35px;
    }
`;

const SLink = S(Link)`
    && {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
`;

const SIconButton = S(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`;

export default GridRight;
