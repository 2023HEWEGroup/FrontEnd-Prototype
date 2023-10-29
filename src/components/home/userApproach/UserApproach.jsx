import { Alert, Avatar, Button, Chip, Slide, Snackbar, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const UserApproach = () => {

    const [isFollowSnack, setIsFollowSnack] = useState(false);
    const islargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();

    const handleFollowSnack = () => {
        setIsFollowSnack(true);
    }

    const handleFollowSnackClose = () => {
        setIsFollowSnack(false);
    }

    const CustomUserArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomUserArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: "-30px"} : {right: "-30px"}}>
            <StyledButton theme={theme}>
            {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </StyledButton>
        </StyledCustomUserArrow>
        );
    };

    const userSlideSettings = {
        infinite: true,
        speed: 350,
        slidesToShow: isXsScreen ? 2 : isSmallScreen ? 3 : isMiddleScreen ? 4 : islargeScreen ? 5 : 6,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomUserArrow theme={theme} direction="prev"/>,
        nextArrow: <CustomUserArrow theme={theme} direction="next"/>,
    }

    const userSlides = [
        {id: 1, userIconUrl: `${siteAssetsPath}/demae.png`, userName: "demaescape", userId: "demae"},
        {id: 2, userIconUrl: `${siteAssetsPath}/elon.png`, userName: "HARDCORE TANO*C", userId: "tanoc_net2"},
        {id: 3, userIconUrl: `${siteAssetsPath}/tanoc_icon.png`, userName: "CODING KURU*Cんじゃこらwwwwwwwwwwwwwwwww", userId: "tanoc_nettttttttttttttttttttttttttttttttttttttttttttttttttt"},
        {id: 4, userIconUrl: `${siteAssetsPath}/tanoc_icon_black.png`, userName: "明太子ご飯こそ至高", userId: "mentaiko_2b2c"},
        {id: 5, userIconUrl: `${siteAssetsPath}/iseebi.png`, userName: "出品者イセエビ", userId: "gg_noob"},
        {id: 6, userIconUrl: `${siteAssetsPath}/iseebi.png`, userName: "2代目出品者イセエビ", userId: "gg_noob2"},
        {id: 7, userIconUrl: `${siteAssetsPath}/demae.png`, userName: "demaescape", userId: "demae"},
        {id: 8, userIconUrl: `${siteAssetsPath}/elon.png`, userName: "HARDCORE TANO*C", userId: "tanoc_net2"},
        {id: 9, userIconUrl: `${siteAssetsPath}/tanoc_icon.png`, userName: "CODING KURU*Cんじゃこらwwwwwwwwwwwwwwwww", userId: "tanoc_nettttttttttttttttttttttttttttttttttttttttttttttttttt"},
        {id: 10, userIconUrl: `${siteAssetsPath}/tanoc_icon_black.png`, userName: "明太子ご飯こそ至高", userId: "mentaiko_2b2c"},
        {id: 11, userIconUrl: `${siteAssetsPath}/iseebi.png`, userName: "出品者イセエビ", userId: "gg_noob"},
        {id: 12, userIconUrl: `${siteAssetsPath}/iseebi.png`, userName: "2代目出品者イセエビ", userId: "gg_noob2"},
    ]

    return (
        <>
        <StyledUserApproach>
            <StyledUserSlider {...userSlideSettings} theme={theme}>
                {userSlides.map(userSlide =>
                    <StyledUserPanel key={userSlide.id} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px"}}>
                        <StyledUserSlideAvatar src={userSlide.userIconUrl} alt='出品者アイコン' $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}/>
                        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                            <StyledUserSlideName theme={theme}>{userSlide.userName}</StyledUserSlideName>
                            <StyledUserSlideId theme={theme}>{`@${userSlide.userId}`}</StyledUserSlideId>
                        </div>
                        <Tooltip title="フォローする" placement='top' arrow={true}>
                        <StyledFollowTab label="フォロー" variant="outlined" color="secondary" clickable onClick={handleFollowSnack}/>
                        </Tooltip>
                    </div>
                    </StyledUserPanel>
                    )}
                </StyledUserSlider>
        </StyledUserApproach>

    <Snackbar open={isFollowSnack} onClose={handleFollowSnackClose} TransitionComponent={SlideTransition} autoHideDuration={10000}>
        <Alert severity='info'>username さんをフォローしました</Alert>
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

const StyledUserPanel = styled.div`
    height: 100%;
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

const StyledCustomUserArrow = styled.div`
    z-index: 50;
    top: 50%;
    display: flex;
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