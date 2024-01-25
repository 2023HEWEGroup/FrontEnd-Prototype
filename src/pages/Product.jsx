import { ArrowForwardIos, CurrencyYen, ExpandLess, ExpandMore, FavoriteBorder, Share, SmsOutlined } from '@mui/icons-material';
import { Alert, Avatar, Button, Card, CardActions, CardHeader, Chip, CircularProgress, Divider, LinearProgress, Rating, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import ProductSlider from '../components/product/ProductSlider';
import VerifiedBadge from '../layouts/badges/VerifiedBadge';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import PurchaseModal from '../components/product/PurchaseModal';
import LoginRequiredModal from '../components/common/loginRequiredModal/LoginRequiredModal';
import { debounce } from 'lodash';


const Product = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [saller, setSaller] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState("");
  const [lineCount, setLineCount] = useState(NaN);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { productId } = useParams("productId");
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const UserBadge = () => {
    return (
      <div style={{display: "flex", alignItems: "center", gap: "2px"}}>
        {saller.isAuthorized ? (
          <>
            <VerifiedBadge />
            <span>{saller.username}</span>
          </>
        ) : (
          <span>{saller.username}</span>
        )}
      </div>
    );
  };

  const handlePurchase = () => {
    if (!props.currentUser) {
      setLoginOpen(true);
    } else {
      setModalOpen(true);
    }
  }

  const handleLike = debounce(async () => {
    try {
        setIsLikeLoading(true);
        await axios.put(`http://localhost:5000/client/product/like/${product._id}`, {_id: props.currentUser._id});
        const response = await axios.get(`http://localhost:5000/client/product/get/${product._id}`);
        setProduct(response.data);
        setIsLikeLoading(false);
    } catch (err) {
        console.log(err);
    }
}, 250);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/client/product/get/${productId}`);
      const sallerResponse = await axios.get(`http://localhost:5000/client/user/getById/${response.data.sellerId}`);
      setProduct(response.data);
      setSaller(sallerResponse.data);
      setIsLoading(false);
    } catch (err) {
      if (err.response) {
        navigate("/notFound");
      } else if (err.request) {
        navigate("/timeOut");
      } else {
          console.log(err);
      }
    }
  }
  useEffect((() => {
    fetchProduct();
  }), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (product) {
      setTruncatedText(isExpanded ? product.desc : product.desc.split('\n').slice(0, 10).join('\n'))
      setLineCount(product.desc.split('\n').length);
    }
  }, [product, isExpanded]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        setSliderIndex((prev) => prev === product.productImg.length ? 0 : prev + 1);
      } else if (event.key === 'ArrowLeft') {
        setSliderIndex((prev) => prev === 0 ? product.productImg.length - 1 : prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [product]);

  return (
    <>
    {!isLoading ?
    <StyledProduct $isSmallScreen={isSmallScreen}>
      <StyledSliderArea $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
        <StyledSliderInner>
          <ProductSlider product={product} sliderIndex={sliderIndex} setSliderIndex={setSliderIndex}/>
        </StyledSliderInner>
        {product.productImg.length > 1 ?
        <StyledImgCommands>
        {product.productImg.map((img, index) =>
          <StyledCommandAvatarZone key={index} onClick={() => setSliderIndex(index)} $current={index === sliderIndex ? true : false} theme={theme}>
            <StyledCommandAvatar variant="square" src={`http://localhost:5000/uploads/productImages/${img}`}/>
          </StyledCommandAvatarZone>
        )}
        </StyledImgCommands>
        :
        null
        }
      </StyledSliderArea>

      <StyledDesc $isSmallScreen={isSmallScreen}>
        <StyledDescInner theme={theme}>

          <StyledProductName>
            {product.productName}
            <StyledPrice theme={theme}><StyledCurrencyYen />{product.price}<span style={{color: theme.palette.text.sub, fontSize: "0.9rem", fontWeight: "normal", marginLeft: "5px"}}>{product.deliveryCost === "着払い（購入者負担）" ? "送料込み" : "送料込み(出品者負担)"}</span></StyledPrice>
          </StyledProductName>

          <StyledProductDesc>
            <StyledDescTitle>商品説明</StyledDescTitle>
            <StyledDivider theme={theme}/>
            <StyledProductDescInner>
              {truncatedText}
            </StyledProductDescInner>
            {lineCount > 3 ?
              (<StyledMoreRead theme={theme} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ?
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", margin: "0 auto"}}><div>商品説明を折りたたむ</div><ExpandLess color="secondary"/></div>
              :
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", margin: "0 auto"}}><div>商品説明をすべて表示</div><ExpandMore color="secondary"/></div>}
              </StyledMoreRead>)
              :
              (
                  null
              )
            }
          </StyledProductDesc>
          
          {product.tags.length > 0 ?
          <StyledTags>
            <StyledDescTitle>タグ</StyledDescTitle>
            <StyledDivider theme={theme}/>
            <StyledTagInner>
              {product.tags.map((tag, index) =>
                <StyledTagChip key={index} theme={theme} clickable label={`# ${tag}`}/>
              )}
            </StyledTagInner>
          </StyledTags>
          :
          null
          }

          <StyledInfo>
            <StyledDescTitle>商品情報</StyledDescTitle>
            <StyledDivider theme={theme}/>
            <StyledInfoRow>
              <StyledInfoTitle>カテゴリー</StyledInfoTitle>
              <Link to={`/home?category=${product.category}`}>
                <StyledInfoContentLink theme={theme}>{product.category}</StyledInfoContentLink>
              </Link>
            </StyledInfoRow>
            <StyledInfoRow>
              <StyledInfoTitle>商品の状態</StyledInfoTitle>
              <StyledInfoContent>{product.condition}</StyledInfoContent>
            </StyledInfoRow>
            <StyledInfoRow>
              <StyledInfoTitle>配送料の負担</StyledInfoTitle>
              <StyledInfoContent>{product.deliveryCost}</StyledInfoContent>
            </StyledInfoRow>
            <StyledInfoRow>
              <StyledInfoTitle>発送元の地域</StyledInfoTitle>
              <StyledInfoContent>{product.shippingArea}</StyledInfoContent>
            </StyledInfoRow>
            <StyledInfoRow>
              <StyledInfoTitle>出品日</StyledInfoTitle>
              <StyledInfoContent>{formatRelativeTime(product.createdAt)}</StyledInfoContent>
            </StyledInfoRow>
          </StyledInfo>

          <StyledSeller>
            <StyledDescTitle>出品者情報</StyledDescTitle>
            <StyledDivider theme={theme}/>
            <StyledsellerInner>
              <StyledCard theme={theme} elevation={0}>
                  <Link to={`/user/${saller._id}`} style={{textDecoration: "none"}}>
                      <CardHeader sx={{display: "flex", overflow: "hidden", "& .MuiCardHeader-content": {overflow: "hidden"}}} avatar={<Avatar sx={{ width: 50, height: 50 }} src={saller.icon ? `http://localhost:5000/uploads/userIcons/${saller.icon}` : `${siteAssetsPath}/default_icons/${saller.defaultIcon}`}/>}
                      title={UserBadge()} titleTypographyProps={{ noWrap: true, color: theme.palette.text.main, fontSize: "1.3rem"}} action={<ArrowForwardIos style={{color: theme.palette.icon.main}}/>}
                      subheader={"@"+saller.userId} subheaderTypographyProps={{ noWrap: true, color: theme.palette.text.sub}}>
                      </CardHeader>
                      <CardActions>
              <div style={{display: "flex", gap: "2px", width: "100%"}}>
                <Rating value={5} readOnly />
                <StyledRateNum theme={theme}>10000</StyledRateNum>
              </div>
              </CardActions>
                  </Link>
              </StyledCard>
              {saller.isAuthorized ? <StyledSuccessAlert theme={theme} severity="success">認証済みユーザーによる出品です</StyledSuccessAlert> : <StyledWarningAlert theme={theme} severity="warning">未認証ユーザーによる出品です</StyledWarningAlert>}
              <StyledIcons theme={theme}>
                {props.currentUser ?
                  <StyledIconAndName1 theme={theme} $isLogin={props.currentUser ? true : false} $isLiked={product.likes.includes(props.currentUser._id) ? true : false}>
                    {isLikeLoading ?
                    <>
                    <CircularProgress color='secondary' size={30} />
                    </>
                    :
                    <>
                    <FavoriteBorder onClick={handleLike}/>
                    <StyledIconDetail>{product.likes.includes(props.currentUser._id) ? "いいね済み" : "いいね"}</StyledIconDetail>
                    </>
                    }
                  </StyledIconAndName1>
                  :
                  <StyledIconAndName1 theme={theme} $isLogin={props.currentUser ? true : false} $isLiked={false}>
                    <FavoriteBorder />
                    <StyledIconDetail>いいね</StyledIconDetail>
                  </StyledIconAndName1>
                }
                <StyledIconAndName2 theme={theme}>
                  <SmsOutlined />
                  <StyledIconDetail>コメント</StyledIconDetail>
                </StyledIconAndName2>
                <StyledIconAndName3 theme={theme}>
                  <Share />
                  <StyledIconDetail>共有</StyledIconDetail>
                </StyledIconAndName3>
              </StyledIcons>
              {props.currentUser ?
                props.currentUser._id !== saller._id && !product.purchasingId ?
                  <Button color="secondary" variant="contained" fullWidth onClick={handlePurchase}>購入取引へ</Button>
                  :
                  null
                :
                <Button color="secondary" variant="contained" fullWidth onClick={handlePurchase}>購入取引へ</Button>
              }
            </StyledsellerInner>
          </StyledSeller>
            
        </StyledDescInner>
      </StyledDesc>

    </StyledProduct>
    :
    <LinearProgress color='secondary' style={{backgroundColor: "transparent"}}/>
    }

    {modalOpen && <PurchaseModal open={modalOpen} setOpen={setModalOpen} currentUser={props.currentUser} product={product} fetchProduct={fetchProduct}/>}
    <LoginRequiredModal open={loginOpen} onClose={setLoginOpen} header="ログインが必要です。" desc={"商品を購入しますか？今すぐユーザーのログインを完了させましょう！"}/>
    </>
  )
}


