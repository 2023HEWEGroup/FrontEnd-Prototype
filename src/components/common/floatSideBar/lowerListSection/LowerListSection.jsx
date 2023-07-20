import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpIcon from '@mui/icons-material/Help';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ListItem, ListItemText, Tooltip, useTheme } from '@mui/material';


const LowerListSection = (props) => {

    const theme = useTheme();

    return (
        <>
            <StyledListBlock>
                <StyledListItem>
                    <Tooltip title="設定" placement='right' arrow={true}>
                        <StyledLink to={"/setting"}>
                            <StyledListElements theme={theme} style={props.page === "/setting" ? { backgroundColor: theme.palette.background.hover } : null}>
                                {props.page === "/setting" ? <StyledSettingsIcon color='secondary' /> : <StyledSettingsOutlinedIcon color="icon"/>}
                                <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="設定" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="インフォメーション" placement='right' arrow={true}>
                        <StyledLink to={"/info"}>
                            <StyledListElements theme={theme} style={props.page === "/info" ? { backgroundColor: theme.palette.background.hover } : null}>
                                {props.page === "/info" ? <StyledInfoIcon color='secondary' /> : <StyledInfoOutlinedIcon color="icon"/>}
                                <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="インフォメーション" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="ヘルプ" placement='right' arrow={true}>
                        <StyledLink to={"/help"}>
                            <StyledListElements theme={theme} style={props.page === "/help" ? { backgroundColor: theme.palette.background.hover } : null}>
                                {props.page === "/help" ? <StyledHelpIcon color='secondary' /> : <StyledHelpOutlinedIcon color="icon"/>}
                                <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ヘルプ" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="トップページ" placement='right' arrow={true}>
                        <StyledLink to={"/"}>
                        <StyledListElements theme={theme}>
                                <StyledArrowBackIcon color='icon'/>
                                <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="トップページ" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="ログアウト" placement='right' arrow={true}>
                        <StyledListElements theme={theme}>
                            <StyledLogoutIcon color='icon'/>
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ログアウト" />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>
            </StyledListBlock>
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