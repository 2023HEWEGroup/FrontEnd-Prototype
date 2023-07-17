import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'
import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'


const CommonLayouts = () => {

  const location = useLocation();

  return (
    <>
        <Box sx={{height: "55px", width: "100vw"}} />
        <TopBar />
        <FloatSideBar page={location.pathname}/>
        <StyledMain>
          <Box sx={{width: "75px"}}/>
          <Outlet />
        <SideBar page={location.pathname}/>
        </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
    display:flex;
`


export default CommonLayouts