const StyledProduct = styled.div`
  display: ${(props) => props.$isSmallScreen ? "row" : "flex"};
  justify-content: center;
  align-items: start;
  width: 1300px;
  height: fit-content;
  max-width: 100%;
  margin: 0 auto;
`

const StyledSliderArea = styled.div`
  width: ${(props) => props.$isSmallScreen ? "100%" : "55%"};
  min-width: ${(props) => props.$isSmallScreen ? 0 : "500px"};
  aspect-ratio: ${(props) => props.$isXsScreen ? "1/1" : "1.25/1"};
  padding: 20px 0;
`

const StyledSliderInner = styled.div`
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`

const StyledImgCommands = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  margin: 10px auto 0 auto;
  height: 20%;
`

const StyledCommandAvatarZone = styled.div`
  width: 10%;
  aspect-ratio: 1/1;
  border-radius: 5px;
  overflow: hidden;
  outline: ${(props) => props.$current ? `solid 3px ${props.theme.palette.secondary.main}` : "none"};
  background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledCommandAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$isSmallScreen ? "100%" : "45%"};
  height: 2000px;
  padding 20px 0;
`

const StyledDescInner = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap 20px;
  height: 100%;
  width: 85%;
  color: ${(props) => props.theme.palette.text.main};
`

