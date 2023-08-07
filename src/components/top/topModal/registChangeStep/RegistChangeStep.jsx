import { Login } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const RegistChangeStep = (props) => {
    return (
        <>
        <StyledStep>
            {props.currentStep === 0 && (
                <StyledNextStep variant='contained' color='top' onClick={props.handleNextStep}>次へ</StyledNextStep>
            )}
            {props.currentStep === 1 && (
                <>
                <StyledBackStep variant='outlined' color='top' onClick={props.handleBackStep}>戻る</StyledBackStep>
                <StyledNextStep variant='contained' color='top' onClick={props.handleNextStep}>次へ</StyledNextStep>
                </>
            )}
            {props.currentStep === 2 && (
                <>
                <StyledBackStep variant='outlined' color='top' onClick={props.handleBackStep}>戻る</StyledBackStep>
                <StyledNextStep variant='contained' color='top' onClick={props.handleNextStep}>次へ</StyledNextStep>
                </>
            )}
            {props.currentStep === 3 && (
                <>
                <StyledBackStep variant='outlined' color='top' onClick={props.handleBackStep}>戻る</StyledBackStep>
                <StyledNextStep variant='contained' color='top'>アカウント作成</StyledNextStep>
                </>
            )}
        </StyledStep>
        <Button color='top' onClick={props.handleIsLogin}><Login style={{marginRight: "5px"}}/>かわりにログインする</Button>
        </>
    )
}


const StyledStep = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
    margin-bottom: 10px;
`

const StyledBackStep = styled(Button)`
    && {
        width: 50%;
        height: 45px;
        border-radius: 10px;
    }
`

const StyledNextStep = styled(Button)`
    && {
        width: 50%;
        height: 45px;
        border-radius: 10px;
        font-weight: bold;
    }
`


export default RegistChangeStep