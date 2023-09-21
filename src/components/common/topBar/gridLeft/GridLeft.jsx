import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { booleanFloatSideBar } from "../../../../redux/features/floatSideBarSlice";

const GridLeft = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const isSideOpen = useSelector((state) => state.floatSideBar.value);

  const handleMenuIconClick = () => {
    dispatch(booleanFloatSideBar());
  };

  return (
    <>
      <Tooltip title="Esc" placement="right-end">
        <SIconButtonLeft onClick={handleMenuIconClick} theme={theme}>
          {isSideOpen ? (
            <SCloseIcon color="icon" />
          ) : (
            <SMenuIcon color="icon" />
          )}
        </SIconButtonLeft>
      </Tooltip>
      <Link to={"/home"} style={{ display: "inline-flex" }}>
        <SLmapLogo
          src={`${siteAssetsPath}/LMAP_logo_reversal.svg`}
          alt="LMAPロゴ"
        />
      </Link>
    </>
  );
};

const SIconButtonLeft = Styled(IconButton)`
    && {
        margin-left: -10px;

        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`;

const SMenuIcon = Styled(MenuIcon)`
    && {
    width: 30px;
    height: 30px;
    }
`;

const SCloseIcon = Styled(CloseIcon)`
    && {
    width: 30px;
    height: 30px;
    }
`;

const SLmapLogo = styled.img`
  width: 150px;
  margin-left: 15px;
  cursor: pointer;
`;

export default GridLeft;
