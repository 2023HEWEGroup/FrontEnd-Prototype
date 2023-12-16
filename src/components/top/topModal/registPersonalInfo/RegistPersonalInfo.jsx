import { useTheme } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import { StyledTextField } from '../../../../utils/StyledTextField';


const RegistPersonalInfo = (props) => {

    const theme = useTheme();

    return (
        <>
        <StyledName>
            <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText={props.upperNameHelper} theme={theme} fullWidth label="姓" required
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={props.upperName} onChange={props.handleUpperNameInput} error={props.upperNameError}/>
            <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText={props.lowerNameHelper} theme={theme} fullWidth label="名" required
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={props.lowerName} onChange={props.handleLowerNameInput} error={props.lowerNameError}/>
            </StyledName>
            <StyledName>
            <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText={props.upperNameKanaHelper} theme={theme} fullWidth label="姓 (カナ)" required
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={props.upperNameKana} onChange={props.handleUpperNameKanaInput} error={props.upperNameKanaError}/>
            <StyledTextField style={{marginBottom: "15px", width: "50%"}} helperText={props.lowerNameKanaHelper} theme={theme} fullWidth label="名 (カナ)" required
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={props.lowerNameKana} onChange={props.handleLowerNameKanaInput} error={props.lowerNameKanaError}/>
            </StyledName>
            <StyledPostalCode>
            <StyledTextField style={{width: "50%"}} theme={theme} fullWidth label="郵便番号 (数字7ケタ)" required helperText={props.postalCodeHelper} error={props.postalCodeError}
                autoComplete='new-off' variant='outlined'inputProps={{maxLength: 7}} value={props.postalCode} onChange={props.handlePostalCodeInput}/>
            <StyledPostalComment>郵便番号から住所が自動で入力されます</StyledPostalComment>
            </StyledPostalCode>
            <StyledTextField style={{marginBottom: "15px", pointerEvents: "none"}} theme={theme} fullWidth label="都道府県 (自動入力)"
                autoComplete='new-off' variant='filled' value={props.prefecture} disabled/>
            <StyledTextField style={{marginBottom: "15px", pointerEvents: "none"}} theme={theme} fullWidth label="市区町村 (自動入力)"
                autoComplete='new-off' variant='filled' value={props.city} disabled/>
            <StyledTextField style={{marginBottom: "40px", pointerEvents: "none"}} theme={theme} fullWidth label="町名 (自動入力)"
                autoComplete='new-off' variant='filled' value={props.town} disabled/>
            <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="番地・建物名など"
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 50}} value={props.houseNumber} onChange={props.handleHouseNumberInput}/>
            <StyledTextField style={{marginBottom: "15px"}} helperText={props.phoneNumberHelper} error={props.phoneNumberError} theme={theme} fullWidth label="携帯電話番号 (数字11ケタ)" required
                autoComplete='new-off' variant='outlined' inputProps={{maxLength: 11}} value={props.phoneNumber} onChange={props.handlePhoneNumberInput}/>
        </>
    )
}

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


export default RegistPersonalInfo