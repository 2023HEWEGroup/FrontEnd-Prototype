import { AppBar, Badge, Divider, Grid, Hidden, IconButton, InputBase, List, ListItem, ListItemText, Paper, Popper, Toolbar, useMediaQuery } from '@mui/material';
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { booleanFloatSideBar } from '../../../redux/features/floatSideBarSlice';


const TopBar = () => {

  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const dispatch = useDispatch();
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputhWord, setInputWord] = useState("");
  const [activeSearchMode, setActiveSearchMode] = useState(1);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const searchInput = useRef();

  const handleMenuIconClick = () =>{
    dispatch(booleanFloatSideBar());
  }

  const handleInputChange = (e) => {
    setInputWord(searchInput.current.value);
    if (searchInput.current.value.length > 0) {
      setAnchorEl(e.currentTarget);
      setIsPopperOpen(true);
    } else {
      setIsPopperOpen(false);
    }
  }

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
        setActiveSearchMode((prev) => (prev < 4 ? prev + 1 : 1))
      } else if (e.key === "ArrowUp") {
        setActiveSearchMode((prev) => (prev > 1 ? prev - 1 : 4))
      }
    }
  }

  useEffect(() => {
    if (isSmallScreen) {
      handlePopperClose();
    }
  }, [isSmallScreen]);


  return (
    <StyledAppBar color='primary'>
      <Toolbar>
        <Grid container style={{justifyContent: "space-between"}}>

          <StyledGrid item xs={3} sm={3}>
            <Tooltip title="Esc" placement='right-end'>
              <StyledIconButtonLeft onClick={handleMenuIconClick}>
                {isSideOpen ? <StyledCloseIcon /> : <StyledMenuIcon />}
              </StyledIconButtonLeft>
            </Tooltip>
            <Link to={"/home"} style={{ display: 'inline-flex'}}>
              <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo.svg`} alt='LMAPロゴ' />
            </Link>
          </StyledGrid>

          <Hidden only={["xs", "sm"]}>
            <StyledGrid item xs={6}>
              <div style={{ display: "flex", alignItems: "center" , width: "80%" }}>
                <StyledPaper component="form">
                  <StyledInputBase placeholder='キーワードで検索' onChange={handleInputChange} onKeyDown={handleKeyDown}
                    onFocus={handlePopperOpen} onBlur={handlePopperClose} inputRef={searchInput} color='secondary'/>
                  <Tooltip title="検索" placement='bottom' arrow={true}>
                    <IconButton type='submit' size='small'>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  <Divider orientation='vertical' style={{height: "30px", width: "5px", borderRightWidth: "2px", borderColor: "#aaa", margin: "0 10px"}}/>
                  <Tooltip title="画像で検索" placement='bottom' arrow={true}>
                    <IconButton size='small'>
                      <StyledImageSearchIcon />
                    </IconButton>
                  </Tooltip>
                </StyledPaper>
              </div>
              <StyledPopper open={isPopperOpen} anchorEl={anchorEl} placement='bottom-start' modifiers={[{
                  name: 'offset',
                  options: {
                    offset: [0, 12],
                  },
                }]}>
                <StyledPopperPaper elevation={3}>
                  <List>
                    <StyledListItem key={1} style={activeSearchMode === 1 ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                      <ListItemText primary={'"' + inputhWord + '" を商品で検索'} />
                    </StyledListItem>
                    <StyledDivider style={{width: "95%", margin: "0 auto"}}/>
                    <StyledListItem key={2} style={activeSearchMode === 2 ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                      <ListItemText primary={'"' + inputhWord + '" をユーザーで検索'} />
                    </StyledListItem>
                    <StyledDivider style={{width: "95%", margin: "0 auto"}}/>
                    <StyledListItem key={3} style={activeSearchMode === 3 ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                      <ListItemText primary={'"' + inputhWord + '" をグループで検索'} />
                    </StyledListItem>
                    <StyledDivider />
                    <StyledListItem key={4} style={activeSearchMode === 4 ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                      <ListItemText primary={'"' + inputhWord + '" をタグで検索'} />
                    </StyledListItem>
                  </List>
                </StyledPopperPaper>
              </StyledPopper>
            </StyledGrid>
          </Hidden>

          <StyledGrid item xs={3} sm={3}>
            <Tooltip title="出品する" placement='bottom' arrow={true}>
              <IconButton size='small'>
                <StyledAddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="通知" placement='bottom' arrow={true}>
              <IconButton size='small'>
                <Badge color='secondary' badgeContent={5}>
                  <StyledNotificationsOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="アカウント管理" placement='bottom' arrow={true}>
              <StyledIconButtonRight size='small'>
                <StyledAccountCircleOutlinedIcon />
              </StyledIconButtonRight>
            </Tooltip>
          </StyledGrid>

        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}


const StyledAppBar = styled(AppBar)`
  && {
    z-index: 50;
    justify-content: center;
    height: 55px;
    box-shadow: none;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    display: flex;
    justify-content: center;

    &:nth-child(1) {
      justify-content: flex-start;
    }

    &:nth-child(2) {
      justify-content: center;
    }

    &:nth-child(3) {
      justify-content: flex-end;
      gap: 5px;
    }
  }
`

const StyledIconButtonLeft = styled(IconButton)`
  && {
      margin-left: -10px;
    }
`

const StyledIconButtonRight = styled(IconButton)`
  && {
      margin-right: -10px;
    }
`

const StyledMenuIcon = styled(MenuIcon)`
  && {
    width: 30px;
    height: 30px;
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  && {
    width: 30px;
    height: 30px;
  }
`

const StyledLmapLogo = styled.img`
  width: 150px;
  margin-left: 15px;
  cursor: pointer;
`;

const StyledPaper = styled(Paper)`
  && {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    padding-right: 10px;
  }
`

const StyledInputBase = styled(InputBase)`
  && {
    height: 100%;
    width: 100%;
    padding-left: 2%;
  }
`

const StyledImageSearchIcon = styled(ImageSearchIcon)`
  && {
    width: 30px;
    height: 30px;
    margin-bottom: 3px;
  }
`

const StyledNotificationsOutlinedIcon = styled(NotificationsOutlinedIcon)`
  && {
    width: 35px;
    height: 35px;
  }
`

const StyledAddBoxOutlinedIcon = styled(AddBoxOutlinedIcon)`
  && {
    width: 35px;
    height: 35px;
  }
`

const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlinedIcon)`
  && {
    width: 35px;
    height: 35px;
  }
`

const StyledPopper = styled(Popper)`
  && {
    width: 37%;
    z-index: 100;
  }
`

const StyledPopperPaper = styled(Paper)`
  && {
    height: 200px;
  }
`

const StyledListItem = styled(ListItem)`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:nth-child(1) {
      margin-top: -8px;
    }
  }
`

const StyledDivider = styled(Divider)`
  && {
    margin: 0 auto;
    width: 95%;
  }
`


export default TopBar