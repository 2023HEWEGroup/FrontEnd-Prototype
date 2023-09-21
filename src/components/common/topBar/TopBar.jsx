import { AppBar, Grid, Hidden, Toolbar, useMediaQuery } from "@mui/material";
import styled from "styled-components";

import GridLeft from "./gridLeft/GridLeft";
import GridCenter from "./gridCenter/GridCenter";
import GridRight from "./gridright/GridRight";
import { useSelector } from "react-redux";

const TopBar = (props) => {
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isSideOpen = useSelector((state) => state.floatSideBar.value);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isScrollable = useSelector((state) => state.windowScrollable.value);

  return (
    <SAppBar
      color="primary"
      $isSideOpen={isSideOpen}
      $isSmallScreen={isSmallScreen}
      $isScrollable={isScrollable}
    >
      <Toolbar>
        <Grid container style={{ justifyContent: "space-between" }}>
          <SGridLeft
            item
            xs={3}
            sm={3}
            style={{ display: "flex", justifyContent: "flex-start" }}
            $isXsScreen={isXsScreen}
          >
            <GridLeft />
          </SGridLeft>

          <Hidden only={["xs", "sm"]}>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <GridCenter />
            </Grid>
          </Hidden>

          <SGridRight
            item
            xs={3}
            sm={3}
            style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}
            $isXsScreen={isXsScreen}
          >
            <GridRight />
          </SGridRight>
        </Grid>
      </Toolbar>
    </SAppBar>
  );
};

const SAppBar = S(AppBar)`
  && {
    z-index: 150;
    justify-content: center;
    height: 55px;
    box-shadow: none;
    padding-right: ${(props) =>
      (props.$isSideOpen && props.$isSmallScreen) || !props.$isScrollable
        ? "10px"
        : "0"};
  }
`;

const SGridLeft = S(Grid)`
  &&& {
    margin-left: ${(props) => (props.$isXsScreen ? "8px" : 0)};
  }
`;

const SGridRight = S(Grid)`
  &&& {
    margin-right: ${(props) => (props.$isXsScreen ? "8px" : 0)};
  }
`;

export default TopBar;
