import { Avatar, AvatarGroup, Button, ImageList, ImageListItem, ImageListItemBar, LinearProgress, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';
import { Link, useNavigate } from 'react-router-dom';
import { useEnv } from '../provider/EnvProvider';

const Following = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isNextLoading, setIsNextLoading] = useState(true);
  const [followings, setFollowings] = useState();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isErrorSnack, setIsErrorSnack] = useState(false);
  const [snackWarning, setSnackWarning] = useState("");

  const { siteAssetsPath, backendAccessPath } = useEnv();
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const theme = useTheme();
  const DISP_SIZE = 5;
  const PAGE_SIZE = 18;

  const handleProfileNavigate = (event, product) => {
    event.preventDefault();
    navigate(`/user/${product.sellerId._id}`);
  }

  const handleDragStart = (event, product) => {
    // Avatar内の画像をドラッグした際の関数
    const imageUrl = `${backendAccessPath}/uploads/productImages/${product.productImg[0]}`;
    // その商品のサムネイルをeventのdataTransferオブジェクトにavatarImageと言う名前で保存。
    // これはimagePopper.jsx内のPopper内で取得され、画像検索に用いられる。
    event.dataTransfer.setData('avatarImage', imageUrl);
}

  useEffect(() => {
    const fetchFollowings = async () => {
        try {
            const response = await axios.get(`${backendAccessPath}/client/user/getFollowings/${props.currentUser._id}/?pageSize=${props.currentUser.followings.length}`);
            const productResponse = await axios.get(`${backendAccessPath}/client/product/following/${props.currentUser._id}?page=${1}&pageSize=${PAGE_SIZE}`);
            setFollowings(response.data);
            setProducts(productResponse.data);
            if (productResponse.data.length < PAGE_SIZE) setIsNextLoading(false);
            setIsLoading(false);
        } catch (err) {
            if (err.response) {
                console.log(err);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
                setIsErrorSnack(true);
            } else {
                console.log(err);
            }
        }
      }
      fetchFollowings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendAccessPath}/client/product/following/${props.currentUser._id}?page=${currentPage}&pageSize=${PAGE_SIZE}`);
        setProducts((prev) => [...prev, ...response.data]);
        if (response.data.length < PAGE_SIZE) setIsNextLoading(false);
      } catch (err) {
          if (err.response) {
              console.log(err);
          } else if (err.request) {
              setSnackWarning("サーバーとの通信がタイムアウトしました。");
              setIsErrorSnack(true);
          } else {
              console.log(err);
          }
      }
    }
    fetchProduct();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
      {!isLoading ?
      <StyledFollowing>
        <StyledInnner>
          <StyledSection theme={theme}>

            <StyledSectionDes>フォロー中のアクティビティ</StyledSectionDes>
            <StyledSectionFollowers>
              <AvatarGroup max={DISP_SIZE}>
                {followings.map((user, index) =>
                  <Tooltip key={index} title={user.username} arrow placement='top'>
                    <Avatar src={user.icon ? `${backendAccessPath}/uploads/userIcons/${user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}`} onClick={() => navigate(`/user/${user._id}`)} style={{cursor: "pointer"}}/>
                  </Tooltip>
                )}
              </AvatarGroup>
            </StyledSectionFollowers>
          </StyledSection>

          <ImageList sx={{ width: "100%" }} cols={isXsScreen ? 2 : isSmallScreen ? 3 : isMiddleScreen ? 4 : isLargeScreen ? 5 : 6}>
            {products.map((product, index) => (
              <Link key={index} to={`/product/${product._id}`}>
                <ImageListItem key={index} sx={{overflow: "hidden"}}>
                <StyledSoldLabel theme={theme} isSold={product.purchasingId}>SOLD</StyledSoldLabel>
                <StyledDarkness isSold={product.purchasingId} />
                <img
                  src={`${backendAccessPath}/uploads/productImages/${product.productImg[0]}`}
                  alt='商品画像'
                  loading="lazy"
                  onDragStart={(event) => handleDragStart(event, product)}
                />
                <ImageListItemBar
                  title={product.productName}
                  subtitle={`@${product.sellerId.userId}`}
                  actionIcon={<Avatar src={product.sellerId.icon ? `${backendAccessPath}/uploads/userIcons/${product.sellerId.icon}` : `${siteAssetsPath}/default_icons/${product.sellerId.defaultIcon}`} onClick={(event) => handleProfileNavigate(event, product)}/>}
                />
              </ImageListItem>
              </Link>
            ))}
          </ImageList>
          {isNextLoading && <Button fullWidth color='secondary' variant='outlined' onClick={() => setCurrentPage((prev) => (prev + 1))} sx={{padding: "15px 0", marginTop: "10px"}}>さらに表示</Button>}

        </StyledInnner>
      </StyledFollowing>
      :
      <LinearProgress color='secondary' style={{backgroundColor: "transparent"}}/>
      }

      <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>
      </>
    )
}


const StyledFollowing = styled.div`
  width: 100%;
  max-width: 3000px;
  margin: 0 auto;
`

const StyledInnner = styled.div`
  width: 90%;
  height: fit-content;
  margin: 0 auto;
  padding: 0 0 100px 0;
`

const StyledSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  padding: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.sub};
  border-bottom: solid 0.5px ${(props) => props.theme.palette.text.sub};
`

const StyledSectionDes = styled.div`
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledSectionFollowers = styled.div`
  width: 50%;
`

const StyledSoldLabel = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    pointer-events: none;
    user-select: none;
    display: ${(props) => props.isSold ? "flex" : "none"};
    justify-content: center;
    align-items: end;
    width: 70%;
    height: 70%;
    padding-bottom: 6%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 1.3rm;
    font-weight: bold;
    letter-spacing: .1rem;
    color: ${(props) => props.theme.palette.text.main2};
    background-color: ${(props) => props.theme.palette.secondary.main};
`

const StyledDarkness = styled.div`
    display: ${(props) => props.isSold ? "block" : "none"};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    pointer-events: none;
    user-select: none;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`


export default Following