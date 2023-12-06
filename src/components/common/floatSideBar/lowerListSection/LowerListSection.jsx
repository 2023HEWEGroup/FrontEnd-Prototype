import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpIcon from '@mui/icons-material/Help';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ListItem, ListItemText, useTheme } from '@mui/material';
import DestructionModal from '../../admin/destructionModal/DestructionModal';
import { useDispatch, useSelector } from 'react-redux';
import { dropUser } from '../../../../redux/features/userSlice';
import { ExitToApp } from '@mui/icons-material';
import LoginRequiredModal from '../../loginRequiredModal/LoginRequiredModal';


const LowerListSection = (props) => {

    const [isDestructOpen, setIsDestructOpen] = useState(false);
    const [isLoginModalSetting, setIsLoginModalSetting] = useState(false);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const handleLogout = () => {
        dispatch(dropUser());
        navigate("/");
        window.location.reload()
    }

    const handleNavigateLogin = () => {
        navigate(`/?recommend=true&back=${location.pathname}`);
    }

    const handleIsLoginSetting = (e) => {
        e.preventDefault();
        if (!user) {
            setIsLoginModalSetting(true);
        } else {
            navigate(`/setting`);
        }
    }

    return (
        <>
            <StyledListBlock>
                <StyledListItem>
                    <StyledLink to={"/setting"} onClick={handleIsLoginSetting}>
                        <StyledListElements theme={theme} style={props.page.startsWith('/setting') ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page.startsWith('/setting') ? <StyledSettingsIcon color='secondary' /> : <StyledSettingsOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="設定" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/info"}>
                        <StyledListElements theme={theme} style={props.page === "/info" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/info" ? <StyledInfoIcon color='secondary' /> : <StyledInfoOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="インフォメーション" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/help"}>
                        <StyledListElements theme={theme} style={props.page === "/help" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/help" ? <StyledHelpIcon color='secondary' /> : <StyledHelpOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ヘルプ" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/"}>
                    <StyledListElements theme={theme}>
                            <StyledArrowBackIcon color='icon'/>
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="トップページ" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                {user ?
                <StyledListItem onClick={() => setIsDestructOpen(true)}>
                    <StyledListElements theme={theme}>
                        <StyledLogoutIcon theme={theme}/>
                        <StyledListItemText primaryTypographyProps={{color: theme.palette.text.error}} primary="ログアウト" />
                    </StyledListElements>
                </StyledListItem>
                :
                <StyledListItem onClick={handleNavigateLogin}>
                    <StyledListElements theme={theme}>
                        <StyledExitToApp theme={theme}/>
                        <StyledListItemText primaryTypographyProps={{color: theme.palette.secondary.main}} primary="ログイン" />
                    </StyledListElements>
                </StyledListItem>
                }
            </StyledListBlock>

            <LoginRequiredModal open={isLoginModalSetting} onClose={() => setIsLoginModalSetting(false)} header="ログインが必要です。" desc={"アカウント設定を行うにはログインします"}/>

            {user ? <DestructionModal isDestructOpen={isDestructOpen} setIsDestructOpen={setIsDestructOpen} handleInputDelete={handleLogout} act="ログアウト"
            header="本当にログアウトしますか？" desc={`${user.username}からログアウトします。\nログアウト後はトップページに戻ります。`} /> : null}
        </>
    )
}


const StyledListBlock = styled.div`
    padding 15px 0;

    &:nth-child(1) {
        padding-top: 0;
    }
`

const StyledLink = styled(Link)`
    && {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #000;
        text-decoration: none;
    }
`

const StyledListItem = styled(ListItem)`
    && {
        justify-content: center;
        height: 45px;
        width: 230px;
        padding: 0;
    }
`

const StyledListElements = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    height: 100%;
    width: 95%;
    padding-left: 5px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
`

const StyledListItemText = styled(ListItemText)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const StyledSettingsIcon = styled(SettingsIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledSettingsOutlinedIcon = styled(SettingsOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledHelpIcon = styled(HelpIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledHelpOutlinedIcon = styled(HelpOutlineOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledLogoutIcon = styled(LogoutIcon)`
    && {
        width: 25px;
        height: 25px;
        color: ${(props) => props.theme.palette.text.error};
    }
`

const StyledExitToApp = styled(ExitToApp)`
    && {
        width: 25px;
        height: 25px;
        color: ${(props) => props.theme.palette.secondary.main};
    }
`

const StyledInfoIcon = styled(InfoIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledArrowBackIcon = styled(ArrowBackIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`


export default LowerListSection