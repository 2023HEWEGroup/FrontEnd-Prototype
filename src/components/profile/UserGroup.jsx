import styled from '@emotion/styled'
import { Slide } from '@mui/material'
import React from 'react'


const UseGroup = (props) => {
    return (
        <>
        <Slide in direction={props.direction}>
            <StyledUserGroup>
                
            </StyledUserGroup>
        </Slide>
        </>
    )
}


const StyledUserGroup = styled.div`
    width: 100%;
    height: 300px;
    background-color: #aaf;
`


export default UseGroup