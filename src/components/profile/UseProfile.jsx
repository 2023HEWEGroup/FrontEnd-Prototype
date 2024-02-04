import styled from '@emotion/styled'
import { CurrencyYen, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Avatar, CircularProgress, Slide, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const UseProfile = (props) => {

    const theme = useTheme();
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const truncatedText = props.isExpanded ? props.user.desc : props.user.desc.split('\n').slice(0, 3).join('\n');
    const lineCount = props.user.desc.split('\n').length;
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const handleDragStart = (event, product) => {
        // Avatar内の画像をドラッグした際の関数
        const imageUrl = `http://localhost:5000/uploads/productImages/${product.productImg[0]}`;
        // その商品のサムネイルをeventのdataTransferオブジェクトにavatarImageと言う名前で保存。
        // これはimagePopper.jsx内のPopper内で取得され、画像検索に用いられる。
        event.dataTransfer.setData('avatarImage', imageUrl);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let pageSize;
                if (isXsScreen) pageSize = 2;
                else if (isSmallScreen) pageSize = 3;
                else if (isMiddleScreen) pageSize = 4;
                else if (isLargeScreen) pageSize = 5;
                else pageSize = 6;
                const userProducts = await axios.get(`http://localhost:5000/client/product/getOrderUser/${props.user._id}?page=1&pageSize=${pageSize}`);
                setProducts(userProducts.data);
                setProductsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, [isXsScreen, isSmallScreen, isMiddleScreen, isLargeScreen, props.user]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <>
        <Slide in direction={props.direction} >
            <StyledUserProfile>

                <StyledTitle>プロフィール</StyledTitle>
                {props.user.desc ?
                <StyledUserDesc theme={theme}>
                    <StyledUserDescInner>
                        {truncatedText}
                    </StyledUserDescInner>
                    {lineCount > 3 ?
                    (<StyledMoreRead theme={theme} onClick={() => props.setIsExpanded(!props.isExpanded)}>
                    {props.isExpanded ?
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", margin: "0 auto"}}><div>プロフィールを折りたたむ</div><ExpandLess color="secondary"/></div>
                    :
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", margin: "0 auto"}}><div>プロフィールをすべて表示</div><ExpandMore color="secondary"/></div>}
                    </StyledMoreRead>)
                    :
                    (
                        null
                    )
                    }
                </StyledUserDesc>
                :
                <StyledNothing theme={theme}>※プロフィールを設定していません</StyledNothing>
                }

                <StyledTitle theme={theme}>
                    <div>出品中の商品 ({props.user.products.length}件)</div>
                    {props.user.products.length > 0 ?
                    <StyledMoreView theme={theme} onClick={() => props.setTabValue(1)}>{"すべて見る >"}</StyledMoreView>
                    :
                    null
                    }
                </StyledTitle>
                {!productsLoading ?
                <>
                {props.user.products.length > 0 ?
                <StyledUserProduct>
                    <StyledProductTable>
                        {products.map(product =>
                            <StyledProduct key={product._id} $isXsScreen={isXsScreen} $isSmallScreen={isSmallScreen} $isMiddleScreen={isMiddleScreen} $isLargeScreen={isLargeScreen}>
                                <StyledLink to={`/product/${product._id}`}>
                                    <StyledProductInner>
                                        <StyledProductImgZone theme={theme}>
                                            <StyledSoldLabel theme={theme} isSold={product.purchasingId}>SOLD</StyledSoldLabel>
                                            <StyledDarkness isSold={product.purchasingId} />
                                            <StyledProductAvatar variant="square" src={`http://localhost:5000/uploads/productImages/${product.productImg[0]}`} onDragStart={(event) => handleDragStart(event, product)}>
                                            </StyledProductAvatar>
                                        </StyledProductImgZone>
                                        <StyledProductDetail>
                                            <StyledProductName theme={theme}>{product.productName}</StyledProductName>
                                            <StyledPrice theme={theme}><StyledCurrencyYen />{`${product.price}`}</StyledPrice>
                                        </StyledProductDetail>
                                    </StyledProductInner>
                                </StyledLink>
                            </StyledProduct>
                        )}
                    </StyledProductTable>
                </StyledUserProduct>
                :
                null
                }
                </>
                :
                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <CircularProgress color='secondary' />
                </div>
                }
            </StyledUserProfile>
        </Slide>
        </>
    )
}


const StyledUserProfile = styled.div`
    width: 100%;
`

const StyledUserDesc = styled.div`
    width: 100%;
    margin: 0 auto;
    min-height: 100px;
    border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};
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

const StyledMoreView = styled.div`
    color: ${(props) => props.theme.palette.text.sub2};
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        text-decoration: underline;
    }
    &:active {
        text-decoration: none;
    }
`

const StyledUserDescInner = styled.div`
    width: 90%;
    height: 100%;
    margin: 0 auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: ${(props) => props.theme.palette.text.sub2};
    font-size: 1.2rem;
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

const StyledUserProduct = styled.div`
    width: 100%;
    margin: 0 auto;
`

const StyledProductTable = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 0 0 0 10px;
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
    position: relative;
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

const StyledNothing = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: ${(props => props.theme.palette.text.sub)};
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
    pointer-events: none;
    user-select: none;
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
    pointer-events: none;
    user-select: none;
    background-color: rgba(0, 0, 0, 0.6);
`


export default UseProfile