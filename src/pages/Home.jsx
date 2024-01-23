import CategoryNavigation from '../components/common/categoryNavigation/CategoryNavigation';
import styled from 'styled-components';
import { CircularProgress, LinearProgress, useMediaQuery, useTheme } from '@mui/material';
import Carousel from '../components/home/carousel/Carousel';
import ProductCard from '../components/common/productCard/ProductCard';
import UserApproach from '../components/home/userApproach/UserApproach';
import GroupApproach from '../components/home/groupApproach/GroupApproach';
import VerifyBar from '../components/home/verifyBar/VerifyBar';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';


const Home = (props) => {

  const [isVerifyRecommend, setIsVerifyRecommend] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();
  const [pageNumber, setPasgeNumber] = useState(1);
  const [isNextLoading, setIsNextLoading] = useState(true);
  const [isErrorSnack, setIsErrorSnack] = useState(false);
  const [snackWarning, setSnackWarning] = useState("");
  const [isNextErrorSnack, setIsNextErrorSnack] = useState(false);
  const [nextSnackWarning, setNextSnackWarning] = useState("");
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const PAGE_SIZE = 18;
  const theme = useTheme();

  useEffect(() => {

    const handleScroll = debounce(async () => {
      const scrollTop = window.scrollY;// 現在のスクロール位置
      const pageHeight = document.documentElement.scrollHeight;// ページの高さ
      const windowHeight = window.innerHeight;// ウィンドウの高さ
      // 一番下までスクロールされたかどうかを判定(誤差絶対値5px許容)
      if (Math.abs(scrollTop + windowHeight - pageHeight) <= 5) {
        try {
          const response = await axios.get(`http://localhost:5000/client/product/getNewest/?page=${pageNumber + 1}&pageSize=${PAGE_SIZE}`);
          if (response.data.length === 0) {
            setIsNextLoading(false);
            return; // 商品がそれ以上フェッチできない場合、終了
          }
          setProducts((prev) => [...prev, ...response.data]);
          setPasgeNumber((prev) => (prev + 1));
          if (response.data.length < PAGE_SIZE) {
            setIsNextLoading(false);
          }
        } catch (err) {
          if (err.response) {
            console.log(err);
          } else if (err.request) {
            setNextSnackWarning("サーバーとの通信がタイムアウトしました");
            setIsNextErrorSnack(true);
          } else {
              console.log(err);
          }
        }
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/client/product/getNewest/?page=${1}&pageSize=${PAGE_SIZE}`);
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(err);
        } else if (err.request) {
          setSnackWarning("サーバーとの通信がタイムアウトしました");
          setIsErrorSnack(true);
        } else {
            console.log(err);
        }
      }
    }
    fetchProducts();
  }, [])

  const upperProducts = products ? isXsScreen ? products.slice(0, 6) : isSmallScreen ? products.slice(0, 9) : isMiddleScreen ? products.slice(0, 12) : isLargeScreen ? products.slice(0, 15) : products.slice(0, 18) : null;
  const lowerProducts = products ? isXsScreen ? products.slice(6) : isSmallScreen ? products.slice(9) : isMiddleScreen ? products.slice(12) : isLargeScreen ? products.slice(15) : products.slice(18) : null;

  return (
    <>
    <CategoryNavigation/>

      {!isLoading ?
      <>

      {props.currentUser ? !props.currentUser.isAuthorized && isVerifyRecommend && !isXsScreen ? <VerifyBar setIsVerifyRecommend={setIsVerifyRecommend} /> : null : null}

      <StyledHome>

        <Carousel />
        
        <StyledHomeInnner>

          <StyledProductZone>
            {upperProducts.map((product, index) =>
              <ProductCard key={index} product={product} currentUser={props.currentUser}/>
            )}
          </StyledProductZone>

          <StyledHomeSection theme={theme}>ユーザーを見つける</StyledHomeSection>

          <StyledApproachZone>
            <UserApproach />
          </StyledApproachZone>

          <StyledHomeSection theme={theme}>グループを見つける</StyledHomeSection>

          <StyledApproachZone>
            <GroupApproach />
          </StyledApproachZone>

          <StyledProductZoneScroll>
            {lowerProducts.map((product, index) =>
              <ProductCard key={index} product={product}/>
              )}
          </StyledProductZoneScroll>

          <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            {isNextLoading ? <CircularProgress color='secondary'/> : null}
          </div>
          <ErrorSnack open={isNextErrorSnack} onClose={() => setIsNextErrorSnack(false)} warning={nextSnackWarning}/>

        </StyledHomeInnner>
        
      </StyledHome>
      </>
      :
      <>
      <LinearProgress color='secondary' style={{backgroundColor: "transparent"}}/>
      <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>
      </>
      }
    </>
  )
}


const StyledHome = styled.div`
  width: 100%;
  max-width: 3000px;
  margin: 0 auto;
`

const StyledHomeSection = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.sub};
  border-bottom: solid 0.5px ${(props) => props.theme.palette.text.sub};
`

const StyledHomeInnner = styled.div`
  width: 90%;
  height: fit-content;
  margin: 50px auto 0 auto;
`

const StyledProductZone = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`

const StyledApproachZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding 25px 0;
`

const StyledProductZoneScroll = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-top: 30px;
`


export default Home