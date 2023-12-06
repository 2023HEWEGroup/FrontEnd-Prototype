import styled from '@emotion/styled'
import React from 'react'
import BackToHome from './backPage/BackToHome'


const ExhibitCommands = (props) => {
    return (
        <StyledExhibitCommands>
            <BackToHome handleDestructOpen={props.handleDestructOpen}/>
        </StyledExhibitCommands>
    )
}


const StyledExhibitCommands = styled.div`
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    pointer-events: none;
    gap: 15px;
    width: 100vw;
    padding: 15px;
`


export default ExhibitCommands