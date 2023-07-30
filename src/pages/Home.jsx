import React, { useState } from 'react'
import CategoryNavigation from '../components/common/categoryNavigation/CategoryNavigation'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { Avatar, Button, IconButton, Popper, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, MoreVert } from '@mui/icons-material';


const Home = () => {

  const [isProductPopperOpen, setIsProductPopperOpen] = useState(false);
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const theme = useTheme();

  const handleProductPopper = (e) => {
    if (!isProductPopperOpen) {
      setIsProductPopperOpen(true);
      setProductAnchorEl(e.currentTarget)
    } else {
      setIsProductPopperOpen(false);
      setProductAnchorEl(null);
    }
  }

  const slides = [
    {id: 1, imageUrl: `${siteAssetsPath}/LMAP_logo.svg`, slideComment: "卵かけご飯最高"},
    {id: 2, imageUrl: `${siteAssetsPath}/LMAP_logo_reversal.svg`, slideComment: "TKGTKGTKG"},
    {id: 3, imageUrl: `${siteAssetsPath}/tanoc_header.png`, slideComment: "自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね"},
    {id: 4, imageUrl: `${siteAssetsPath}/iseebi.png`, slideComment: "朝っぱらから飲むEAAね、マジうまい"},
  ];

  const products = [
    {id: 1, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon_black.png`, point: 300},
    {id: 2, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 3, productName: "HARDCORE TANO*Cccccccccccccccccccccccccccccccccccccccc", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 4, productName: "HARDCORE TANO*Caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 5, productName: "HARDCORE TANO*Cあああああああああああああああ", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon_black.png`, point: 300},
    {id: 6, productName: "そうだ、温泉旅行に行こう！", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon_black.png`, point: 300},
    {id: 7, productName: "もう準備万タンです", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon_black.png`, point: 300},
    {id: 8, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon_black.png`, point: 300},
    {id: 9, productName: "ショウガにミソ付けて食べるの美味しいのにあまり理解されない", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 10, productName: "自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 11, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 12, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 13, productName: "伊勢エビ(戦闘力53万)", sallerId: "elonmusk", imageUrl: `${siteAssetsPath}/iseebi.png`, point: 4000},
  ]

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
            <StyledSlide key={slide.id} slideUrl={slide.imageUrl} theme={theme}>
              <StyledSlideComment theme={theme} $isXsScreen={isXsScreen}>{slide.slideComment}</StyledSlideComment>
            </StyledSlide>
            )}
        </StyledSlider>
        <StyledHomeInnner>

          <StyledProductZone>
            {products.map(product =>
              <StyledProduct key={product.id} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <StyledProductImgZone>
                  <StyledAvatar variant='square' src={product.imageUrl} alt='商品画像' />
                  <StyledProductOption theme={theme}>
                    <StyledIconButton onClick={handleProductPopper}>
                      <MoreVert />
                    </StyledIconButton>
                  </StyledProductOption>
                </StyledProductImgZone>
                <StyledProductDesc>
                  <StyledProductName theme={theme}>{product.productName}</StyledProductName>
                  <StyledSellerId theme={theme}>{`by @ ${product.sallerId}`}</StyledSellerId>
                  <StyledPrice theme={theme}>{`${product.point} ポイント`}</StyledPrice>
                </StyledProductDesc>

                <StyledProductPopper open={isProductPopperOpen} anchorEl={productAnchorEl} placement='bottom'>
                  aaa
                </StyledProductPopper>
              </StyledProduct>
              )}
          </StyledProductZone>

        </StyledHomeInnner>
      </StyledHome>
    </>
  )
}


const StyledHome = styled.div`
  width: 100%;
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

const StyledHomeInnner = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 50px auto 0 auto;
`

const StyledProductZone = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`

const StyledProduct = styled.div`
  width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33%" : (props.$isMiddleScreen ? "25%" : "20%")))} - 20px);
  height: fit-content;
  cursor: pointer;
  margin-bottom: 50px;
`

const StyledProductImgZone = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background-color: #444;
`

const StyledAvatar = styled(Avatar)`
  && {
    width: 100%;
    height: 100%;
  }
`

const StyledProductOption = styled.div`
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${(props) => props.theme.palette.background.slideHover};
  border-radius: 50%;

  ${StyledProductImgZone}:hover & {
    display: block;
  }
`

const StyledIconButton = styled(IconButton)`
  && {
    color: #fff;
  }
`

const StyledProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  width: 100%;
`

const StyledProductName = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.product};
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${StyledProduct}:hover &{
    text-decoration: underline;
  }
  ${StyledProduct}:active &{
    text-decoration: none;
  }
`

const StyledSellerId = styled.div`
  width: fit-content;
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
  }
`

const StyledPrice = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};
`

const StyledProductPopper = styled(Popper)`
  && {

  }
`


export default Home