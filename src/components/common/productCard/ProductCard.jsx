import { CurrencyYen, FavoriteBorder, MoreVert } from '@mui/icons-material';
import { Alert, Avatar, IconButton, Paper, Popper, Slide, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const ProductCard = (props) => {

    const [isLinkSnack, setIsLinkSnack] = useState(false);
    const [isProductPopperOpen, setIsProductPopperOpen] = useState(false);
    const [productAnchorEl, setProductAnchorEl] = useState(null);
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const productPopperRef = useRef(null);
    const theme = useTheme();
    const navigate = useNavigate();

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

    const handleGoToSeller = (e, _id) => {
        e.preventDefault();
        navigate(`/user/${_id}`);
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

    return (
        <>
        <StyledProduct $isLargeScreen={isLargeScreen} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <Link to={`/product/${props.product._id}`} style={{textDecoration: "none"}}>
                <StyledProductImgZone theme={theme}>
                    <StyledSoldLabel theme={theme} isSold={props.product.purchasingId}>SOLD</StyledSoldLabel>
                    <StyledDarkness isSold={props.product.purchasingId} />
                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${props.product.productImg[0]}`} alt='商品画像' />
                    <StyledProductOption theme={theme} productAnchorEl={productAnchorEl}>
                        <StyledIconButton onClick={handleProductPopper}>
                        <MoreVert />
                        </StyledIconButton>
                    </StyledProductOption>
                </StyledProductImgZone>
                <StyledProductDesc>
                <StyledSellerId theme={theme} onClick={(e) => handleGoToSeller(e, props.product.sellerId._id)}>{`by @${props.product.sellerId.userId}`}</StyledSellerId>
                <StyledPriceAndLike>
                    <StyledPrice theme={theme}><StyledCurrencyYen />{`${props.product.price}`}</StyledPrice>
                    <StyledFavoriteBorder theme={theme}/>
                </StyledPriceAndLike>
                </StyledProductDesc>
            </Link>

            <Popper sx={{zIndex: 60}} open={isProductPopperOpen} anchorEl={productAnchorEl} placement="bottom-end" theme={theme} ref={productPopperRef}>
            <StyledPopperPaper elevation={3} theme={theme}>
                <StyledPopperItem theme={theme} onClick={handleLinkCopy}>リンクをコピー</StyledPopperItem>
                <StyledPopperItem theme={theme}>共有</StyledPopperItem>
                <StyledPopperItem theme={theme}>いいねする</StyledPopperItem>
            </StyledPopperPaper>
            </Popper>
        </StyledProduct>

        <Snackbar open={isLinkSnack} onClose={handleLinkSnackClose} TransitionComponent={SlideTransition} autoHideDuration={3000}>
            <Alert severity='success'>リンクをコピーしました</Alert>
        </Snackbar>
        </>
    )
}


const StyledProduct = styled.div`
    width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33%" : (props.$isMiddleScreen ? "25%" : props.$isLargeScreen ? "20%" : "16.7%")))} - 10px);
    height: fit-content;
    cursor: pointer;
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
    width: 100%;
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


export default ProductCard