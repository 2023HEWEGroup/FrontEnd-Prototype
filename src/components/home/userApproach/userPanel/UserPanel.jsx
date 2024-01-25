import { Avatar, Chip, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../../../redux/features/userSlice';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import { debounce } from 'lodash';



const UserPanel = (props) => {

    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleFollow = debounce(async (e, user, flag) => {
        try {
            e.preventDefault();
            await axios.put(`http://localhost:5000/client/user/follow/${user._id}`, {_id: props.currentUser._id});
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
            if (flag) {
                props.handleFollowSnack(user.username);
            } else {
                props.setIsUnFollowSnack(true);
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
    }, 250);

    return (
        <>
            <StyledUserPanel $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px"}}>
                    <Link to={`/user/${props.userSlide._id}`} style={{borderRadius: "50%"}}>
                        <StyledUserSlideAvatar src={props.userSlide.icon ? `http://localhost:5000/uploads/userIcons/${props.userSlide.icon}` : `${siteAssetsPath}/default_icons/${props.userSlide.defaultIcon}`} alt='出品者アイコン' $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}/>
                    </Link>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <StyledUserSlideName theme={theme}>{props.userSlide.username}</StyledUserSlideName>
                        <StyledUserSlideId theme={theme}>{`@${props.userSlide.userId}`}</StyledUserSlideId>
                    </div>
                    {props.currentUser ?
                        props.currentUser.followings.includes(props.userSlide._id) ?
                            <StyledUnFollowTab label="フォロー中" variant={theme.palette.type.followButton} theme={theme} clickable onClick={(e) => handleFollow(e, props.userSlide, 0)}/>
                            :
                            <StyledFollowTab label="フォロー" variant={theme.palette.type.followButton} color="secondary" clickable onClick={(e) => handleFollow(e, props.userSlide, 1)}/>
                    :
                    <Link to={`/user/${props.userSlide._id}`} style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "fit-content", textDecoration: "none"}}>
                        <StyledUnFollowTab label="プロフィール" variant={theme.palette.type.followButton} clickable theme={theme} />
                    </Link>
                    }
                </div>
            </StyledUserPanel>

            <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>
        </>
    )
}


const StyledUserPanel = styled.div`
    height: 100%;
    padding: 5px 0;
`

const StyledUserSlideAvatar = styled(Avatar)`
    && {
        cursor: pointer;
        width: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : (props.$isMiddleScreen ? "100px" : "125px")))};
        height: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : (props.$isMiddleScreen ? "100px" : "125px")))};
        margin: 0 auto 0 auto;
    }
`

const StyledUserSlideName = styled.div`
    color: ${(props) => props.theme.palette.text.main};
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 auto;
    text-align: center;
`

const StyledUserSlideId = styled.div`
    color: ${(props) => props.theme.palette.text.sub};
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 auto;
    text-align: center;
`

const StyledFollowTab = styled(Chip)`
    && {
        width: 70%;
        height: 45px;
        font-size: 1rem;
        font-weight: bold;
        max-width: 250px;
        margin: 0 auto 0 auto;
    }
`

const StyledUnFollowTab = styled(Chip)`
    && {
        width: 70%;
        height: 45px;
        font-size: 1rem;
        font-weight: bold;
        margin: 0 auto 0 auto;
        max-width: 250px;
        pointer-events: ${(props) => props.$isFollowDisabled ? "none" : "auto"};
        color: ${(props) => props.theme.palette.text.main2};
        background-color: ${(props) => props.theme.palette.background.following};
        &&:hover {
            background-color: ${(props) => props.theme.palette.background.hover3};
        }
    }
`


export default UserPanel