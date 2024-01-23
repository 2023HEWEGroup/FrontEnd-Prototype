import styled from '@emotion/styled'
import { Avatar, CircularProgress, Slide, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ErrorSnack from '../common/errorSnack/ErrorSnack';


const UseLike = (props) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [isNextLoading, setIsNextLoading] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const pageSize = 18;
    const theme = useTheme();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/product/userLike/${props.user._id}?page=${1}&pageSize=${pageSize}`);
                setProducts(response.data);
                console.log(response.data)
                setIsLoading(false);
                if (response.data.length === pageSize) {
                    setIsNextLoading(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleScroll = debounce(async () => {
        const scrollTop = window.scrollY;// 現在のスクロール位置
        const pageHeight = document.documentElement.scrollHeight;// ページの高さ
        const windowHeight = window.innerHeight;// ウィンドウの高さ
        // 一番下までスクロールされたかどうかを判定(誤差絶対値5px許容)
        if (Math.abs(scrollTop + windowHeight - pageHeight) <= 5) {
        try {
            const response = await axios.get(`http://localhost:5000/client/product/userLike/${props.user._id}?page=${pageNumber + 1}&pageSize=${pageSize}`);
            if (response.data.length < 0) {
            setIsNextLoading(false);
            return; // 商品がそれ以上フェッチできない場合、終了
            }
            setProducts((prev) => [...prev, ...response.data]);
            setPageNumber((prev) => (prev + 1));
            if (response.data.length < pageSize) {
                setIsNextLoading(false);
            }
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
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, [pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Slide in direction={props.direction}>
            <StyledUserProduct>
                <StyledTitle theme={theme}>
                    出品中の商品 ({products ? products.length : ""}件)
                </StyledTitle>
                <StyledProductTable>
                    {!isLoading ?
                    products.map(product =>
                        <StyledProduct key={product._id} $isXsScreen={isXsScreen} $isSmallScreen={isSmallScreen} $isMiddleScreen={isMiddleScreen} $isLargeScreen={isLargeScreen}>
                            <StyledLink to={`/product/${product._id}`}>
                                <StyledProductInner>
                                    <StyledProductImgZone theme={theme}>
                                        <StyledProductAvatar variant="square" src={`http://localhost:5000/uploads/productImages/${product.productImg[0]}`}>
                                        </StyledProductAvatar>
                                    </StyledProductImgZone>
                                    <StyledProductDetail>
                                        <StyledProductName theme={theme}>{product.productName}</StyledProductName>
                                        <StyledProductPrice theme={theme}>{product.price} ポイント</StyledProductPrice>
                                    </StyledProductDetail>
                                </StyledProductInner>
                            </StyledLink>
                        </StyledProduct>
                    )
                    :
                    <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CircularProgress color='secondary' />
                    </div>
                    }
                </StyledProductTable>

                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {isNextLoading ? <CircularProgress color='secondary'/> : null}
                </div>

            </StyledUserProduct>
        </Slide>

        
        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>
        </>
    )
}


const StyledUserProduct = styled.div`
    width: 100%;
`

const StyledTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
    font-size: 1.2rem;
    margin: 30px auto;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledProductTable = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    padding-left: 10px;
    margin: 0 auto;
`

const StyledProduct = styled.div`
    width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33%" : (props.$isMiddleScreen ? "25%" : props.$isLargeScreen ? "20%" : "16.7%")))} - 10px);
    height: 100%;
    cursor: pointer;
`

const StyledLink = styled(Link)`
    && {
        width: 100%;
        height: 100%;
        text-decoration: none;
    }
`

const StyledProductInner = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
`

const StyledProductImgZone = styled.div`
    aspect-ratio: 1/1;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${(props => props.theme.palette.background.productBack)};;
`

const StyledProductAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledProductDetail = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
`

const StyledProductName = styled.div`
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${(props => props.theme.palette.text.main)};
`

const StyledProductPrice = styled.div`
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${(props => props.theme.palette.secondary.main)};
`


export default UseLike