import styled from '@emotion/styled'
import { Slide } from '@mui/material'
import React from 'react'


const UseProduct = (props) => {
    return (
        <>
        <Slide in direction={props.direction}>
            <StyledUserProduct>
            
            </StyledUserProduct>
        </Slide>
        </>
    )
}


const StyledUserProduct = styled.div`
    width: 100%;
    height: 300px;
    background-color: #afa;
`


export default UseProduct