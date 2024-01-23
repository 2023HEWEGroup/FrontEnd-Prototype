import { CurrencyYen, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import { Alert, Avatar, CircularProgress, IconButton, Paper, Popper, Skeleton, Slide, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const ProductCard = (props) => {

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isLinkSnack, setIsLinkSnack] = useState(false);
    const [isProductPopperOpen, setIsProductPopperOpen] = useState(false);
    const [productAnchorEl, setProductAnchorEl] = useState(null);
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const user = useSelector((state) => state.user.value);
    const productPopperRef = useRef(null);
    const theme = useTheme();

    const handleProductPopper = (e) => {
        e.preventDefault();
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

    const handleLike = debounce(async () => {
        try {
            setIsLikeLoading(true);
            await axios.put(`http://localhost:5000/client/product/like/${product._id}`, {_id: user._id});
            const response = await axios.get(`http://localhost:5000/client/product/get/${product._id}`);
            setProduct(response.data);
            setIsLikeLoading(false);
        } catch (err) {
            console.log(err);
        }
    }, 250);

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

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/client/product/get/${props.product._id}`);
            setProduct(response.data);
            setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        useEffect((() => {
        fetchProduct();
      }), []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {!isLoading ?
        <StyledProduct $isLargeScreen={isLargeScreen} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <Link to={`/product/${product._id}`} style={{textDecoration: "none"}}>
                <StyledProductImgZone theme={theme}>
                    <StyledSoldLabel theme={theme} isSold={product.purchasingId}>SOLD</StyledSoldLabel>
                    <StyledDarkness isSold={product.purchasingId} />
                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${product.productImg[0]}`} alt='商品画像' />
                    <StyledProductOption theme={theme} productAnchorEl={productAnchorEl}>
                        <StyledIconButton onClick={handleProductPopper}>
                        <MoreVert />
                        </StyledIconButton>
                    </StyledProductOption>
                </StyledProductImgZone>
            </Link>

            <StyledProductDesc>
            <Link to={`/user/${props.product.sellerId._id}`} style={{textDecoration: "none", width: "fit-content"}}>
                <StyledSellerId theme={theme}>{`by @${props.product.sellerId.userId}`}</StyledSellerId>
            </Link>
            <StyledPriceAndLike>
                <StyledPrice theme={theme}><StyledCurrencyYen />{`${product.price}`}</StyledPrice>
                {!isLikeLoading ? product.likes.includes(user._id) ? <StyledFavorite theme={theme} onClick={handleLike}/> : <StyledFavoriteBorder theme={theme} onClick={handleLike}/> : <div style={{width: "25px", height: "25px", display: "flex", justifyContent: "center", alignItems: "center"}}><StyledCircularProgress size={20} color='secondary'/></div>}
            </StyledPriceAndLike>
            </StyledProductDesc>

            <Popper sx={{zIndex: 60}} open={isProductPopperOpen} anchorEl={productAnchorEl} placement="bottom-end" theme={theme} ref={productPopperRef}>
            <StyledPopperPaper elevation={3} theme={theme}>
                <StyledPopperItem theme={theme} onClick={handleLinkCopy}>リンクをコピー</StyledPopperItem>
                <StyledPopperItem theme={theme}>共有</StyledPopperItem>
                <StyledPopperItem theme={theme} onClick={handleLike}>{product.likes.includes(user._id) ? "いいね解除" : "いいねする"}</StyledPopperItem>
            </StyledPopperPaper>
            </Popper>
        </StyledProduct>

        :

        <StyledProduct $isLargeScreen={isLargeScreen} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <StyledProductImgZone theme={theme}>
                <StyledSkeleton variant="rectangular"/>
            </StyledProductImgZone>

            <StyledProductDesc>
            <StyledSellerId theme={theme}></StyledSellerId>
            <StyledPriceAndLike>
                <StyledPrice theme={theme}><StyledCurrencyYen /></StyledPrice>
                <StyledFavoriteBorder theme={theme}/>
            </StyledPriceAndLike>
            </StyledProductDesc>
        </StyledProduct>
        }

        <Snackbar open={isLinkSnack} onClose={handleLinkSnackClose} TransitionComponent={SlideTransition} autoHideDuration={3000}>
            <Alert severity='success'>リンクをコピーしました</Alert>
        </Snackbar>
        </>
    )
}


const StyledProduct = styled.div`
    width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33%" : (props.$isMiddleScreen ? "25%" : props.$isLargeScreen ? "20%" : "16.7%")))} - 10px);
    height: fit-content;
    margin-bottom: 10px;
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledProductImgZone = styled.div`
    position: relative;
    aspect-ratio: 1/1;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledSoldLabel = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
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
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`

const StyledProductOption = styled.div`
    opacity: 0;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 60;
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
    padding-top: 10px;
    width: 100%;
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
    width: 100%;
    height: 25px;
`

const StyledPrice = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${(props) => props.theme.palette.secondary.main};
`

const StyledCurrencyYen = styled(CurrencyYen)`
    && {
        font-size: 1rem;
    }
`

const StyledFavoriteBorder = styled(FavoriteBorder)`
    && {
        width: 25px;
        height: 25px;
        color: ${(props) => props.theme.palette.icon.main};
        cursor: pointer;

        &:hover {
        color: ${(props) => props.theme.palette.icon.like};
        }
    }
`

const StyledFavorite = styled(Favorite)`
    && {
        width: 25px;
        height: 25px;
        cursor: pointer;
        color: ${(props) => props.theme.palette.icon.like};
    }
`

const StyledCircularProgress = styled(CircularProgress)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledPopperPaper = styled(Paper)`
    && {
        width: 150px;
        padding: 5px 0;
        border-radius: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.commandPop};
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

const StyledSkeleton = styled(Skeleton)`
    && {
        width: 100%;
        height: 100%;
        color: #aff;
        background-color: #444;
    }
`


export default ProductCard