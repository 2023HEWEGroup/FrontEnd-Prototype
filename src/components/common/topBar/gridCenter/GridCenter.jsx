import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./searchImg/Modal";
import { useNavigate } from "react-router-dom";

const GridCenter = () => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputhWord, setInputWord] = useState("");
  const [activeSearchMode, setActiveSearchMode] = useState(1);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const searchInput = useRef();
  const popperRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleInputChange = (e) => {
    setInputWord(searchInput.current.value);
    if (searchInput.current.value.length > 0) {
      setAnchorEl(e.currentTarget);
      setIsPopperOpen(true);
    } else {
      setIsPopperOpen(false);
    }
  };

  const handlePopperOpen = (e) => {
    if (searchInput.current.value.length > 0) {
      setAnchorEl(e.currentTarget);
      setIsPopperOpen(true);
    }
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
    setIsPopperOpen(false);
  };

  const handleKeyDown = (e) => {
    if (searchInput.current.value.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveSearchMode((prev) => (prev < 4 ? prev + 1 : 1));
      } else if (e.key === "ArrowUp") {
        setActiveSearchMode((prev) => (prev > 1 ? prev - 1 : 4));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputhWord) return;
    const url = `/result?word=${encodeURIComponent(
      inputhWord
    )}&mode=${encodeURIComponent(activeSearchMode)}`;
    handlePopperClose();
    searchInput.current.blur();
    navigate(url);
  };

  const handleModeClickSubmit = (event, mode) => {
    event.preventDefault();
    if (!inputhWord) return;
    const url = `/result?word=${encodeURIComponent(
      inputhWord
    )}&mode=${encodeURIComponent(mode)}`;
    handlePopperClose();
    navigate(url);
  };

  useEffect(() => {
    if (isSmallScreen) {
      handlePopperClose();
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const handlePopperClose = (e) => {
      if (
        anchorEl &&
        !anchorEl.contains(e.target) &&
        !popperRef.current.contains(e.target)
      ) {
        setAnchorEl(null);
        setIsPopperOpen(false);
      }
    };
    document.addEventListener("click", handlePopperClose);

    return () => {
      document.removeEventListener("click", handlePopperClose);
    };
  }, [anchorEl]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "80%" }}>
        <SPaper
          elevation={0}
          component="form"
          theme={theme}
          style={{ backgroundColor: theme.palette.background.search }}
          onSubmit={handleSubmit}
          ref={popperRef}
        >
          <SInputBase
            placeholder="キーワードで検索"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handlePopperOpen}
            inputRef={searchInput}
            theme={theme}
          />
          <Tooltip title="検索" placement="bottom" arrow={true}>
            <SIconButton type="submit" size="small" theme={theme}>
              <SearchIcon color="icon" />
            </SIconButton>
          </Tooltip>
          <Divider
            orientation="vertical"
            style={{
              height: "30px",
              width: "5px",
              borderRightWidth: "2px",
              borderColor: "#aaa",
              margin: "0 10px",
            }}
          />
          <Modal theme={theme} />
        </SPaper>
      </div>
      <SPopper
        open={isPopperOpen}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[{ name: "offset", options: { offset: [0, 12] } }]}
      >
        <SPopperPaper elevation={3} theme={theme}>
          <List>
            <SListItem
              onClick={(event) => handleModeClickSubmit(event, 1)}
              theme={theme}
              style={
                activeSearchMode === 1
                  ? { backgroundColor: theme.palette.background.hover }
                  : null
              }
            >
              <ListItemText primary={'"' + inputhWord + '" を商品で検索'} />
            </SListItem>
            <SDivider style={{ width: "95%", margin: "0 auto" }} />
            <SListItem
              onClick={(event) => handleModeClickSubmit(event, 2)}
              theme={theme}
              style={
                activeSearchMode === 2
                  ? { backgroundColor: theme.palette.background.hover }
                  : null
              }
            >
              <ListItemText primary={'"' + inputhWord + '" をユーザーで検索'} />
            </SListItem>
            <SDivider style={{ width: "95%", margin: "0 auto" }} />
            <SListItem
              onClick={(event) => handleModeClickSubmit(event, 3)}
              theme={theme}
              style={
                activeSearchMode === 3
                  ? { backgroundColor: theme.palette.background.hover }
                  : null
              }
            >
              <ListItemText primary={'"' + inputhWord + '" をグループで検索'} />
            </SListItem>
            <SDivider />
            <SListItem
              onClick={(event) => handleModeClickSubmit(event, 4)}
              theme={theme}
              style={
                activeSearchMode === 4
                  ? { backgroundColor: theme.palette.background.hover }
                  : null
              }
            >
              <ListItemText primary={'"' + inputhWord + '" をタグで検索'} />
            </SListItem>
          </List>
        </SPopperPaper>
      </SPopper>
    </>
  );
};

const SPaper = S(Paper)`
  && {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    padding-right: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};

    &:focus-within {
      outline: solid 2px ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

const SInputBase = S(InputBase)`
  && {
    height: 100%;
    width: 100%;
    padding-left: 2%;
    color: ${(props) => props.theme.palette.text.main};
    & input::placeholder {
      color: ${(props) => props.theme.palette.text.main};
    }
  }
`;

const SIconButton = S(IconButton)`
  && {
    .MuiTouchRipple-child {
      background-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

const SPopper = S(Popper)`
  && {
    width: 36.5%;
    z-index: 100;
  }
`;

const SPopperPaper = S(Paper)`
  && {
    height: 200px;
    color: ${(props) => props.theme.palette.text.main};
    background-color: ${(props) => props.theme.palette.background.pop};
  }
`;

const SListItem = S(ListItem)`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.palette.background.hover};
    }
    &:nth-child(1) {
      margin-top: -8px;
    }
  }
`;

const SDivider = S(Divider)`
  && {
    margin: 0 auto;
    width: 95%;
  }
`;

export default GridCenter;
