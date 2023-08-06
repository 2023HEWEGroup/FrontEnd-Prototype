import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import Slider from 'react-slick';
import styled from 'styled-components';


const Carousel = () => {
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();

    const slides = [
        {id: 1, imageUrl: `${siteAssetsPath}/LMAP_logo.svg`, slideComment: "卵かけご飯最高"},
        {id: 2, imageUrl: `${siteAssetsPath}/LMAP_logo_reversal.svg`, slideComment: "TKGTKGTKG"},
        {id: 3, imageUrl: `${siteAssetsPath}/tanoc_header.png`, slideComment: "自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね"},
        {id: 4, imageUrl: `${siteAssetsPath}/iseebi.png`, slideComment: "朝っぱらから飲むEAAね、マジうまい"},
    ];

    const CustomArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: 0} : {right: 0}}>
            <StyledButton theme={theme}>
            {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </StyledButton>
        </StyledCustomArrow>
        );
    };

    const slideSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        arrows: true,
        prevArrow: <CustomArrow theme={theme} direction="prev"/>,
        nextArrow: <CustomArrow theme={theme} direction="next"/>,
    };

    return (
        <StyledSlider {...slideSettings} theme={theme}>
            {slides.map(slide =>
            <StyledSlide key={slide.id} slideUrl={slide.imageUrl} theme={theme}>
                <StyledSlideComment theme={theme} $isXsScreen={isXsScreen}>{slide.slideComment}</StyledSlideComment>
            </StyledSlide>
            )}
        </StyledSlider>
    )
}


const StyledSlider = styled(Slider)`
    && {
        aspect-ratio: 4/1;
        width: 90%;
        margin: 0 auto;

        .slick-dots li button:before {
        font-size: 20px;
        line-height: 20px;
        color: ${(props) => props.theme.palette.text.sub};
        }
        
        .slick-dots li.slick-active button:before {
        color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledSlide = styled.div`
    position: relative;
    aspect-ratio: 4/1;
    background-image: url(${(props => props.slideUrl)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.palette.background.pop};
`

const StyledSlideComment = styled.div`
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: fit-content;
    padding: 0 50px;
    overflow: hidden;
    color: ${(props) => props.theme.palette.text.main};
    background-color: ${(props) => props.theme.palette.background.slideComment};
    text-overflow: ellipsis;
    -webkit-line-clamp: ${(props) => (props.$isXsScreen ? 1 : 2)};
    -webkit-box-orient: vertical;

    ${StyledSlider}:hover & {
    display: -webkit-box;
    }
`

const StyledCustomArrow = styled.div`
    z-index: 50;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 50px;
    height: 97.5%;
    overflow: hidden;
    border-radius: 5px;
    background-color: transparent;

    &: hover {
        border: solid 1px ${(props) => props.theme.palette.line.main};
        background-color: ${(props) => props.theme.palette.background.slideHover};
    }
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


export default Carousel