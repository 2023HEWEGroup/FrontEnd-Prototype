import { FavoriteBorder, MoreVert } from '@mui/icons-material';
import { Alert, Avatar, IconButton, Paper, Popper, Slide, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';


const SlideTransition = (props) => {
    return <Slide {...props} direction="right" />;
};


const ProductCard = (props) => {

    const [isLinkSnack, setIsLinkSnack] = useState(false);
    const [isProductPopperOpen, setIsProductPopperOpen] = useState(false);
    const [productAnchorEl, setProductAnchorEl] = useState(null);
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
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
        <StyledProduct $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <StyledProductImgZone>
            <StyledAvatar variant='square' src={props.product.imageUrl} alt='商品画像' />
            <StyledProductOption theme={theme} productAnchorEl={productAnchorEl}>
                <StyledIconButton onClick={handleProductPopper}>
                <MoreVert />
                </StyledIconButton>
            </StyledProductOption>
            </StyledProductImgZone>
            <StyledProductDesc>
            <StyledProductName theme={theme}>{props.product.productName}</StyledProductName>
            <StyledSellerId theme={theme}>{`by @${props.product.sallerId}`}</StyledSellerId>
            <StyledPriceAndLike>
                <StyledPrice theme={theme}>{`${props.product.point} ポイント`}</StyledPrice>
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

            <Snackbar open={isLinkSnack} onClose={handleLinkSnackClose} TransitionComponent={SlideTransition} autoHideDuration={3000}>
                <Alert severity='success'>リンクをコピーしました</Alert>
            </Snackbar>
        </StyledProduct>
    )
}


const StyledProduct = styled.div`
    width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33%" : (props.$isMiddleScreen ? "25%" : "20%")))} - 20px);
    height: fit-content;
    cursor: pointer;
    margin-bottom: 20px;
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
    background-color: #444;
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
    word-break: break-all;
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


export default ProductCard