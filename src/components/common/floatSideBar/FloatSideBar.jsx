import { Avatar, Divider, Drawer, List, ListItem, ListItemText, useTheme } from '@mui/material'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { booleanFloatSideBarFollowing } from '../../../redux/features/floatSideBarFollowingSlice';
import { booleanFloatSideBarGroup } from '../../../redux/features/floatSideBarGroupSlice';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpIcon from '@mui/icons-material/Help';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEffect } from 'react';
import { booleanFloatSideBar } from '../../../redux/features/floatSideBarSlice';


const FloatSideBar = (props) => {

    const accounts = [{
        id: 1,
        name: "account1aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
        id: 2,
        name: "account2ああああああああああああああ",
    },
    {
        id: 3,
        name: "account3",
    },
    {
        id: 4,
        name: "account4",
    },
    {
        id: 5,
        name: "account5",
    },
    {
        id: 6,
        name: "account6",
    },
    {
        id: 7,
        name: "account7",
    },]; 
    const groups = [{
        id: 1,
        name: "group1aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
        id: 2,
        name: "group2ああああああああああああああ",
    },
    {
        id: 3,
        name: "group3",
    },
    {
        id: 4,
        name: "group4",
    },
    {
        id: 5,
        name: "group5",
    },
    {
        id: 6,
        name: "group6",
    },
    {
        id: 7,
        name: "group7",
    },]; 

    const dispatch = useDispatch();
    const theme = useTheme();
    const isSideOpen = useSelector((state => state.floatSideBar.value));
    const isOpenFollowing = useSelector((state => state.floatSideBarFollowing.value));
    const isOpenGroup = useSelector((state => state.floatSideBarGroup.value));
    const visibleAccounts = isOpenFollowing ? accounts : accounts.slice(0, 5);
    const visibleGroups = isOpenGroup ? groups : groups.slice(0, 5);

    const toggleFollowingShowAll = () => {
        dispatch(booleanFloatSideBarFollowing());
    }

    const toggleGroupShowAll = () => {
        dispatch(booleanFloatSideBarGroup());
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            dispatch(booleanFloatSideBar());
        }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    })

    return (
    <Drawer sx={{'& ::-webkit-scrollbar': {display: "none"}, '& :hover': {'::-webkit-scrollbar': {display: "inline"}}}}
    variant='persistent' anchor='left' open={isSideOpen} PaperProps={{style: { borderRight: 'none', marginTop: "55px" }}} transitionDuration={0}>
        <StyledList style={{backgroundColor: theme.palette.primary.main}}>

            <StyledListBlock>
                <StyledListItem>
                    <Tooltip title="ホーム" placement='right' arrow={true}>
                        <StyledLink to={"/home"}>
                            <StyledListElements style={props.page === "home" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "home" ? <StyledHomeIcon color='secondary' /> : <StyledHomeOutlinedIcon />}
                                <StyledListItemText primary="ホーム" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="商品" placement='right' arrow={true}>
                        <StyledLink to={"/product"}>
                            <StyledListElements style={props.page === "product" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "product" ? <StyledShoppingCartIcon color='secondary' /> : <StyledShoppingCartOutlinedIcon />}
                                <StyledListItemText primary="商品" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="出品" placement='right' arrow={true}>
                        <StyledLink to={"/exhibit"}>
                            <StyledListElements style={props.page === "exhibit" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "exhibit" ? <StyledAddBoxIcon color='secondary' /> : <StyledAddBoxOutlinedIcon />}
                                <StyledListItemText primary="出品" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="通知" placement='right' arrow={true}>
                        <StyledLink to={"/notify"}>
                            <StyledListElements style={props.page === "notify" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "notify" ? <StyledNotificationsIcon color='secondary' /> : <StyledNotificationsOutlinedIcon />}
                                <StyledListItemText primary="通知" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="プロフィール" placement='right' arrow={true}>
                        <StyledLink to={"/profile"}>
                            <StyledListElements style={props.page === "profile" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "profile" ? <StyledAccountCircleIcon color='secondary' /> : <StyledAccountCircleOutlinedIcon />}
                                <StyledListItemText primary="プロフィール" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="フォロー中" placement='right' arrow={true}>
                        <StyledLink to={"/following"}>
                            <StyledListElements style={props.page === "following" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "following" ? <StyledGroupIcon color='secondary' /> : <StyledGroupOutlinedIcon />}
                                <StyledListItemText primary="フォロー中" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="グループ" placement='right' arrow={true}>
                        <StyledLink to={"/group"}>
                            <StyledListElements style={props.page === "group" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "group" ? <StyledFolderSharedIcon color='secondary' /> : <StyledFolderSharedOutlinedIcon />}
                                <StyledListItemText primary="グループ" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
            </StyledListBlock>

            <Divider>
                <StyledListTitle>フォロー中</StyledListTitle>
            </Divider>

            <StyledListBlockWithTitle>
                {visibleAccounts.map((account) => 
                <StyledListItem key={account.id}>
                    <Tooltip title={account.name} placement='right' arrow={true}>
                        <StyledListElements>
                            <StyledAvatar />
                            <StyledListItemText primary={account.name} />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>)}
                {accounts.length > 5 && !isOpenFollowing && (
                    <StyledListItem>
                        <Tooltip title="すべて表示" placement='right'>
                            <StyledListElements onClick={toggleFollowingShowAll}>
                                <StyledListItemText primary="すべて表示"/>
                                <StyledExpandMoreIcon />
                            </StyledListElements>
                        </Tooltip>
                    </StyledListItem>
                )}
                {accounts.length > 5 && isOpenFollowing && (
                    <StyledListItem>
                    <Tooltip title="折りたたむ" placement='right'>
                        <StyledListElements onClick={toggleFollowingShowAll}>
                            <StyledListItemText primary="折りたたむ"/>
                            <StyledExpandLessIcon />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>
                )}
            </StyledListBlockWithTitle>

            <Divider>
                <StyledListTitle>グループ</StyledListTitle>
            </Divider>

            <StyledListBlockWithTitle>
                {visibleGroups.map((group) => 
                <StyledListItem key={group.id}>
                    <Tooltip title={group.name} placement='right' arrow={true}>
                        <StyledListElements>
                            <StyledAvatar variant='square' />
                            <StyledListItemText primary={group.name} />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>)}
                {groups.length > 5 && !isOpenGroup && (
                    <StyledListItem>
                        <Tooltip title="すべて表示" placement='right'>
                            <StyledListElements onClick={toggleGroupShowAll}>
                                <StyledListItemText primary="すべて表示"/>
                                <StyledExpandMoreIcon />
                            </StyledListElements>
                        </Tooltip>
                    </StyledListItem>
                )}
                {groups.length > 5 && isOpenGroup && (
                    <StyledListItem>
                    <Tooltip title="折りたたむ" placement='right'>
                        <StyledListElements onClick={toggleGroupShowAll}>
                            <StyledListItemText primary="折りたたむ"/>
                            <StyledExpandLessIcon />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>
                )}
            </StyledListBlockWithTitle>

            <Divider />

            <StyledListBlock>
                <StyledListItem>
                    <Tooltip title="設定" placement='right' arrow={true}>
                        <StyledLink to={"/setting"}>
                            <StyledListElements style={props.page === "setting" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "setting" ? <StyledSettingsIcon color='secondary' /> : <StyledSettingsOutlinedIcon />}
                                <StyledListItemText primary="設定" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="インフォメーション" placement='right' arrow={true}>
                        <StyledLink to={"/info"}>
                            <StyledListElements style={props.page === "info" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "info" ? <StyledInfoIcon color='secondary' /> : <StyledInfoOutlinedIcon />}
                                <StyledListItemText primary="インフォメーション" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="ヘルプ" placement='right' arrow={true}>
                        <StyledLink to={"/help"}>
                            <StyledListElements style={props.page === "help" ? { backgroundColor: "rgba(0,0,0,0.1)" } : null}>
                                {props.page === "help" ? <StyledHelpIcon color='secondary' /> : <StyledHelpOutlinedIcon />}
                                <StyledListItemText primary="ヘルプ" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="トップページ" placement='right' arrow={true}>
                        <StyledLink to={"/"}>
                        <StyledListElements>
                                <StyledArrowBackIcon/>
                                <StyledListItemText primary="トップページ" />
                            </StyledListElements>
                        </StyledLink>
                    </Tooltip>
                </StyledListItem>
                <StyledListItem>
                    <Tooltip title="ログアウト" placement='right' arrow={true}>
                        <StyledListElements>
                            <StyledLogoutIcon/>
                            <StyledListItemText primary="ログアウト" />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>
            </StyledListBlock>

        </StyledList>
    </Drawer>
    )
}


