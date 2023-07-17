import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'
import { Box } from '@mui/material'


const CommonLayouts = (props) => {
  return (
    <>
        <Box sx={{height: "55px", width: "100vw"}} />
        <TopBar />
        <FloatSideBar page={props.page}/>
        <StyledMain>
          <Box sx={{width: "75px"}}/>
        <SideBar page={props.page}/>
        </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
    display:flex;
`


export default CommonLayouts