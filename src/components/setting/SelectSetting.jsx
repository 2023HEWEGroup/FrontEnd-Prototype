import { KeyboardArrowRight } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, useTheme } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const SelectSetting = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    return (
        <StyledSelectSetting theme={theme}>
            <StyledHeader theme={theme}>設定</StyledHeader>
            <List>
                <Link to="/setting/account" style={{textDecoration: "none", color: "transparent"}}>
                    <StyledListItemButton $selected={path === "/setting/account"} theme={theme} onClick={() => navigate("/setting/account")}>
                        <StyledListItemText theme={theme} primary="アカウント"/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItemButton>
                </Link>
                <StyledListItemButton theme={theme}>
                    <StyledListItemText theme={theme} primary="テーマ"/>
                    <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                </StyledListItemButton>
            </List>
        </StyledSelectSetting>
    )
}


const StyledSelectSetting = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 0;
    border-left: solid 1px ${(props) => props.theme.palette.line.tab};
    border-right: solid 1px ${(props) => props.theme.palette.line.tab};
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 15px;
    color: ${(props) => props.theme.palette.text.main};
    font-weight: bold;
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledListItemButton = styled(ListItemButton)`
    && {
        background-color: ${(props) => props.$selected ? props.theme.palette.background.hover2 : "transparent"};
        border-right: ${(props) => props.$selected ? `solid 2px ${props.theme.palette.secondary.main}` : "none"};
        transition: background-color ease-in-out 0.1s;
        color: ${(props) => props.theme.palette.secondary.main};
        &:hover {
            background-color: ${(props) => props.theme.palette.background.hover2};
        }
    }
`

const StyledListItemText = styled(ListItemText)`
    && {
        color: ${(props) => props.theme.palette.text.main};
    }
`


export default SelectSetting