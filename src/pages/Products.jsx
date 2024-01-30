import { Search } from '@mui/icons-material';
import { Checkbox, FormControlLabel, IconButton, InputBase, Pagination, Paper, Tooltip, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';
import ProductCard from '../components/common/productCard/ProductCard';
import StyledSelect from '../utils/StyledSelect';


const categories = [
    "すべての商品", "レディース", "メンズ", "ベビー・キッズ", "インテリア・住まい・小物", "本・音楽・ゲーム", "おもちゃ・ホビー・グッズ", "コスメ・香水。美容",
    "家電・スマホ・カメラ", "スポーツ・レジャー", "ハンドメイド", "チケット", "自動車・オートバイ", "食品", "ダイエット・健康", "花・園芸用品", "アート", "その他"
];


const Products = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const word = searchParams.get('word');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort');
    const categoryId = searchParams.get('category');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchWord, setSearchWord] = useState(word ? word : "");
    const [products, setProducts] = useState(null);
    const [num, setNum] = useState(0);
    const PAGE_SIZE = 12;
    const navigate = useNavigate();
    const theme = useTheme();

    
    const [productCondition, setProductCondition] = useState({all: status === "all" ? true : false, onSale: status === "all" || status === "onSale" ? true : false, soldOut: status === "all" || status === "soldOut" ? true : false});
    const [sortQuery, setSortQuery] = useState(sort === "asc" ? "古い順" : "新しい順");
    const [category, setCategory] = useState(categoryId ? categories[categoryId] : "すべての商品");

    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");

    const handleInputSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    const handleProductCondition = (condition) => {
        if (condition === "all") {
            if (productCondition.all) setProductCondition((prev) => ({...prev, all: false, onSale: false, soldOut: false}));
            else setProductCondition((prev) => ({...prev, all: true, onSale: true, soldOut: true}));
        } else if (condition === "onSale") {
            if (productCondition.onSale) setProductCondition((prev) => ({...prev, all: false, onSale: false}));
            else setProductCondition((prev) => ({...prev, all: prev.soldOut ? true : false, onSale: true, soldOut: prev.soldOut ? true : false}));
        } else if (condition === "soldOut") {
            if (productCondition.soldOut) setProductCondition((prev) => ({...prev, all: false, soldOut: false}));
            else setProductCondition((prev) => ({...prev, all: prev.onSale ? true : false, onSale: prev.onSale ? true : false, soldOut: true}));
        }
    }

    const handleQueryNavigate = ({wordArg, statusArg, sortArg, categoryArg}) => {
        // statusArg (map関数indexの文字列)
        let queryArray = [];

        if (wordArg === "unset") {
            // 検索ワードクエリを未設定にする場合
        } else if (wordArg) {
            queryArray.push(`word=${wordArg}`); //新たなクエリがあればそちらを優先的にURLに組み込む
        } else if (word) {
            queryArray.push(`word=${word}`); //新たなクエリを指定せず、すでにクエリがあるならそちらをURLに組み込む
        }
    
        if (statusArg === "unset") {
          // 商品ステータスクエリを未設定にする場合
        } else if (statusArg) {
          queryArray.push(`status=${statusArg}`); //新たなクエリがあればそちらを優先的にURLに組み込む
        } else if (status) {
          queryArray.push(`status=${status}`); //新たなクエリを指定せず、すでにクエリがあるならそちらをURLに組み込む
        }

        if (sortArg === "unset") {
            // 検索ワードクエリを未設定にする場合
        } else if (sortArg) {
            queryArray.push(`sort=${sortArg}`); //新たなクエリがあればそちらを優先的にURLに組み込む
        } else if (sort) {
            queryArray.push(`sort=${sort}`); //新たなクエリを指定せず、すでにクエリがあるならそちらをURLに組み込む
        }
    
        if (categoryArg === "unset") {
          //0番はすべての商品なため、カテゴリークエリを設定しない
        } else if (categoryArg) {
            queryArray.push(`category=${categoryArg}`);
        } else if (categoryId && !categoryArg) {
            queryArray.push(`category=${categoryId}`);
        }
    
        const queryString = queryArray.length > 0 ? '?' + queryArray.join('&') : '';
        navigate(`/products${queryString}`);
    }

    const handlePageChange = async () => {
        try {
            setProducts(null);
            const response = await axios.get(`http://localhost:5000/client/product/searchAll?searchWord=${word ? word : ""}&page=${currentPage}&pageSize=${PAGE_SIZE}&category=${categoryId ? categories[categoryId] : "すべての商品"}&status=${status ? status : ""}&sort=${sort ? sort : ""}`);
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

    const handleSearch = (e) => { // 検索バーからの検索
        e.preventDefault();
        handleQueryNavigate({wordArg: searchWord ? encodeURIComponent(searchWord) : "unset"});
    }

    const handleSort = (e) => {
        setSortQuery(e.target.value);
        handleQueryNavigate({sortArg: e.target.value === "新しい順" ? "unset" : "asc"});
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
        handleQueryNavigate({categoryArg: e.target.value === "すべての商品" ? "unset" : categories.indexOf(e.target.value)});
    }

    useEffect(() => { // クエリに変化があれば検索を発火
        const accessSearch = async () => {
            try {
                setProducts(null);
                setCurrentPage(1); // 新しい検索ページ1から表示
                const response = await axios.get(`http://localhost:5000/client/product/searchAll?searchWord=${word ? word : ""}&page=${currentPage}&pageSize=${PAGE_SIZE}&category=${categoryId ? categories[categoryId] : "すべての商品"}&status=${status ? status : ""}&sort=${sort ? sort : ""}`);
                setProducts(response.data.products);
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
    }, [word, categoryId, status, sort]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        handleQueryNavigate({statusArg: productCondition.all ? "all" : productCondition.onSale ? "onSale" : productCondition.soldOut ? "soldOut" : "unset"});
    }, [productCondition]); // eslint-disable-line react-hooks/exhaustive-deps

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
                <StyledCheckBoxes>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={productCondition.all} onChange={() => handleProductCondition("all")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="すべて"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={productCondition.onSale} onChange={() => handleProductCondition("onSale")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="販売中"/>
                    <StyledFormControlLabel theme={theme} control={<Checkbox color='secondary' checked={productCondition.soldOut} onChange={() => handleProductCondition("soldOut")} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 20 } }}/>}
                    label="売り切れ"/>
                </StyledCheckBoxes>
                <div style={{width: "20%"}}>
                    <StyledSelect menu={["新しい順", "古い順"]} value={sortQuery} onChange={handleSort}/>
                </div>
                <div style={{width: "20%"}}>
                    <StyledSelect menu={categories} value={category} onChange={handleCategory}/>
                </div>
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
    justify-content: center;
    align-items: center;
    width: 100%;
`

const StyledCheckBoxes = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 20px;
    width: 60%
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