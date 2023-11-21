import styled from '@emotion/styled'
import { Slide } from '@mui/material'
import React from 'react'


const UseLike = (props) => {
    return (
        <Slide in direction={props.direction}>
            <StyledUserLike>
                
            </StyledUserLike>
        </Slide>
    )
}


const StyledUserLike = styled.div`
    width: 100%;
    height: 300px;
    background-color: #faa;
`


export default UseLike