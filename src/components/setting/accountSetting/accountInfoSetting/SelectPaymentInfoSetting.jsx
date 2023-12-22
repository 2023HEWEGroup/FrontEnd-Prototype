import { ArrowBack, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton, List, ListItemButton, ListItemText, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const SelectPaymentInfoSetting = (props) => {

    const [number, setNumber] = useState("");
    const theme = useTheme();

    useEffect(() => {
        const fetchCardNumber = async () => {
            if (!props.currentUser.creditCard.number) return;
            try {
                const response = await axios.get(`http://localhost:5000/client/auth/number/${props.currentUser._id}`);
                setNumber(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCardNumber();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                <Link to="/setting/account">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                <div>お支払い方法</div>
            </StyledTitle>
            <StyledDesc theme={theme}>ポイントやクレジットカードなどの情報を管理できます。</StyledDesc>
        </StyledHeader>

        <StyledList>
            <StyledListInner theme={theme}>
                <Link to="/setting/account/point" style={{textDecoration: "none", color: "transparent"}}>
                    <StyledListItemButton theme={theme}>
                        <ListItemText primary="コードを利用" secondary={`${props.currentUser.points} ポイント`}
                        primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.secondary.main }}/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItemButton>
                </Link>
                <Link to="/setting/account/creditCardDetail" style={{textDecoration: "none", color: "transparent"}}>
                    <StyledListItemButton theme={theme}>
                        <ListItemText primary={props.currentUser.creditCard.number ? "クレジットカード詳細" : "クレジットカードを追加"} secondary={number ? number : ""}
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


export default SelectPaymentInfoSetting