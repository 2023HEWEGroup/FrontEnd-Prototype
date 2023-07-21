import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CommonLayouts = () => {

  const location = useLocation();
  const isSideOpen = useSelector((state => state.floatSideBar.value));

  return (
    <>
        <TopBar page={location.pathname}/>
        <FloatSideBar page={location.pathname}/>
        <div style={{width: "100vw", height: "55px"}}/>
        <StyledMain>
          <SideBar page={location.pathname}/>
          <div style={isSideOpen ? {width: "240px", height: "100%"} : {width: "75px", height: "100%"}}/>
          <div style={isSideOpen ? {width: "calc(100% - 240px)", height: "100%"} : {width: "calc(100% - 75px)", height: "100%"}}>
            <Outlet />
          </div>
        </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
  display: flex;
`


export default CommonLayouts