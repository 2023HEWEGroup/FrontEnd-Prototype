import styled from '@emotion/styled'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Avatar, Slide, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


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
    }, [isXsScreen, isSmallScreen, isMiddleScreen, isLargeScreen]); // eslint-disable-line react-hooks/exhaustive-deps
    
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
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", margin: "0 auto"}}><div>プロフィールを折りたたむ</div><ExpandLess color="text"/></div>
                    :
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0", margin: "0 auto"}}><div>プロフィールをすべて表示</div><ExpandMore color="text"/></div>}
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
                {!productsLoading &&
                <>
                {props.user.products.length > 0 ?
                <StyledUserProduct>
                    <StyledProductTable>
                        {products.map(product => 
                            <StyledProduct $isXsScreen={isXsScreen} $isSmallScreen={isSmallScreen} $isMiddleScreen={isMiddleScreen} $isLargeScreen={isLargeScreen} key={product._id}>
                                <StyledProductImgZone theme={theme}>
                                    <StyledProductAvatar variant="square" src={`http://localhost:5000/uploads/productImages/${product.productImg[0]}`}>
                                    </StyledProductAvatar>
                                </StyledProductImgZone>
                                <StyledProductDetail>
                                    <StyledProductName theme={theme}>{product.productName}</StyledProductName>
                                    <StyledProductPrice theme={theme}>{product.price} ポイント</StyledProductPrice>
                                </StyledProductDetail>
                            </StyledProduct>
                        )}
                    </StyledProductTable>
                </StyledUserProduct>
                :
                null
                }
                </>
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
    color: ${(props) => props.theme.palette.text.main};
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
    margin: 0 auto;
`

const StyledProduct = styled.div`
    width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33.333%" : (props.$isMiddleScreen ? "25%" : (props.isLargeScreen ? "20%" : "16.666%"))))} - 10px);
    height: fit-content;
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

const StyledNothing = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: ${(props => props.theme.palette.text.sub)};
`


export default UseProfile