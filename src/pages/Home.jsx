import React, { useEffect, useRef, useState } from 'react'
import CategoryNavigation from '../components/common/categoryNavigation/CategoryNavigation'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { Alert, Avatar, Button, Chip, Grid, Hidden, IconButton, Paper, Popper, Slide, Snackbar, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, FavoriteBorder, MoreVert } from '@mui/icons-material';


const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};


const Home = () => {

  const [isProductPopperOpen, setIsProductPopperOpen] = useState(false);
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const [isLinkSnack, setIsLinkSnack] = useState(false);
  const [isFollowSnack, setIsFollowSnack] = useState(false);
  const [userSlideIndex, setUserSlideIndex] = useState(0);
  const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const productPopperRef = useRef(null);
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

  const handleLinkCopy = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setIsLinkSnack(!isLinkSnack);
      })
    }
  }

  const handleLinkSnackClose = () => {
    setIsLinkSnack(false)
  };

  const handleFollowSnack = () => {
    setIsFollowSnack(true);
  }

  const handleFollowSnackClose = () => {
    setIsFollowSnack(false);
  }

  useEffect(() => {
    const handleProductPopperClose = (e) => {
        if (productAnchorEl && !productAnchorEl.contains(e.target) && !productPopperRef.current.contains(e.target)) {
            setProductAnchorEl(null);
            setIsProductPopperOpen(false);
        }
    }
    document.addEventListener('click', handleProductPopperClose);

    return () => {
        document.removeEventListener('click', handleProductPopperClose);
    }
  }, [productAnchorEl]);

  useEffect(() => {
    if (isMiddleScreen || isSmallScreen || isXsScreen) {
      setProductAnchorEl(null);
      setIsProductPopperOpen(false);
    }
  }, [isMiddleScreen, isSmallScreen, isXsScreen]);

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
    {id: 8, productName: "いーろん", sallerId: "twitter_japan", imageUrl: `${siteAssetsPath}/elon.png`, point: 9999999},
    {id: 9, productName: "ショウガにミソ付けて食べるの美味しいのにあまり理解されない", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 10, productName: "自分で作った回路に電気が流れてさ、チェストにものがどんどん貯まっていくってもうあり得ない快感なんだよね", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 11, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 12, productName: "HARDCORE TANO*C", sallerId: "tanoc_net", imageUrl: `${siteAssetsPath}/tanoc_icon.png`, point: 300},
    {id: 13, productName: "伊勢エビ(戦闘力53万)", sallerId: "elonmusk", imageUrl: `${siteAssetsPath}/iseebi.png`, point: 4000},
  ] 
  const limitedProducts = isXsScreen ? products.slice(0, 6) : isSmallScreen ? products.slice(0, 9) : isMiddleScreen ? products.slice(0, 12) :products;

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

  const CustomArrow = ({ onClick, theme, direction }) => {
    return (
      <StyledCustomArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: 0} : {right: 0}}>
        <StyledButton theme={theme}>
          {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
        </StyledButton>
      </StyledCustomArrow>
    );
  };

  const CustomUserArrow = ({ onClick, theme, direction }) => {
    return (
      <StyledCustomUserArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: "-30px"} : {right: "-30px"}}>
        <StyledButton theme={theme}>
          {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
        </StyledButton>
      </StyledCustomUserArrow>
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

  // プロフィールページとかに使えそうなロジック
  // const renderContent = () => {
  //   switch (userSlideIndex) {
  //     case 0:
  //       return <div>コンテンツ1を表示</div>;
  //     case 1:
  //       return <div>コンテンツ2を表示</div>;
  //     case 2:
  //       return <div>コンテンツ3を表示</div>;
  //     case 3:
  //       return <div>コンテンツ4を表示</div>;
  //     default:
  //       return null;
  //   }
  // };

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
            {limitedProducts.map(product =>
              <StyledProduct key={product.id} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <StyledProductImgZone>
                  <StyledAvatar variant='square' src={product.imageUrl} alt='商品画像' />
                  <StyledProductOption theme={theme} productAnchorEl={productAnchorEl}>
                    <StyledIconButton onClick={handleProductPopper}>
                      <MoreVert />
                    </StyledIconButton>
                  </StyledProductOption>
                </StyledProductImgZone>
                <StyledProductDesc>
                  <StyledProductName theme={theme}>{product.productName}</StyledProductName>
                  <StyledSellerId theme={theme}>{`by @${product.sallerId}`}</StyledSellerId>
                  <StyledPriceAndLike>
                    <StyledPrice theme={theme}>{`${product.point} ポイント`}</StyledPrice>
                    <StyledFavoriteBorder theme={theme}/>
                  </StyledPriceAndLike>
                </StyledProductDesc>

                <Popper open={isProductPopperOpen} anchorEl={productAnchorEl} placement="bottom-end" theme={theme} ref={productPopperRef}>
                  <StyledPopperPaper elevation={3} theme={theme}>
                    <StyledPopperItem theme={theme} onClick={handleLinkCopy}>リンクをコピー</StyledPopperItem>
                    <StyledPopperItem theme={theme}>共有</StyledPopperItem>
                    <StyledPopperItem theme={theme}>いいねする</StyledPopperItem>
                  </StyledPopperPaper>
                </Popper>
              </StyledProduct>
              )}
          </StyledProductZone>

          <StyledHomeSection theme={theme}>ユーザーアプローチ</StyledHomeSection>

          <StyledUserZone>
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
          </StyledUserZone>
        </StyledHomeInnner>
      </StyledHome>

      <Snackbar open={isLinkSnack} onClose={handleLinkSnackClose} TransitionComponent={SlideTransition} autoHideDuration={3000}>
        <Alert severity='success'>リンクをコピーしました</Alert>
      </Snackbar>
      <Snackbar open={isFollowSnack} onClose={handleFollowSnackClose} TransitionComponent={SlideTransition} autoHideDuration={10000}>
        <Alert severity='info'>username さんをフォローしました</Alert>
      </Snackbar>
    </>
  )
}


const StyledHome = styled.div`
  width: 100%;
`

const StyledHomeSection = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.sub};
  border-bottom: solid 0.5px ${(props) => props.theme.palette.text.sub};
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
  margin-bottom: 20px;
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
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${(props) => props.theme.palette.background.slideHover};
  border-radius: 50%;
  pointer-events: ${(props) => (props.productAnchorEl !== null ? "none" : "auto")};

  ${StyledProductImgZone}:hover & {
    opacity: 1;
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
  gap: 5px;
  padding-top: 10px;
  width: 100%;
`

const StyledProductName = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.product};
  overflow: hidden;
  width: 100%;
  height: 50px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

const StyledPriceAndLike = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledPrice = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};
`

const StyledFavoriteBorder = styled(FavoriteBorder)`
  && {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.palette.icon.main};

    &:hover {
      color: ${(props) => props.theme.palette.icon.like};
    }
  }
`

const StyledPopperPaper = styled(Paper)`
  && {
    width: 150px;
    padding: 5px 0;
    border-radius: 10px;
    color: ${(props) => props.theme.palette.text.main};
    background-color: ${(props) => props.theme.palette.background.pop};
  }
`

const StyledPopperItem = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 7px 0 7px 3px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.background.hover};
  }
  &:active {
    background-color: transparent;
  }
`

const StyledUserZone = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  margin-bottom: 50px;
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


export default Home