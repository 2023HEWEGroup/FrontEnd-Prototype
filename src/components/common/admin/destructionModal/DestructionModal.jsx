import { Button, Grow, Modal, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const DestructionModal = (props) => {

    const theme = useTheme();

    return (
            <StyledModal open={props.isDestructOpen} onClose={() => props.setIsDestructOpen(false)}>
                <Grow in={props.isDestructOpen}>
                    <StyledModalInner theme={theme}>
                        <StyledInner>
                            <StyledDetails>
                                <StyledHeader theme={theme}>{props.header}</StyledHeader>
                                <StyledDesc theme={theme}>{props.desc}</StyledDesc>
                            </StyledDetails>
                            <StyledButtons>
                                <StyledDeleteButton fullWidth size='large' variant='contained' onClick={props.handleInputDelete} theme={theme}>{props.act || "破棄"}</StyledDeleteButton>
                                <StyledCancelButton fullWidth size='large' color='primary' variant='contained' onClick={() => props.setIsDestructOpen(false)} theme={theme}>キャンセル</StyledCancelButton>
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
        color: ${(props) => props.theme.palette.text.main2};
        background-color: ${(props) => props.theme.palette.background.destructDelete};
        border-radius: 50px;
        font-weight: bold;

        &:hover {
            background-color: ${(props) => props.theme.palette.background.destructDeleteHover};
        }
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


export default DestructionModal