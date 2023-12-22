import { AccountCircleOutlined, ArrowBack, KeyboardArrowRight, Payment, VpnKeyOutlined } from '@mui/icons-material';
import { IconButton, List, ListItemAvatar, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const SelectAccountSetting = (props) => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                {isSmallScreen &&
                <Link to="/setting">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                }
                <div>アカウント</div>
            </StyledTitle>
            <StyledDesc theme={theme}>アカウントについての設定を変更することが出来ます。</StyledDesc>
        </StyledHeader>

        <StyledList>
            <Link to="/setting/account/accountInfo" style={{textDecoration: "none", color: "transparent"}}>
                <StyledListItemButton theme={theme}>
                    <ListItemAvatar>
                        <AccountCircleOutlined style={{color: theme.palette.icon.main}}/>
                    </ListItemAvatar>
                    <ListItemText primary="アカウント情報" secondary="メールアドレスや住所などのアカウント情報を管理できます。" 
                    primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                    <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                </StyledListItemButton>
            </Link>
            <Link to="/setting/account/paymentInfo" style={{textDecoration: "none", color: "transparent"}}>
                <StyledListItemButton theme={theme}>
                    <ListItemAvatar>
                        <Payment style={{color: theme.palette.icon.main}}/>
                    </ListItemAvatar>
                    <ListItemText primary="お支払い方法" secondary="ポイントやクレジットカードなどの情報を管理できます。" 
                    primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                    <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                </StyledListItemButton>
            </Link>
            <StyledListItemButton theme={theme}>
                <ListItemAvatar>
                    <VpnKeyOutlined style={{color: theme.palette.icon.main}}/>
                </ListItemAvatar>
                <ListItemText primary="パスワードを変更する" secondary="パスワードはいつでも変更できます。" 
                primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
            </StyledListItemButton>
        </StyledList>
        </>
    )
}


const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 0 15px;
`

const StyledTitle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: 50px;
    color: ${(props) => props.theme.palette.text.main};
    font-weight: bold;
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledDesc = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.85rem;
    word-wrap: break-word;
`

const StyledList = styled(List)`
    && {
        width: 100%;
    }
`

const StyledListItemButton = styled(ListItemButton)`
    && {
        transition: background-color ease-in-out 0.1s;
        color: ${(props) => props.theme.palette.secondary.main};
        &:hover {
            background-color: ${(props) => props.theme.palette.background.hover2};
        }
    }
`


export default SelectAccountSetting