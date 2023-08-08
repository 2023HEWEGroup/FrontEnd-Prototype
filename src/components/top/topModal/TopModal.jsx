import { HighlightOff } from '@mui/icons-material'
import { Modal, Tooltip, useMediaQuery } from '@mui/material'
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


const TopModal = (props) => {

    const [isLogin, setIsLogin] = useState(true);
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
    const [CVCVisible, setCVCVisible] = useState(false);
    const [recognitionPasswordVisible, setRecognitionPasswordVisible] = useState(false);
    const [recognitionCVCVisible, setRecognitionCVCVisible] = useState(false);
    const modalContainerRef = useRef(null);
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    
    const handleIsLogin = () => {
        setIsLogin(!isLogin);
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
    
    const handleRegistUserNameInput = (e) => {
        setRegistUserName(e.target.value)
    }
    
    const handleRegistUserIdInput = (e) => {
        setRegistUserId(e.target.value)
    }
    
    const handleRegistPasswordInput = (e) => {
        setRegistPassword(e.target.value)
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

    return (
            <Modal open={props.isTopModalOpen}>
                
            {isLogin ? 

            <StyledTopModalInner $isLogin={isLogin} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <Tooltip title="閉じる" placement='top'>
                <StyledHighlightOff onClick={() => props.setIsTopModalOpen(false)}/>
                </Tooltip>
                <StyledModalIntro $isLogin={isLogin}>
                マーケットにログインしましょう
                </StyledModalIntro>
                <LoginForm handleIsLogin={handleIsLogin}/>
            </StyledTopModalInner>

            :

            <StyledTopModalInner $isLogin={isLogin} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} ref={modalContainerRef}>
                <Tooltip title="閉じる" placement='top'>
                <StyledHighlightOff onClick={() => props.setIsTopModalOpen(false)}/>
                </Tooltip>
                <StyledModalIntro $isLogin={isLogin}>
                アカウントを作成する
                </StyledModalIntro>

                <Styledform autoComplete='off'>
                {currentStep === 0 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistUserInfo registUserName={registUserName} registUserId={registUserId} registPassword={registPassword} registConfirmPassword={registConfirmPassword}
                        registMailAddress={registMailAddress} registConfirmMailAddress={registConfirmMailAddress} handleRegistUserNameInput={handleRegistUserNameInput}
                        handleRegistUserIdInput={handleRegistUserIdInput} handleRegistPasswordInput={handleRegistPasswordInput} handleRegistConfirmPasswordInput={handleRegistConfirmPasswordInput}
                        handleRegistMailAddressInput={handleRegistMailAddressInput} handleRegistConfirmMailAddressInput={handleRegistConfirmMailAddressInput}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep={handleNextStep} handleIsLogin={handleIsLogin}/>
                    </>
                )}
                {currentStep === 1 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistPersonalInfo upperName={upperName} lowerName={lowerName} upperNameKana={upperNameKana} lowerNameKana={lowerNameKana} postalCode={postalCode}
                        prefecture={prefecture} city={city} town={town} houseNumber={houseNumber} phoneNumber={phoneNumber}
                        handleUpperNameInput={handleUpperNameInput} handleLowerNameInput={handleLowerNameInput} handleUpperNameKanaInput={handleUpperNameKanaInput} handleLowerNameKanaInput={handleLowerNameKanaInput}
                        handlePostalCodeInput={handlePostalCodeInput} handleHouseNumberInput={handleHouseNumberInput} handlePhoneNumberInput={handlePhoneNumberInput}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep={handleNextStep} handleIsLogin={handleIsLogin}/>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistCreditCard creditCard={creditCard} handleCreditCardNumberChange={handleCreditCardNumberChange} handleCreditCardExpiryChange={handleCreditCardExpiryChange} handleCreditCardCVCChange={handleCreditCardCVCChange}
                        CVCVisible={CVCVisible} handleCVCVisible={handleCVCVisible} handleCardChecked={handleCardChecked}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep={handleNextStep} handleIsLogin={handleIsLogin}/>
                    </>
                )}
                {currentStep === 3 && (
                    <>
                    <RegistStepper currentStep={currentStep}/>
                    <RegistRecognition registUserName={registUserName} registUserId={registUserId} registPassword={registPassword} registMailAddress={registMailAddress}
                        upperName={upperName} lowerName={lowerName} upperNameKana={upperNameKana} lowerNameKana={lowerNameKana} postalCode={postalCode}
                        prefecture={prefecture} city={city} town={town} houseNumber={houseNumber} phoneNumber={phoneNumber}
                        creditCard={creditCard} recognitionPasswordVisible={recognitionPasswordVisible} handleRecognitionPasswordVisible={handleRecognitionPasswordVisible}
                        recognitionCVCVisible={recognitionCVCVisible} handleRecognitionCVCVisible={handleRecognitionCVCVisible}/>
                    <RegistChangeStep currentStep={currentStep} handleBackStep={handleBackStep} handleNextStep={handleNextStep} handleIsLogin={handleIsLogin}/>
                    </>
                )}
                </Styledform>
                
            </StyledTopModalInner>
            }
            </Modal>
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




export default TopModal