import { Checkbox, FormControlLabel, InputAdornment, TextField, useTheme } from '@mui/material'
import images from 'react-payment-inputs/images';
import React from 'react'
import styled from 'styled-components';
import { usePaymentInputs } from 'react-payment-inputs';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const RegistCreditCard = (props) => {

    const theme = useTheme();

    const {
        meta,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    return (
        <>
        <div style={{width: "100%", height: "50px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px"}}>
            <StyledCardImg {...getCardImageProps({ images })} />
            <StyledCardType>{meta.cardType ? meta.cardType.displayName : "クレジットカードが選択されていません"}</StyledCardType>
        </div>
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="カード番号" autoComplete='new-off' variant='outlined'
            inputProps={{...getCardNumberProps(), placeholder: ""}} value={props.creditCard.number} onChange={props.handleCreditCardNumberChange}/>
        <div style={{width: "100%", display: "flex", gap: "20px"}}>
            <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText=" " theme={theme} fullWidth label="有効期限 (MM/YY)" autoComplete='new-off' variant='outlined'
                inputProps={{...getExpiryDateProps(), placeholder: ""}} value={props.creditCard.expiry} onChange={props.handleCreditCardExpiryChange}/>
            <StyledTextField style={{marginBottom: "15px",  width: "50%"}} helperText=" " theme={theme} fullWidth label="CVC" autoComplete='new-off' variant='outlined'
                inputProps={{...getCVCProps(), placeholder: "", type: (props.CVCVisible ? "text" : 'password')}} value={props.creditCard.cvc} onChange={props.handleCreditCardCVCChange}
                InputProps={{endAdornment: (<InputAdornment position="end" onClick={props.handleCVCVisible}>{props.CVCVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        </div>
        <StyledFormControlLabel control={<Checkbox color='top' checked={props.cardChecked} onChange={props.handleCardChecked} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
            label="お支払い方法にクレジットカードを追加します (任意)"/>
        </>
    )
}


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

const StyledCardType = styled.div`
    color: #777;
`

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        color: #777;
        margin-bottom: 40px;
    }
`

const StyledCardImg = styled.svg`
    width: 75px;
    height: fit-content;
`

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


export default RegistCreditCard