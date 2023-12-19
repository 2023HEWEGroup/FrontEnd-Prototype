import { ArrowBack, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton, List, ListItemButton, ListItemText, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const SelectAccountInfoSetting = (props) => {

    const theme = useTheme();

    const returnSpan = () => {
        if (!props.currentUser.isAuthorized) {
            return (
                    <>
                    <div>メールアドレス</div>
                    <span style={{color: theme.palette.text.error, fontSize: "0.8rem"}}>未認証</span>
                    </>
            )
        } else {
            return "メールアドレス"
        }
    }

    function formatPhoneNumber(phoneNumber) {
        const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        return formattedNumber;
    }

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                <Link to="/setting/account">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                <div>アカウント情報</div>
            </StyledTitle>
            <StyledDesc theme={theme}>アカウント情報の設定です</StyledDesc>
        </StyledHeader>

        <StyledList>
            <StyledListInner theme={theme}>
                <Link to="/setting/account/userId" style={{textDecoration: "none", color: "transparent"}}>
                    <StyledListItemButton theme={theme}>
                        <ListItemText primary="ユーザーID" secondary={`@${props.currentUser.userId}`}
                        primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItemButton>
                </Link>
                <Link to="/setting/account/phoneNumber" style={{textDecoration: "none", color: "transparent"}}>
                    <StyledListItemButton theme={theme}>
                        <ListItemText primary="電話番号" secondary={formatPhoneNumber(props.currentUser.phoneNumber)}
                        primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItemButton>
                </Link>
                <Link to="/setting/account/mailAddress" style={{textDecoration: "none", color: "transparent"}}>
                    <StyledListItemButton theme={theme}>
                        <ListItemText primary={returnSpan()} secondary={props.currentUser.isAuthorized ? props.currentUser.email : props.currentUser.authToken.unverifiedEmail} 
                        primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItemButton>
                </Link>
            </StyledListInner>
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

const StyledListInner = styled.div`
    border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};
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


export default SelectAccountInfoSetting