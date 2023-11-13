import { Button, Grow, Modal, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const LoginRequiredModal = (props) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const handleShiftLogin = () => {
        navigate(`/?recommend=true`);
    }

    return (
            <StyledModal open={props.open} onClose={props.onClose}>
                <Grow in={props.open}>
                    <StyledModalInner theme={theme}>
                        <StyledInner>
                            <StyledDetails>
                                <StyledHeader theme={theme}>{props.header}</StyledHeader>
                                <StyledDesc theme={theme}>{props.desc}</StyledDesc>
                            </StyledDetails>
                            <div style={{height: "0px"}}></div>
                            <StyledButtons>
                                <StyledDeleteButton color="secondary" fullWidth size='large' variant='contained' onClick={handleShiftLogin} theme={theme}>今すぐログインする</StyledDeleteButton>
                                <StyledCancelButton fullWidth size='large' color='primary' variant='contained' onClick={props.onClose} theme={theme}>キャンセル</StyledCancelButton>
                            </StyledButtons>
                        </StyledInner>
                    </StyledModalInner>
                </Grow>
            </StyledModal>
    )
}


const StyledModal = styled(Modal)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const StyledModalInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.palette.background.modal};
    width: 600px;
    height: 350px;
    border-radius: 20px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 80%;
`

const StyledDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 90%;
`

const StyledHeader = styled.div`
    width: 100%;
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1.4rem;
    font-weight: bold;
    word-break: break-all;
`

const StyledDesc = styled.div`
    width: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 1rem;
    word-break: break-all;
`

const StyledButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    align-items: center;
    width: 90%;
`

const StyledDeleteButton = styled(Button)`
    && {
        border-radius: 50px;
        font-weight: bold;
    }
`

const StyledCancelButton = styled(Button)`
    && {
        border: solid 1px ${(props) => props.theme.palette.line.main};
        border-radius: 50px;
        font-weight: bold;

        &:hover {
            background-color: ${(props) => props.theme.palette.background.destructCancelHover};
        }
    }
`


export default LoginRequiredModal