import { Search } from '@mui/icons-material';
import { Alert, Avatar, Button, Card, CardContent, CardHeader, CardMedia, Checkbox, FormControlLabel, IconButton, InputBase, Pagination, Paper, Slide, Snackbar, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';
import VerifiedBadge from '../layouts/badges/VerifiedBadge';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/features/userSlice';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};

const UserBadge = (user) => {
    return (
        <div style={{display: "flex", alignItems: "center", gap: "2px"}}>
        {user.isAuthorized ? (
            <>
            <VerifiedBadge fontSize="small"/>
            <span>{user.username}</span>
            </>
        ) : (
            <span>{user.username}</span>
        )}
        </div>
    );
    };


const Users = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const word = searchParams.get('word');
    const modeQuery = searchParams.get('mode');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchWord, setSearchWord] = useState(word ? word : "");
    const [users, setUsers] = useState(null);
    const [num, setNum] = useState(0);
    const PAGE_SIZE = 12;
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const currentUser = useSelector((state) => state.user.value);
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;

    
    const [mode, setMode] = useState({all: true, following: false, follower: false, authorized: false});

    const [isFollowDisabled, setIsFollowDisabled] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isFollowSnack, setIsFollowSnack] = useState(false);
    const [isUnFollowSnack, setIsUnFollowSnack] = useState(false);
    const [snackUsername, setSnackUsername] = useState("");

    const handleModeChange = (newMode) => {
        if (newMode === "all") {
            if (mode.all) setMode((prev) => ({...prev, all: false, following: false, follower: false, authorized: false}));
            else setMode((prev) => ({...prev, all: true, following: true, follower: true, authorized: true}));
        } else if (newMode === "following") {
            if (mode.following) setMode((prev) => ({...prev, all: false, following: false}));
            else setMode((prev) => ({...prev, all: mode.follower && mode.authorized ? true : false, following: true}));
        } else if (newMode === "follower") {
            if (mode.follower) setMode((prev) => ({...prev, all: false, follower: false}));
            else setMode((prev) => ({...prev, all: mode.following && mode.authorized ? true : false, follower: true}));
        } else if (newMode === "authorized") {
            if (mode.authorized) setMode((prev) => ({...prev, all: false, authorized: false}));
            else setMode((prev) => ({...prev, all: mode.following && mode.follower ? true : false, authorized: true}));
        }
    }

    const handleInputSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    const handleFollow = async (e, user, flag) => {
        try {
            e.preventDefault();
            setIsFollowDisabled(true);
            await axios.put(`http://localhost:5000/client/user/follow/${user._id}`, {_id: currentUser._id});
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${currentUser._id}`);
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

    const handleQueryNavigate = ({wordArg, modeArg}) => {
        // statusArg (map関数indexの文字列)
        let queryArray = [];

        if (wordArg === "unset") {
            // 検索ワードクエリを未設定にする場合
        } else if (wordArg) {
            queryArray.push(`word=${wordArg}`); //新たなクエリがあればそちらを優先的にURLに組み込む
        } else if (word) {
            queryArray.push(`word=${encodeURIComponent(word)}`); //新たなクエリを指定せず、すでにクエリがあるならそちらをURLに組み込む
        }
    
        if (modeArg === "unset") {
          // ユーザー検索モードを未設定にする場合
        } else if (modeArg) {
          queryArray.push(`mode=${modeArg}`); //新たなクエリがあればそちらを優先的にURLに組み込む
        } else if (modeQuery) {
          queryArray.push(`mode=${encodeURIComponent(modeQuery)}`); //新たなクエリを指定せず、すでにクエリがあるならそちらをURLに組み込む
        }
        const queryString = queryArray.length > 0 ? '?' + queryArray.join('&') : '';
        navigate(`/users${queryString}`);
    }

    const handlePageChange = async () => {
        try {
            setUsers(null);
            const response = await axios.get(`http://localhost:5000/client/user/searchAll/${user ? user._id : ""}?searchWord=${word ? word : ""}&page=${currentPage}&pageSize=${PAGE_SIZE}&mode=${modeQuery ? encodeURIComponent(modeQuery): ""}`);
            if (response.data) {
                setUsers(response.data.users);
                setNum(response.data.num);
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
        }
    }
    useEffect(() => {
        handlePageChange();
    }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSearch = (e) => { // 検索バーからの検索
        e.preventDefault();
        handleQueryNavigate({wordArg: searchWord ? encodeURIComponent(searchWord) : "unset"});
    }

    useEffect(() => { // ステートの変更を確実に検知するため、わける。
        let modeArray = [];
        if (mode.all) modeArray.push("all");
        else {
            if (mode.following) modeArray.push("following");
            if (mode.follower) modeArray.push("follower");
            if (mode.authorized) modeArray.push("authorized");
        }
        const modeArg = modeArray.length > 0 ? modeArray.join('&') : 'unset';
        handleQueryNavigate({modeArg: encodeURIComponent(modeArg)});
    }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => { // クエリに変化があれば検索を発火
        const accessSearch = async () => {
            try {
                setUsers(null);
                setCurrentPage(1); // 新しい検索ページ1から表示
                const response = await axios.get(`http://localhost:5000/client/user/searchAll//${user ? user._id : ""}?searchWord=${word ? word : ""}&page=${currentPage}&pageSize=${PAGE_SIZE}&mode=${modeQuery ? encodeURIComponent(modeQuery): ""}`);
                setUsers(response.data.users);
                setNum(response.data.num);
            } catch (err) {
                if (err.response) {
                    console.log(err);
                } else if (err.request) {
                    setSnackWarning("サーバーとの通信がタイムアウトしました。");
                    setIsErrorSnack(true);
                } else {
                    console.log(err);
                }
            }
        }
        accessSearch();
    }, [word, modeQuery]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledProducts>

            <StyledHeader>
                <StyledDesc theme={theme}>
                    {!word ? "全ユーザー" : "ユーザー検索結果 "}{!word ? null : <StyledSpan theme={theme}>{`"${word}"`}</StyledSpan>}
                </StyledDesc>
                <StyledSearch>
                    <StyledPaper elevation={0} component="form" theme={theme} onChange={handleInputSearchWord} onSubmit={handleSearch} style={{backgroundColor: theme.palette.background.search}}>
                        <StyledInputBase placeholder="ユーザー名 または ユーザーID" theme={theme} inputProps={{maxLength: 50}}/>
                        <Tooltip title="検索" placement="top" arrow>
                            <StyledIconButton type="submit" size="small" theme={theme}>
                            <Search color="icon" />
                            </StyledIconButton>
                        </Tooltip>
                    </StyledPaper>
                </StyledSearch>
                <StyledModes>
                <StyledCheckBoxes>
                <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.all} onChange={() => handleModeChange("all")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="すべて"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.following} onChange={() => handleModeChange("following")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="フォロー中"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.follower} onChange={() => handleModeChange("follower")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="フォロワー"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.authorized} onChange={() => handleModeChange("authorized")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="認証済み"/>
                </StyledCheckBoxes>
                </StyledModes>
            </StyledHeader>

            <StyledMain>
                    {users ?
                    <>
                    <StyledHitNum theme={theme}>{num === 0 ? "ユーザーが見つかりませんでした" : `${num}件中 ${1 + PAGE_SIZE * (currentPage - 1)}-${Math.min(PAGE_SIZE * currentPage, num)}件`}</StyledHitNum>
                    <StyledResults>
                    {users.map((user, index) =>
                        <StyledCard key={user._id} theme={theme} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                            <Link to={`/user/${user._id}`} style={{textDecoration: "none"}}>
                                <StyledCardMedia image={user.header ? `http://localhost:5000/uploads/userHeaders/${user.header}` : "aa"} theme={theme}></StyledCardMedia>
                                <StyledCardHeader sx={{display: "flex", overflow: "hidden", "& .MuiCardHeader-content": {overflow: "hidden"}}} avatar={<Avatar src={user.icon ? `http://localhost:5000/uploads/userIcons/${user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}`}/>}
                                title={UserBadge(user)} titleTypographyProps={{ noWrap: true, color: theme.palette.text.main, fontSize: "1.3rem"}}
                                subheader={"@"+user.userId} subheaderTypographyProps={{ noWrap: true, color: theme.palette.text.sub}}>
                                </StyledCardHeader>
                                <StyledCardContent>
                                    {currentUser ?
                                        currentUser._id === user._id ?
                                        <StyledMyButton variant="outlined" color="text">ログイン中のユーザー</StyledMyButton>
                                        :
                                        currentUser.followings.includes(user._id) ?
                                        <StyledFollowingButton $isFollowDisabled={isFollowDisabled} variant={theme.palette.type.followButton} theme={theme} onClick={(e) => handleFollow(e, user, 0)}>フォロー中</StyledFollowingButton>
                                        :
                                        <StyledFollowButton $isFollowDisabled={isFollowDisabled} variant={theme.palette.type.followButton} color="secondary" onClick={(e) => handleFollow(e, user, 1)}>フォロー</StyledFollowButton>
                                    :
                                    null
                                    }
                                </StyledCardContent>
                            </Link>
                        </StyledCard>
                    )}
                    </StyledResults>
                    </>
                    :
                    null
                    }
                    <StyledIndex>
                        <StyledPagination page={currentPage} count={Math.ceil(num / PAGE_SIZE)} variant="outlined" shape="rounded" color='secondary' size='large' onChange={(e, value) => setCurrentPage(value)} sx={{button:{color: `${theme.palette.text.main}`, border: `1px solid ${theme.palette.text.sub}`, '&:hover':{backgroundColor: theme.palette.background.hover}}}}/>
                    </StyledIndex>
            </StyledMain>

            <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

            <Snackbar open={isFollowSnack} onClose={() => setIsFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
                <Alert severity='info'>{`${snackUsername}さんをフォローしました`}</Alert>
            </Snackbar>
            <Snackbar open={isUnFollowSnack} onClose={() => setIsUnFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
                <Alert severity='warning'>{`フォローを解除しました`}</Alert>
            </Snackbar>

        </StyledProducts>
        </>
    )
}


const StyledProducts = styled.div`
    width: 90%;
    max-width: 3000px;
    height: 2000px;
    margin: 20px auto 0 auto;
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const StyledDesc = styled.div`
    width: 100%;
    word-break: break-all;
    color: ${(props) => props.theme.palette.text.main};
    font-weight: bold;
    font-size: 1rem;
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.secondary.main};
`

const StyledSearch = styled.div`
    width: 100%;
`

const StyledPaper = styled(Paper)`
    && {
        display: flex;
        align-items: center;
        height: 35px;
        width: 100%;
        padding-right: 10px;
        border: solid 1px ${(props) => props.theme.palette.line.disable};

        &:focus-within {
        border: solid 2px ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledInputBase = styled(InputBase)`
    && {
        height: 100%;
        width: 100%;
        padding-left: 2%;
        font-size: 1rem;
        color: ${(props) => props.theme.palette.text.main};
        & input::placeholder {
        color: ${(props) => props.theme.palette.text.main};
        }
    }
`

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
        background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledModes = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
`

const StyledCheckBoxes = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 20px;
    width: 100%
`

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        color: ${(props) => props.theme.palette.text.sub};
    }
`

const StyledMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin-top: 30px;
`

const StyledHitNum = styled.div`
    width: 100%;
    word-break: break-all;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledResults = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`

const StyledIndex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
`

const StyledPagination = styled(Pagination)`
    && {
        
    }
`

const StyledMyButton = styled(Button)`
    && {
        width: 100%;
        height: 40px;
        font-size: 0.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        pointer-events: none;
        border: none;
    }
`

const StyledFollowingButton = styled(Button)`
    && {
        width: 100%;
        height: 40px;
        font-size: 1rem;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: ${(props) => props.theme.palette.text.main2};
        background-color: ${(props) => props.theme.palette.background.following};
        border: solid 1px ${(props) => props.theme.palette.line.disable};
        pointer-events: ${(props) => props.$isFollowDisabled ? "none" : "auto"};
        &:hover {
            background-color: ${(props) => props.theme.palette.background.hover3};
            border: solid 1px ${(props) => props.theme.palette.line.main};
        }
    }
`

const StyledFollowButton = styled(Button)`
    && {
        width: 100%;
        height: 40px;
        font-size: 1rem;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        pointer-events: ${(props) => props.$isFollowDisabled ? "none" : "auto"};
    }
`

const StyledCard = styled(Card)`
    && {
        width: calc(${(props) => (props.$isXsScreen ? "100%" : (props.$isSmallScreen ? "50%" : (props.$isMiddleScreen ? "33.3333%" : "25%")))} - 20px);
        background-color: ${(props) => props.theme.palette.background.userCard};
    }
`

const StyledCardMedia = styled(CardMedia)`
    && {
        width: 100%;
        aspect-ratio: 4/1;
        background-color: ${(props) => props.theme.palette.background.productBack};
    }
`

const StyledCardHeader = styled(CardHeader)`
    && {

    }
`

const StyledCardContent = styled(CardContent)`
    && {

    }
`


export default Users