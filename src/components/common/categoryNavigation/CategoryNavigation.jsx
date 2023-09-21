import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  AppBar,
  Chip,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CategoryNavigation = () => {
  const categories = [
    { categoryName: "キムチ", id: 1 },
    { categoryName: "カクテキ", id: 2 },
    { categoryName: "漬物美味しい", id: 3 },
    { categoryName: "ああああああああああああああああ", id: 4 },
    { categoryName: "JavaScript", id: 5 },
    { categoryName: "うおおお", id: 6 },
    { categoryName: "Danger", id: 7 },
    { categoryName: "Phalanx", id: 8 },
    { categoryName: "aiueo", id: 9 },
    { categoryName: "ajotto", id: 10 },
    { categoryName: "Underground Funding", id: 11 },
    { categoryName: "CODING KURU*C", id: 12 },
    { categoryName: "CODING KURU*C HARD", id: 13 },
    { categoryName: "お粥", id: 14 },
    { categoryName: "ビタミンミネラル食物繊維", id: 15 },
    { categoryName: "EAA", id: 16 },
  ];

  const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
  const [isRightButtonVisible, setIsRightButtonVisible] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const theme = useTheme();
  const navRef = useRef(null);
  const isSideOpen = useSelector((state) => state.floatSideBar.value);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isScrollable = useSelector((state) => state.windowScrollable.value);

  const handleScroll = (direction) => {
    const navBar = navRef.current;
    if (navBar) {
      const scrollOffset = direction === "left" ? -1000 : 1000;
      navBar.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleIconVisible = () => {
    const navBar = navRef.current;
    setIsLeftButtonVisible(navBar.scrollLeft > 0);
    setIsRightButtonVisible(
      navBar.scrollLeft < navBar.scrollWidth - navBar.clientWidth - 10
    );
  };

  const handleSelectedCategory = (id) => {
    setSelectedCategoryId(id);
  };

  return (
    <>
      <SAppBar
        $isSideOpen={isSideOpen}
        $isSmallScreen={isSmallScreen}
        $isScrollable={isScrollable}
        style={
          isSideOpen
            ? { top: "55px", left: "240px", width: "calc(100% - 240px)" }
            : { top: "55px", left: "75px", width: "calc(100% - 75px)" }
        }
      >
        <SCategoryBarParent>
          <SIconButtonLeft
            onClick={() => handleScroll("left")}
            theme={theme}
            style={isLeftButtonVisible ? null : { display: "none" }}
          >
            <ArrowBack />
          </SIconButtonLeft>
          <SCategoryBar onScroll={handleIconVisible} ref={navRef}>
            {categories.map((category) => (
              <div key={category.id}>
                <Tooltip title={category.categoryName} placement="bottom" arrow>
                  <SChip
                    label={category.categoryName}
                    clickable
                    theme={theme}
                    style={
                      selectedCategoryId === category.id
                        ? {
                            backgroundColor: theme.palette.text.categoryActive,
                            color: theme.palette.background.categoryActive,
                          }
                        : null
                    }
                    onClick={() => handleSelectedCategory(category.id)}
                  />
                </Tooltip>
              </div>
            ))}
          </SCategoryBar>
          <SIconButtonRight
            onClick={() => handleScroll("right")}
            theme={theme}
            style={isRightButtonVisible ? null : { display: "none" }}
          >
            <ArrowForward />
          </SIconButtonRight>
        </SCategoryBarParent>
      </SAppBar>
      <div style={{ width: "100%", height: "75px" }}></div>
    </>
  );
};

const SAppBar = Styled(AppBar)`
    && {
        z-index: 100;
        box-shadow: none;
        padding-right: ${(props) =>
          (props.$isSideOpen && props.$isSmallScreen) || !props.$isScrollable
            ? "10px"
            : "0"};
    }
`;

const SCategoryBarParent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow-y: hidden;
`;

const SCategoryBar = styled.div`
  display: flex;
  justify-content: start;
  gap: 15px;
  width: calc(100% - 120px);
  margin: 0 auto;
  padding: 10px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SIconButtonLeft = Styled(IconButton)`
    && {
        position: absolute;
        left: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.opacity};

        .MuiTouchRipple-child {
            background-color: transparent;
        }

        &:hover {
            background-color: ${(props) =>
              props.theme.palette.background.opacityHover};
        }

        &:active {
            background-color: ${(props) =>
              props.theme.palette.background.opacityActive};
        }
    }
`;

const SIconButtonRight = Styled(IconButton)`
    && {
        position: absolute;
        right: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.opacity};

        .MuiTouchRipple-child {
            background-color: transparent;
        }

        &:hover {
            background-color: ${(props) =>
              props.theme.palette.background.opacityHover};
        }

        &:active {
            background-color: ${(props) =>
              props.theme.palette.background.opacityActive};
        }
    }
`;

const SChip = Styled(Chip)`
    && {
        padding: 20px;
        color: ${(props) => props.theme.palette.text.main};
        border-radius: 5px;
        background-color: ${(props) => props.theme.palette.background.pop};

        .MuiTouchRipple-child {
            background-color: transparent;
        }

        &&:hover {
            background-color: ${(props) =>
              props.theme.palette.background.hover};
        }
    }
`;

export default CategoryNavigation;
