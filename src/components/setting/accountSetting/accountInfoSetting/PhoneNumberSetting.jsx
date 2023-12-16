import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../../../redux/features/userSlice';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import IsProgress from '../../../common/isProgress/IsProgress';
import { StyledTextField } from '../../../../utils/StyledTextField';


const PhoneNumberSetting = (props) => {

    const [phoneNumber, setphoneNumber] = useState({value: props.currentUser.phoneNumber || "", error: false, helper: ""});
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isInfoSnack, setIsInfoSnack] = useState(false);
    const [snackInfo, setSnackInfo] = useState("");
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function formatPhoneNumber(phoneNumber) {
        const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        return formattedNumber;
    }

    const handleInput = async (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setphoneNumber((prev) => ({...prev, value: value}));
        if (value.length === 0) {
            setphoneNumber((prev) => ({...prev, error: false}));
            setphoneNumber((prev) => ({...prev, helper: ""}));
        } else if (!value.match(/^[0-9]{11}$/)) {
            setphoneNumber((prev) => ({...prev, error: true}));
            setphoneNumber((prev) => ({...prev, helper: "半角数字11ケタで入力して下さい"}));
        } else if (!value.match(/^(090|080|070)\d{8}$/)) {
            setphoneNumber((prev) => ({...prev, error: true}));
            setphoneNumber((prev) => ({...prev, helper: "正しい携帯電話番号を入力して下さい"}));
        } else {
            setphoneNumber((prev) => ({...prev, error: false}));
            setphoneNumber((prev) => ({...prev, helper: ""}));
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByPhone/${value.toString()}`);
                if (user.data) {
                    setphoneNumber((prev) => ({...prev, error: true}));
                    setphoneNumber((prev) => ({...prev, helper: "この携帯電話番号はすでに使用されています"}));
                }
            } catch (err) {
                
            }
        }
    }

    const handleUpdate = async () => {
        try {
            setIsProgress(true);
            await axios.put(`http://localhost:5000/client/setting/phoneNumber/${props.currentUser._id}`, {phoneNumber: phoneNumber.value.toString()});
            const response = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(response.data));
            setIsProgress(false);
            setSnackInfo(`新しい携帯電話番号: ${formatPhoneNumber(response.data.phoneNumber)}`);
            setIsInfoSnack(true);
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

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                <IconButton color='secondary' onClick={() => navigate(-1)}>
                    <ArrowBack style={{color: theme.palette.text.main}}/>
                </IconButton>
                <div>携帯電話番号を変更</div>
            </StyledTitle>
        </StyledHeader>
        <StyledInputZone theme={theme}>
        <StyledTextField helperText={phoneNumber.helper} error={phoneNumber.error} theme={theme} fullWidth label="携帯電話番号 (数字11ケタ)"
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 11}} value={phoneNumber.value} onChange={handleInput}/>
        </StyledInputZone>
        <StyledButtonZone>
            <Button color="secondary" variant="contained" disabled={phoneNumber.error || phoneNumber.value.length === 0 || props.currentUser.phoneNumber === phoneNumber.value} onClick={handleUpdate}>保存</Button>
        </StyledButtonZone>

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

const StyledInputZone = styled.div`
    width: 100%;
    padding: 15px;
    border-bottom: solid 1px ${(props) => props.theme.palette.line.tab};
`

const StyledButtonZone = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    padding: 15px;
`


export default PhoneNumberSetting