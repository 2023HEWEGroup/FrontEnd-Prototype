import { useTheme } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import ImageUpload from '../components/exhibit/imageUpload/ImageUpload';
import ProducNameInput from '../components/exhibit/productNameInput/ProducNameInput';
import ProductDetailInput from '../components/exhibit/productDetailInput/ProductDetailInput';
import ProductPriceInput from '../components/exhibit/productPriceInput/ProductPriceInput';
import ProductStatusInput from '../components/exhibit/productStatusInput/ProductStatusInput';
import ProductDeliveryCostInput from '../components/exhibit/productDeliveryCostInput/ProductDeliveryCostInput';
import ProductShippingAreaInput from '../components/exhibit/productShippingArea/ProductShippingAreaInput';
import ProductCategorySelect from '../components/exhibit/productCategorySelect/ProductCategorySelect';
import ProductAddTag from '../components/exhibit/productAddTag/ProductAddTag';


const Exhibit = () => {

  const [isDragging, setIsDragging] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [product, setProduct] = useState({name: "", detail: "", price: "", benefit: 0, status: "", deliveryCost: "", shippingArea: "", category: "", tags: []});
  const [tag, setTag] = useState("");
  const theme = useTheme();
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;

  const handleProductNameInput = (event) => {
    setProduct({...product, name: event.target.value});
  }

  const handleProductDetailInput = (event) => {
    setProduct({...product, detail: event.target.value});
  }

  const handleProductPriceInput = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/g, '');
    setProduct({...product, price: value, benefit: Math.floor(value * 0.9)});
  }

  const handleOptionChange = (event) => {
    setProduct({...product, status: event.target.value});
  };

  const handleDeliveryCostChange = (event) => {
    setProduct({...product, deliveryCost: event.target.value});
  };

  const handleShippingAreaChange = (event) => {
    setProduct({...product, shippingArea: event.target.value});
  };

  const handleCategoryChange = (event) => {
    setProduct({...product, category: event.target.value});
  };

  const handleTagAdd = (event) => {
    const newTag = tag;
    setProduct({...product, tags: [...product.tags, newTag]});
    setTag("");
  };

  const handleTagDelete = (index) => {
    const updatedTags = product.tags.filter((tag, i) => i !== index);
    setProduct({ ...product, tags: updatedTags });
  };

  const handleTagInput = (event) => {
    const tagWithoutSpaces = event.target.value.replace(/\s/g, "");
    setTag(tagWithoutSpaces);
  }

  return (
    <>
    <StyledExhibit>

      <StyledTitle theme={theme}>
        <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo_reversal.svg`} alt='LMAPロゴ' />
        <div>商品を出品する</div>
      </StyledTitle>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>① 商品画像</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ImageUpload isDragging={isDragging} setIsDragging={setIsDragging} uploadImages={uploadImages} setUploadImages={setUploadImages}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>② 商品名</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProducNameInput product={product} handleProductNameInput={handleProductNameInput}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>③ 説明文</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductDetailInput product={product} handleProductDetailInput={handleProductDetailInput}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>④ 値段設定</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductPriceInput product={product} handleProductPriceInput={handleProductPriceInput}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑤ 商品の状態</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductStatusInput product={product} handleOptionChange={handleOptionChange}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑥ 発送元地域</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductShippingAreaInput product={product} handleShippingAreaChange={handleShippingAreaChange}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑦ 配送料の負担</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductDeliveryCostInput product={product} handleDeliveryCostChange={handleDeliveryCostChange}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑧ 商品カテゴリー</div>
        </StyledSubTitle>
        <ProductCategorySelect product={product} handleCategoryChange={handleCategoryChange}/>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑨ タグを追加</div>
        </StyledSubTitle>
        <ProductAddTag product={product} tag={tag} handleTagAdd={handleTagAdd} handleTagInput={handleTagInput} handleTagDelete={handleTagDelete}/>
      </StyledInputContent>

    </StyledExhibit>
    </>
  )
}


const StyledInputContent = styled.div`
  width: 100%;
  margin-bottom: 75px;
`

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100px;
  color: ${(props) => props.theme.palette.text.main};
  font-size: 1.5rem;
  font-weight: bold;
`

const StyledSubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: fit-content;
  margin-bottom: 10px;
  color: ${(props) => props.theme.palette.text.main};
  font-size: 1.1rem;
  font-weight: bold;
`

const StyledRequired = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  font-size: 1rem;
`

const StyledErrorMessage = styled.div`
  color: ${(props) => props.theme.palette.text.error};
  font-size: 0.9rem;
`

const StyledLmapLogo = styled.img`
  height: 50%;
`;

const StyledExhibit = styled.div`
  width: 1000px;
  height: 3500px;
  max-width: 90vw;
  margin: 0 auto;
`


export default Exhibit