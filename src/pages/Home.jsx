import CategoryNavigation from '../components/common/categoryNavigation/CategoryNavigation'
import styled from 'styled-components';
import { useMediaQuery, useTheme } from '@mui/material';
import Carousel from '../components/home/carousel/Carousel';
import ProductCard from '../components/common/productCard/ProductCard';
import UserApproach from '../components/home/userApproach/UserApproach';


const Home = () => {

  const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const theme = useTheme();

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

  return (
    <>
      <CategoryNavigation/>

      <StyledHome>

        <Carousel />
        
        <StyledHomeInnner>

          <StyledProductZone>
            {limitedProducts.map(product =>
              <ProductCard key={product.id} product={product}/>
              )}
          </StyledProductZone>

          <StyledHomeSection theme={theme}>ユーザーを見つける</StyledHomeSection>

          <StyledUserZone>
            <UserApproach />
          </StyledUserZone>

        </StyledHomeInnner>
        
      </StyledHome>
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
  margin: 50px auto 0 auto;
`

const StyledProductZone = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`

const StyledUserZone = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  margin-bottom: 50px;
`


export default Home