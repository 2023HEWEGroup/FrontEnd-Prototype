import { Search } from '@mui/icons-material';
import { Checkbox, FormControlLabel, IconButton, InputBase, Pagination, Paper, Tooltip, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';
import ProductCard from '../components/common/productCard/ProductCard';


const Products = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const word = searchParams.get('word');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchWord, setSearchWord] = useState("");
    const [products, setProducts] = useState(null);
    const [num, setNum] = useState(0);
    const PAGE_SIZE = 12;
    const navigate = useNavigate();
    const theme = useTheme();

    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");

    const handleInputSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    const handlePageChange = async () => {
        try {
            setProducts(null);
            const response = await axios.get(`http://localhost:5000/client/product/searchAll?searchWord=${word ? word : ""}&page=${currentPage}&pageSize=${PAGE_SIZE}`);
            if (response.data) {
                setProducts(response.data.products);
                setNum(response.data.num);
            }
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
    useEffect(() => {
        handlePageChange();
    }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSearch = async (e) => { // 検索バーからの検索
        try {
            e.preventDefault();
            navigate(`/products/?word=${encodeURIComponent(searchWord)}`);
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

    useEffect(() => { // クエリに変化があれば検索を発火
        const accessSearch = async () => {
            try {
                setProducts(null);
                setCurrentPage(1); // 新しい検索ページ1から表示
                const response = await axios.get(`http://localhost:5000/client/product/searchAll?searchWord=${word ? word : ""}&page=${1}&pageSize=${PAGE_SIZE}`);
                setProducts(response.data.products);
                // console.log(response.data.products)
                setNum(response.data.num);
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
        accessSearch();
    }, [word]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledProducts>

            <StyledHeader>
                <StyledDesc theme={theme}>
                    {!word ? "全商品" : "商品検索結果 "}{!word ? null : <StyledSpan theme={theme}>{`"${word}"`}</StyledSpan>}
                </StyledDesc>
                <StyledSearch>
                    <StyledPaper elevation={0} component="form" theme={theme} onChange={handleInputSearchWord} onSubmit={handleSearch} style={{backgroundColor: theme.palette.background.search}}>
                        <StyledInputBase placeholder="商品名" theme={theme} inputProps={{maxLength: 50}}/>
                        <Tooltip title="検索" placement="top" arrow>
                            <StyledIconButton type="submit" size="small" theme={theme}>
                            <Search color="icon" />
                            </StyledIconButton>
                        </Tooltip>
                    </StyledPaper>
                </StyledSearch>
                <StyledModes>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="すべて"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="フォロー中"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="フォロワー"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="認証済み"/>
                </StyledModes>
            </StyledHeader>

            <StyledMain>
                    {products ?
                    <>
                    <StyledHitNum theme={theme}>{num === 0 ? "商品が見つかりませんでした" : `${num}件中 ${1 + PAGE_SIZE * (currentPage - 1)}-${Math.min(PAGE_SIZE * currentPage, num)}件`}</StyledHitNum>
                    <StyledResults>
                    {products.map((product, index) =>
                        <ProductCard key={index} product={product} currentUser={props.currentUser}/>
                    )}
                    </StyledResults>
                    </>
                    :
                    null
                    }
                    <StyledIndex>
                        <StyledPagination page={currentPage} count={Math.ceil(num / PAGE_SIZE)} variant="outlined" shape="rounded" color='secondary' size='large' onChange={(e, value) => setCurrentPage(value)} sx={{button:{color: `${theme.palette.text.main}`, border: `1px solid ${theme.palette.text.sub}`, '&:hover':{backgroundColor: theme.palette.background.hover}}}}/>
                    </StyledIndex>
            </StyledMain>

            <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

        </StyledProducts>
        </>
    )
}


const StyledProducts = styled.div`
    width: 90%;
    max-width: 3000px;
    height: 2000px;
    margin: 20px auto 0 auto;
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const StyledDesc = styled.div`
    width: 100%;
    word-break: break-all;
    color: ${(props) => props.theme.palette.text.main};
    font-weight: bold;
    font-size: 1rem;
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.secondary.main};
`

const StyledSearch = styled.div`
    width: 100%;
`

const StyledPaper = styled(Paper)`
    && {
        display: flex;
        align-items: center;
        height: 35px;
        width: 100%;
        padding-right: 10px;
        border: solid 1px ${(props) => props.theme.palette.line.disable};

        &:focus-within {
        border: solid 2px ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledInputBase = styled(InputBase)`
    && {
        height: 100%;
        width: 100%;
        padding-left: 2%;
        font-size: 1rem;
        color: ${(props) => props.theme.palette.text.main};
        & input::placeholder {
        color: ${(props) => props.theme.palette.text.main};
        }
    }
`

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
        background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledModes = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    width: 100%;
`

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        color: ${(props) => props.theme.palette.text.sub};
    }
`

const StyledMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin-top: 30px;
`

const StyledHitNum = styled.div`
    width: 100%;
    word-break: break-all;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledResults = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`

const StyledIndex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
`

const StyledPagination = styled(Pagination)`
    && {
        
    }
`


export default Products