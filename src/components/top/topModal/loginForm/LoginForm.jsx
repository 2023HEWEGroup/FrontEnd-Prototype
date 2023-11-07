import { OpenInNew, Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, InputAdornment, TextField, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const LoginForm = (props) => {

    const theme = useTheme();

    return (
        <StyledLoginForm noValidate>
        {props.isUserIdLogin ? 
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="ユーザーID (3~20字)"
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={props.userId} onChange={props.handleUserIdInput}/>
        :
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="メールアドレス"
            autoComplete='new-off' variant='outlined' value={props.mailAddress} onChange={props.handleMailAddressInput}/>
        }
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="パスワード (8~20字)"
            autoComplete='new-off' variant='outlined' value={props.password} type={props.passwordVisible ? "text" : 'password'} onChange={props.handlePasswordInput}
            inputProps={{maxLength: 20}} InputProps={{endAdornment: (<InputAdornment position="end" onClick={props.handlePasswordVisible}>{props.passwordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        <div style={{width: "100%"}}>
            <StyledOptionChange onClick={props.handleUserIdLogin}>または{props.isUserIdLogin ? "メールアドレス" : "ユーザーID"}でログインする</StyledOptionChange>
        </div>
        <LoadingButton color='top' fullWidth variant='outlined'>ログイン</LoadingButton>
        <Button color='top' onClick={props.handleIsLogin}>アカウントをお持ちではありませんか？<OpenInNew style={{marginLeft: "5px"}}/>新規登録</Button>
        </StyledLoginForm>
    )
}


const StyledLoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
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


export default LoginForm