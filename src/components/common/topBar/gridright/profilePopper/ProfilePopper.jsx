import { Avatar, Chip, Divider, IconButton, List, ListItem, ListItemText, Paper, Popper, Tooltip, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const ProfilePopper = () => {

    const [isProfilePopperOpen, setIsProfilePopperOpen] = useState(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profilePopperRef = useRef(null);
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

    return (
        <>
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
        </>
    )
}


const StyledIconButtonRight = styled(IconButton)`
    && {
        margin-right: -10px;
        }
`

const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlinedIcon)`
    && {
        width: 35px;
        height: 35px;
    }
`

const StyledProfilePopperPaper = styled(Paper)`
    && {
        width: 325px;
        border-radius: 15px;
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
const StyledLink = styled(Link)`
    && {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
`

const StyledProfileListElements = styled(ListItem)`
    && {
        gap: 15px;
        cursor: pointer;
        height: 45px;
        border-radius: 10px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        transition: 0.2s;
    }
    }
`


export default ProfilePopper