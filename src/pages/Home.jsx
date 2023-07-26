import React from 'react'
import CategoryNavigation from '../components/common/categoryNavigation/CategoryNavigation'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { Button, useTheme } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';


const Home = () => {

  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const theme = useTheme();

  const slides = [
    {id: 1, imageUrl: `${siteAssetsPath}/LMAP_logo.svg`},
    {id: 2, imageUrl: `${siteAssetsPath}/LMAP_logo_reversal.svg`},
    {id: 3, imageUrl: `${siteAssetsPath}/tanoc_header.png`},
    {id: 4, imageUrl: `${siteAssetsPath}/tanoc_icon.png`},
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
    <>
      <CategoryNavigation/>
      <StyledHome>
        <StyledSlider {...slideSettings} theme={theme}>
          {slides.map(slide =>
            <StyledSlide key={slide.id} slideUrl={slide.imageUrl} theme={theme}></StyledSlide>
            )}
        </StyledSlider>
      </StyledHome>
    </>
  )
}


const StyledHome = styled.div`
  width: 100%;
  height: 2000px;
`

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
  aspect-ratio: 4/1;
  background-image: url(${(props => props.slideUrl)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.palette.background.pop};
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

const StyledHomeInnner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 1000px;
  margin: 0 auto;
  background-color: #333;
`


export default Home