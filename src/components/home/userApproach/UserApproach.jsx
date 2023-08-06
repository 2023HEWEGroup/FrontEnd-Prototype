import { Alert, Avatar, Button, Chip, Grid, Hidden, Slide, Snackbar, Tooltip, useMediaQuery, useTheme } from '@mui/material';
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

    const [userSlideIndex, setUserSlideIndex] = useState(0);
    const [isFollowSnack, setIsFollowSnack] = useState(false);
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
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomUserArrow theme={theme} direction="prev"/>,
        nextArrow: <CustomUserArrow theme={theme} direction="next"/>,
        afterChange: (currentSlideIndex) => {
        setUserSlideIndex(currentSlideIndex);
        },
    }

    const userSlides = [
        {id: 1, userIconUrl: `${siteAssetsPath}/demae.png`, userName: "demaescape", userId: "demae", products: [
            {id: 1, productName: "タノシーツアー", productImgUrl: `${siteAssetsPath}/tanoc_icon.png`},
        ]
            },
        {id: 2, userIconUrl: `${siteAssetsPath}/elon.png`, userName: "HARDCORE TANO*C", userId: "tanoc_net2", products:[
            {id: 2, productName: "タカアシガニ", productImgUrl: `${siteAssetsPath}/lmap_logo_filled.svg`},
            {id: 3, productName: "タカアシガニ2", productImgUrl: `${siteAssetsPath}/takaasi.png`}
        ]},
        {id: 3, userIconUrl: `${siteAssetsPath}/tanoc_icon.png`, userName: "CODING KURU*Cんじゃこらwwwwwwwwwwwwwwwww", userId: "tanoc_nettttttttttttttttttttttttttttttttttttttttttttttttttt", products: [
            {id: 4, productName: "真実", productImgUrl: `${siteAssetsPath}/nensyu.png`},
            {id: 5, productName: "サトウキビの絞りカス", productImgUrl: `${siteAssetsPath}/satoukibi.png`},
            {id: 6, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`}
        ]},
        {id: 4, userIconUrl: `${siteAssetsPath}/tanoc_icon_black.png`, userName: "明太子ご飯こそ至高", userId: "mentaiko_2b2c", products: [
            {id: 7, productName: "タノシーツアー", productImgUrl: `${siteAssetsPath}/tanoc_icon_black.png`},
            {id: 8, productName: "戦場", productImgUrl: `${siteAssetsPath}/senzyou.png`},
            {id: 9, productName: "SEIKIN TV", productImgUrl: `${siteAssetsPath}/seikin.png`},
            {id: 10, productName: "LMAP", productImgUrl: `${siteAssetsPath}/LMAP_logo_filled.svg`},
        ]},
        {id: 5, userIconUrl: `${siteAssetsPath}/iseebi.png`, userName: "出品者イセエビ", userId: "gg_noob", products: [
            {id: 11, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 12, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 13, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 14, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 15, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 16, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 17, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
            {id: 18, productName: "えび", productImgUrl: `${siteAssetsPath}/iseebi.png`},
        ]},
        {id: 6, userIconUrl: `${siteAssetsPath}/iseebi.png`, userName: "2代目出品者イセエビ", userId: "gg_noob2", products: [
            {id: 19, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`},
            {id: 20, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`},
            {id: 21, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`},
            {id: 22, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`},
            {id: 23, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`},
            {id: 24, productName: "elon", productImgUrl: `${siteAssetsPath}/elon.png`}
        ]}
        ]

    return (
        <>
        <StyledUserGrid container>
            <StyledUserGridItemUser item xs={12} sm={12} md={4} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <StyledUserSlider {...userSlideSettings} theme={theme}>
                {userSlides.map(userSlide =>
                    <StyledUserSlide key={userSlide.id} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px"}}>
                        <StyledUserSlideAvatar src={userSlide.userIconUrl} alt='出品者アイコン' $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}/>
                        <Hidden only={["xs", "sm"]}>
                        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                            <StyledUserSlideName theme={theme}>{userSlide.userName}</StyledUserSlideName>
                            <StyledUserSlideId theme={theme}>{`@${userSlide.userId}`}</StyledUserSlideId>
                        </div>
                        </Hidden>
                        <Tooltip title="フォローする" placement='top' arrow={true}>
                        <StyledFollowTab label="フォロー" variant="outlined" color="secondary" clickable onClick={handleFollowSnack} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}/>
                        </Tooltip>
                    </div>
                    </StyledUserSlide>
                    )}
                </StyledUserSlider>
            </StyledUserGridItemUser>
        <StyledUserGridItemProduct item xs={12} sm={12} md={8} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            {userSlides[userSlideIndex].products.map(product=>
            <StyledUserProduct key={product.id} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <Tooltip title={product.productName} followCursor placement='top'>
                <StyledUserProductImg variant='square' src={product.productImgUrl} alt='商品画像'/>
                </Tooltip>
            </StyledUserProduct>
            )}
        </StyledUserGridItemProduct>
    </StyledUserGrid>

    <Snackbar open={isFollowSnack} onClose={handleFollowSnackClose} TransitionComponent={SlideTransition} autoHideDuration={10000}>
        <Alert severity='info'>username さんをフォローしました</Alert>
    </Snackbar>
    </>
    )
}


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

const StyledUserGrid = styled(Grid)`
    && {
        height: fit-content;
    }
`

const StyledUserGridItemUser = styled(Grid)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        height: ${(props) => (props.$isXsScreen ? "200px" : (props.$isSmallScreen ? "200px" : "400px"))};
    }
`

const StyledUserGridItemProduct = styled(Grid)`
    && {
        display: flex;
        flex-wrap: wrap;
        justify-content: ${(props) => (props.$isXsScreen ? "center" : (props.$isSmallScreen ? "center" : "flex-start"))};
        gap: 10px;
        height: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : "400px"))};
        widht: 100%;
        overflow: hidden;
    }
`

const StyledUserSlider = styled(Slider)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 100%;
    }
`

const StyledUserSlide = styled.div`
    height: ${(props) => (props.$isXsScreen ? "200px" : (props.$isSmallScreen ? "200px" : "400px"))};
`

const StyledUserSlideAvatar = styled(Avatar)`
    && {
        cursor: pointer;
        width: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : (props.$isMiddleScreen ? "125px" : "150px")))};
        height: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : (props.$isMiddleScreen ? "125px" : "150px")))};
        margin: ${(props) => (props.$isXsScreen ? "20px" : (props.$isSmallScreen ? "20px" : "50px"))} auto 0 auto;
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
        margin: ${(props) => (props.$isXsScreen ? "0" : (props.$isSmallScreen ? "0" : "0px"))} auto 0 auto;
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

const StyledUserProduct = styled.div`
    aspect-ratio: 1/1;
    height: ${(props) => (props.$isXsScreen ? "100%" : (props.$isSmallScreen ? "100%" : "calc(50% - 5px)"))};
    overflow: hidden;
    border-radius: 5px;
`

const StyledUserProductImg = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`


export default UserApproach