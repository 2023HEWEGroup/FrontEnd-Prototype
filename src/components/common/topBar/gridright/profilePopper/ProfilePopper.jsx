import { Avatar, Chip, Divider, IconButton, List, ListItemText, Paper, Popper, Tooltip, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AccountCircleOutlined, AdsClick, ArrowBack, AssessmentOutlined, CachedOutlined, CreditCard, FavoriteBorder, HelpOutlineOutlined, InfoOutlined, Inventory2Outlined, Logout } from '@mui/icons-material';
import { isWindowScrollable } from '../../../../../redux/features/windowScrollaleSlice';
import { useDispatch } from 'react-redux';


const ProfilePopper = () => {

    const [isProfilePopperOpen, setIsProfilePopperOpen] = useState(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profilePopperRef = useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();

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

    useEffect(() => {
        if (isProfilePopperOpen) {
          // ポッパーが展開されたときにスクロールを無効化
            dispatch(isWindowScrollable());
        } else {
            dispatch(isWindowScrollable());
        }
    }, [isProfilePopperOpen, dispatch]);

    return (
        <>
        <Tooltip title="アカウント管理" placement='bottom' arrow={true}>
            <StyledIconButtonRight size='small' onClick={handleProfilePopper} theme={theme}>
                {isProfilePopperOpen ? <StyledAccountCircleOutlinedIcon color="secondary" /> : <StyledAccountCircleOutlinedIcon color="icon"/>}
            </StyledIconButtonRight>
        </Tooltip>

        <StyledPopper open={isProfilePopperOpen} anchorEl={profileAnchorEl} placement='bottom-end' ref={profilePopperRef}>
            <StyledProfilePopperPaper elevation={3} theme={theme}>
                <StyledPopperInner>
                    <StyledLink to={"/profile"}>
                        <StyledProfileListHeader>
                            <StyledProfileAvatar />
                            <StyledAccountIntro>
                                <StyledProfileAccountName style={{color: theme.palette.text.main}}>aaaaaあああああああaaあああああああああああああああああああああああああああああ</StyledProfileAccountName>
                                <StyledProfileAccountId style={{color: theme.palette.text.sub}}>@xyzyxyxZZZZZZ____________</StyledProfileAccountId>
                            </StyledAccountIntro>
                        </StyledProfileListHeader>
                    </StyledLink>

                    <StyledFollowHeader>
                        <StyledFollowings theme={theme}><Styledspan theme={theme}>NaN</Styledspan> フォロー</StyledFollowings>
                        <StyledFollowers theme={theme}><Styledspan theme={theme}>NaN</Styledspan> フォロワー</StyledFollowers>
                    </StyledFollowHeader>

                    <StyledProfilePointHeader>
                        <StyledPointAmountLabel label="NaN ポイント" variant='outlined' color='secondary' clickable/>
                    </StyledProfilePointHeader>

                    <Divider style={{borderBottom: `solid 0.25px ${theme.palette.line.main}`, width: "95%", margin: "0 auto"}}/>
                    <List>
                        <StyledProfileListBlock>
                            <StyledProfileListElements theme={theme}>
                                <FavoriteBorder color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="いいね"/>
                            </StyledProfileListElements>
                            <StyledProfileListElements theme={theme}>
                                <Inventory2Outlined color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="出品中"/>
                            </StyledProfileListElements>
                            <StyledProfileListElements theme={theme}>
                                <CachedOutlined color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="取引中"/>
                            </StyledProfileListElements>
                        </StyledProfileListBlock>
                    </List>
                    <Divider style={{borderBottom: `solid 0.25px ${theme.palette.line.main}`, width: "95%", margin: "0 auto"}}/>
                    <List>
                        <StyledProfileListBlock>
                            <StyledProfileListElements theme={theme}>
                                <AdsClick color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="広告"/>
                            </StyledProfileListElements>
                            <StyledProfileListElements theme={theme}>
                                <CreditCard color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="クレジットカード"/>
                            </StyledProfileListElements>
                            <StyledProfileListElements theme={theme}>
                                <AssessmentOutlined color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ログ"/>
                            </StyledProfileListElements>
                        </StyledProfileListBlock>
                    </List>
                    <Divider style={{borderBottom: `solid 0.25px ${theme.palette.line.main}`, width: "95%", margin: "0 auto"}}/>
                    <List>
                        <StyledProfileListBlock>
                            <StyledProfileListElements theme={theme}>
                                <InfoOutlined color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="インフォメーション" />
                            </StyledProfileListElements>
                            <StyledProfileListElements theme={theme}>
                                <HelpOutlineOutlined color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ヘルプ" />
                            </StyledProfileListElements>
                            <StyledLink to={"/"}>
                                <StyledProfileListElements theme={theme}>
                                <ArrowBack color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="トップページ" />
                                </StyledProfileListElements>
                            </StyledLink>
                            <StyledProfileListElements theme={theme}>
                                <Logout color='icon'/>
                                <ListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ログアウト" />
                            </StyledProfileListElements>
                            </StyledProfileListBlock>
                    </List>
                </StyledPopperInner>
            </StyledProfilePopperPaper>
        </StyledPopper>
        </>
    )
}


const StyledIconButtonRight = styled(IconButton)`
    && {
        margin-right: -10px;

        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlined)`
    && {
        width: 35px;
        height: 35px;
    }
`

const StyledPopper = styled(Popper)`
    && {
        z-index: 200;
    }
`

const StyledProfilePopperPaper = styled(Paper)`
    && {
        width: 325px;
        max-height: calc(100vh - 55px);
        overflow-x: hidden;
        overflow-y: scroll;
        border-radius: 15px;
        background-color: ${(props) => props.theme.palette.background.pop};

        &::-webkit-scrollbar {
            display: none;
        }
    
        &:hover {
            &::-webkit-scrollbar {
                display: inline;
            }
        }
    }
`

const StyledPopperInner = styled.div`
    width: 315px;
    height: 100%;
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

const StyledProfileAvatar = styled(Avatar)`
    && {
    width: 45px;
    height: 45px;
    }
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

const StyledFollowHeader = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
    width: 85%;
    margin: 10px auto;
`

const StyledFollowings = styled.div`
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const StyledFollowers = styled.div`
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const Styledspan = styled.span`
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
    &:active {
        text-decoration: none;
    }
`

const StyledProfilePointHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 10px;
`

const StyledPointAmountLabel = styled(Chip)`
    && {
    font-size: 0.9rem;
    font-weight: bold;
    }
`

const StyledProfileListBlock = styled.div`
    width: 95%;
    margin: 0 auto;
`

const StyledLink = styled(Link)`
    && {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
`

const StyledProfileListElements = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    height: 45px;
    width: 100%;
    border-radius: 10px;
    color: ${(props) => props.theme.palette.text.main};

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
`


export default ProfilePopper