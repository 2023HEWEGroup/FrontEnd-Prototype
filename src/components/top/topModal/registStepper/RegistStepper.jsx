import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const RegistStepper = (props) => {

    const steps = [
        "ユーザー情報の入力",
        "個人情報の入力",
        "お支払い方法の追加 (任意)",
        "入力内容のご確認"
    ];

    return (
        <div style={{width: "130%", marginBottom: "60px"}}>
            <StyledStepper activeStep={props.currentStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label} sx={{
                '& .MuiStepLabel-root .Mui-completed': {color: 'secondary.progressed'},
                '& .MuiStepLabel-root .Mui-active': {color: 'secondary.main'},
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {color: '#777'},
                '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {color: '#777'},
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {color: '#fff'},
                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {fill: '#000'}
                }}>
                <StepLabel>{label}</StepLabel>
                </Step>
            ))}
            </StyledStepper>
        </div>
    )
}


const StyledStepper = styled(Stepper)`
    && {
        width: 100%
    }
`


export default RegistStepper