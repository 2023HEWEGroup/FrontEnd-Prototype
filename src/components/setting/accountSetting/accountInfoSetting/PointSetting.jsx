import { ArrowBack } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../../../redux/features/userSlice';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import IsProgress from '../../../common/isProgress/IsProgress';
import { StyledTextField } from '../../../../utils/StyledTextField';
import DestructionModal from '../../../common/admin/destructionModal/DestructionModal';
import { StyledDisabledButton } from '../../../../utils/StyledDisabledButton';
import { useEnv } from '../../../../provider/EnvProvider';


const PointSetting = (props) => {

    const [code, setCode] = useState({value: "", error: false, helper: ""});
    const [point, setPoint] = useState(NaN);
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isInfoSnack, setIsInfoSnack] = useState(false);
    const [snackInfo, setSnackInfo] = useState("");
    const [isDestructOpen, setIsDestructOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { backendAccessPath } = useEnv();

    const handleInput = async (e) => {
        setCode((prev) => ({...prev, value: e.target.value, error: false, helper: ""}));
    }

    const handleUpdate = async () => {
        try {
            setIsProgress(true);
            const isExist = await axios.post(`${backendAccessPath}/client/setting/codeExist/`, {code: code.value});
            setPoint(isExist.data);
            setTimeout(() => {
                setIsProgress(false);
                setIsDestructOpen(true);
            }, 1000);
        } catch (err) {
            setTimeout(() => {
                setIsProgress(false);
                if (err.response) {
                    if (err.response.status === 400) {
                        setCode((prev) => ({...prev, error: true, helper: err.response.data}));
                    }
                } else if (err.request) {
                    setSnackWarning("サーバーとの通信がタイムアウトしました。");
                    setIsErrorSnack(true);
                } else {
                    console.log(err);
                }
            }, 1000);
        }
    }

    const handleCharge = async () => {
        try {
            setIsProgress(true);
            await axios.put(`${backendAccessPath}/client/setting/charge/${props.currentUser._id}/`, {point: point});
            const response = await axios.get(`${backendAccessPath}/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(response.data));
            setCode((prev) => ({...prev, value: "", error: false, helper: ""}));
            setSnackInfo(`ポイントがチャージされました。現在の残高: ${response.data.points}`);
            setIsInfoSnack(true);
            setIsDestructOpen(false);
            setIsProgress(false);
        } catch (err) {
            setIsDestructOpen(false);
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
                <Link to="/setting/account/paymentInfo">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                <div>コードを利用</div>
            </StyledTitle>
        </StyledHeader>
        <StyledInputZone theme={theme}>
        <StyledTextField helperText={code.helper} error={code.error} theme={theme} fullWidth label="コードを入力"
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 30}} value={code.value} onChange={handleInput}/>
        </StyledInputZone>
        <StyledButtonZone>
            <StyledDisabledButton theme={theme} color="secondary" variant="contained" disabled={code.error || code.value.length === 0} onClick={handleUpdate}>送信</StyledDisabledButton>
        </StyledButtonZone>

        <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>

        <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning} />
        <ErrorSnack open={isInfoSnack} onClose={() => setIsInfoSnack(false)} warning={snackInfo} severity="info"/>

        <DestructionModal isDestructOpen={isDestructOpen} setIsDestructOpen={setIsDestructOpen} secondary handleInputDelete={handleCharge}
            header="ポイントをチャージ" desc={`${point}ポイントをチャージしようとしています。`} act="残高をチャージ"/>
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


export default PointSetting