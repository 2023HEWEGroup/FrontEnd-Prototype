import { Alert, Button, Slide, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import UserPanel from './userPanel/UserPanel';
import axios from 'axios';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const UserApproach = (props) => {

    const islargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [outsiders, setOutsiders] = useState([]);
    const [username, setUsername] = useState("");
    const [isFollowSnack, setIsFollowSnack] = useState(false);
    const [isUnFollowSnack, setIsUnFollowSnack] = useState(false);

    const handleFollowSnackClose = () => {
        setIsFollowSnack(false);
    }

    const handleFollowSnack = (username) => {
        setUsername(username);
        setIsFollowSnack(true);
    }

    const CustomUserArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomUserArrow outsiders={outsiders} theme={theme} onClick={onClick} style={direction === "prev" ? {left: "-30px"} : {right: "-30px"}}>
            <StyledButton theme={theme}>
            {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </StyledButton>
        </StyledCustomUserArrow>
        );
    };

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/user/getOutsider/${props.currentUser._id}`);
                setOutsiders(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchFollowers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const userSlideSettings = {
        infinite: true,
        speed: 350,
        slidesToShow: Math.min(outsiders.length >= 2 ? outsiders.length - 1 : outsiders.length, isXsScreen ? 2 : isSmallScreen ? 3 : isMiddleScreen ? 4 : islargeScreen ? 5 : 6),
        slidesToScroll: outsiders.length === 1 ? 0 : 1,
        arrows: true,
        prevArrow: <CustomUserArrow theme={theme} direction="prev"/>,
        nextArrow: <CustomUserArrow theme={theme} direction="next"/>,
    }

    return (
        <>
        {!isLoading ?
        <StyledUserApproach>
            <StyledUserSlider {...userSlideSettings} theme={theme}>
                {outsiders.map((user, index) =>
                    <UserPanel key={index} userSlide={user} handleFollowSnack={handleFollowSnack} setIsUnFollowSnack={setIsUnFollowSnack} currentUser={props.currentUser}/>
                )}
            </StyledUserSlider>
        </StyledUserApproach>
        :
        null
        }

        <Snackbar open={isFollowSnack} onClose={handleFollowSnackClose} TransitionComponent={SlideTransition} autoHideDuration={10000}>
            <Alert severity='info'>{username} さんをフォローしました</Alert>
        </Snackbar>
        <Snackbar open={isUnFollowSnack} onClose={() => setIsUnFollowSnack(false)} TransitionComponent={SlideTransition} autoHideDuration={10000}>
            <Alert severity='warning'>フォローを解除しました</Alert>
        </Snackbar>
    </>
    )
}


const StyledUserApproach = styled.div`
    width: 100%;
    height: fit-content;
`

const StyledButton = styled(Button)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: ${(props) => props.theme.palette.text.tab};
    }
`

const StyledUserSlider = styled(Slider)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`

const StyledCustomUserArrow = styled.div`
    z-index: 50;
    top: 50%;
    display: ${(props) => props.outsiders.length > 1 ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    background-color: transparent;

    &: hover {
        border: solid 1px ${(props) => props.theme.palette.line.main};
    }
`


export default UserApproach