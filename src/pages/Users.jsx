import { Search } from '@mui/icons-material';
import { Alert, Avatar, Button, Card, CardContent, CardHeader, CardMedia, Checkbox, FormControlLabel, IconButton, InputBase, Pagination, Paper, Slide, Snackbar, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../redux/features/userSlice';
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const Users = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [mode, setMode] = useState({all: true, following: false, follower: false, authorized: false});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchWord, setSearchWord] = useState("");
    const [displaySearchWord, setDisplaySearchWord] = useState("");
    const [users, setUsers] = useState(null);
    const [num, setNum] = useState(0);
    const [isSearch, setIsSearch] = useState(false); // 一度でも検索を実行したらtrueになるフラグ。レイアウト調節用。
    const PAGE_SIZE = 12;
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const currentUser = useSelector((state) => state.user.value);
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isFollowSnack, setIsFollowSnack] = useState(false);
    const [isUnFollowSnack, setIsUnFollowSnack] = useState(false);
    const [snackUsername, setSnackUsername] = useState("");


    const handleSetModeAll = () => {
        if (mode.all) {
            setMode({...mode, all: false});
        } else {
            setMode({...mode, all: true, following: false, follower: false, authorized: false});
        }
    }

    const handleSetModeFollowing = () => {
        setMode({...mode, all: false, following: !mode.following});
    }

    const handleSetModeFollower = () => {
        setMode({...mode, all: false, follower: !mode.follower});
    }

    const handleSetModeAuthorized = () => {
        setMode({...mode, all: false, authorized: !mode.authorized});
    }

    const handleInputSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    const handleFollow = async (e, user, flag) => {
        try {
            e.preventDefault();
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

    const handlePageChange = async (e, pageNumber) => {
        try {
            // ページを切り替える度にフェッチ
            if (currentPage === pageNumber) return;
            setCurrentPage(pageNumber);
            const users = await axios.get(`http://localhost:5000/client/user/searchAll?searchWord=${displaySearchWord}&page=${pageNumber}&pageSize=${PAGE_SIZE}`);
            setUsers(users.data.users);
            setNum(users.data.num);
            setIsSearch(true);
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

    const handleSearch = async (e) => { // 検索バーからの検索
        try {
            e.preventDefault();
            // クエリ書き換えてnavigateさせれば下のeffectが発火するので、ここいらなかった。一応残す。
            if (!searchWord) return;
            // setCurrentPage(1); // 新しい検索ページ1から表示
            // const users = await axios.get(`http://localhost:5000/client/user/searchAll?searchWord=${searchWord}&page=${1}&pageSize=${PAGE_SIZE}`);
            // setUsers(users.data.users);
            // setDisplaySearchWord(searchWord);
            // setNum(users.data.num);
            // setIsSearch(true);
            navigate(`/users/?word=${searchWord}`);
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

    useEffect(() => { // クエリに変化があれば検索を発火
        const accessSearch = async () => {
            try {
                const word = searchParams.get('word');
                if (!word) return;
                setCurrentPage(1); // 新しい検索ページ1から表示
                const users = await axios.get(`http://localhost:5000/client/user/searchAll?searchWord=${word}&page=${1}&pageSize=${PAGE_SIZE}`);
                setUsers(users.data.users);
                setDisplaySearchWord(word);
                setNum(users.data.num);
                setIsSearch(true);
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
    }, [location.search]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledUsers>

            <StyledHeader>
                <StyledDesc theme={theme}>
                    {!isSearch ? "ユーザーを検索" : "ユーザー検索結果 "}{!isSearch ? null : <StyledSpan theme={theme}>{`"${displaySearchWord}"`}</StyledSpan>}
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
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.all} onChange={handleSetModeAll} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="すべて"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.following} onChange={handleSetModeFollowing} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="フォロー中"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.follower} onChange={handleSetModeFollower} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="フォロワー"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={mode.authorized} onChange={handleSetModeAuthorized} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="認証済み"/>
                </StyledModes>
            </StyledHeader>

            <StyledMain>
                    {users ?
                    <>
                    <StyledHitNum theme={theme}>{num === 0 ? "ユーザーが見つかりませんでした" : `${num}件中 ${1 + PAGE_SIZE * (currentPage - 1)}-${Math.min(PAGE_SIZE * currentPage, num)}件`}</StyledHitNum>
                    <StyledResults>
                    {users.map(user =>
                        <StyledCard key={user._id} theme={theme} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                            <Link to={`/profile/${user._id}`} style={{textDecoration: "none"}}>
                                <StyledCardMedia image={user.header ? `http://localhost:5000/uploads/userHeaders/${user.header}` : `${siteAssetsPath}/default_header/default_header.png`}></StyledCardMedia>
                                <StyledCardHeader sx={{display: "flex", overflow: "hidden", "& .MuiCardHeader-content": {overflow: "hidden"}}} avatar={<Avatar src={user.icon ? `http://localhost:5000/uploads/userIcons/${user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}`}/>}
                                title={user.username} titleTypographyProps={{ noWrap: true, color: theme.palette.text.main, fontSize: "1.3rem"}}
                                subheader={"@"+user.userId} subheaderTypographyProps={{ noWrap: true, color: theme.palette.text.sub}}>
                                </StyledCardHeader>
                                <StyledCardContent>
                                    {currentUser ?
                                        currentUser._id === user._id ?
                                        <StyledMyButton variant="outlined" color="text">ログイン中のユーザー</StyledMyButton>
                                        :
                                        currentUser.followings.includes(user._id) ?
                                        <StyledFollowingButton variant="outlined" theme={theme} onClick={(e) => handleFollow(e, user, 0)}>フォロー中</StyledFollowingButton>
                                        :
                                        <StyledFollowButton variant="outlined" color="secondary" onClick={(e) => handleFollow(e, user, 1)}>フォロー</StyledFollowButton>
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
                        <StyledPagination page={currentPage} count={Math.ceil(num / PAGE_SIZE)} variant="outlined" shape="rounded" color='secondary' size='large' onChange={handlePageChange} sx={{button:{color: `${theme.palette.text.main}`, border: `1px solid ${theme.palette.text.sub}`, '&:hover':{backgroundColor: theme.palette.background.hover}}}}/>
                    </StyledIndex>
            </StyledMain>

            <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

            <Snackbar open={isFollowSnack} onClose={() => setIsFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
                <Alert severity='info'>{`${snackUsername}さんをフォローしました`}</Alert>
            </Snackbar>
            <Snackbar open={isUnFollowSnack} onClose={() => setIsUnFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
                <Alert severity='warning'>{`フォローを解除しました`}</Alert>
            </Snackbar>

        </StyledUsers>
        </>
    )
}


const StyledUsers = styled.div`
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
        outline: solid 2px ${(props) => props.theme.palette.secondary.main};
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
    gap: 20px;
    width: 100%;
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
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
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
        color: ${(props) => props.theme.palette.text.main};
        border: solid 1px ${(props) => props.theme.palette.line.disable};
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


export default Users