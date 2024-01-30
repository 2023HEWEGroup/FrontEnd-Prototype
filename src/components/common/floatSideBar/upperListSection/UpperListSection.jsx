import React, { useState } from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ListItem, ListItemText, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginRequiredModal from '../../loginRequiredModal/LoginRequiredModal';


const UpperListSection = (props) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const [isLoginModal, setIsLoginModal] = useState(false);

    const handleIsLogin = (e) => {
        e.preventDefault();
        if (!user) {
            setIsLoginModal(true);
        } else {
            navigate(`/user/${user._id}`);
        }
    }

    return (
        <>
            <StyledListBlock>
                <StyledListItem>
                    <StyledLink to={"/home"}>
                        <StyledListElements theme={theme} style={props.page === "/home" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/home" ? <StyledHomeIcon color='secondary' /> : <StyledHomeOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="ホーム" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/home"}>
                        <StyledListElements theme={theme} style={props.page === "/product" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/product" ? <StyledShoppingCartIcon color='secondary' /> : <StyledShoppingCartOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="商品" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/notify"}>
                        <StyledListElements theme={theme} style={props.page === "/notify" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/notify" ? <StyledNotificationsIcon color='secondary' /> : <StyledNotificationsOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="通知" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={`/user/${user ? user._id : ""}`} onClick={handleIsLogin}>
                        <StyledListElements theme={theme} style={props.page === `/user/${user ? user._id : ""}` ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === `/user/${user ? user._id : ""}` ? <StyledAccountCircleIcon color='secondary' /> : <StyledAccountCircleOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="プロフィール" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/following"}>
                        <StyledListElements theme={theme} style={props.page === "/following" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/following" ? <StyledGroupIcon color='secondary' /> : <StyledGroupOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="フォロー中" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
                <StyledListItem>
                    <StyledLink to={"/group"}>
                        <StyledListElements theme={theme} style={props.page === "/group" ? { backgroundColor: theme.palette.background.hover } : null}>
                            {props.page === "/group" ? <StyledFolderSharedIcon color='secondary' /> : <StyledFolderSharedOutlinedIcon color="icon"/>}
                            <StyledListItemText primaryTypographyProps={{color: theme.palette.text.main}} primary="グループ" />
                        </StyledListElements>
                    </StyledLink>
                </StyledListItem>
            </StyledListBlock>

            <LoginRequiredModal open={isLoginModal} onClose={() => setIsLoginModal(false)} header="ログインが必要です。" desc={"ログインしてプロフィールをカスタマイズしてみましょう！"}/>
        </>
    )
}


const StyledListItem = styled(ListItem)`
    && {
        justify-content: center;
        height: 45px;
        width: 230px;
        padding: 0;
    }
`

const StyledListItemText = styled(ListItemText)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

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

const StyledHomeIcon = styled(HomeIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledHomeOutlinedIcon = styled(HomeOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledShoppingCartOutlinedIcon = styled(ShoppingCartOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledGroupIcon = styled(GroupIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledGroupOutlinedIcon = styled(GroupOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledFolderSharedIcon = styled(FolderSharedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledFolderSharedOutlinedIcon = styled(FolderSharedOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledNotificationsIcon = styled(NotificationsIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledNotificationsOutlinedIcon = styled(NotificationsOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`


export default UpperListSection