import { Checkbox, FormControlLabel, InputAdornment, useTheme } from '@mui/material'
import images from 'react-payment-inputs/images';
import React from 'react'
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledTextField } from '../../../../utils/StyledTextField';


const RegistCreditCard = (props) => {

    const theme = useTheme()

    return (
        <>
        <div style={{width: "100%", height: "50px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px"}}>
            <StyledCardImg {...props.getCardImageProps({ images })} />
            <StyledCardType>{props.meta.cardType ? props.meta.cardType.displayName : "クレジットカードが選択されていません"}</StyledCardType>
        </div>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.creditCardHelper.number} theme={theme} fullWidth label="カード番号" autoComplete='new-off' variant='outlined'
            inputProps={{...props.getCardNumberProps(), placeholder: ""}} value={props.creditCard.number} onChange={props.handleCreditCardNumberChange} error={props.creditCardError.number}/>
        <div style={{width: "100%", display: "flex", gap: "20px"}}>
            <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText={props.creditCardHelper.expiry} theme={theme} fullWidth label="有効期限 (MM/YY)" autoComplete='new-off' variant='outlined'
                inputProps={{...props.getExpiryDateProps(), placeholder: ""}} value={props.creditCard.expiry} onChange={props.handleCreditCardExpiryChange} error={props.creditCardError.expiry}/>
            <StyledTextField style={{marginBottom: "15px",  width: "50%"}} helperText={props.creditCardHelper.cvc} theme={theme} fullWidth label="CVC" autoComplete='new-off' variant='outlined'
                inputProps={{...props.getCVCProps(), placeholder: "", type: (props.CVCVisible ? "text" : 'password')}} value={props.creditCard.cvc} onChange={props.handleCreditCardCVCChange} error={props.creditCardError.cvc}
                InputProps={{endAdornment: (<InputAdornment position="end" onClick={props.handleCVCVisible}>{props.CVCVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        </div>
        <StyledFormControlLabel control={<Checkbox color='top' checked={props.cardChecked} onChange={props.handleCardChecked} sx={{ color: "#777", '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
            label="お支払い方法にクレジットカードを追加します (任意)"/>
        </>
    )
}

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