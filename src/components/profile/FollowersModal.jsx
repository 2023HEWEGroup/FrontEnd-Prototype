import { Alert, Avatar, Button, Chip, CircularProgress, LinearProgress, Modal, Slide, Snackbar, Tab, Tabs, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../redux/features/userSlice';
import ErrorSnack from '../common/errorSnack/ErrorSnack';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const FollowersModal = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState();
    const [tabValue, setTabValue] = useState(props.isFollowDisplay ? 0 : 1);
    const [isNextLoading, setIsNextLoading] = useState(false);
    const [pageNumber, setPasgeNumber] = useState(1);
    const PAGE_SIZE = 20;
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const dispatch = useDispatch();
    const listRef = useRef();
    const theme = useTheme();

    const [isFollowDisabled, setIsFollowDisabled] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isFollowSnack, setIsFollowSnack] = useState(false);
    const [isUnFollowSnack, setIsUnFollowSnack] = useState(false);
    const [snackUsername, setSnackUsername] = useState("");

    const handleTabChange = async (event, newValue) => {
        try {
            setTabValue(newValue);
            if (newValue === 0) {
                props.setIsFollowDisplay(true);
            } else if (newValue === 1) {
                props.setIsFollowDisplay(false);
            }
            const response = await axios.get(`http://localhost:5000/client/user/${newValue === 0 ? "getFollowings" : "getFollowers"}/${props.user._id}/?page=${1}&pageSize=${PAGE_SIZE}`);
            setUsers(response.data);
        } catch (err) {
            if (err.response) {
                console.log(err);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
                setIsErrorSnack(true);
            } else {
                console.log(err);
            }
            setIsFollowDisabled(false);
        }
    };  

    const handleFollow = async (e, user, flag) => {
        try {
            e.preventDefault();
            setIsFollowDisabled(true);
            await axios.put(`http://localhost:5000/client/user/follow/${user._id}`, {_id: props.currentUser._id});
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
            if (flag) {
                setSnackUsername(user.username);
                setIsFollowSnack(true);
            } else {
                setSnackUsername(user.username);
                setIsUnFollowSnack(true);
            }
            setIsFollowDisabled(false);
        } catch (err) {
            if (err.response) {
                console.log(err);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
                setIsErrorSnack(true);
            } else {
                console.log(err);
            }
            setIsFollowDisabled(false);
        }
    }

    const handleScroll = async () => {
        try {
            // スクロール位置が一番下に達したら新しいデータをフェッチ (スクロール最下層判定誤差1px許容)
            if (listRef.current.scrollHeight - (listRef.current.scrollTop + listRef.current.clientHeight) <= 1) {
                setIsNextLoading(true);
                const response = await axios.get(`http://localhost:5000/client/user/${props.isFollowDisplay ? "getFollowings" : "getFollowers"}/${props.user._id}/?page=${pageNumber + 1}&pageSize=${PAGE_SIZE}`);
                if (response.data.length === 0) return; // これ以上ユーザーをフェッチできなければ追加しない
                setUsers([...users, response.data]);
                setPasgeNumber((prev) => prev + 1);
                setIsNextLoading(false);
        }
        } catch (err) {
            if (err.response) {
                console.log(err);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
                setIsErrorSnack(true);
            } else {
                console.log(err);
            }
            setIsFollowDisabled(false);
            setIsNextLoading(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setPasgeNumber(1);
                const response = await axios.get(`http://localhost:5000/client/user/${props.isFollowDisplay ? "getFollowings" : "getFollowers"}/${props.user._id}/?page=${1}&pageSize=${PAGE_SIZE}`);
                setUsers(response.data);
                setIsLoading(false);
            } catch (err) {
                if (err.response) {
                    console.log(err);
                } else if (err.request) {
                    setSnackWarning("サーバーとの通信がタイムアウトしました。");
                    setIsErrorSnack(true);
                } else {
                    console.log(err);
                }
                setIsFollowDisabled(false);
            }
        }
        fetchUsers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledModal open={props.open} onClose={() => props.setIsProfileChange(true)}>
            <StyledInner theme={theme}>
                {props.user?
                <>
                <StyledModalHeader theme={theme}>
                    <StyledHeaderDesc theme={theme}>{`${props.user.username}さんの${props.isFollowDisplay ? "フォロー" : "フォロワー"} (${props.isFollowDisplay ? props.user.followings.length : props.user.followers.length})`}</StyledHeaderDesc>
                    <StyledSaveButton theme={theme} color="text" variant="contained" onClick={() => props.setIsProfileChange(true)}>戻る</StyledSaveButton>
                </StyledModalHeader>
                <StyledTabs value={tabValue} onChange={handleTabChange} indicatorColor='secondary' theme={theme}>
                    <StyledTab theme={theme} label="フォロー"></StyledTab>
                    <StyledTab theme={theme} label="フォロワー"></StyledTab>
                </StyledTabs>
                {isLoading ? <LinearProgress color='secondary' style={{backgroundColor: "transparent", width: "100%", marginTop: "50px"}}/> : null}
                <StyledFollowerList ref={listRef} onScroll={handleScroll}>
                    {!isLoading?
                    users.map(user =>
                        <Link key={user._id} to={`/user/${user._id}`} style={{textDecoration: "none", width: "90%"}}>
                            <StyledUserPanel>
                                <StyledUpperSection>
                                    <StyledIconAndName>
                                        <StyledIconZone>
                                            <StyledAvatar src={user.icon ? `http://localhost:5000/uploads/userIcons/${user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}`}/>
                                        </StyledIconZone>
                                        <StyledNameAndId>
                                            <StyledName theme={theme}>{user.username}</StyledName>
                                            <StyledId theme={theme}>@{user.userId}</StyledId>
                                        </StyledNameAndId>
                                    </StyledIconAndName>
                                    <StyledTabArea>
                                        {props.currentUser._id !== user._id ?
                                            props.currentUser.followings.includes(user._id) ?
                                            <StyledUnFollowTab label="フォロー中" $isFollowDisabled={isFollowDisabled} theme={theme} variant="outlined" clickable onClick={(e) => handleFollow(e, user, 0)}/>
                                            :
                                            <StyledFollowTab label="フォロー" $isFollowDisabled={isFollowDisabled} variant="outlined" color="secondary" clickable onClick={(e) => handleFollow(e, user, 1)}/>
                                        :
                                        null
                                        }
                                    </StyledTabArea>
                                </StyledUpperSection>
                                <StyledLOwerSection theme={theme}>
                                    {user.desc}
                                </StyledLOwerSection>
                            </StyledUserPanel>
                        </Link>
                    )
                    :
                    null
                    }

                    {isNextLoading && (props.isFollowDisplay ? props.user.followings.length !== users.length : props.user.followers.length !== users.length) ? <CircularProgress color='secondary'/> : null}

                </StyledFollowerList>
                </>
                :
                null
                }
            </StyledInner>
        </StyledModal>

        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

        <Snackbar open={isFollowSnack} onClose={() => setIsFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
            <Alert severity='info'>{`${snackUsername}さんをフォローしました`}</Alert>
        </Snackbar>
        <Snackbar open={isUnFollowSnack} onClose={() => setIsUnFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
            <Alert severity='warning'>{`フォローを解除しました`}</Alert>
        </Snackbar>
        </>
    )
}


const StyledModal = styled(Modal)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const StyledInner = styled.div`
    position: relative;
    width: 450px;
    max-width: 90vw;
    min-width: 40vw;
    height: 75%;
    border: solid 1px ${(props) => props.theme.palette.line.main};
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: ${(props) => props.theme.palette.background.modal2};
`

const StyledModalHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: ${(props => props.theme.palette.background.modalHeader)};
    padding: 0 20px;
`

const StyledHeaderDesc = styled.div`
    color: ${(props => props.theme.palette.top.secondary)};
    font-size: 1.1rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `

const StyledSaveButton = styled(Button)`
    && {
        height: 70%;
        font-weight: bold;
    }
`

const StyledTabs = styled(Tabs)`
    && {
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        .MuiTabs-indicator {
            bottom: 0;
        }
    }
`

const StyledTab = styled(Tab)`
    && {
        flex: 1 1 0;
        max-width: 50%;
        color: ${(props) => props.theme.palette.text.tab};
        border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};

        &.Mui-selected {
            color: ${(props) => props.theme.palette.text.main};
        }
    }
