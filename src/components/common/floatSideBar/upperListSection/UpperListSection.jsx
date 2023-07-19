import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ListItem, ListItemText, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';


const UpperListSection = (props) => {
    return (
        <>
            <StyledListBlock>
                <StyledListItem>
                    <Tooltip title="ホーム" placement='right' arrow={true}>
                        <StyledLink to={"/home"}>
                            <StyledListElements style={props.page === "/home" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/home" ? <StyledHomeIcon color='secondary' /> : <StyledHomeOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="ホーム" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="商品" placement='right' arrow={true}>
                        <StyledLink to={"/product"}>
                            <StyledListElements style={props.page === "/product" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/product" ? <StyledShoppingCartIcon color='secondary' /> : <StyledShoppingCartOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="商品" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="出品" placement='right' arrow={true}>
                        <StyledLink to={"/exhibit"}>
                            <StyledListElements style={props.page === "/exhibit" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/exhibit" ? <StyledAddBoxIcon color='secondary' /> : <StyledAddBoxOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="出品" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="通知" placement='right' arrow={true}>
                        <StyledLink to={"/notify"}>
                            <StyledListElements style={props.page === "/notify" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/notify" ? <StyledNotificationsIcon color='secondary' /> : <StyledNotificationsOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="通知" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="プロフィール" placement='right' arrow={true}>
                        <StyledLink to={"/profile"}>
                            <StyledListElements style={props.page === "/profile" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/profile" ? <StyledAccountCircleIcon color='secondary' /> : <StyledAccountCircleOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="プロフィール" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="フォロー中" placement='right' arrow={true}>
                        <StyledLink to={"/following"}>
                            <StyledListElements style={props.page === "/following" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/following" ? <StyledGroupIcon color='secondary' /> : <StyledGroupOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="フォロー中" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="グループ" placement='right' arrow={true}>
                        <StyledLink to={"/group"}>
                            <StyledListElements style={props.page === "/group" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "/group" ? <StyledFolderSharedIcon color='secondary' /> : <StyledFolderSharedOutlinedIcon color="icon"/>}
                                <StyledListItemText primary="グループ" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
            </StyledListBlock>
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
        background-color: rgba(0, 0, 0, 0.1);
        transition: 0.2s;
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

const StyledAddBoxIcon = styled(AddBoxIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`
const StyledAddBoxOutlinedIcon = styled(AddBoxOutlinedIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

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