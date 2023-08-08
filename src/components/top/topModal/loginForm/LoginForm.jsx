import { OpenInNew, Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, InputAdornment, TextField, useTheme } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'


const LoginForm = (props) => {

    const [userId, setUserId] = useState("");
    const [mailAddress, setMailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isUserIdLogin, setIsUserIdLogin] = useState(true);
    const theme = useTheme();

    const handleUserIdLogin = () => {
        setIsUserIdLogin(!isUserIdLogin);
    }
    
    const handleUserIdInput = (e) => {
        setUserId(e.target.value);
    }
    
    const handleMailAddressInput = (e) => {
        setMailAddress(e.target.value);
    }
    
    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }
    
    const handlePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <Styledform noValidate>
        {isUserIdLogin ? 
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="ユーザーID (3~20字)"
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20}} value={userId} onChange={handleUserIdInput}/>
        :
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="メールアドレス"
            autoComplete='new-off' variant='outlined' value={mailAddress} onChange={handleMailAddressInput}/>
        }
        <StyledTextField style={{marginBottom: "15px"}} helperText=" " theme={theme} fullWidth label="パスワード (8~20字)"
            autoComplete='new-off' variant='outlined' value={password} type={passwordVisible ? "text" : 'password'} onChange={handlePasswordInput}
            inputProps={{maxLength: 20}} InputProps={{endAdornment: (<InputAdornment position="end" onClick={handlePasswordVisible}>{passwordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        <div style={{width: "100%"}}>
            <StyledOptionChange onClick={handleUserIdLogin}>または{isUserIdLogin ? "メールアドレス" : "ユーザーID"}でログインする</StyledOptionChange>
        </div>
        <LoadingButton color='top' fullWidth type='submit' variant='outlined'>ログイン</LoadingButton>
        <Button color='top' onClick={props.handleIsLogin}>アカウントをお持ちではありませんか？<OpenInNew style={{marginLeft: "5px"}}/>新規登録</Button>
        </Styledform>
    )
}


const Styledform = styled.form`
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