import { AppBar, Avatar, Badge, Chip, Divider, Grid, Hidden, IconButton, InputBase, List, ListItem, ListItemButton, ListItemText, Paper, Popper, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { booleanFloatSideBar } from '../../../redux/features/floatSideBarSlice';
import { multipleTopBarNotifyScroll } from "../../../redux/features/topBarNotifyScrollSlice";


const TopBar = () => {

  const notifies = [{
    id: 1,
    src: "xxx",
    notifyClass: 1
  },
  {
    id: 2,
    src: "xxx",
    notifyClass: 2
  },
  {
    id: 3,
    src: "ああああああああああああああああああああああああああああああああああああああああああああああああああ",
    notifyClass: 1
  },
  {
    id: 4,
    src: "xxx",
    notifyClass: 1
  },
  {
    id: 5,
    src: "@abcd_xyz",
    notifyClass: 2
  },
  {
    id: 6,
    src: "aaaaa",
    notifyClass: 3
  },
  {
    id: 7,
    src: "xxx",
    notifyClass: 1
  },
  {
    id: 8,
    src: "xxx",
    notifyClass: 4
  },
  {
    id: 9,
    src: "owaaaaa",
    notifyClass: 5
  },
  {
    id: 10,
    src: "xxx",
    notifyClass: 6
  },
  {
    id: 11,
    src: "xxx",
    notifyClass: 1
  },
  {
    id: 12,
    src: "xxx",
    notifyClass: 2
  },
  {
    id: 13,
    src: "ああああああああああああああああああああああああああああああああああああああああああああああああああ",
    notifyClass: 1
  },
  {
    id: 14,
    src: "xxx",
    notifyClass: 1
  },
  {
    id: 15,
    src: "@abcd_xyz",
    notifyClass: 2
  }]

  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const dispatch = useDispatch();
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [isNotifyPopperOpen, setIsNotifyPopperOpen] = useState(false);
  const [isProfilePopperOpen, setIsProfilePopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [inputhWord, setInputWord] = useState("");
  const [activeSearchMode, setActiveSearchMode] = useState(1);
  const [multipleNotifyDisplay, setMultipleNotifyDisplay] = useState(1);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const multiple = useSelector((state => state.topBarNotifyScroll.value));
  const searchInput = useRef();
  const notifyPopperRef = useRef(null);
  const profilePopperRef = useRef(null);
  const notifyContainerRef = useRef();
  const theme = useTheme();
  const displayNotifies = notifies.slice(0, 10 * multipleNotifyDisplay);

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

  const handleNotifyPopper = (e) => {
    if (!isNotifyPopperOpen) {
      setNotifyAnchorEl(e.currentTarget);
      setIsNotifyPopperOpen(true);
    } else {
      setNotifyAnchorEl(null);
      setIsNotifyPopperOpen(false);
    }
  }

  useEffect(() => {
    const handleNotifyPopperClose = (e) => {
      if (notifyAnchorEl && !notifyAnchorEl.contains(e.target) && !notifyPopperRef.current.contains(e.target)) {
        setNotifyAnchorEl(null);
        setIsNotifyPopperOpen(false);
      }
    }
    document.addEventListener('click', handleNotifyPopperClose);

    return () => {
      document.removeEventListener('click', handleNotifyPopperClose);
    }
  }, [notifyAnchorEl]);

  const handleScroll = () => {
    const notifyContainer = notifyContainerRef.current;
    if (Math.ceil(notifyContainer.scrollHeight - notifyContainer.scrollTop) === Math.ceil(notifyContainer.offsetHeight)) {
      dispatch(multipleTopBarNotifyScroll());
    }
  }

  useEffect(() => {
    setMultipleNotifyDisplay(multiple);
  }, [multiple]);

  const handleProfilePopper = (e) => {
    if (!isProfilePopperOpen) {
      setProfileAnchorEl(e.currentTarget);
      setIsProfilePopperOpen(true);
    } else {
      setProfileAnchorEl(null);
      setIsProfilePopperOpen(false);
    }
  }

  useEffect(() => {
    const handleProfilePopperClose = (e) => {
      if (profileAnchorEl && !profileAnchorEl.contains(e.target) && !profilePopperRef.current.contains(e.target)) {
        setProfileAnchorEl(null);
        setIsProfilePopperOpen(false);
      }
    }
    document.addEventListener('click', handleProfilePopperClose);

    return () => {
      document.removeEventListener('click', handleProfilePopperClose);
    }
  }, [profileAnchorEl]);


  return (
    <StyledAppBar color='primary'>
      <Toolbar>
        <Grid container style={{justifyContent: "space-between"}}>

          <StyledGrid item xs={3} sm={3}>
            <Tooltip title="Esc" placement='right-end'>
              <StyledIconButtonLeft onClick={handleMenuIconClick}>
                {isSideOpen ? <StyledCloseIcon color="icon"/> : <StyledMenuIcon color="icon"/>}
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
                      <SearchIcon color="icon"/>
                    </IconButton>
                  </Tooltip>
                  <Divider orientation='vertical' style={{height: "30px", width: "5px", borderRightWidth: "2px", borderColor: "#aaa", margin: "0 10px"}}/>
                  <Tooltip title="画像で検索" placement='bottom' arrow={true}>
                    <IconButton size='small'>
                      <StyledImageSearchIcon color="icon"/>
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
              <StyledLink to={"/exhibit"}>
                <IconButton size='small'>
                  <StyledAddBoxOutlinedIcon color="icon"/>
                </IconButton>
              </StyledLink>
            </Tooltip>
            <Tooltip title="通知" placement='bottom' arrow={true}>
              <IconButton size='small' onClick={handleNotifyPopper}>
                <Badge color='secondary' badgeContent={5}>
                  {isNotifyPopperOpen ? <StyledNotificationsOutlinedIcon color='secondary'/> : <StyledNotificationsOutlinedIcon color="icon"/>}
                </Badge>
              </IconButton>
            </Tooltip>
            <Popper open={isNotifyPopperOpen} anchorEl={notifyAnchorEl} placement='bottom-end' ref={notifyPopperRef}>
                <StyledNotifyPopperPaper elevation={3}>
                    <StyledNotifyListHeader>
                      <div>通知</div>
                      <StyledNotifyHeadText style={{color: theme.palette.secondary.main}}>すべて既読</StyledNotifyHeadText>
                    </StyledNotifyListHeader>
                    <Divider style={{borderBottom: `solid 0.5px ${theme.palette.line.main}`}}/>
                  <StyledNotifyList ref={notifyContainerRef} onScroll={handleScroll}>
                    {displayNotifies.map((notify) => 
                    <div key={notify.id}>
                      <StyledNotifyListItemButton>
                          <Badge color='secondary' variant='dot'>
                            <StyledNotifyAvatar />
                          </Badge>
                          <div>
                            <ListItemText primary={`${notify.src}があああああああああああああああああああああああああああああああああああああああああああああああああああああ`}
                            primaryTypographyProps={{
                            fontWeight: 550,
                            fontSize: "0.9rem",
                            }}/>
                            <StyledTimeAgo style={{color: theme.palette.text.sub}}>NaN時間前</StyledTimeAgo>
                          </div>
                      </StyledNotifyListItemButton>
                    </div>
                    )}
                  </StyledNotifyList>
                </StyledNotifyPopperPaper>
            </Popper>
            <Tooltip title="アカウント管理" placement='bottom' arrow={true}>
              <StyledIconButtonRight size='small' onClick={handleProfilePopper}>
                {isProfilePopperOpen ? <StyledAccountCircleOutlinedIcon color="secondary" /> : <StyledAccountCircleOutlinedIcon color="icon"/>}
              </StyledIconButtonRight>
            </Tooltip>
            <Popper open={isProfilePopperOpen} anchorEl={profileAnchorEl} placement='bottom-end' ref={profilePopperRef}>
              <StyledProfilePopperPaper elevation={3}>
                <StyledLink to={"/profile"}>
                  <StyledProfileListHeader>
                    <StyledProfileAvatar />
                    <StyledAccountIntro>
                      <StyledProfileAccountName style={{color: theme.palette.text.main}}>aaaaaあああああああaaあああああああああああああああああああああああああああああ</StyledProfileAccountName>
                      <StyledProfileAccountId style={{color: theme.palette.text.sub}}>@xyzyxyxZZZZZZ____________</StyledProfileAccountId>
                    </StyledAccountIntro>
                  </StyledProfileListHeader>
                </StyledLink>
                <StyledProfilePointHeader>
                  <StyledPointAmountLabel label="NaN ポイント" variant='outlined' color='secondary' clickable/>
                </StyledProfilePointHeader>
                <Divider style={{borderBottom: `solid 0.25px ${theme.palette.line.main}`, width: "95%", margin: "0 auto"}}/>
                <StyledProfileList>
                  <StyledProfileListBlock>
                  <StyledProfileListElements>
                      <FavoriteBorderIcon color='icon'/>
                      <ListItemText primary="いいね"/>
                    </StyledProfileListElements>
                    <StyledProfileListElements>
                      <CachedIcon color='icon'/>
                      <ListItemText primary="取引中"/>
                    </StyledProfileListElements>
                  </StyledProfileListBlock>
                </StyledProfileList>
                <Divider style={{borderBottom: `solid 0.25px ${theme.palette.line.main}`, width: "95%", margin: "0 auto"}}/>
                <StyledProfileList>
                  <StyledProfileListBlock>
                    <StyledProfileListElements>
                      <AdsClickIcon color='icon'/>
                      <ListItemText primary="広告"/>
                    </StyledProfileListElements>
                    <StyledProfileListElements>
                      <CreditCardIcon color='icon'/>
                      <ListItemText primary="クレジットカード"/>
                    </StyledProfileListElements>
                    <StyledProfileListElements>
                      <AssessmentOutlinedIcon color='icon'/>
                      <ListItemText primary="ログ"/>
                    </StyledProfileListElements>
                  </StyledProfileListBlock>
                </StyledProfileList>
                <Divider style={{borderBottom: `solid 0.25px ${theme.palette.line.main}`, width: "95%", margin: "0 auto"}}/>
                <StyledProfileList>
                  <StyledProfileListBlock>
                  <StyledProfileListElements>
                      <InfoOutlinedIcon color='icon'/>
                      <ListItemText primary="インフォメーション" />
                    </StyledProfileListElements>
                    <StyledProfileListElements>
                      <HelpOutlinedIcon color='icon'/>
                      <ListItemText primary="ヘルプ" />
                    </StyledProfileListElements>
                    <StyledLink to={"/"}>
                      <StyledProfileListElements>
                        <ArrowBackIcon color='icon'/>
                        <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="トップページ" />
                      </StyledProfileListElements>
                    </StyledLink>
                    <StyledProfileListElements>
                      <LogoutIcon color='icon'/>
                      <ListItemText primary="ログアウト" />
                    </StyledProfileListElements>
                  </StyledProfileListBlock>
                </StyledProfileList>
              </StyledProfilePopperPaper>
            </Popper>
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

const StyledNotifyPopperPaper = styled(Paper)`
  && {
    height: 600px;
    width: 425px;
    border-radius: 15px;
  }
`

const StyledProfilePopperPaper = styled(Paper)`
  && {
    width: 325px;
    border-radius: 15px;
  }
`


const StyledListItem = styled(ListItem)`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    
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

const StyledLink = styled(Link)`
  && {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`

const StyledNotifyListHeader = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 95%;
    margin: 0 auto;
  }
`

const StyledProfileListHeader = styled.div`
  && {
    display: flex;
    gap: 15px;
    align-items: center;
    width: 95%;
    margin: 0 auto;
    padding: 20px 10px 5px 10px;
  }
`

const StyledNotifyHeadText = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
  }
`

const StyledNotifyList = styled(List)`
  && {
    height: 550px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &:hover {
      &::-webkit-scrollbar {
        display: inline;
      }
    }
  }
`

const StyledNotifyListItemButton = styled(ListItemButton)`
  && {
    align-items: start;
    gap: 20px;
    min-height: 100px;
    width: 415px;
    padding: 15px;
    cursor: pointer;

    &:nth-child(1) {
      margin-top: -8px;
    }
  }
`

const StyledNotifyAvatar = styled(Avatar)`
  && {
    width: 50px;
    height: 50px;
  }
`

const StyledProfileAvatar = styled(Avatar)`
  && {
    width: 45px;
    height: 45px;
  }
`

const StyledTimeAgo = styled.div`
  font-size: 0.8rem;
  margin-top: 15px;
`

const StyledAccountIntro = styled.div`
  width: calc(100% - 45px);
`

const StyledProfileAccountName = styled.div`
  font-weight: bold;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledProfileAccountId = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledProfilePointHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 5px;
  margin: 10px;
`

const StyledPointAmountLabel = styled(Chip)`
  && {
    font-size: 0.9rem;
    font-weight: bold;
  }
`

const StyledProfileList = styled(List)`
  && {
  }
`

const StyledProfileListBlock = styled.div`
  width: 95%;
  margin: 0 auto;
`

const StyledProfileListElements = styled(ListItem)`
  && {
    gap: 15px;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      transition: 0.2s;
    }
  }
`


export default TopBar