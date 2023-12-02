import styled from '@emotion/styled'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Avatar, Button, useTheme } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import Slider from 'react-slick'


const ProductSlider = (props) => {

    const theme = useTheme();
    const sliderRef = useRef();

    const CustomArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: 0} : {right: 0}}>
            <StyledButton theme={theme}>
            {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </StyledButton>
        </StyledCustomArrow>
        );
    };

    const handleIndexChange = (index) => {
        props.setSliderIndex(index);
    }

    useEffect(() => {
        sliderRef.current.slickGoTo(props.sliderIndex);
    }, [props.sliderIndex])
    
    const slideSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomArrow theme={theme} direction="prev"/>,
        nextArrow: <CustomArrow theme={theme} direction="next"/>,
    };

    return (
        <>
        <SliderParent>
            <StyledSlider theme={theme} afterChange={handleIndexChange} ref={sliderRef} {...slideSettings}>
                {props.product.productImg.map((img, index) =>
                    <StyledAvatarZone key={index}>
                        <StyledAvatar variant="square" src={`http://localhost:5000/uploads/productImages/${img}`}/>
                    </StyledAvatarZone>
                )}
            </StyledSlider>
            {props.product.productImg.length > 1 ? <StyledNum theme={theme}>{`${props.sliderIndex + 1}/${props.product.productImg.length}`}</StyledNum> : null}
        </SliderParent>
        </>
    )
}


const SliderParent = styled.div`
    position: relative;
    height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 5px;
`

const StyledSlider = styled(Slider)`
    && {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        background-color: ${(props) => props.theme.palette.background.productBack};
    }
`

const StyledCustomArrow = styled.div`
    z-index: 50;
    top: calc(50% - 5%);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 10%;
    height: 10%;
    overflow: hidden;
    border-radius: 50%;
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
        background-color: ${(props) => props.theme.palette.background.slideHover};
        color: ${(props) => props.theme.palette.text.tab};
    }
`

const StyledAvatarZone = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 5px;
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledNum = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: center;
    width: fit-content;
    padding: 2px 10px;
    font-size: 1.2rem;
    color: ${(props) => props.theme.palette.text.main};
    background-color: ${(props) => props.theme.palette.background.slideComment};
`


export default ProductSlider