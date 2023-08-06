import { ExitToApp, HighlightOff, Login, OpenInNew, Shop, Visibility, VisibilityOff } from '@mui/icons-material'
import { AppBar, Button, Checkbox, Chip, FormControlLabel, Grid, InputAdornment, Modal, Step, StepLabel, Stepper, TextField, Toolbar, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { LoadingButton } from "@mui/lab"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { setWindowScrollable } from '../redux/features/windowScrollaleSlice'
import axios from 'axios'
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';


const Top = () => {

  const [isTopModalOpen, setIsTopModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [userId, setUserId] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [registUserName, setRegistUserName] = useState("");
  const [registUserId, setRegistUserId] = useState("");
  const [registPassword, setRegistPassword] = useState("");
  const [registPasswordVisible, setRegistPasswordVisible] = useState(false);
  const [registConfirmPassword, setRegistConfirmPassword] = useState("");
  const [registMailAddress, setRegistMailAddress] = useState("");
  const [registConfirmMailAddress, setRegistConfirmMailAddress] = useState("");
  const [upperName, setUpperName] = useState("");
  const [lowerName, setLowerName] = useState("");
  const [upperNameKana, setUpperNameKana] = useState("");
  const [lowerNameKana, setLowerNameKana] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardChecked, setCardChecked] = useState(false);
  const [creditCard, setCreditCard] = useState({number: "", expiry: "", cvc: ""});
  const [CVCVisible, setCVCVisible] = useState(false);
  const [recognitionPasswordVisible, setRecognitionPasswordVisible] = useState(false);
  const [recognitionCVCVisible, setRecognitionCVCVisible] = useState(false);
  const [isUserIdLogin, setIsUserIdLogin] = useState(true);
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isScrollable = useSelector((state => state.windowScrollable.value));
  const modalContainerRef = useRef(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleTopModalOpen = () => {
    setIsTopModalOpen(true);
  }

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  }

  const handleTopModalClose = () => {
    setIsTopModalOpen(false);
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTop = 0;
    }
  }

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTop = 0;
    }
  }

  const handleUserIdLogin = () => {
    setIsUserIdLogin(!isUserIdLogin);
  }

  const handleUserIdInput = (e) => {
    setUserId(e.target.value);
  }

  const handleMailAddressInput = (e) => {
    setMailAddress(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  }

  const handleRegistUserNameInput = (e) => {
    setRegistUserName(e.target.value)
  }

  const handleRegistUserIdInput = (e) => {
    setRegistUserId(e.target.value)
  }

  const handleRegistPasswordInput = (e) => {
    setRegistPassword(e.target.value)
  }

  const handleRegistPasswordVisible = () => {
    setRegistPasswordVisible(!registPasswordVisible);
  }

  const handleRegistConfirmPasswordInput = (e) => {
    setRegistConfirmPassword(e.target.value)
  }

  const handleRegistMailAddressInput = (e) => {
    setRegistMailAddress(e.target.value)
  }

  const handleRegistConfirmMailAddressInput = (e) => {
    setRegistConfirmMailAddress(e.target.value)
  }

  const handleUpperNameInput = (e) => {
    setUpperName(e.target.value);
  }

  const handleLowerNameInput = (e) => {
    setLowerName(e.target.value);
  }

  const handleUpperNameKanaInput = (e) => {
    setUpperNameKana(e.target.value);
  }

  const handleLowerNameKanaInput = (e) => {
    setLowerNameKana(e.target.value);
  }

  const handlePostalCodeInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPostalCode(value);

    if (value.length === 7) {
      getAddressByPostcode(value);
    } else {
      setPrefecture('');
      setCity('');
      setTown('');
    }
  }

  const getAddressByPostcode = async (postCode) => {
    const apiUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postCode}`;
    try {
      const autoAddress = await axios.get(apiUrl);
      setPrefecture(autoAddress.data.results[0].address1);
      setCity(autoAddress.data.results[0].address2);
      setTown(autoAddress.data.results[0].address3);
    } catch (err) {
      console.log(err);
    }
  }

  const handleHouseNumberInput = (e) => {
    setHouseNumber(e.target.value);
  }

  const handlePhoneNumberInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value);
  }

  const handleCardChecked = () => {
    setCardChecked(!cardChecked);
  }

  const handleCreditCardNumberChange = (e) => {
    const newCreditCard = { ...creditCard, number: e.target.value };
    setCreditCard(newCreditCard);
  }

  const handleCreditCardExpiryChange = (e) => {
    const newCreditCard = { ...creditCard, expiry: e.target.value };
    setCreditCard(newCreditCard);
  }

  const handleCreditCardCVCChange = (e) => {
    const newCreditCard = { ...creditCard, cvc: e.target.value };
    setCreditCard(newCreditCard);
  }

  const handleCVCVisible = () => {
    setCVCVisible(!CVCVisible);
  }

  const handleRecognitionPasswordVisible = () => {
    setRecognitionPasswordVisible(!recognitionPasswordVisible);
  }

  const handleRecognitionCVCVisible = () => {
    setRecognitionCVCVisible(!recognitionCVCVisible);
  }

  const steps = [
    "ユーザー情報の入力",
    "個人情報の入力",
    "お支払い方法の追加 (任意)",
    "入力内容のご確認"
  ];

  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  // トップページでもCommonLayout同様、スクロール可否を問う。
  useEffect(() => {
    if ((isSmallScreen && isSideOpen) || (!isScrollable)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSmallScreen, isSideOpen, isScrollable]);

  useEffect(() => {
    // Topページがマウントされたときに限定してスクロールバーのトラック部分の色を変更する
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        background-color: #000;
      }
    `;
    document.head.appendChild(style);
    // コンポーネントのアンマウント時にスタイルを元に戻す
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // トップページマウント時は必ずスクロール可能とする
  useEffect(() => {
    dispatch(setWindowScrollable(true));
  }, [dispatch])

  return (
    <StyledFullScrean>
      <StyledAppBar>
        <Toolbar>
          
        </Toolbar>
      </StyledAppBar>
        <StyledGridContainer container>
          <StyledGridItem item xs={12} sm={12} md={12} lg={6}>
            <StyledWelcomeZone>
              <StyledWelcomeMessage theme={theme}>Welcome<br/>To The<br/>LMAP</StyledWelcomeMessage>
              <StyledButtons>
                <StyledLink to={"/home"}>
                  <StyledGoToShopLabel theme={theme} icon={<Shop style={{color: theme.palette.top.secondary}}/>} label="ショップを見てみる" clickable/>
                </StyledLink>
                <StyledLoginLabel theme={theme} icon={<ExitToApp style={{color: theme.palette.top.main}}/>} label="アカウント" clickable onClick={handleTopModalOpen}/>
              </StyledButtons>
            </StyledWelcomeZone>
          </StyledGridItem>
          <StyledGridItem item xs={12} sm={12} md={12} lg={6}>
          </StyledGridItem>
        </StyledGridContainer>

        <Modal open={isTopModalOpen}>
          {isLogin ? 
          <StyledTopModalInner $isLogin={isLogin} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <Tooltip title="閉じる" placement='top'>
              <StyledHighlightOff onClick={handleTopModalClose}/>
            </Tooltip>
            <StyledModalIntro $isLogin={isLogin}>
              マーケットにログインしましょう
            </StyledModalIntro>
            <Styledform noValidate>
              {isUserIdLogin ? 
              <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="ユーザーID (3~20字)"
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={userId} onChange={handleUserIdInput}/>
              :
              <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="メールアドレス"
                autoComplete='new-off' variant='outlined' value={mailAddress} onChange={handleMailAddressInput}/>
              }
              <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="パスワード (8~20字)"
                autoComplete='new-off' variant='outlined' value={password} type={passwordVisible ? "text" : 'password'} onChange={handlePasswordInput}
                inputProps={{maxLength: 20}} InputProps={{endAdornment: (<InputAdornment position="end" onClick={handlePasswordVisible}>{passwordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
              <div style={{width: "100%"}}>
                <StyledOptionChange onClick={handleUserIdLogin}>または{isUserIdLogin ? "メールアドレス" : "ユーザーID"}でログインする</StyledOptionChange>
              </div>
              <LoadingButton color='top' fullWidth type='submit' variant='outlined'>ログイン</LoadingButton>
              <Button color='top' onClick={handleIsLogin}>アカウントをお持ちではありませんか？<OpenInNew style={{marginLeft: "5px"}}/>新規登録</Button>
            </Styledform>
          </StyledTopModalInner>
          :
          <StyledTopModalInner $isLogin={isLogin} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} ref={modalContainerRef}>
            <Tooltip title="閉じる" placement='top'>
              <StyledHighlightOff onClick={handleTopModalClose}/>
            </Tooltip>
            <StyledModalIntro $isLogin={isLogin}>
              アカウントを作成する
            </StyledModalIntro>
            <Styledform autoComplete='off'>
              {currentStep === 0 && (
                <>
                <div style={{width: "130%", marginBottom: "60px"}}>
                  <StyledStepper activeStep={currentStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label} sx={{
                      '& .MuiStepLabel-root .Mui-completed': {color: 'secondary.progressed'},
                      '& .MuiStepLabel-root .Mui-active': {color: 'secondary.main'},
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {color: '#777'},
                      '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {color: '#777'},
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {color: '#fff'},
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {fill: '#000'}
                    }}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                  </StyledStepper>
                </div>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="ユーザーネーム (1~30字)" required
                    autoComplete='new-off' variant='outlined' inputProps={{maxLength: 30}} value={registUserName} onChange={handleRegistUserNameInput}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="ユーザーID (3~20字)" required
                    autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={registUserId} onChange={handleRegistUserIdInput}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="パスワード (8~20字)" required
                    autoComplete='new-off' type={registPasswordVisible ? "text" : 'password'} variant='outlined' inputProps={{maxLength: 20}} value={registPassword} onChange={handleRegistPasswordInput}
                    InputProps={{endAdornment: (<InputAdornment position="end" onClick={handleRegistPasswordVisible}>{registPasswordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="確認用パスワード (8~20字)" required
                    autoComplete='new-off' type={registPasswordVisible ? "text" : 'password'} variant='outlined' inputProps={{maxLength: 20}} value={registConfirmPassword} onChange={handleRegistConfirmPasswordInput}
                    InputProps={{endAdornment: (<InputAdornment position="end" onClick={handleRegistPasswordVisible}>{registPasswordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="メールアドレス" required
                    autoComplete='new-off' type='email' variant='outlined' value={registMailAddress} onChange={handleRegistMailAddressInput}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="確認用メールアドレス" required
                    autoComplete='new-off' type='email' variant='outlined' value={registConfirmMailAddress} onChange={handleRegistConfirmMailAddressInput}/>
                <StyledStep>
                  <StyledNextStep variant='contained' color='top' onClick={handleNextStep}>次へ</StyledNextStep>
                </StyledStep>
                <Button color='top' onClick={handleIsLogin}><Login style={{marginRight: "5px"}}/>かわりにログインする</Button>
                </>
              )}
              {currentStep === 1 && (
                <>
                <div style={{width: "130%", marginBottom: "60px"}}>
                  <StyledStepper activeStep={currentStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label} sx={{
                      '& .MuiStepLabel-root .Mui-completed': {color: 'secondary.progressed'},
                      '& .MuiStepLabel-root .Mui-active': {color: 'secondary.main'},
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {color: '#777'},
                      '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {color: '#777'},
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {color: '#fff'},
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {fill: '#000'}
                    }}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                  </StyledStepper>
                </div>
                <StyledName>
                  <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText=" " theme={theme} fullWidth label="姓 (全角)" required
                      autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={upperName} onChange={handleUpperNameInput}/>
                  <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText=" " theme={theme} fullWidth label="名 (全角)" required
                      autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={lowerName} onChange={handleLowerNameInput}/>
                </StyledName>
                <StyledName>
                  <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText=" " theme={theme} fullWidth label="姓 (カナ)" required
                      autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={upperNameKana} onChange={handleUpperNameKanaInput}/>
                  <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText=" " theme={theme} fullWidth label="名 (カナ)" required
                      autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={lowerNameKana} onChange={handleLowerNameKanaInput}/>
                </StyledName>
                <StyledPostalCode>
                  <StyledTextField style={{width: "50%"}} theme={theme} fullWidth label="郵便番号" required
                      autoComplete='new-off' variant='outlined'inputProps={{maxLength: 7}} value={postalCode} onChange={handlePostalCodeInput}/>
                  <StyledPostalComment>郵便番号から住所が自動で入力されます</StyledPostalComment>
                </StyledPostalCode>
                <StyledTextField style={{marginBottom: "15px", pointerEvents: "none"}} theme={theme} fullWidth label="都道府県 (自動入力)"
                    autoComplete='new-off' variant='filled' value={prefecture}/>
                <StyledTextField style={{marginBottom: "15px", pointerEvents: "none"}} theme={theme} fullWidth label="市区町村 (自動入力)"
                    autoComplete='new-off' variant='filled' value={city}/>
                <StyledTextField style={{marginBottom: "40px", pointerEvents: "none"}} theme={theme} fullWidth label="町名 (自動入力)"
                    autoComplete='new-off' variant='filled' value={town}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="番地・建物名など"
                    autoComplete='new-off' variant='outlined' inputProps={{maxLength: 50}} value={houseNumber} onChange={handleHouseNumberInput}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="電話番号" required
                    autoComplete='new-off' variant='outlined' inputProps={{maxLength: 11}} value={phoneNumber} onChange={handlePhoneNumberInput}/>
                <StyledStep>
                  <StyledBackStep variant='outlined' color='top' onClick={handleBackStep}>戻る</StyledBackStep>
                  <StyledNextStep variant='contained' color='top' onClick={handleNextStep}>次へ</StyledNextStep>
                </StyledStep>
                <Button color='top' onClick={handleIsLogin}><Login style={{marginRight: "5px"}}/>かわりにログインする</Button>
                </>
              )}
              {currentStep === 2 && (
                <>
                <div style={{width: "130%", marginBottom: "60px"}}>
                  <StyledStepper activeStep={currentStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label} sx={{
                      '& .MuiStepLabel-root .Mui-completed': {color: 'secondary.progressed'},
                      '& .MuiStepLabel-root .Mui-active': {color: 'secondary.main'},
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {color: '#777'},
                      '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {color: '#777'},
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {color: '#fff'},
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {fill: '#000'}
                    }}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                  </StyledStepper>
                </div>
                  <div style={{width: "100%", height: "50px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px"}}>
                    <StyledCardImg {...getCardImageProps({ images })} />
                    <StyledCardType>{meta.cardType ? meta.cardType.displayName : "クレジットカードが選択されていません"}</StyledCardType>
                  </div>
                  <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="カード番号" autoComplete='new-off' variant='outlined'
                      inputProps={{...getCardNumberProps(), placeholder: ""}} value={creditCard.number} onChange={handleCreditCardNumberChange}/>
                  <div style={{width: "100%", display: "flex", gap: "20px"}}>
                    <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText=" " theme={theme} fullWidth label="有効期限 (MM/YY)" autoComplete='new-off' variant='outlined'
                        inputProps={{...getExpiryDateProps(), placeholder: ""}} value={creditCard.expiry} onChange={handleCreditCardExpiryChange}/>
                    <StyledTextField style={{marginBottom: "15px",  width: "50%"}} helperText=" " theme={theme} fullWidth label="CVC" autoComplete='new-off' variant='outlined'
                        inputProps={{...getCVCProps(), placeholder: "", type: (CVCVisible ? "text" : 'password')}} value={creditCard.cvc} onChange={handleCreditCardCVCChange}
                        InputProps={{endAdornment: (<InputAdornment position="end" onClick={handleCVCVisible}>{CVCVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
                  </div>
                  <StyledFormControlLabel control={<Checkbox color='top' checked={cardChecked} onChange={handleCardChecked} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                      label="お支払い方法にクレジットカードを追加します (任意)"/>
                  <StyledStep>
                    <StyledBackStep variant='outlined' color='top' onClick={handleBackStep}>戻る</StyledBackStep>
                    <StyledNextStep variant='contained' color='top' onClick={handleNextStep}>次へ</StyledNextStep>
                  </StyledStep>
                  <Button color='top' onClick={handleIsLogin}><Login style={{marginRight: "5px"}}/>かわりにログインする</Button>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <div style={{width: "130%", marginBottom: "60px"}}>
                    <StyledStepper activeStep={currentStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label} sx={{
                        '& .MuiStepLabel-root .Mui-completed': {color: 'secondary.progressed'},
                        '& .MuiStepLabel-root .Mui-active': {color: 'secondary.main'},
                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {color: '#777'},
                        '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {color: '#777'},
                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {color: '#fff'},
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {fill: '#000'}
                      }}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                    </StyledStepper>
                  </div>
                  <StyledRecognition style={{marginBottom: "30px"}}>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>ユーザーネーム</StyledRecognitionName>
                      <StyledRecognitionContent>{registUserName}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>ユーザーID</StyledRecognitionName>
                      <StyledRecognitionContent>{registUserId}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>パスワード</StyledRecognitionName>
                      <StyledRecognitionContent>{recognitionPasswordVisible ? registPassword : "*".repeat(registPassword.length)}{recognitionPasswordVisible ? <StyledVisibility onClick={handleRecognitionPasswordVisible}/> : <StyledVisibilityOff onClick={handleRecognitionPasswordVisible}/>}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>メールアドレス</StyledRecognitionName>
                      <StyledRecognitionContent>{registMailAddress}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                  </StyledRecognition>
                  <StyledRecognition style={{marginBottom: "30px"}}>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>お名前</StyledRecognitionName>
                      <StyledRecognitionContent>{upperName} {lowerName}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>お名前 (フリガナ)</StyledRecognitionName>
                      <StyledRecognitionContent>{upperNameKana} {lowerNameKana}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>郵便番号</StyledRecognitionName>
                      <StyledRecognitionContent>{postalCode}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>住所</StyledRecognitionName>
                      <StyledRecognitionContent>{prefecture} {city} {town} {houseNumber}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>電話番号</StyledRecognitionName>
                      <StyledRecognitionContent>{phoneNumber}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                  </StyledRecognition>
                  <StyledRecognition style={{marginBottom: "60px"}}>
                    <StyledRecognitionItem>
                      <StyledRecognitionName><StyledRecognitionCardImg {...getCardImageProps({ images })} /></StyledRecognitionName>
                      <StyledRecognitionContent>{meta.cardType ? meta.cardType.displayName : "クレジットカードが選択されていません"}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>カード番号</StyledRecognitionName>
                      <StyledRecognitionContent>{creditCard.number}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>有効期限</StyledRecognitionName>
                      <StyledRecognitionContent>{creditCard.expiry}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                    <StyledRecognitionItem>
                      <StyledRecognitionName>CVC</StyledRecognitionName>
                      <StyledRecognitionContent>{recognitionCVCVisible ? creditCard.cvc : "*".repeat(creditCard.cvc.length)} {recognitionCVCVisible ? <StyledVisibility onClick={handleRecognitionCVCVisible}/> : <StyledVisibilityOff onClick={handleRecognitionCVCVisible}/>}</StyledRecognitionContent>
                    </StyledRecognitionItem>
                  </StyledRecognition>
                  <StyledStep>
                    <StyledBackStep variant='outlined' color='top' onClick={handleBackStep}>戻る</StyledBackStep>
                    <StyledNextStep variant='contained' color='top'>アカウント作成</StyledNextStep>
                  </StyledStep>
                  <Button color='top' onClick={handleIsLogin}><Login style={{marginRight: "5px"}}/>かわりにログインする</Button>
                </>
              )}
            </Styledform>
          </StyledTopModalInner>
          }
        </Modal>
    </StyledFullScrean>
  )
}


const StyledFullScrean = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #222;
    height: 55px;
  }
`

const StyledGridContainer = styled(Grid)`
  && {
    margin-top: 55px;
    padding: 100px 0;
  }
`

const StyledGridItem = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledWelcomeZone = styled.div`
  width: 80%;
`

const StyledWelcomeMessage = styled.div`
  text-align: left;
  line-height: 1.2;
  font-size: 5.5rem;
  font-weight: bold;
  font-family: 'Michroma', sans-serif;

  display: inline-block;
  background: linear-gradient(90deg, ${(props => props.theme.palette.top.titleGradation)});
  background: -webkit-linear-gradient(0deg, ${(props => props.theme.palette.top.titleGradation)});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StyledButtons = styled.div`
  display: flex;
  gap: 25px;
  width: fit-content;
  margin-top: 75px;
`

const StyledLink = styled(Link)`
  && {
    text-decoration: none;
  }
`

const StyledGoToShopLabel = styled(Chip)`
  && {
    height: 50px;
    padding: 0 25px;
    color: ${(props => props.theme.palette.top.secondary)};
    border: solid 2px ${(props => props.theme.palette.top.secondary)};
    border-radius: 25px;
    &:hover {
      background-color: ${(props => props.theme.palette.top.secondaryHover)};
    }
  }
`

const StyledLoginLabel = styled(Chip)`
  && {
    height: 50px;
    padding: 0 25px;
    color: ${(props => props.theme.palette.top.main)};
    border: solid 2px ${(props => props.theme.palette.top.main)};
    border-radius: 25px;
    &:hover {
      background-color: ${(props => props.theme.palette.top.mainHover)};
    }
  }
`

const StyledTopModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$isXsScreen ? (props.$isLogin ? "450px" : "550px") : (props.$isLogin ? "550px" : "650px"))};
  max-width: 90vw;
  min-width: 35vw;
  height: 75%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 15px;
  border: solid 1px #444;
  background-color: #111;
`

const StyledHighlightOff = styled(HighlightOff)`
  && {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 35px;
    height: 35px;
    color: #444;
    cursor: pointer;
  }
`

const Styledform = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`

const StyledModalIntro = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  font-weight: bold;
  width: 70%;
  margin: ${(props) => (props.$isLogin) ? "60px 0" : "60px 0 30px 0"};
`

const StyledStepper = styled(Stepper)`
  && {
    width: 100%
  }
`

const StyledTextField = styled(TextField)(({ theme }) => ({

  '& .MuiInputBase-input': {
    color: '#777', // 入力文字の色
    backgroundColor: "#000",
    borderRadius: "5px"
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#777', // 通常時のボーダー色(アウトライン)
    },
    '&:hover:not(.Mui-disabled) fieldset': {
      borderColor: '#777', // 非フォーカス時のホバー時のボーダー色(アウトライン)
    },
    '&.Mui-focused:hover fieldset': {
      borderColor: theme.palette.top.main, // フォーカス時にホバーしたときのボーダー色(アウトライン)
    },
    '&:focus-within fieldset': {
      borderColor: theme.palette.top.main, // フォーカス時のボーダー色(アウトライン)
    },
  },
  '& .MuiInputLabel-root': {
    color: '#777', // ラベルの通常時の色
    '&.Mui-focused': {
      color: theme.palette.top.main, // フォーカス時のラベルの色
    },
  },
}));

const StyledVisibility = styled(Visibility)`
  && {
    color: #777;
    cursor: pointer;
  }
`

const StyledVisibilityOff = styled(VisibilityOff)`
  && {
    color: #777;
    cursor: pointer;
  }
`

const StyledOptionChange = styled.div`
  margin-bottom: 15px;
  width: fit-content;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
  }
`

const StyledStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-bottom: 10px;
`

const StyledBackStep = styled(Button)`
  && {
    width: 50%;
    height: 45px;
    border-radius: 10px;
  }
`

const StyledNextStep = styled(Button)`
  && {
    width: 50%;
    height: 45px;
    border-radius: 10px;
    font-weight: bold;
  }
`

const StyledName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
`

const StyledPostalCode = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: fit-content;
  margin-top: 50px;
  margin-bottom: 30px;
`

const StyledPostalComment = styled.div`
  width: 50%;
  color: #777;
  font-size: 0.9rem;
`

const StyledCardImg = styled.svg`
  width: 75px;
  height: fit-content;
`

const StyledRecognitionCardImg = styled.svg`
  width: 50%;
  max-width: 100px;
  height: fit-content;
`

const StyledCardType = styled.div`
  color: #777;
`

const StyledFormControlLabel = styled(FormControlLabel)`
  && {
    color: #777;
    margin-bottom: 40px;
  }
`

const StyledRecognition = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: solid 0.5px #333;
  border-radius: 5px;
  background-color: #000;
`

const StyledRecognitionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 5px;
  color: #777;
`

const StyledRecognitionName = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  word-wrap: break-word;
`

const StyledRecognitionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  word-break: break-all;
  overflow: hidden;
`


export default Top