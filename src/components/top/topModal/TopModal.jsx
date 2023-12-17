import { HighlightOff } from '@mui/icons-material'
import { Modal, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import LoginForm from './loginForm/LoginForm';
import RegistUserInfo from './registUserInfo/RegistUserInfo';
import RegistStepper from './registStepper/RegistStepper';
import RegistChangeStep from './registChangeStep/RegistChangeStep';
import RegistPersonalInfo from './registPersonalInfo/RegistPersonalInfo';
import RegistCreditCard from './registCreditCard/RegistCreditCard';
import RegistRecognition from './registRecognition/RegistRecognition';
import { usePaymentInputs } from 'react-payment-inputs';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import ErrorSnack from '../../common/errorSnack/ErrorSnack';
import DestructionModalTop from '../../common/admin/destructionModal/DestructionModalTop';


const TopModal = (props) => {

    const [isLogin, setIsLogin] = useState(true);
    const [userId, setUserId] = useState("");
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [userIdError, setUserIdError] = useState(false);
    const [userIdHelper, setUserIdHelper] = useState(" ");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelper, setPasswordHelper] = useState(" ");
    const [mailAddressError, setMailAddressError] = useState(false);
    const [mailAddressHelper, setMailAddressHelper] = useState(" ");
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isUserIdLogin, setIsUserIdLogin] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);

    const [registUserName, setRegistUserName] = useState("");
    const [registUserId, setRegistUserId] = useState("");
    const [registPassword, setRegistPassword] = useState("");
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

    const [registUserNameHelper, setRegistUserNameHelper] = useState(" ");
    const [registUserIdHelper, setRegistUserIdHelper] = useState(" ");
    const [registPasswordHelper, setRegistPasswordHelper] = useState(" ");
    const [registConfirmPasswordHelper, setRegistConfirmPasswordHelper] = useState(" ");
    const [registMailAddressHelper, setRegistMailAddressHelper] = useState(" ");
    const [registConfirmMailAddressHelper, setRegistConfirmMailAddressHelper] = useState(" ");
    const [isRegistUserNameError, setIsRegistUserNameError] = useState(false);
    const [isRegistUserIdError, setIsRegistUserIdError] = useState(false);
    const [isRegistPasswordError, setIsRegistPasswordError] = useState(false);
    const [isRegistConfirmPasswordError, setIsRegistConfirmPasswordError] = useState(false);
    const [isRegistMailAddressError, setIsRegistMailAddressError] = useState(false);
    const [isRegistConfirmMailAddressError, setIsRegistConfirmMailAddressError] = useState(false);

    const [upperNameHelper, setUpperNameHelper] = useState(" ");
    const [lowerNameHelper, setLowerNameHelper] = useState(" ");
    const [upperNameKanaHelper, setUpperNameKanaHelper] = useState(" ");
    const [lowerNameKanaHelper, setLowerNameKanaHelper] = useState(" ");
    const [postalCodeHelper, setPostalCodeHelper] = useState(" ");
    const [phoneNumberHelper, setPhoneNumberHelper] = useState(" ");
    const [upperNameError, setUpperNameError] = useState(false);
    const [lowerNameError, setLowerNameError] = useState(false);
    const [upperNameKanaError, setUpperNameKanaError] = useState(false);
    const [lowerNameKanaError, setLowerNameKanaError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const [creditCardError, setCreditCardError] = useState({number: false, expiry: false, cvc: false});
    const [creditCardHelper, setCreditCardHelper] = useState({number: " ", expiry: " ", cvc: " "});

    const [CVCVisible, setCVCVisible] = useState(false);
    const [recognitionPasswordVisible, setRecognitionPasswordVisible] = useState(false);
    const [recognitionCVCVisible, setRecognitionCVCVisible] = useState(false);

    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isDestructOpen, setIsDestructOpen] = useState(false);

    const modalContainerRef = useRef(null);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const handleModalClose = () => {
        if (userId || mailAddress || password || registUserName || registUserId || registPassword || registConfirmPassword || registMailAddress ||
            registConfirmMailAddress || upperName || lowerName || upperNameKana || lowerNameKana || postalCode || houseNumber || phoneNumber ||
            creditCard.number || creditCard.cvc || creditCard.expiry) {
                setIsDestructOpen(true);
            } else {
                handleInputDelete();
        }
    }

    const handleInputDelete = () => {
        props.handleTopModalClose();
        handleDeleteInput();
        setCurrentStep(0);
        setIsErrorSnack(false);
        setSnackWarning("");
        setIsLogin(true);
        setIsUserIdLogin(true);
        setIsDestructOpen(false);
    }

    const {
        meta,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs();

    const handleDeleteInput = () => {
        setUserId("");
        setMailAddress("");
        setPassword("");
        setRegistUserName("");
        setRegistUserId("");
        setRegistPassword("");
        setRegistConfirmPassword("");
        setRegistMailAddress("");
        setRegistConfirmMailAddress("");
        setUpperName("");
        setLowerName("");
        setUpperNameKana("");
        setLowerNameKana("");
        setPostalCode("");
        setHouseNumber("");
        setPhoneNumber("");
        const newCreditCard = { ...creditCard, number: "", expiry: "", cvc: ""};
        setCreditCard(newCreditCard);

        setIsRegistUserNameError(false);
        setIsRegistUserIdError(false);
        setIsRegistPasswordError(false);
        setIsRegistConfirmPasswordError(false);
        setIsRegistMailAddressError(false);
        setIsRegistConfirmMailAddressError(false);
        setRegistUserNameHelper(" ");
        setRegistUserIdHelper(" ");
        setRegistPasswordHelper(" ");
        setRegistConfirmPasswordHelper(" ");
        setRegistMailAddressHelper(" ");
        setRegistConfirmMailAddressHelper(" ");

        setUpperNameError(false);
        setUpperNameHelper(" ");
        setLowerNameError(false);
        setLowerNameHelper(" ");
        setUpperNameKanaError(false);
        setUpperNameKanaHelper(" ");
        setLowerNameKanaError(false);
        setLowerNameKanaHelper(" ");
        setPostalCodeError(false);
        setPostalCodeHelper(" ");
        setPhoneNumberError(false);
        setPhoneNumberHelper(" ");

        const newCreditCardError = { ...creditCardError, number: false, expiry: false, cvc:  false}
        setCreditCardError(newCreditCardError);
        const newCreditCardHelper = {...creditCardHelper, number: " ", expiry: " ", cvc: " "}
        setCreditCardHelper(newCreditCardHelper);

        setUserIdError(false);
        setUserIdHelper(" ")
        setPasswordError(false);
        setPasswordHelper(" ")
        setMailAddressError(false);
        setMailAddressHelper(" ");
    }
    
    const handleIsLogin = () => {
        setIsLogin(!isLogin);
    }

    const handleNextStep1 = async () => {
        setSnackWarning("");
        let flag = false;
        if (!(registUserName && registUserId && registPassword && registConfirmPassword && registMailAddress && registConfirmMailAddress)) {
            setSnackWarning("入力内容が不足しています。");
            flag = true;
        }
        if (isRegistUserNameError || isRegistUserIdError || isRegistPasswordError || isRegistConfirmPasswordError || isRegistMailAddressError || isRegistConfirmMailAddressError) {
            setSnackWarning((prev) => prev + "入力内容が誤っています。");
            flag = true;
        }
        if (flag) {
            setIsErrorSnack(true);
            return;
        }
        else if (registUserName && registUserId && registPassword && registConfirmPassword && registMailAddress && registConfirmMailAddress) {
            setIsErrorSnack(false);
            setSnackWarning(null);
            setCurrentStep(currentStep + 1);
            if (modalContainerRef.current) {
                modalContainerRef.current.scrollTop = 0;
            }
        }
    }

    const handleNextStep2 = () => {
        setSnackWarning("");
        let flag = false;
        if (!(upperName && lowerName && upperNameKana && lowerNameKana && postalCode && phoneNumber)) {
            setSnackWarning("入力内容が不足しています。");
            flag = true;
        }
        if (upperNameError || lowerNameError || upperNameKanaError || lowerNameKanaError || postalCodeError || phoneNumberError) {
            setSnackWarning((prev) => prev + "入力内容が誤っています。");
            flag = true;
        }
        if (flag) {
            setIsErrorSnack(true);
            return;
        }
        else if (upperName && lowerName && upperNameKana && lowerNameKana && postalCode && prefecture && city && phoneNumber) {
            setSnackWarning("");
            setCurrentStep(currentStep + 1);
            if (modalContainerRef.current) {
                modalContainerRef.current.scrollTop = 0;
            }
        }
    }

    const handleNextStep3 = () => {
        setSnackWarning("");
        if (cardChecked) {
            const newCreditCardError = {
                ...creditCardError,
                number: creditCard.number ? (meta.erroredInputs.cardNumber ? true : false) : true,
                expiry: creditCard.expiry ? (meta.erroredInputs.expiryDate ? true : false) : true,
                cvc: creditCard.cvc ? (meta.erroredInputs.cvc ? true : false) : true,
            }
            setCreditCardError(newCreditCardError);
            const newCreditCardHelper = {
                ...creditCardHelper,
                number: creditCard.number ? (meta.erroredInputs.cardNumber ? "カード番号が無効です" : " ") : "カード番号を入力して下さい",
                expiry: creditCard.expiry ? (meta.erroredInputs.expiryDate ? "有効期限が無効です" : " ") : "有効期限を入力して下さい",
                cvc: creditCard.cvc ? (meta.erroredInputs.cvc ? "CVCが無効です" : " ") : "CVCを入力して下さい",
            }
            setCreditCardHelper(newCreditCardHelper);
            if (meta.erroredInputs.cardNumber || meta.erroredInputs.expiryDate || meta.erroredInputs.cvc) {
                setSnackWarning("入力内容に誤りがあります。");
                setIsErrorSnack(true);
                return;
            } else if (!(creditCard.number && creditCard.expiry && creditCard.cvc)) {
                return;
            }
        }
        const newCreditCardError = { ...creditCardError, number: false, expiry: false, cvc:  false}
        setCreditCardError(newCreditCardError);
        const newCreditCardHelper = {...creditCardHelper, number: " ", expiry: " ", cvc: " "}
        setCreditCardHelper(newCreditCardHelper);
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
    
    const handleUserIdInput = async (e) => {
        setUserId(e.target.value);
        if (e.target.value.length === 0) {
            setUserIdError(false);
            setUserIdHelper(" ");
        } else if (!e.target.value.match(/^([a-zA-Z0-9_]{3,30})$/)) {
            setUserIdError(true);
            setUserIdHelper("3~30字の 0-9, a-z, A-Z, _ が使用できます");
        } else {
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByUserId/${e.target.value}`);
                if (user) {
                    setUserIdError(false);
                    setUserIdHelper(" ");
                }
            } catch (err) {
                setUserIdError(true);
                setUserIdHelper("ユーザーが見つかりません");
            }
        }
    }
    
    const handleMailAddressInput = async (e) => {
        setMailAddress(e.target.value);
        if (e.target.value.length === 0) {
            setMailAddressError(false);
            setMailAddressHelper(" ");
        } else if (!e.target.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setMailAddressError(true);
            setMailAddressHelper("正しいメールアドレスを入力して下さい");
        } else {
            setMailAddressError(false);
            setMailAddressHelper(" ");
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByEmail/${e.target.value}`);
                if (user) {
                    setMailAddressError(false);
                    setMailAddressHelper(" ");
                }
            } catch (err) {
                setMailAddressError(true);
                setMailAddressHelper("ユーザーが見つかりません");
            }
        }
    }
    
    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordError(false);
            setPasswordHelper(" ");
        } else if (!e.target.value.match(/^([a-zA-Z0-9_]{8,30})$/)) {
            setPasswordError(true);
            setPasswordHelper("8~30字の 0-9, a-z, A-Z, _ が使用できます");
        } else {
            setPasswordError(false);
            setPasswordHelper(" ");
        }
    }
    
    const handlePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    
    const handleRegistUserNameInput = (e) => {
        setRegistUserName(e.target.value);
        if (e.target.value.length === 0) {
            setIsRegistUserNameError(false);
            setRegistUserNameHelper(" ");
        } else if (e.target.value.trim() === "") {
            setIsRegistUserNameError(true);
            setRegistUserNameHelper("スペースのみの登録は出来ません");
        } else {
            setIsRegistUserNameError(false);
            setRegistUserNameHelper(" ");
        }
    }
    
    const handleRegistUserIdInput = async (e) => {
        setRegistUserId(e.target.value);
        if (e.target.value.length === 0) {
            setIsRegistUserIdError(false);
            setRegistUserIdHelper(" ");
        } else if (!e.target.value.match(/^([a-zA-Z0-9_]{3,30})$/)) {
            setIsRegistUserIdError(true);
            setRegistUserIdHelper("3~30字の 0-9, a-z, A-Z, _ が使用できます");
        } else {
            setIsRegistUserIdError(false);
            setRegistUserIdHelper(" ");
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByUserId/${e.target.value}`);
                if (user) {
                    setIsRegistUserIdError(true);
                    setRegistUserIdHelper("このユーザーIDはすでに使用されています");
                }
            } catch (err) {
            }
        }
    }
    
    const handleRegistPasswordInput = (e) => {
        setRegistPassword(e.target.value);
        if (e.target.value.length === 0) {
            setIsRegistPasswordError(false);
            setRegistPasswordHelper(" ");
        } else if (!e.target.value.match(/^([a-zA-Z0-9_]{8,30})$/)) {
            setIsRegistPasswordError(true);
            setRegistPasswordHelper("8~30字の 0-9, a-z, A-Z, _ が使用できます");
        } else if (e.target.value !== registConfirmPassword) {
            setIsRegistPasswordError(true);
            setRegistPasswordHelper("パスワードが一致しません");
        } else {
            setIsRegistPasswordError(false);
            setRegistPasswordHelper(" ");
        }
    }
    
    
    const handleRegistConfirmPasswordInput = (e) => {
        setRegistConfirmPassword(e.target.value);
        if (e.target.value.length === 0) {
            setIsRegistConfirmPasswordError(false);
            setRegistConfirmPasswordHelper(" ");
        } else if (!e.target.value.match(/^([a-zA-Z0-9_]{8,30})$/)) {
            setIsRegistConfirmPasswordError(true);
            setRegistConfirmPasswordHelper("8~30字の 0-9, a-z, A-Z, _ が使用できます");
        } else {
            setIsRegistConfirmPasswordError(false);
            setRegistConfirmPasswordHelper(" ");
        }
        if (registPassword.length === 0) {
            setIsRegistPasswordError(false);
            setRegistPasswordHelper(" ");
        } else if (registPassword.trim() === "") {
            setIsRegistPasswordError(true);
            setRegistPasswordHelper("スペースのみの登録は出来ません");
        } else if (!registPassword.match(/^([a-zA-Z0-9_]{8,30})$/)) {
            setIsRegistPasswordError(true);
            setRegistPasswordHelper("8~30字の 0-9, a-z, A-Z, _ が使用できます");
        } else if (registPassword !== e.target.value) {
            setIsRegistPasswordError(true);
            setRegistPasswordHelper("パスワードが一致しません");
        } else {
            setIsRegistPasswordError(false);
            setRegistPasswordHelper(" ");
        }
    }
    
    const handleRegistMailAddressInput = async (e) => {
        setRegistMailAddress(e.target.value);
        if (e.target.value.length === 0) {
            setIsRegistMailAddressError(false);
            setRegistMailAddressHelper(" ");
        } else if (!e.target.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setIsRegistMailAddressError(true);
            setRegistMailAddressHelper("正しいメールアドレスを入力して下さい");
        } else if (e.target.value !== registConfirmMailAddress) {
            setIsRegistMailAddressError(true);
            setRegistMailAddressHelper("メールアドレスが一致しません");
        } else {
            setIsRegistMailAddressError(false);
            setRegistMailAddressHelper(" ");
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByEmail/${e.target.value}`);
                if (user) {
                    setIsRegistMailAddressError(true);
                    setRegistMailAddressHelper("このメールアドレスはすでに使用されています");
                }
            } catch (err) {
            }
        }
    }
    
    const handleRegistConfirmMailAddressInput = async (e) => {
        setRegistConfirmMailAddress(e.target.value);
        if (e.target.value.length === 0) {
            setIsRegistConfirmMailAddressError(false);
            setRegistConfirmMailAddressHelper(" ");
        } else if (!e.target.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setIsRegistConfirmMailAddressError(true);
            setRegistConfirmMailAddressHelper("正しいメールアドレスを入力して下さい");
        } else {
            setIsRegistConfirmMailAddressError(false);
            setRegistConfirmMailAddressHelper(" ");
        }
        if (registMailAddress.length === 0) {
            setIsRegistMailAddressError(false);
            setRegistMailAddressHelper(" ");
        } else if (!registMailAddress.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setIsRegistMailAddressError(true);
            setRegistMailAddressHelper("正しいメールアドレスを入力して下さい");
        } else if (e.target.value !== registMailAddress) {
            setIsRegistMailAddressError(true);
            setRegistMailAddressHelper("メールアドレスが一致しません");
        } else {
            setIsRegistMailAddressError(false);
            setRegistMailAddressHelper(" ");
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByEmail/${e.target.value}`);
                if (user) {
                    setIsRegistMailAddressError(true);
                    setRegistMailAddressHelper("このメールアドレスはすでに使用されています");
                }
            } catch (err) {
            }
        }
    }
    
    const handleUpperNameInput = (e) => {
        setUpperName(e.target.value);
        if (e.target.value.length === 0) {
            setUpperNameError(false);
            setUpperNameHelper(" ");
        } else if (e.target.value.trim() === "") {
            setUpperNameError(true);
            setUpperNameHelper("スペースのみの登録は出来ません");
        } else {
            setUpperNameError(false);
            setUpperNameHelper(" ");
        }
    }
    
    const handleLowerNameInput = (e) => {
        setLowerName(e.target.value);
        if (e.target.value.length === 0) {
            setLowerNameError(false);
            setLowerNameHelper(" ");
        } else if (e.target.value.trim() === "") {
            setLowerNameError(true);
            setLowerNameHelper("スペースのみの登録は出来ません");
        } else {
            setLowerNameError(false);
            setLowerNameHelper(" ");
        }
    }
    
    const handleUpperNameKanaInput = (e) => {
        setUpperNameKana(e.target.value);
        if (e.target.value.length === 0) {
            setUpperNameKanaError(false);
            setUpperNameKanaHelper(" ");
        }
        else if (!e.target.value.match(/^[ァ-ンー]+$/)) {
            setUpperNameKanaError(true);
            setUpperNameKanaHelper("カタカナで入力して下さい");
        } else {
            setUpperNameKanaError(false);
            setUpperNameKanaHelper(" ");
        }
    }
    
    const handleLowerNameKanaInput = (e) => {
        setLowerNameKana(e.target.value);
        if (e.target.value.length === 0) {
            setLowerNameKanaError(false);
            setLowerNameKanaHelper(" ");
        }
        else if (!e.target.value.match(/^[ァ-ンー]+$/)) {
            setLowerNameKanaError(true);
            setLowerNameKanaHelper("カタカナで入力して下さい");
        } else {
            setLowerNameKanaError(false);
            setLowerNameKanaHelper(" ");
        }
    }
    
    const handlePostalCodeInput = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPostalCode(value);
        if (e.target.value.length === 0) {
            setPostalCodeError(false);
            setPostalCodeHelper(" ");
        } else if (!e.target.value.match(/^[0-9]{7}$/)) {
            setPostalCodeError(true);
            setPostalCodeHelper("半角数字7ケタで入力して下さい");
        } else {
            setPostalCodeError(false);
            setPostalCodeHelper(" ");
        }
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
            setPostalCodeError(true);
            setPostalCodeHelper("住所が見つかりませんでした");
        }
    }
    
    const handleHouseNumberInput = (e) => {
        setHouseNumber(e.target.value);
    }
    
    const handlePhoneNumberInput = async (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
        if (e.target.value.length === 0) {
            setPhoneNumberError(false);
            setPhoneNumberHelper(" ");
        } else if (!e.target.value.match(/^[0-9]{11}$/)) {
            setPhoneNumberError(true);
            setPhoneNumberHelper("半角数字11ケタで入力して下さい");
        } else if (!e.target.value.match(/^(090|080|070)\d{8}$/)) {
            setPhoneNumberError(true);
            setPhoneNumberHelper("正しい携帯電話番号を入力して下さい");
        } else {
            setPhoneNumberError(false);
            setPhoneNumberHelper(" ");
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByPhone/${e.target.value.toString()}`);
                if (user) {
                    setPhoneNumberError(true);
                    setPhoneNumberHelper("この電話番号はすでに使用されています");
                }
            } catch (err) {
            }
        }
    }
    
    const handleCardChecked = () => {
        setCardChecked(!cardChecked);
    }
    
    const handleCreditCardNumberChange = (e) => {
        const newCreditCard = { ...creditCard, number: e.target.value };
        setCreditCard(newCreditCard);
        const newCreditCardError = { ...creditCardError, number: false };
        setCreditCardError(newCreditCardError);
        const newCreditCardHelper = { ...creditCardHelper, number: " " };
        setCreditCardHelper(newCreditCardHelper);
    }
    
    const handleCreditCardExpiryChange = (e) => {
        const newCreditCard = { ...creditCard, expiry: e.target.value };
        setCreditCard(newCreditCard);
        const newCreditCardError = { ...creditCardError, expiry: false };
        setCreditCardError(newCreditCardError);
        const newCreditCardHelper = { ...creditCardHelper, expiry: " " };
        setCreditCardHelper(newCreditCardHelper);
    }
    
    const handleCreditCardCVCChange = (e) => {
        const newCreditCard = { ...creditCard, cvc: e.target.value };
        setCreditCard(newCreditCard);
        const newCreditCardError = { ...creditCardError, cvc: false };
        setCreditCardError(newCreditCardError);
        const newCreditCardHelper = { ...creditCardHelper, cvc: " " };
        setCreditCardHelper(newCreditCardHelper);
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

    const formatPostalCode = (postalCode) => {
        // 郵便番号が数字のみで構成されていることを前提として、指定の形式に整形
        if (postalCode && postalCode.length === 7) {
            return postalCode.replace(/(\d{3})(\d{4})/, '$1-$2');
        }
        // 郵便番号が7桁でない場合はそのまま返す
        return postalCode;
    };

    const handleLogin = async () => {
        setSnackWarning("");
        if (isUserIdLogin) {
            if (userIdError || passwordError) {
                return;
            } else if (!(userId && password)) {
                return;
            }
        }  else {
            if (mailAddressError || passwordError) {
                return;
            } else if (!(mailAddress && password)) {
                return;
            }
        }
        try {
            const loginUser = {
                userId: isUserIdLogin ? userId : "",
                email: isUserIdLogin ? "" : mailAddress,
                password: password,
            }
            const user = isUserIdLogin ? await axios.post("http://localhost:5000/client/auth/login", loginUser) : await axios.post("http://localhost:5000/client/auth/loginByEmail", loginUser);
            dispatch(setUser(user.data));
            navigate("/home");
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setSnackWarning(err.response.data);
                }
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
            } else {
                console.log(err);
            }
            setIsErrorSnack(true);
        }
    }

    const handleRegister = async () => {
        try {
            setSnackWarning("");
            props.setIsRequesting(true);
            const newUser = {
                username: registUserName.trim(),
                userId : registUserId,
                password: registPassword,
                confirmPassword: registConfirmPassword,
                unverifiedEmail: registMailAddress,
                confirmEmail: registConfirmMailAddress,
                upperName: upperName,
                lowerName: lowerName,
                upperNameKana: upperNameKana,
                lowerNameKana: lowerNameKana,
                postalCode: formatPostalCode(postalCode),
                prefecture: prefecture,
                city: city,
                town: town,
                houseNumber: houseNumber,
                phoneNumber: phoneNumber.toString(),
                cardName: cardChecked ? meta.cardType.displayName : "",
                number: cardChecked ? creditCard.number : "",
                cvc: cardChecked ? creditCard.expiry : "",
                expiry: cardChecked ? creditCard.cvc : "",
            }
            const response = await axios.post("http://localhost:5000/client/auth/register", newUser);
            await axios.put(`http://localhost:5000/client/notify/welcome/${response.data._id}`);
            dispatch(setUser(response.data));
            props.setIsRequesting(false);
            navigate("/home");
        } catch (err) {
            props.setIsRequesting(false);
            if (err.response) {
                setSnackWarning("エラーが発生しました");
                setIsErrorSnack(true);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
                setIsErrorSnack(true);
            } else {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Modal open={props.isTopModalOpen} slotProps={{backdrop: {sx: {backgroundColor: theme.palette.top.modalShadow}}}}>
                
            {isLogin ? 

            <StyledTopModalInner theme={theme} $isLogin={isLogin} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <Tooltip title="閉じる" placement='top'>
                <StyledHighlightOff theme={theme} onClick={handleModalClose}/>
                </Tooltip>
                <StyledModalIntro theme={theme} $isLogin={isLogin}>
                {user ? "ログインしてアカウント切り替え" : "マーケットにログインしましょう"}
                </StyledModalIntro>
                <LoginForm isUserIdLogin={isUserIdLogin} handleIsLogin={handleIsLogin} userId={userId} mailAddress={mailAddress} password={password}
                handleUserIdInput={handleUserIdInput} handleMailAddressInput={handleMailAddressInput} handlePasswordInput={handlePasswordInput}
                handleUserIdLogin={handleUserIdLogin} handlePasswordVisible={handlePasswordVisible} passwordVisible={passwordVisible} handleLogin={handleLogin}
                userIdError={userIdError} userIdHelper={userIdHelper} passwordError={passwordError} passwordHelper={passwordHelper} mailAddressError={mailAddressError} mailAddressHelper={mailAddressHelper}/>
            </StyledTopModalInner>

            :

            <StyledTopModalInner theme={theme} $isLogin={isLogin} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} ref={modalContainerRef}>
                <Tooltip title="閉じる" placement='top'>
                <StyledHighlightOff theme={theme} onClick={handleModalClose}/>
                </Tooltip>
                <StyledModalIntro theme={theme} $isLogin={isLogin}>
                アカウントを作成する
                </StyledModalIntro>

                <Styledform autoComplete='off'>
                {currentStep === 0 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistUserInfo registUserName={registUserName} registUserId={registUserId} registPassword={registPassword} registConfirmPassword={registConfirmPassword}
                        registMailAddress={registMailAddress} registConfirmMailAddress={registConfirmMailAddress} handleRegistUserNameInput={handleRegistUserNameInput}
                        handleRegistUserIdInput={handleRegistUserIdInput} handleRegistPasswordInput={handleRegistPasswordInput} handleRegistConfirmPasswordInput={handleRegistConfirmPasswordInput}
                        handleRegistMailAddressInput={handleRegistMailAddressInput} handleRegistConfirmMailAddressInput={handleRegistConfirmMailAddressInput}
                        registUserNameHelper={registUserNameHelper} registUserIdHelper={registUserIdHelper} registPasswordHelper={registPasswordHelper} registConfirmPasswordHelper={registConfirmPasswordHelper}
                        registMailAddressHelper={registMailAddressHelper} registConfirmMailAddressHelper={registConfirmMailAddressHelper}
                        isRegistUserNameError={isRegistUserNameError} isRegistUserIdError={isRegistUserIdError} isRegistPasswordError={isRegistPasswordError} isRegistConfirmPasswordError={isRegistConfirmPasswordError}
                        isRegistMailAddressError={isRegistMailAddressError} isRegistConfirmMailAddressError={isRegistConfirmMailAddressError}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} handleNextStep3={handleNextStep3} handleIsLogin={handleIsLogin} handleRegister={handleRegister}/>
                    </>
                )}
                {currentStep === 1 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistPersonalInfo upperName={upperName} lowerName={lowerName} upperNameKana={upperNameKana} lowerNameKana={lowerNameKana} postalCode={postalCode}
                        prefecture={prefecture} city={city} town={town} houseNumber={houseNumber} phoneNumber={phoneNumber}
                        handleUpperNameInput={handleUpperNameInput} handleLowerNameInput={handleLowerNameInput} handleUpperNameKanaInput={handleUpperNameKanaInput} handleLowerNameKanaInput={handleLowerNameKanaInput}
                        handlePostalCodeInput={handlePostalCodeInput} handleHouseNumberInput={handleHouseNumberInput} handlePhoneNumberInput={handlePhoneNumberInput}
                        upperNameHelper={upperNameHelper} lowerNameHelper={lowerNameHelper} upperNameKanaHelper={upperNameKanaHelper} lowerNameKanaHelper={lowerNameKanaHelper}
                        postalCodeHelper={postalCodeHelper} phoneNumberHelper={phoneNumberHelper} upperNameError={upperNameError} lowerNameError={lowerNameError} upperNameKanaError={upperNameKanaError}
                        lowerNameKanaError={lowerNameKanaError} postalCodeError={postalCodeError} phoneNumberError={phoneNumberError}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} handleNextStep3={handleNextStep3} handleIsLogin={handleIsLogin} handleRegister={handleRegister}/>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistCreditCard creditCard={creditCard} handleCreditCardNumberChange={handleCreditCardNumberChange} handleCreditCardExpiryChange={handleCreditCardExpiryChange} handleCreditCardCVCChange={handleCreditCardCVCChange}
                        CVCVisible={CVCVisible} handleCVCVisible={handleCVCVisible} handleCardChecked={handleCardChecked} cardChecked={cardChecked}
                        meta={meta} getCardImageProps={getCardImageProps} getCardNumberProps={getCardNumberProps} getExpiryDateProps={getExpiryDateProps} getCVCProps={getCVCProps} creditCardError={creditCardError} creditCardHelper={creditCardHelper}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} handleNextStep3={handleNextStep3} handleIsLogin={handleIsLogin}/>
                    </>
                )}
                {currentStep === 3 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistRecognition registUserName={registUserName} registUserId={registUserId} registPassword={registPassword} registMailAddress={registMailAddress}
                        upperName={upperName} lowerName={lowerName} upperNameKana={upperNameKana} lowerNameKana={lowerNameKana} postalCode={postalCode}
                        prefecture={prefecture} city={city} town={town} houseNumber={houseNumber} phoneNumber={phoneNumber}
                        creditCard={creditCard} recognitionPasswordVisible={recognitionPasswordVisible} handleRecognitionPasswordVisible={handleRecognitionPasswordVisible}
                        recognitionCVCVisible={recognitionCVCVisible} handleRecognitionCVCVisible={handleRecognitionCVCVisible} formatPostalCode={formatPostalCode}
                        meta={meta} getCardImageProps={getCardImageProps} cardChecked={cardChecked} isRequesting={props.isRequesting}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep1={handleNextStep1} handleNextStep2={handleNextStep2} handleNextStep3={handleNextStep3} handleIsLogin={handleIsLogin} handleRegister={handleRegister}/>
                    </>
                )}
                </Styledform>
                
            </StyledTopModalInner>
            }

            </Modal>

            <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>

            <DestructionModalTop isDestructOpen={isDestructOpen} handleInputDelete={handleInputDelete} setIsDestructOpen={setIsDestructOpen}
            header="入力内容を破棄しますか？" desc="この操作は取り消しできません。変更は失われます。"/>
        </>
    )
}

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
    border: solid 1px ${(props) => props.theme.palette.line.disable};
    background-color: ${(props) => props.theme.palette.top.modal};
`

const StyledHighlightOff = styled(HighlightOff)`
    && {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 35px;
        height: 35px;
        color: ${(props) => props.theme.palette.icon.main};
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
    color: ${(props) => props.theme.palette.text.main2};
    font-size: 1.5rem;
    font-weight: bold;
    width: 70%;
    margin: ${(props) => (props.$isLogin) ? "60px 0" : "60px 0 30px 0"};
`




export default TopModal