import { Button, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import ProductRecognitionModal from '../components/exhibit/prodiuctRecognitionModal/ProductRecognitionModal';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowScrollable } from '../redux/features/windowScrollaleSlice';
import ExhibitCommands from '../components/exhibit/exhibitCommands/ExhibitCommands';


const Exhibit = () => {

  const [isDragging, setIsDragging] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [crops, setCrops] = useState([{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]);
  const [zooms, setZooms] = useState([1, 1, 1, 1]);
  const [product, setProduct] = useState({name: "", detail: "", price: "", benefit: 0, status: "", deliveryCost: "", shippingArea: "", category: "", tags: []});
  const [tag, setTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isScrollable = useSelector((state => state.windowScrollable.value));
  const dispatch = useDispatch();
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  // 同様にスクロール可否を問う。Poppr展開中に遷移した場合ポッパーは遷移に伴って強制的にデフォルトの閉じ状態になる(正式な閉じる手順を踏まない)
  // ため、ページマウント時にスクロールをuseEffectで可能とセットして、もう一つのseEffectでスクロール状態をdispatchする。
  // ページマウント時は必ずスクロール可能とする
  useEffect(() => {
    dispatch(setWindowScrollable(true));
  }, [dispatch])

  useEffect(() => {
    if (!isScrollable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isScrollable]);


  const status = [
    "新品、未使用", "未使用に近い", "目立った傷や汚れなし", "やや傷や汚れあり", "傷や汚れあり", "全体的に状態が悪い"
]

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

  const deliveryCost = [
    "送料込み（出品者負担）", "着払い（購入者負担）"
  ]

  const categories = [
    "キムチ", "カクテキ", "elon"
]

  return (
    <>

    <ExhibitCommands />

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
        <ImageUpload isDragging={isDragging} setIsDragging={setIsDragging} uploadImages={uploadImages} setUploadImages={setUploadImages}
          originalImages={originalImages} setOriginalImages={setOriginalImages} crops={crops} setCrops={setCrops} zooms={zooms} setZooms={setZooms}/>
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
        <ProductStatusInput product={product} handleOptionChange={handleOptionChange} status={status}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑥ 発送元地域</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductShippingAreaInput product={product} handleShippingAreaChange={handleShippingAreaChange} prefectures={prefectures}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑦ 配送料の負担</div>
          <StyledRequired theme={theme}>必須</StyledRequired>
        </StyledSubTitle>
        <ProductDeliveryCostInput product={product} handleDeliveryCostChange={handleDeliveryCostChange} deliveryCost={deliveryCost}/>
        <StyledErrorMessage theme={theme}>エラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージエラーメッセージ</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑧ 商品カテゴリー</div>
        </StyledSubTitle>
        <ProductCategorySelect product={product} handleCategoryChange={handleCategoryChange} categories={categories}/>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <div>⑨ タグを追加</div>
        </StyledSubTitle>
        <ProductAddTag product={product} tag={tag} handleTagAdd={handleTagAdd} handleTagInput={handleTagInput} handleTagDelete={handleTagDelete}/>
      </StyledInputContent>

      <ProductRecognitionModal product={product} isModalOpen={isModalOpen} handleModalClose={handleModalClose} prefectures={prefectures}
        status={status} deliveryCost={deliveryCost} categories={categories}/>

      <Button variant='outlined' size='large' color='secondary' fullWidth sx={{p: 1, mb: 15}} onClick={handleModalOpen}>確認</Button>

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
  max-width: 90vw;
  margin: 50px auto 0 auto;
`


export default Exhibit