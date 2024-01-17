import { AlternateEmail, SettingsOutlined } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, ListItemAvatar, ListItemButton, ListItemText, Modal, Radio, RadioGroup, TextField, Tooltip, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ErrorSnack from '../common/errorSnack/ErrorSnack';
import IsProgress from '../common/isProgress/IsProgress';
import DestructionModal from '../common/admin/destructionModal/DestructionModal';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';


const PurchaseModal = (props) => {

    const [selectedValue, setSelectedValue] = useState("point");
    const [number, setNumber] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isDestructOpen, setIsDestructOpen] = useState(false);
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

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

    const locateToPoints = () => {
        navigate("/setting/account/point");
    }

    const handlePurchase = async () => {
        try {
            if (props.product.price > props.currentUser.points && selectedValue === "point") {
                setIsDestructOpen(true);
                return;
            }
            setIsProgress(true);
            await axios.put(`http://localhost:5000/client/product/purchase/${props.product._id}?mode=${selectedValue}`, {_id: props.currentUser._id});
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
            props.fetchProduct();
            props.setOpen(false);
            setIsProgress(false);
        } catch (err) {
            setIsProgress(false);
            if (err.response) {
                console.log(err);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました");
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
                const response = await axios.get(`http://localhost:5000/client/auth/number/${props.currentUser._id}`);
                setNumber(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCardNumber();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <>
        <StyledModal open={props.open} onClose={() => props.setOpen(false)} slotProps={{backdrop: {sx: {backgroundColor: theme.palette.background.modalShadow}}}}>
            <StyledInner theme={theme}>
                <TextField style={{display: "none"}} theme={theme} fullWidth label="カード番号" autoComplete='new-off' variant='outlined'
                    inputProps={{...getCardNumberProps(), placeholder: ""}} value={cardPrefix(props.currentUser.creditCard.cardName)}/>
                <StyledModalHeader theme={theme}>
                    <StyledHeaderDesc theme={theme}>商品を購入する</StyledHeaderDesc>
                    <StyledSaveButton theme={theme} color="text" variant="contained" onClick={() => props.setOpen(false)}>戻る</StyledSaveButton>
                </StyledModalHeader>

                <StyledModalMain>
                    <StyledpaymentArea>
                    <FormControl sx={{width: "100%"}}>
                        <StyledTitle theme={theme}>お支払い方法の選択</StyledTitle>
                        <StyledRadioGroup theme={theme} sx={{color: theme.palette.text.main}} value={selectedValue} onChange={handleChange}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <FormControlLabel style={{width: "100%"}} control={<Radio color='secondary' value={"point"}/>} label={
                                <StyledListItemButton theme={theme}>
                                    <ListItemAvatar>
                                        <StyledLmapLogo src={`${siteAssetsPath}/lmap_character_logo.svg`} alt='LMAPロゴ' />
                                    </ListItemAvatar>
                                    <ListItemText primary="LMAPポイント払い" secondary={`現在のポイント残高: ${props.product.price - props.currentUser.points >= 0 ? `${props.currentUser.points} (${props.product.price - props.currentUser.points}ポイント不足しています)` : `${props.currentUser.points}`}`} 
                                    primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: props.product.price - props.currentUser.points >= 0 ? theme.palette.text.error : theme.palette.text.sub }}/>
                                </StyledListItemButton>}
                            />
                            <Tooltip arrow placement='top' title='ポイントの設定'>
                                <Link to='/setting/account/point'>
                                    <SettingsOutlined sx={{color: theme.palette.icon.main}}/>
                                </Link>
                            </Tooltip>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <FormControlLabel style={{width: "100%"}} control={<Radio color='secondary' value={"card"}/>} label={
                                <StyledListItemButton theme={theme}>
                                    <ListItemAvatar>
                                    <StyledCardImg {...getCardImageProps({images})}/>
                                    </ListItemAvatar>
                                    <ListItemText primary="クレジットカード払い" secondary={props.currentUser.creditCard.cardName ? 
                                    `${number} ${props.currentUser.creditCard.expiry}`
                                    :
                                    `クレジットカード未登録`
                                    } 
                                    primaryTypographyProps={{ color: props.currentUser.creditCard.cardName ? theme.palette.text.main : theme.palette.line.disable }} secondaryTypographyProps={{ color: props.currentUser.creditCard.cardName ? theme.palette.text.sub : theme.palette.text.error }}/>
                                    
                                </StyledListItemButton>}
                                disabled={!props.currentUser.creditCard.cardName}
                            />
                            <Tooltip arrow placement='top' title='クレジットカードの設定'>
                                <Link to='/setting/account/creditCardDetail'>
                                    <SettingsOutlined sx={{color: theme.palette.icon.main}}/>
                                </Link>
                            </Tooltip>
                            </div>
                        </StyledRadioGroup>
                    </FormControl>
                    </StyledpaymentArea>

                    <StyledShippingAddress>
                        <StyledTitle theme={theme}>お届け先住所</StyledTitle>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <StyledListItemButton style={{cursor: "auto"}} theme={theme}>
                            <ListItemAvatar>
                                <AlternateEmail />
                            </ListItemAvatar>
                            <ListItemText primary={props.currentUser.prefecture + props.currentUser.city + props.currentUser.town + props.currentUser.houseNumber} secondary={`アカウントに登録済みのお届け先住所が表示されます。`} 
                            primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                        </StyledListItemButton>
                        <Tooltip arrow placement='top' title='お届け先住所の設定'>
                            <Link to='#'>
                                <SettingsOutlined sx={{color: theme.palette.icon.main}}/>
                            </Link>
                        </Tooltip>
                        </div>
                    </StyledShippingAddress>

                    <Button color='secondary' variant='contained' fullWidth sx={{mt: 5, mb: 5}} onClick={handlePurchase}>購入する</Button>
                </StyledModalMain>

            </StyledInner>
        </StyledModal>

        <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>

        <DestructionModal isDestructOpen={isDestructOpen} setIsDestructOpen={setIsDestructOpen} handleInputDelete={locateToPoints}
            header="ポイントが不足しています" desc="商品の購入を行うには、ポイントをチャージするか、お支払い方法を変更します。" />
        
        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>
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

const StyledInner = styled.div`
    position: relative;
    width: 450px;
    max-width: 90vw;
    min-width: 40vw;
    height: 75%;
    padding-top: 50px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: ${(props) => props.theme.palette.background.modal2};
`

const StyledModalHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: ${(props => props.theme.palette.background.modalHeader)};
    padding: 0 20px;
`

const StyledModalMain = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 5%;
    overflow-x: hidden;
    overflow-y: scroll;
`

const StyledHeaderDesc = styled.div`
    color: ${(props => props.theme.palette.text.main)};
    font-size: 1.1rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `

const StyledSaveButton = styled(Button)`
    && {
        height: 70%;
        font-weight: bold;
        color: ${(props => props.theme.palette.text.main3)};
        background-color: ${(props => props.theme.palette.text.main2)};
    }
`

const StyledpaymentArea = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    width: 100%;
    padding: 25px 20px 0 20px;
`

const StyledShippingAddress = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    width: 100%;
    padding: 25px 20px 0 20px;
`

const StyledTitle = styled.div`
    width: 100%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledRadioGroup = styled(RadioGroup)`
    && {
        .MuiRadio-root:not(.Mui-checked) {
            color: ${(props) => props.theme.palette.line.disable};
        }
        .MuiRadio-root.Mui-disabled {
            color: ${(props) => props.theme.palette.line.disable};
        }
    }
`

const StyledListItemButton = styled(ListItemButton)`
    && {
        width: 100%
        background-color: #aff;
        color: ${(props) => props.theme.palette.text.sub};
        .MuiTouchRipple-child {
            background-color: transparent;
        }
        &:hover {
            background-color: transparent;
        }
    }
`

const StyledLmapLogo = styled.img`
    width: 50px;
    cursor: pointer;
`;

const StyledCardImg = styled.svg`
    width: 50px;
`


export default PurchaseModal