`

const StyledFollowerList = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    max-width: 1500px;
    height: calc(100% - 50px);
    margin: 90px auto 0 auto;
    padding: 30px 0;
`

const StyledUserPanel = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: fit-content;
`

const StyledUpperSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    height: 60px;
    width: 100%;
`

const StyledLOwerSection = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding-left: 70px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledIconAndName = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 70%;
    height: 100%;
`

const StyledIconZone = styled.div`
    width: 60px;
    aspect-ratio: 1/1;
    overflow: hidden;
`

const StyledNameAndId = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    width: 80%;
    height: 100%;
    padding-left: 10px;
`

const StyledName = styled.div`
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledId = styled.div`
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.palette.text.sub};
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledTabArea = styled.div`
    width: 30%;
    height: 100%;
`

const StyledFollowTab = styled(Chip)`
    && {
        width: 100%;
        height: 40px;
        font-size: 1rem;
        font-weight: bold;
        pointer-events: ${(props) => props.$isFollowDisabled ? "none" : "auto"};
    }
`

const StyledUnFollowTab = styled(Chip)`
    && {
        width: 100%;
        height: 40px;
        font-size: 1rem;
        font-weight: bold;
        pointer-events: ${(props) => props.$isFollowDisabled ? "none" : "auto"};
        color: ${(props) => props.theme.palette.text.main};
    }
`


export default FollowersModal