import { OpenInNew, Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, InputAdornment, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { StyledTextFieldTop } from '../../../../utils/StyledTextFieldTop'


const LoginForm = (props) => {

    const user = useSelector((state) => state.user.value);
    const theme = useTheme();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            props.handleLogin();
        }
    }

    return (
        <StyledLoginForm noValidate>
        {props.isUserIdLogin ? 
        <StyledTextFieldTop style={{marginBottom: "15px"}} helperText={props.userIdHelper} error={props.userIdError} theme={theme} fullWidth label="ユーザーID (3~20字)"
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 20, color: theme.palette.text.main2}} value={props.userId} onChange={props.handleUserIdInput} onKeyDown={handleKeyPress}/>
        :
        <StyledTextFieldTop style={{marginBottom: "15px"}} helperText={props.mailAddressHelper} error={props.mailAddressError} theme={theme} fullWidth label="メールアドレス"
            autoComplete='new-off' variant='outlined' value={props.mailAddress} onChange={props.handleMailAddressInput} onKeyDown={handleKeyPress}/>
        }
        <StyledTextFieldTop style={{marginBottom: "15px"}} helperText={props.passwordHelper} error={props.passwordError} theme={theme} fullWidth label="パスワード (8~20字)"
            autoComplete='new-off' variant='outlined' value={props.password} type={props.passwordVisible ? "text" : 'password'} onChange={props.handlePasswordInput} onKeyDown={handleKeyPress}
            inputProps={{maxLength: 30}} InputProps={{endAdornment: (<InputAdornment position="end" onClick={props.handlePasswordVisible}>{props.passwordVisible ? <StyledVisibility /> : <StyledVisibilityOff />}</InputAdornment>)}}/>
        <div style={{width: "100%"}}>
            <StyledOptionChange onClick={props.handleUserIdLogin}>または{props.isUserIdLogin ? "メールアドレス" : "ユーザーID"}でログインする</StyledOptionChange>
        </div>
        <LoadingButton color='top' fullWidth variant='outlined' onClick={props.handleLogin}>ログイン</LoadingButton>
        <Button color='top' onClick={props.handleIsLogin}>{user ? "アカウントを追加しますか？" : "アカウントをお持ちではありませんか？"}<OpenInNew style={{marginLeft: "5px"}}/>新規登録</Button>
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

const StyledOptionChange = styled.div`
    margin-bottom: 15px;
    width: fit-content;
    color: #888;
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;

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