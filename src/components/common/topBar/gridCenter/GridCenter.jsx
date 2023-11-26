import SearchIcon from "@mui/icons-material/Search";
import {Divider, IconButton, InputBase, List, ListItem, ListItemText, Paper, Popper, Tooltip, useMediaQuery, useTheme } from "@mui/material";
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
    let page;
    if (activeSearchMode === 1) page = "products";
    if (activeSearchMode === 2) page = "users";
    if (activeSearchMode === 3) page = "groups";
    if (activeSearchMode === 4) page = "products";
    const url = `${page}/?word=${encodeURIComponent(inputhWord)}`;
    handlePopperClose();
    searchInput.current.blur();
    navigate(url);
  }

  const handleModeClickSubmit = (event, mode) => {
    event.preventDefault();
    if (!inputhWord) return;
    let page;
    if (mode === 1) page = "products";
    if (mode === 2) page = "users";
    if (mode === 3) page = "groups";
    if (mode === 4) page = "products";
    const url = `${page}/?word=${encodeURIComponent(inputhWord)}`;
    handlePopperClose();
    navigate(url);
  }

  useEffect(() => {
    if (isSmallScreen) {
      handlePopperClose();
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const handlePopperClose = (e) => {
        if (anchorEl && !anchorEl.contains(e.target) && !popperRef.current.contains(e.target)) {
            setAnchorEl(null);
            setIsPopperOpen(false);
        }
    }
    document.addEventListener('click', handlePopperClose);

    return () => {
        document.removeEventListener('click', handlePopperClose);
    }
}, [anchorEl])

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", width: "80%" }}>
        <StyledPaper elevation={0} component="form" theme={theme} style={{backgroundColor: theme.palette.background.search}} onSubmit={handleSubmit} ref={popperRef}>
          <StyledInputBase placeholder="キーワードで検索" onChange={handleInputChange} onKeyDown={handleKeyDown} onFocus={handlePopperOpen} inputRef={searchInput} theme={theme} inputProps={{maxLength: 50}}/>
          <Tooltip title="検索" placement="bottom" arrow={true}>
            <StyledIconButton type="submit" size="small" theme={theme}>
              <SearchIcon color="icon" />
            </StyledIconButton>
          </Tooltip>
          <Divider orientation="vertical" style={{height: "30px", width: "5px", borderRightWidth: "2px", borderColor: "#aaa", margin: "0 10px", }}/>
          <Modal theme={theme} />
        </StyledPaper>
      </div>
      <StyledPopper open={isPopperOpen} anchorEl={anchorEl} placement="bottom-start" modifiers={[{name: "offset", options: {offset: [0, 12] }}]}>
        <StyledPopperPaper elevation={3} theme={theme}>
          <List>
            <StyledListItem onClick={(event) => handleModeClickSubmit(event, 1)} theme={theme} style={activeSearchMode === 1 ? { backgroundColor: theme.palette.background.hover } : null}>
              <ListItemText style={{overflow: "hidden", width: "100%"}} primary={'"' + inputhWord + '" を商品で検索'} />
            </StyledListItem>
            <StyledDivider style={{ width: "95%", margin: "0 auto" }} />
            <StyledListItem onClick={(event) => handleModeClickSubmit(event, 2)} theme={theme} style={activeSearchMode === 2 ? { backgroundColor: theme.palette.background.hover } : null}>
              <ListItemText style={{overflow: "hidden", width: "100%"}} primary={'"' + inputhWord + '" をユーザーで検索'} />
            </StyledListItem>
            <StyledDivider style={{ width: "95%", margin: "0 auto" }} />
            <StyledListItem onClick={(event) => handleModeClickSubmit(event, 3)} theme={theme} style={ activeSearchMode === 3 ? { backgroundColor: theme.palette.background.hover } : null}>
              <ListItemText style={{overflow: "hidden", width: "100%"}} primary={'"' + inputhWord + '" をグループで検索'} />
            </StyledListItem>
            <StyledDivider />
            <StyledListItem onClick={(event) => handleModeClickSubmit(event, 4)} theme={theme} style={activeSearchMode === 4 ? { backgroundColor: theme.palette.background.hover } : null}>
              <ListItemText style={{overflow: "hidden", width: "100%"}} primary={'"' + inputhWord + '" をタグで検索'} />
            </StyledListItem>
          </List>
        </StyledPopperPaper>
      </StyledPopper>
    </>
  );
};

const StyledPaper = styled(Paper)`
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

const StyledInputBase = styled(InputBase)`
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

const StyledIconButton = styled(IconButton)`
  && {
    .MuiTouchRipple-child {
      background-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

const StyledPopper = styled(Popper)`
  && {
    width: 36.5%;
    z-index: 100;
  }
`;

const StyledPopperPaper = styled(Paper)`
  && {
    height: 200px;
    color: ${(props) => props.theme.palette.text.main};
    background-color: ${(props) => props.theme.palette.background.pop};
  }
`;

const StyledListItem = styled(ListItem)`
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

const StyledDivider = styled(Divider)`
  && {
    margin: 0 auto;
    width: 95%;
  }
`;

export default GridCenter;