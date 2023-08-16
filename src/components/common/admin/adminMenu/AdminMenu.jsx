import { AccountCircleOutlined, AdsClick, AttachMoney, CurrencyExchange, Dashboard, FolderSharedOutlined, HelpOutlineOutlined, HomeOutlined, InfoOutlined,  Inventory2Outlined, SettingsOutlined } from '@mui/icons-material'
import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const AdminMenu = (props) => {

    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();

    return (
        <StyledMenu>
            <StyledItem>
                <StyledTitle theme={theme} $isXsScreen={isXsScreen}>管理</StyledTitle>
                <StyledLink theme={theme} to="/admin" style={{backgroundColor: props.page === "/admin" ? theme.palette.background.hover : ""}}>
                    <Dashboard color={props.page === "/admin" ? 'secondary' : ""}/>
                    <StyledListItemTitle $isXsScreen={isXsScreen}>管理トップ</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/admin/user" style={{backgroundColor: props.page === "/admin/user" ? theme.palette.background.hover : ""}}>
                    <AccountCircleOutlined color={props.page === "/admin/user" ? 'secondary' : ""}/>
                    <StyledListItemTitle $isXsScreen={isXsScreen}>ユーザー管理</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <Inventory2Outlined />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>商品管理</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <CurrencyExchange />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>取引管理</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <FolderSharedOutlined />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>グループ管理</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <AttachMoney />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>収益</StyledListItemTitle>
                </StyledLink>
            </StyledItem>
            <StyledItem>
                <StyledTitle $isXsScreen={isXsScreen} theme={theme}>サイトコンテンツ</StyledTitle>
                <StyledLink theme={theme} to="/home">
                    <AdsClick />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>広告</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <InfoOutlined />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>インフォメーション</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <HelpOutlineOutlined />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>ヘルプ</StyledListItemTitle>
                </StyledLink>
            </StyledItem>
            <StyledItem>
                <StyledTitle $isXsScreen={isXsScreen} theme={theme}>その他</StyledTitle>
                <StyledLink theme={theme} to="/home">
                    <HomeOutlined />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>ホーム</StyledListItemTitle>
                </StyledLink>
                <StyledLink theme={theme} to="/home">
                    <SettingsOutlined />
                    <StyledListItemTitle $isXsScreen={isXsScreen}>アドミン管理</StyledListItemTitle>
                </StyledLink>
            </StyledItem>
        </StyledMenu>
    )
}


const StyledMenu = styled.div`
    width: 100%;
`

const StyledItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

const StyledTitle = styled.span`
    font-size: 12px;
    font-weight: 200;
    margin-bottom: 10px;
    color: ${(props) => props.theme.palette.text.sub};
    white-space: nowrap;
    ${(props) => (props.$isXsScreen ? "display: none" : null)};
`

const StyledLink = styled(Link)`
    && {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 5px;
        color: ${(props) => props.theme.palette.text.sub};
        text-decoration: none;

        &:hover {
            background-color: ${(props) => props.theme.palette.background.hover};
        }
    }
`

const StyledListItemTitle = styled.span`
    white-space: nowrap;
    ${(props) => (props.$isXsScreen ? "display: none" : null)};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`


export default AdminMenu