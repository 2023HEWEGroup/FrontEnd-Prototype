import { Button, Grow, Modal, useTheme } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const LoginRequiredModal = (props) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleShiftLogin = () => {
        navigate(`/?recommend=true&back=${location.pathname}`);
    }

    return (
            <StyledModal open={props.open} onClose={() => props.onClose(false)}>
                <Grow in={props.open}>
                    <StyledModalInner theme={theme}>
                        <StyledInner>
                            <StyledDetails>
                                <StyledHeader theme={theme}>{props.header}</StyledHeader>
                                <StyledDesc theme={theme}>{props.desc}</StyledDesc>
                            </StyledDetails>
                            <StyledButtons>
                                <StyledDeleteButton fullWidth size='large' variant='contained' onClick={handleShiftLogin} theme={theme}>{props.act || "ログイン"}</StyledDeleteButton>
                                <StyledCancelButton fullWidth size='large' color='primary' variant='contained' onClick={() => props.onClose(false)} theme={theme}>キャンセル</StyledCancelButton>
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
    width: 325px;
    min-height: 270px;
    padding: 20px 0;
    border-radius: 20px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 80%;
`

const StyledDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

const StyledHeader = styled.div`
    width: 100%;
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1.2rem;
    font-weight: bold;
    word-break: break-all;
`

const StyledDesc = styled.div`
    width: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
    word-break: break-all;
    white-space: pre-wrap;
`

const StyledButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    align-items: center;
    width: 100%;
`

const StyledDeleteButton = styled(Button)`
    && {
        background-color: ${(props) => props.theme.palette.secondary.main};
        border-radius: 50px;
        font-weight: bold;

        &:hover {
            background-color: ${(props) => props.theme.palette.secondary.mainHover};
        }
    }
`

const StyledCancelButton = styled(Button)`
    && {
        border: solid 1px ${(props) => props.theme.palette.line.main};
        border-radius: 50px;
        font-weight: bold;
        // background-color: #000;

        &:hover {
            background-color: ${(props) => props.theme.palette.background.destructCancelHover};
        }
    }
`


export default LoginRequiredModal