const StyledList = styled(List)`
    && {
        position: fixed;
        overflow-y: scroll;
        width: 240px;
        height: calc(100vh - 55px);
    }
`

const StyledListItem = styled(ListItem)`
    && {
        justify-content: center;
        height: 45px;
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

const StyledListBlockWithTitle = styled.div`
    padding-bottom 15px;

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

const StyledListTitle = styled.div`
    height: 50%;
    width: 95%;
    text-align: left;
    padding-left: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    color: #777;
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
        color: #777;
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
        color: #777;
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
        color: #777;
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
        color: #777;
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
        color: #777;
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
        color: #777;
    }
`;

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
        color: #777;
    }
`

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
        color: #777;
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
        color: #777;
    }
`

const StyledLogoutIcon = styled(LogoutIcon)`
    && {
        width: 25px;
        height: 25px;
        color: #777;
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
        color: #777;
    }
`

const StyledArrowBackIcon = styled(ArrowBackIcon)`
    && {
        width: 25px;
        height: 25px;
        color: #777;
    }
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 35px;
        height: 35px;
        color: #777;
    }
`

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
    && {
        width: 25px;
        height: 25px;
        color: #777;
    }
`

const StyledExpandLessIcon = styled(ExpandLessIcon)`
    && {
        width: 25px;
        height: 25px;
        color: #777;
    }
`


export default FloatSideBar