const StyledDescTitle = styled.div`
    width: 100%;
    padding: 5px;
    font-size: 1.1rem;
`

const StyledDivider = styled(Divider)`
  && {
    width: 100%;
    background-color: ${(props) => props.theme.palette.line.disable};
  }
`

const StyledProductName = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const StyledPrice = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.palette.secondary.main};
`

const StyledCurrencyYen = styled(CurrencyYen)`
    && {
        font-size: 1.1rem;
    }
`

const StyledProductDesc = styled.div`
  width: 100%;
`

const StyledProductDescInner = styled.div`
  padding: 15px 5px;
  line-height: 100%;
  font-size: 1.1rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const StyledMoreRead = styled.div`
    display: flex;
    justify-contet: center;
    align-items: center;
    color: ${(props) => props.theme.palette.secondary.main};
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
    overflow: hidden;
    user-select: none;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover2};
    }
`

const StyledTags = styled.div`
  width: 100%;
`

const StyledTagInner = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  padding: 15px 5px;
`

const StyledTagChip = styled(Chip)`
  && {
    height: 30px;
    color: ${(props) => props.theme.palette.secondary.main};
    border-radius: 5px;
    background-color: ${(props) => props.theme.palette.background.pop};

    &&:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
  }
`

const StyledInfo = styled.div`
  width: 100%;
`

const StyledSeller = styled.div`
  width: 100%;
`

const StyledsellerInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 15px 5px;
`

const StyledCard = styled(Card)`
  && {
    background-color: transparent;
    width: 100%;
    padding-left: 5%;
    &:hover {
      background-color: ${(props) => props.theme.palette.background.hover2};
    }
  }
`

const StyledIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin: 20px 0;
`

const StyledIconAndName1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px;
  cursor: ${(props) => props.$isLogin ? "pointer" : "auto"};
  color: ${(props) => props.$isLogin ? props.$isLiked ? props.theme.palette.icon.like : props.theme.palette.text.main : props.theme.palette.line.disable};
  &:hover {
    color: ${(props) => props.$isLogin ? props.theme.palette.icon.like : props.theme.palette.line.disable};
  }
`

const StyledIconAndName2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.palette.icon.comment};
  }
`

const StyledIconAndName3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.palette.icon.share};
  }
`

const StyledIconDetail = styled.div`
  font-size: 0.8rem;
`

const StyledSuccessAlert = styled(Alert)`
  && {
    width: 100%;
    color: ${(props) => props.theme.palette.text.alert};
    background-color: ${(props) => props.theme.palette.background.successBack};
    outline: solid 0.5px ${(props) => props.theme.palette.line.successLine};
  }
`

const StyledWarningAlert = styled(Alert)`
  && {
    width: 100%;
    color: ${(props) => props.theme.palette.text.alert};
    background-color: ${(props) => props.theme.palette.background.warningBack};
    outline: solid 0.5px ${(props) => props.theme.palette.line.warningLine};
  }
`

const StyledInfoRow = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  width: 100%;
  padding: 15px 5px;
`

const StyledInfoContentLink = styled.div`
  color: ${(props) => props.theme.palette.secondary.main};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${(props) => props.theme.palette.secondary.mainHover};
  }
`

const StyledInfoTitle = styled.div`
  width: 40%;
`

const StyledInfoContent = styled.div`
`

const StyledRateNum = styled.div`
  color: ${(props) => props.theme.palette.secondary.main};
`


export default Product