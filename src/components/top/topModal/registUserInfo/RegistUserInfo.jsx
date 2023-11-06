import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components';


const RegistUserInfo = (props) => {

    const [registPasswordVisible, setRegistPasswordVisible] = useState(false);
    const theme = useTheme();

    const handleRegistPasswordVisible = () => {
        setRegistPasswordVisible(!registPasswordVisible);
    }

    return (
        <>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.registUserNameHelper} theme={theme} fullWidth label="ユーザーネーム (1~30字)" required
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 30}} value={props.registUserName} onChange={props.handleRegistUserNameInput} error={props.isRegistUserNameError}/>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.registUserIdHelper} theme={theme} fullWidth label="ユーザーID (3~30字)" required
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 30}} value={props.registUserId} onChange={props.handleRegistUserIdInput} error={props.isRegistUserIdError}/>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.registPasswordHelper} theme={theme} fullWidth label="パスワード (8~20字)" required error={props.isRegistPasswordError}
            autoComplete='new-off' type={registPasswordVisible ? "text" : 'password'} variant='outlined' inputProps={{maxLength: 20}} value={props.registPassword} onChange={props.handleRegistPasswordInput}
            InputProps={{endAdornment: (<InputAdornment position="end" onClick={handleRegistPasswordVisible}>{registPasswordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.registConfirmPasswordHelper} theme={theme} fullWidth label="確認用パスワード (8~20字)" required error={props.isRegistConfirmPasswordError}
            autoComplete='new-off' type={registPasswordVisible ? "text" : 'password'} variant='outlined' inputProps={{maxLength: 20}} value={props.registConfirmPassword} onChange={props.handleRegistConfirmPasswordInput}
            InputProps={{endAdornment: (<InputAdornment position="end" onClick={handleRegistPasswordVisible}>{registPasswordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.registMailAddressHelper} theme={theme} fullWidth label="メールアドレス" required error={props.isRegistMailAddressError}
            autoComplete='new-off' type='email' variant='outlined' value={props.registMailAddress} onChange={props.handleRegistMailAddressInput}/>
        <StyledTextField style={{marginBottom: "15px"}} helperText={props.registConfirmMailAddressHelper} theme={theme} fullWidth label="確認用メールアドレス" required error={props.isRegistConfirmMailAddressError}
            autoComplete='new-off' type='email' variant='outlined' value={props.registConfirmMailAddress} onChange={props.handleRegistConfirmMailAddressInput}/>
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


export default RegistUserInfo