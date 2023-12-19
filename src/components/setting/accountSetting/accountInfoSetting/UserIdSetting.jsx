import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { setUser } from '../../../../redux/features/userSlice';
import ErrorSnack from '../../../common/errorSnack/ErrorSnack';
import IsProgress from '../../../common/isProgress/IsProgress';
import { StyledTextField } from '../../../../utils/StyledTextField';


const UserIdSetting = (props) => {

    const [userId, setUserId] = useState({value: props.currentUser.userId || "", error: false, helper: ""});
    const [isProgress, setIsProgress] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [isInfoSnack, setIsInfoSnack] = useState(false);
    const [snackInfo, setSnackInfo] = useState("");
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleInput = async (e) => {
        setUserId((prev) => ({...prev, value: e.target.value}));
        if (e.target.value.length === 0) {
            setUserId((prev) => ({...prev, error: false}));
            setUserId((prev) => ({...prev, helper: ""}));
        } else if (!e.target.value.match(/^([a-zA-Z0-9_]{3,30})$/)) {
            setUserId((prev) => ({...prev, error: true}));
            setUserId((prev) => ({...prev, helper: "3~30字の 0-9, a-z, A-Z, _ が使用できます"}));
        } 
        else {
            setUserId((prev) => ({...prev, error: false}));
            setUserId((prev) => ({...prev, helper: ""}));
            try {
                const user = await axios.get(`http://localhost:5000/client/user/getByUserId/${e.target.value}`);
                if (user.data) {
                    setUserId((prev) => ({...prev, error: true}));
                    setUserId((prev) => ({...prev, helper: "このユーザーIDはすでに使用されています"}));
                }
            } catch (err) {
                
            }
        }
    }

    const handleUpdate = async () => {
        try {
            setIsProgress(true);
            await axios.put(`http://localhost:5000/client/setting/userId/${props.currentUser._id}`, {userId: userId.value});
            const response = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(response.data));
            setIsProgress(false);
            setSnackInfo(`新しいユーザーID: ${response.data.userId}`);
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
                <Link to="/setting/account/accountInfo">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                <div>ユーザーIDを変更</div>
            </StyledTitle>
        </StyledHeader>
        <StyledInputZone theme={theme}>
        <StyledTextField helperText={userId.helper} error={userId.error} theme={theme} fullWidth label="ユーザーID (3~20字)"
            autoComplete='new-off' variant='outlined' inputProps={{maxLength: 30}} value={userId.value} onChange={handleInput}/>
        </StyledInputZone>
        <StyledButtonZone>
            <Button color="secondary" variant="contained" disabled={userId.error || userId.value.length === 0 || props.currentUser.userId === userId.value} onClick={handleUpdate}>保存</Button>
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


export default UserIdSetting