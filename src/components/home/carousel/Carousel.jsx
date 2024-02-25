import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import Slider from 'react-slick';
import styled from 'styled-components';
import { useEnv } from '../../../provider/EnvProvider';


const Carousel = () => {
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { siteAssetsPath } = useEnv();
    const theme = useTheme();

    const slides = [
        {imageUrl: `${siteAssetsPath}/lmapUngra.png`, slideComment: "2024/02/03 サイト名称とサイトロゴデザインが更新されました"},
    ];

    const CustomArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: 0} : {right: 0}}>
            <StyledButton theme={theme}>
            {direction === "prev" ? <ArrowBackIosNew style={{color: theme.palette.text.main2}}/> : <ArrowForwardIos style={{color: theme.palette.text.main2}}/>}
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
            {slides.map((slide, index) =>
            <StyledSlide key={index} slideUrl={slide.imageUrl} theme={theme}>
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
        margin-top: 15px;

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
    background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledSlideComment = styled.div`
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: fit-content;
    padding: 0 50px;
    overflow: hidden;
    color: ${(props) => props.theme.palette.text.main2};
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
    }
`


export default Carousel