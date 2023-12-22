import { Button, InputAdornment, Modal, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledTextField } from '../../../../utils/StyledTextField'
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IsProgress from '../../../common/isProgress/IsProgress';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';


const CreditCardModal = (props) => {

    const [creditCard, setCreditCard] = useState({number: "", expiry: "", cvc: ""});
    const [creditCardError, setCreditCardError] = useState({number: false, expiry: false, cvc: false});
    const [creditCardHelper, setCreditCardHelper] = useState({number: " ", expiry: " ", cvc: " "});
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [CVCVisible, setCVCVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const {
        meta,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs();

    const handleCreditCardNumberChange = (e) => {
        setCreditCard((prev) => ({...prev, number: e.target.value }));
        setCreditCardError((prev) => ({...prev, number: false }));
        setCreditCardHelper((prev) => ({...prev, number: " " }));
    }
    
    const handleCreditCardExpiryChange = (e) => {
        setCreditCard((prev) => ({...prev, expiry: e.target.value }));
        setCreditCardError((prev) => ({...prev, expiry: false }));
        setCreditCardHelper((prev) => ({...prev, expiry: " " }));
    }
    
    const handleCreditCardCVCChange = (e) => {
        setCreditCard((prev) => ({...prev, cvc: e.target.value }));
        setCreditCardError((prev) => ({...prev, cvc: false }));
        setCreditCardHelper((prev) => ({...prev, cvc: " " }));
    }
    
    
    const handleCVCVisible = () => {
        setCVCVisible(!CVCVisible);
    }

    const handleCheck = () => {
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
            return false;
        } else if (!(creditCard.number && creditCard.expiry && creditCard.cvc)) {
            return false;
        }
        return true;
    }

    const handleUpdate = async () => {
        try {
            setIsProgress(true);
            if (!handleCheck()) {
                setIsProgress(false);
                return;
            };
            const newCreditCard = {
                cardName: meta.cardType.displayName,
                cvc: creditCard.cvc,
                expiry: creditCard.expiry,
                number: creditCard.number,
            };
            await axios.post(`http://localhost:5000/client/setting/creditCardUpdate/${props.currentUser._id}`, newCreditCard);
            const response = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            setTimeout(() => {
                dispatch(setUser(response.data));
                setIsProgress(false);
                props.setOpen(false);
                navigate("/setting/account/paymentInfo");
            }, 1000);
        } catch (err) {
            setIsProgress(false);
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

    return (
        <>
        <StyledModal open={props.open} slotProps={{backdrop: {sx: {backgroundColor: theme.palette.background.modalShadow}}}}>

        <StyledModalInner $isXsScreen={isXsScreen} theme={theme}>

            <StyledModalHeader theme={theme}>
                <StyledHeaderDesc theme={theme}>クレジットカード情報を変更する</StyledHeaderDesc>
                <StyledSaveButton theme={theme} color="text" variant="contained" onClick={() => props.setOpen(false)}>閉じる</StyledSaveButton>
            </StyledModalHeader>

            <StyledMain>
                <div style={{width: "100%", height: "50px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px"}}>
                    <StyledCardImg {...getCardImageProps({ images })} />
                    <StyledCardType>{meta.cardType ? meta.cardType.displayName : "クレジットカードが選択されていません"}</StyledCardType>
                </div>
                <StyledTextField style={{marginBottom: "15px"}} helperText={creditCardHelper.number} theme={theme} fullWidth label="カード番号" autoComplete='new-off' variant='outlined'
                    inputProps={{...getCardNumberProps(), placeholder: ""}} value={creditCard.number} onChange={handleCreditCardNumberChange} error={creditCardError.number}/>
                <div style={{width: "100%", display: "flex", gap: "20px"}}>
                    <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText={creditCardHelper.expiry} theme={theme} fullWidth label="有効期限 (MM/YY)" autoComplete='new-off' variant='outlined'
                        inputProps={{...getExpiryDateProps(), placeholder: ""}} value={creditCard.expiry} onChange={handleCreditCardExpiryChange} error={creditCardError.expiry}/>
                    <StyledTextField style={{marginBottom: "15px",  width: "50%"}} helperText={creditCardHelper.cvc} theme={theme} fullWidth label="CVC" autoComplete='new-off' variant='outlined'
                        inputProps={{...getCVCProps(), placeholder: "", type: (CVCVisible ? "text" : 'password')}} value={creditCard.cvc} onChange={handleCreditCardCVCChange} error={creditCardError.cvc}
                        InputProps={{endAdornment: (<InputAdornment position="end" onClick={handleCVCVisible}>{CVCVisible ? <StyledVisibility theme={theme} /> : <StyledVisibilityOff theme={theme} />}</InputAdornment>)}}/>
                </div>
                <StyledButton color="secondary" fullWidth variant={theme.palette.type.followButton} onClick={handleUpdate}>変更を保存</StyledButton>
            </StyledMain>
        </StyledModalInner>

        </StyledModal>

        <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>
        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning} />
        </>
    )
}


const StyledModal = styled(Modal)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const StyledModalInner = styled.div`
    width: 450px;
    max-width: 90vw;
    min-width: 40vw;
    height: 75%;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${(props) => props.theme.palette.background.modal2};
`

const StyledModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: ${(props => props.theme.palette.background.modalHeader)};
    padding: 0 20px;
`

const StyledMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70%;
    margin: 50px auto 0 auto;
`

const StyledHeaderDesc = styled.div`
    color: ${(props => props.theme.palette.text.main)};
    font-size: 1.1rem;
    font-weight: bold;
`

const StyledSaveButton = styled(Button)`
    && {
        height: 70%;
        font-weight: bold;
        color: ${(props) => props.theme.palette.text.main3};
        background-color: ${(props) => props.theme.palette.text.main2};
    }
`

const StyledCardType = styled.div`
    color: #777;
`

const StyledCardImg = styled.svg`
    width: 75px;
    height: fit-content;
`

const StyledVisibility = styled(Visibility)`
    && {
        color: ${(props) => props.theme.palette.icon.main};
        cursor: pointer;
    }
`

const StyledVisibilityOff = styled(VisibilityOff)`
    && {
        color: ${(props) => props.theme.palette.icon.main};
        cursor: pointer;
    }
`

const StyledButton = styled(Button)`
    && {
        margin-top: 30px;
    }
`


export default CreditCardModal