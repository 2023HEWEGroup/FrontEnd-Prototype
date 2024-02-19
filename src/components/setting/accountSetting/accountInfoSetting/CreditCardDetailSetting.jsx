import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../../../redux/features/userSlice';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import IsProgress from '../../../common/isProgress/IsProgress';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { StyledTextFieldTop } from '../../../../utils/StyledTextFieldTop';
import DestructionModal from '../../../common/admin/destructionModal/DestructionModal';
import CreditCardModal from './CreditCardModal';
import { useEnv } from '../../../../provider/EnvProvider';

const CreditCardDetailSetting = (props) => {

    const [number, setNumber] = useState("");
    const [isDestructOpen, setIsDestructOpen] = useState(false);
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { backendAccessPath } = useEnv();

    const {
        getCardImageProps,
        getCardNumberProps,
    } = usePaymentInputs();

    const cardPrefix = (brand) => {
        if (brand === "Visa") return 4;
        if (brand === "Mastercard") return 53;
        if (brand === "American Express") return 37;
        if (brand === "Diners Club") return 305;
        if (brand === "JCB") return 35;
        if (brand === "Discover") return 6011;
        if (brand === "UnionPay") return 624;
        else return "";
    }

    const handleCreditCardDelete = async () => {
        try {
            setIsProgress(true);
            await axios.delete(`${backendAccessPath}/client/setting/creditCardDelete/${props.currentUser._id}`);
            const response = await axios.get(`${backendAccessPath}/client/user/getById/${props.currentUser._id}`);
            setTimeout(() => {
                dispatch(setUser(response.data));
                setIsProgress(false);
                setIsDestructOpen(false);
                navigate("/setting/account/paymentInfo");
            }, 1000);
        } catch (err) {
            console.log(err)
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

    useEffect(() => {
        const fetchCardNumber = async () => {
            if (!props.currentUser.creditCard.number) return;
            try {
                const response = await axios.get(`${backendAccessPath}/client/auth/number/${props.currentUser._id}`);
                setNumber(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCardNumber();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                <Link to="/setting/account/paymentInfo">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                <div>{props.currentUser.creditCard.cardName ? "クレジットカード詳細" : "クレジットカードを追加"}</div>
            </StyledTitle>
        </StyledHeader>
        <StyledInputZone theme={theme}>
            <StyledCardZone theme={theme}>
                <div style={{display: "flex", justifyContent: "start", alignItems: isXsScreen ? "start" : "center", flexDirection: isXsScreen ? "column" : "row", gap: "10px", width: "100%"}}>
                    <StyledCardImg {...getCardImageProps({images})}/>
                    <StyledMaskedCardNUmber theme={theme}>{number ? number : "クレジットカードの登録なし"}</StyledMaskedCardNUmber>
                </div>
                {props.currentUser.creditCard.cardName &&
                <div style={{display: "flex", justifyContent: "start", alignItems: "center", gap: "10px", width: "100%"}}>
                    <StyledCardExpiry theme={theme}>{props.currentUser.creditCard.expiry}</StyledCardExpiry>
                </div>
                }
            </StyledCardZone>
            <StyledButtons $isXsScreen={isXsScreen}>
                <Button color='secondary' variant='outlined' fullWidth={isXsScreen} onClick={() => setIsModalOpen(true)}>編集</Button>
                {props.currentUser.creditCard.cardName &&
                    <Button color='error' variant='outlined' fullWidth={isXsScreen} onClick={() => setIsDestructOpen(true)}>削除</Button>
                }
            </StyledButtons>
        </StyledInputZone>

        {/* すぐしたのcreditCardModal内にもgetCardNumberPropsを使うTextFieldがあるが、getCardNumberPropsはTextFieldに対して番号を入手するための一意なIDを振るらしい
        そのため親でも子でも同じgetCardNumberProps複数のTextFieldに適用すると、IDの衝突が発生しwarningが出力される。なのでこちらはモーダルが開いている間は非表示にする */}
        {!isModalOpen && <StyledTextFieldTop style={{display: "none"}} theme={theme} fullWidth label="カード番号" autoComplete='new-off' variant='outlined'
            inputProps={{...getCardNumberProps(), placeholder: ""}} value={cardPrefix(props.currentUser.creditCard.cardName)}/>}

        {isModalOpen && <CreditCardModal open={isModalOpen} setOpen={setIsModalOpen} currentUser={props.currentUser}/>}
        
        <DestructionModal isDestructOpen={isDestructOpen} setIsDestructOpen={setIsDestructOpen} handleInputDelete={handleCreditCardDelete} act="削除"
            header="お支払い方法を削除しますか？" desc="このお支払い方法はLMAPアカウントから完全に削除されます。そのため、商品の購入で使用できなくなります。" />

        <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>
        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning} />
        </>
    )
}


const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 0 15px;
`

const StyledTitle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: 50px;
    color: ${(props) => props.theme.palette.text.main};
    font-weight: bold;
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledInputZone = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 15px;
    border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};
`

const StyledMaskedCardNUmber = styled.div`
    color: ${(props) => props.theme.palette.line.disable};
    max-width: 70%;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

const StyledCardExpiry = styled.div`
    color: ${(props) => props.theme.palette.line.disable};
    max-width: 100%;
    word-break: break-all;
`

const StyledCardImg = styled.svg`
    width: 75px;
    max-width: 30%;
    height: fit-content;
`

const StyledCardZone = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 10px;
    width: 95%;
    padding: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
    margin: 0 auto;
`

const StyledButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: ${(props) => props.$isXsScreen ? "space-between" : "center"};;
    flex-direction: ${(props) => props.$isXsScreen ? "column" : "row"};
    gap: ${(props) => props.$isXsScreen ? "10px" : "100px"};
    width ${(props) => props.$isXsScreen ? "95%" : "auto"};
    margin: 10px auto;
`


export default CreditCardDetailSetting