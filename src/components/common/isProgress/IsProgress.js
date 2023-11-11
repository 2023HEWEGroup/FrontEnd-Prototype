import { CircularProgress, Fade, Modal } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const IsProgress = (props) => {
  return (
    <Modal open={props.isProgress}>
        <StyledDarkWrap>
            <Fade in unmountOnExit>
                <CircularProgress color="secondary"/>
            </Fade>
        </StyledDarkWrap>
    </Modal>
  )
}


const StyledDarkWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 150;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
`


export default IsProgress