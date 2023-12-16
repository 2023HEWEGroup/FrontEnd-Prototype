import { ArrowBack } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../../../redux/features/userSlice';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import IsProgress from '../../../common/isProgress/IsProgress';
import { StyledTextField } from '../../../../utils/StyledTextField';

const MailAddressSetting = (props) => {

    const tokenRef = useRef();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isAuth = searchParams.get('isAuth');
    const [mailAddress, setMailAddress] = useState({value: "", error: false, helper: " "});
    const [recognitionMailAddress, setRecognitionMailAddress] = useState({value: "", error: false, helper: " "});
    const [token, setToken] = useState({value: "", error: false, helper: " "});
    const [isTokenInput, setIsTokenInput] = useState(isAuth === "true" ? true : false);
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isInfoSnack, setIsInfoSnack] = useState(false);
    const [snackInfo, setSnackInfo] = useState("");
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = async (e) => {
        setMailAddress((prev) => ({...prev, value: e.target.value}));
        if (e.target.value.length === 0) {
            setMailAddress((prev) => ({...prev, error: false}));
            setMailAddress((prev) => ({...prev, helper: " "}));
        } else if (!e.target.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setMailAddress((prev) => ({...prev, error: true}));
            setMailAddress((prev) => ({...prev, helper: "正しいメールアドレスを入力して下さい"}));
        } else if (e.target.value !== recognitionMailAddress.value) {
            setMailAddress((prev) => ({...prev, error: true}));
            setMailAddress((prev) => ({...prev, helper: "メールアドレスが一致しません"}));
        } else {
            setMailAddress((prev) => ({...prev, error: false}));
            setMailAddress((prev) => ({...prev, helper: " "}));
            try {
                const response = await axios.get(`http://localhost:5000/client/user/getByEmail/${e.target.value}`);
                if (response.data) {
                    setMailAddress((prev) => ({...prev, error: true}));
                    setMailAddress((prev) => ({...prev, helper: "このメールアドレスはすでに使用されています"}));
                }
            } catch (err) {
            }
        }
    }

    const handleRecognitionInput = async (e) => {
        setRecognitionMailAddress((prev) => ({...prev, value: e.target.value}));
        if (e.target.value.length === 0) {
            setRecognitionMailAddress((prev) => ({...prev, error: false}));
            setRecognitionMailAddress((prev) => ({...prev, helper: " "}));
        } else if (!e.target.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setRecognitionMailAddress((prev) => ({...prev, error: true}));
            setRecognitionMailAddress((prev) => ({...prev, helper: "正しいメールアドレスを入力して下さい"}));
        } else {
            setRecognitionMailAddress((prev) => ({...prev, error: false}));
            setRecognitionMailAddress((prev) => ({...prev, helper: " "}));
        }
        if (mailAddress.value.length === 0) {
            setMailAddress((prev) => ({...prev, error: false}));
            setMailAddress((prev) => ({...prev, helper: " "}));
        } else if (!mailAddress.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
            setMailAddress((prev) => ({...prev, error: true}));
            setMailAddress((prev) => ({...prev, helper: "正しいメールアドレスを入力して下さい"}));
        } else if (e.target.value !== mailAddress.value) {
            setMailAddress((prev) => ({...prev, error: true}));
            setMailAddress((prev) => ({...prev, helper: "メールアドレスが一致しません"}));
        } else {
            setMailAddress((prev) => ({...prev, error: false}));
            setMailAddress((prev) => ({...prev, helper: " "}));
            try {
                const response = await axios.get(`http://localhost:5000/client/user/getByEmail/${mailAddress.value}`);
                if (response.data) {
                    setMailAddress((prev) => ({...prev, error: true}));
                    setMailAddress((prev) => ({...prev, helper: "このメールアドレスはすでに使用されています"}));
                }
            } catch (err) {
            }
        }
    }

    const handleTokenInput = async (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setToken((prev) => ({...prev, value: value, error: false, helper: " "}));
        try {
            if (value.length === 6) {
                setIsProgress(true);
                await axios.post(`http://localhost:5000/client/auth/verify/${props.currentUser._id}`, {token: e.target.value});
                const response = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
                dispatch(setUser(response.data));
                setTimeout(() => { // ブルートフォース攻撃防ぎたいという意味でも結果表示まであえて待たせる
                    setIsProgress(false);
                    setSnackInfo(`二段階認証が完了しました`);
                    setToken((prev) => ({...prev, value: ""}));
                    setIsInfoSnack(true);
                }, 1500);
            }
        } catch (err) {
            setTimeout(() => {
                setIsProgress(false);
            if (err.response) {
                if (err.response.status === 401) {
                    setToken((prev) => ({...prev, error: true, helper: err.response.data}));
                }
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
                setIsErrorSnack(true);
            } else {
                console.log(err);
            }
            }, 1500);
        }
    }

    const handleUpdate = async () => {
        try {
            setIsProgress(true);
            await axios.post(`http://localhost:5000/client/auth/exchangeEmail/${props.currentUser._id}`, {unverifiedEmail: mailAddress.value, confirmEmail: recognitionMailAddress.value});
            const response = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(response.data));
            setIsProgress(false);
            setSnackInfo(`認証メールが送信されました`);
            setIsInfoSnack(true);
            setMailAddress((prev) => ({...mailAddress, value: ""}));
            setRecognitionMailAddress((prev) => ({...mailAddress, value: ""}));
            setIsTokenInput(true)
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

    const handleTokenModeAndMail = () => { // トークンウィンドウを展開してメールを送信
        setIsTokenInput(true);
        handleResendMail()
    }

    const handleResendMail = async () => {
        try {
            setIsProgress(true);
            await axios.put(`http://localhost:5000/client/auth/resendMail/${props.currentUser._id}`);
            const response = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(response.data));
            setIsProgress(false);
            setSnackInfo(`認証メールが送信されました`);
            setIsInfoSnack(true);
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
        if (isAuth === "true") {
            tokenRef.current.focus(); // トークン入力モードでアクセスした際にフォーカスさせる
        }
    }, [isAuth])

    useEffect(() => {
        if (isTokenInput) {
            tokenRef.current.focus(); // トークン入力モードがtrueになった際にフォーカスさせる
        }
    }, [isTokenInput])

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                <IconButton color='secondary' onClick={() => navigate(-1)}>
                    <ArrowBack style={{color: theme.palette.text.main}}/>
                </IconButton>
                <div>{"メールアドレス設定"}</div> {/*未認証なら変更か認証なので「設定」、認証済みなら変更のみなので「変更」*/}
            </StyledTitle>
        </StyledHeader>
        <StyledInputZone theme={theme}>
        {props.currentUser.isAuthorized ? <StyledTextField theme={theme} fullWidth label={"現在のメールアドレス"} disabled value={props.currentUser.email} style={{marginBottom: "15px"}}/> : null}
        {props.currentUser.authToken.unverifiedEmail ? <StyledTextField theme={theme} fullWidth label={"未認証のメールドレス"} disabled value={props.currentUser.authToken.unverifiedEmail} /> : null}
        {!isTokenInput && props.currentUser.authToken.unverifiedEmail &&
        <Button color='secondary' onClick={handleTokenModeAndMail}>認証コードを再送信する</Button>
        }
        </StyledInputZone>


        {isTokenInput && props.currentUser.authToken.unverifiedEmail &&
        <StyledInputZone theme={theme}>
            <StyledHeader>
                <StyledTitle theme={theme}>
                    <div>認証コードを入力する</div>
                </StyledTitle>
                <StyledDesc theme={theme}>メールをご確認下さい。認証コードをお送りしました。こちらに入力して本人確認をお願いします。</StyledDesc>
            </StyledHeader>
            <div style={{width: "50%", marginTop: "30px", marginBottom: "20px"}}>
                <StyledTextField theme={theme} fullWidth label="認証コード(6ケタ)" autoComplete='new-off' variant='outlined' inputProps={{maxLength: 6}}
                value={token.value} onChange={handleTokenInput} inputRef={tokenRef} error={token.error} helperText={token.helper}
                InputProps={{endAdornment: (<InputAdornment position="end">{<StyledCircularProgress theme={theme} $error={token.error} variant="determinate" value={token.value.length / 6 * 100} />}</InputAdornment>)}}/>
            </div>
            <Button color='secondary' onClick={handleResendMail}>認証コードが届かなかったり、失効したりした場合は、再送してください</Button>
        </StyledInputZone>
        }

        
        <StyledInputZone theme={theme}>
            <StyledHeader>
                <StyledTitle theme={theme}>
                    <div>またはメールアドレスを変更する</div>
                </StyledTitle>
            </StyledHeader>
            <div style={{width: "100%", marginTop: "20px"}}>
                <StyledTextField style={{marginBottom: "15px"}} helperText={mailAddress.helper} theme={theme} fullWidth label="メールアドレス" error={mailAddress.error}
                    autoComplete='new-off' type='email' variant='outlined' value={mailAddress.value} onChange={handleInput} inputProps={{maxLength: 319}}/>
                <StyledTextField style={{marginBottom: "15px"}} helperText={recognitionMailAddress.helper} theme={theme} fullWidth label="確認用メールアドレス" error={recognitionMailAddress.error}
                    autoComplete='new-off' type='email' variant='outlined' value={recognitionMailAddress.value} onChange={handleRecognitionInput} inputProps={{maxLength: 319}}/>
            </div>
            <StyledButtonZone>
                <Button color="secondary" variant="contained" disabled={mailAddress.error || mailAddress.value.length === 0 || recognitionMailAddress.error || recognitionMailAddress.value.length === 0} onClick={handleUpdate}>保存</Button>
            </StyledButtonZone>
        </StyledInputZone>


        <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>
        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning} />
        <ErrorSnack open={isInfoSnack} onClose={() => setIsInfoSnack(false)} warning={snackInfo} severity="info"/>
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

const StyledDesc = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.85rem;
    word-wrap: break-word;
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

const StyledCircularProgress = styled(CircularProgress)`
    && {
        color: ${(props) => props.$error ? props.theme.palette.text.error : props.theme.palette.secondary.main};
    }
`

const StyledButtonZone = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
`


export default MailAddressSetting