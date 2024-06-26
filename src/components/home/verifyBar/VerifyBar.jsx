import { Close } from '@mui/icons-material';
import { AppBar, Button, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const VerifyBar = (props) => {

    const isSideOpen = useSelector((state => state.floatSideBar.value));
    const isScrollable = useSelector((state => state.windowScrollable.value));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    return (
        <>
        <StyledVerifyBar $isSmallScreen={isSmallScreen} $isScrollable={isScrollable} $isSideOpen={isSideOpen} theme={theme}>
            <StyledClose theme={theme} onClick={() => props.setIsVerifyRecommend(false)}/>
            <StyledBarInner>
                <StyledTitle>アカウントの二段階認証が完了していません。認証コードを入力してメールアドレスを認証して下さい。</StyledTitle>
                <StyledLink to="/setting/account/mailAddress?isAuth=true">
                    <StyledButton theme={theme}>認証</StyledButton>
                </StyledLink>
            </StyledBarInner>
        </StyledVerifyBar>
        <div style={{width: "100%", height: "30px"}}></div>
        </>
    )
}


const StyledVerifyBar = styled(AppBar)`
    && {
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 115px;
        left: ${(props) => props.$isSideOpen ? props.$isSmallScreen ? "0px" : "240px" : props.$isSmallScreen ? "0px" : "75px"};
        height: 30px;
        width: ${(props) => props.$isSideOpen ? props.$isSmallScreen ? "calc(100vw - 10px)" : "calc(100vw - 250px)" : props.$isSmallScreen ? "calc(100vw - 10px)" : "calc(100vw - 85px)"};
        color: ${(props) => props.theme.palette.text.verifyBar};
        background-color: ${(props) => props.theme.palette.secondary.main};
    }
`

const StyledClose = styled(Close)`
    && {
        position: absolute;
        right: 2%;
        cursor: pointer;
        color: ${(props) => props.theme.palette.text.verifyBar};
    }
`

const StyledBarInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 90%;
    height: 100%;
    overflow: hidden;
`

const StyledTitle = styled.div`
    max-width: 90%;
    font-size: 0.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledLink = styled(Link)`
    && {
        width: 10%;
        height: 90%;
    }
`

const StyledButton = styled(Button)`
    && {
        width: 100%;
        height: 100%;
        color: ${(props) => props.theme.palette.text.verifyBar};
        border: solid 1px ${(props) => props.theme.palette.text.verifyBar};
        .MuiTouchRipple-child {
            background-color: transparent;
        }
    }
`


export default VerifyBar