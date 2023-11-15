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
import DestructionModal from '../components/common/admin/destructionModal/DestructionModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorSnack from '../components/common/errorSnack/ErrorSnack';


const Exhibit = () => {

  const [isDragging, setIsDragging] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [crops, setCrops] = useState([{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]);
  const [zooms, setZooms] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
  const [product, setProduct] = useState({image: "", name: "", detail: "", price: "", benefit: 0, status: "", deliveryCost: "", shippingArea: "", category: "", tags: []});
  const [productError, setProductError] = useState({image: false, name: false, detail: false, price: false, benefit: false, status: false, deliveryCost: false, shippingArea: false});
  const [productHelper, setProductHelper] = useState({image: " ", name: " ", detail: " ", price: " ", benefit: " ", status: " ", deliveryCost: " ", shippingArea: " "});
  const [profilePrefecture, setProfilePrefecture] = useState(false);
  const [tag, setTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDestructOpen , setIsDestructOpen] = useState(false);
  const user = useSelector((state) => state.user.value);
  const [isErrorSnack, setIsErrorSnack] = useState(false);
  const [snackWarning, setSnackWarning] = useState("");
  const isScrollable = useSelector((state => state.windowScrollable.value));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;

  const handleProductNameInput = (e) => {
    setProduct({...product, name: e.target.value});
    if (e.target.value.length === 0) {
      setProductError({...productError, name: false});
      setProductHelper({...productHelper, name: " "});
    } else if (e.target.value.trim() === "") {
      setProductError({...productError, name: true});
      setProductHelper({...productHelper, name: "空白のみの入力はできません"});
    } else {
      setProductError({...productError, name: false});
      setProductHelper({...productHelper, name: " "});
    }
  }

  const handleProductDetailInput = (e) => {
    setProduct({...product, detail: e.target.value});
    if (e.target.value.length === 0) {
      setProductError({...productError, detail: false});
      setProductHelper({...productHelper, detail: " "});
    } else if (e.target.value.trim() === "") {
      setProductError({...productError, detail: true});
      setProductHelper({...productHelper, detail: "空白のみの入力はできません"});
    } else {
      setProductError({...productError, detail: false});
      setProductHelper({...productHelper, detail: " "});
    }
  }

  const handleProductPriceInput = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, '');
    value = value.replace(/^0+/g, '');
    setProduct({...product, price: value, benefit: Math.floor(value * 0.9)});
    if (value.length === 0) {
      setProductError({...productError, price: false});
      setProductHelper({...productHelper, price: " "});
    } else if (value < 300) {
      setProductError({...productError, price: true});
      setProductHelper({...productHelper, price: "値段は300ポイント以上から設定可能です"});
    } else {
      setProductError({...productError, price: false});
      setProductHelper({...productHelper, price: " "});
    }
  }

  const handleOptionChange = (event) => {
    setProduct({...product, status: event.target.value});
    setProductError({...productError, status: false});
    setProductHelper({...productHelper, status: false});
  };

  const handleDeliveryCostChange = (event) => {
    setProduct({...product, deliveryCost: event.target.value});
    setProductError({...productError, deliveryCost: false});
    setProductHelper({...productHelper, deliveryCost: false});
  };

  const handleShippingAreaChange = (event) => {
    if (event.target.value === user.prefecture) {
      setProfilePrefecture(true);
    } else {
      setProfilePrefecture(false);
    }
    setProduct({...product, shippingArea: event.target.value});
    setProductError({...productError, shippingArea: false});
    setProductHelper({...productHelper, shippingArea: false});
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

  const handleCategoryDelete = () => {
    setProduct({...product, category: ""});
  }

  const handleChecking = () => {
    setSnackWarning("");
    let flag = false;
    const newProductError = {
      ...productError,
      image: uploadImages.length === 0 ? true : false,
      name: product.name ? product.name.trim() === "" ? true : false : true,
      detail: product.detail ? product.detail.trim() === "" ? true : false : true,
      price: product.price ? product.price < 300 ? true : false : true,
      status: product.status ? false : true,
      shippingArea: product.shippingArea ? false : true,
      deliveryCost: product.deliveryCost ? false : true,
    }
    setProductError(newProductError);
    const newProductHelper = {
      ...productHelper,
      image: uploadImages.length === 0 ? "商品画像がアップロードされていません (最低1枚アップロードしてください)" : " ",
      name: product.name ? product.name.trim() === "" ? "空白のみの入力は出来ません" : " " : "商品名を入力してください",
      detail: product.detail ? product.detail.trim() === "" ? "空白のみの入力は出来ません" : " " : "説明文を入力してください",
      price: product.price ? product.price < 300 ? "値段は300ポイント以上から設定可能です" : " " : "値段設定を入力して下さい",
      status: product.status ? " " : "商品の状態を選択して下さい",
      shippingArea: product.shippingArea ? " " : "発送元地域を選択して下さい",
      deliveryCost: product.deliveryCost ? " " : "配送料の負担者を選択して下さい",
    }
    setProductHelper(newProductHelper);
    if (!(!(product.name.trim() === "" ) && !(product.detail.trim() === "" ) && product.name && product.detail && product.price && product.status && product.shippingArea && product.deliveryCost)) {
      setSnackWarning("入力内容が誤っています。");
      setIsErrorSnack(true);
      flag = true;
    }
    if (uploadImages.length === 0) {
      setSnackWarning((prev) => prev + "商品画像がアップロードされていません。");
      setIsErrorSnack(true);
      flag = true;
    }
    if (flag) {
      return;
    }
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleDestructOpen = () => {
    if (uploadImages.length > 0 || product.name || product.detail || product.price || product.status || product.deliveryCost || product.shippingArea || product.category || tag || product.tags.length > 0) {
      setIsDestructOpen(true);
      return false;
    } else {
      return true;
    }
  }

  const handleSetUserPrefecture = () => {
    setProfilePrefecture((prev) => !prev);
    setProduct({...product, shippingArea: user.prefecture});
  }

  const locateToHome = () => {
    setIsDestructOpen(false);
    navigate("/home")
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

  const handleExhibit = async () => {
    try {
      const formData = new FormData();
      productImages.forEach((image) => {
        formData.append("productImage", image);
      });
      const productImageNames = await axios.post('http://localhost:5000/client/product/imageUpload', formData);
      const newProduct = {
        _id: user._id,
        productName: product.name,
        desc: product.detail,
        price: product.price,
        condition: product.status,
        shippingArea: product.shippingArea,
        deliveryCost: product.deliveryCost,
        productImg: productImageNames.data,
        sellerId: user._id,
        tags: product.tags,
      };
      await axios.post("http://localhost:5000/client/product/exhibit", newProduct);
    } catch (err) {
      if (err.response) {
        console.log(err);
      } else if (err.request) {
          setSnackWarning("サーバーへのリクエストに失敗しました。");
      } else {
          console.log(err);
      }
      setIsErrorSnack(true);
    }
  }

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

    <ExhibitCommands handleDestructOpen={handleDestructOpen}/>

    <StyledExhibit>

      <StyledTitle theme={theme}>
        <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo_reversal.svg`} alt='LMAPロゴ' />
        <div>商品を出品する</div>
      </StyledTitle>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>① 商品画像</div>
        </StyledSubTitle>
        <ImageUpload isDragging={isDragging} setIsDragging={setIsDragging} uploadImages={uploadImages} setUploadImages={setUploadImages} productError={productError} productImages={productImages} setProductImages={setProductImages}
          originalImages={originalImages} setOriginalImages={setOriginalImages} crops={crops} setCrops={setCrops} zooms={zooms} setZooms={setZooms} setProductError={setProductError} setProductHelper={setProductHelper}/>
        <StyledErrorAndLength>
          <StyledErrorMessage theme={theme}>{productHelper.image}</StyledErrorMessage>
        </StyledErrorAndLength>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>② 商品名</div>
        </StyledSubTitle>
        <ProducNameInput product={product} handleProductNameInput={handleProductNameInput} productError={productError}/>
        <StyledErrorAndLength>
          <StyledErrorMessage theme={theme}>{productHelper.name}</StyledErrorMessage>
          <StyledInputLength theme={theme}>{`${product.name.length}/50`}</StyledInputLength>
        </StyledErrorAndLength>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>③ 説明文</div>
        </StyledSubTitle>
        <ProductDetailInput product={product} handleProductDetailInput={handleProductDetailInput} productError={productError}/>
        <StyledErrorAndLength>
          <StyledErrorMessage theme={theme}>{productHelper.detail}</StyledErrorMessage>
          <StyledInputLength theme={theme}>{`${product.detail.length}/500`}</StyledInputLength>
        </StyledErrorAndLength>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>④ 値段設定</div>
        </StyledSubTitle>
        <ProductPriceInput product={product} handleProductPriceInput={handleProductPriceInput} productError={productError}/>
        <StyledErrorMessage theme={theme}>{productHelper.price}</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>⑤ 商品の状態</div>
        </StyledSubTitle>
        <ProductStatusInput product={product} handleOptionChange={handleOptionChange} status={status} productError={productError}/>
        <StyledErrorMessage theme={theme}>{productHelper.status}</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>⑥ 発送元地域</div>
        </StyledSubTitle>
        <ProductShippingAreaInput product={product} handleShippingAreaChange={handleShippingAreaChange} prefectures={prefectures} productError={productError}
        profilePrefecture={profilePrefecture} setProfilePrefecture={setProfilePrefecture} handleSetUserPrefecture={handleSetUserPrefecture} userPrefecture={user.prefecture}/>
        <StyledErrorMessage theme={theme}>{productHelper.shippingArea}</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledRequired theme={theme}>必須</StyledRequired>
          <div>⑦ 配送料の負担者</div>
        </StyledSubTitle>
        <ProductDeliveryCostInput product={product} handleDeliveryCostChange={handleDeliveryCostChange} deliveryCost={deliveryCost} productError={productError}/>
        <StyledErrorMessage theme={theme}>{productHelper.deliveryCost}</StyledErrorMessage>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledAny theme={theme}>任意</StyledAny>
          <div>⑧ 商品カテゴリー</div>
        </StyledSubTitle>
        <ProductCategorySelect product={product} handleCategoryChange={handleCategoryChange} categories={categories} handleCategoryDelete={handleCategoryDelete}/>
      </StyledInputContent>

      <StyledInputContent>
        <StyledSubTitle theme={theme}>
          <StyledAny theme={theme}>任意</StyledAny>
          <div>⑨ タグを追加</div>
        </StyledSubTitle>
        <ProductAddTag product={product} tag={tag} handleTagAdd={handleTagAdd} handleTagInput={handleTagInput} handleTagDelete={handleTagDelete}/>
      </StyledInputContent>

      <ProductRecognitionModal product={product} isModalOpen={isModalOpen} handleModalClose={handleModalClose} prefectures={prefectures}
        status={status} deliveryCost={deliveryCost} categories={categories} handleExhibit={handleExhibit}/>

      <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

      <Button variant='outlined' size='large' color='secondary' fullWidth sx={{p: 1, mb: 15}} onClick={handleChecking}>確認</Button>

    </StyledExhibit>

    <DestructionModal isDestructOpen={isDestructOpen} setIsDestructOpen={setIsDestructOpen} handleInputDelete={locateToHome}
      header="出品内容を破棄しますか？" desc="この操作は取り消しできません。変更は失われます。" />

    </>
  )
}


const StyledInputContent = styled.div`
  width: 100%;
  margin-bottom: 70px;
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

const StyledAny = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.secondary.exhibitAny};
  font-size: 1rem;
`

const StyledErrorAndLength = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledErrorMessage = styled.div`
  color: ${(props) => props.theme.palette.text.error};
  font-size: 0.9rem;
  width: 80%;
  height: 0.9rem;
`

const StyledInputLength = styled.div`
    width: 10%;
    text-align: right;
    color: ${(props) => props.theme.palette.text.sub};
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