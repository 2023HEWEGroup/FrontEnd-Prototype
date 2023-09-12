import React, { useEffect } from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'


const CommonLayouts = () => {

  const location = useLocation();
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isScrollable = useSelector((state => state.windowScrollable.value));

  useEffect(() => {
    if ((isSmallScreen && isSideOpen) || (!isScrollable)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSmallScreen, isSideOpen, isScrollable]);

  return (
    <>
        <div style={{width: "100%"}}>
          <TopBar page={location.pathname}/>
        </div>
        <FloatSideBar page={location.pathname}/>
        <div style={{width: "100vw", height: "55px"}}/>
        <StyledMain>
          <SideBar page={location.pathname}/>
          <div style={isSideOpen ? (isSmallScreen ? {display: "none"} : {width: "240px", height: "100%"}) : (isSmallScreen ? {display: "none"} : {width: "75px", height: "100%"})}/>
          <div style={isSideOpen ? (isSmallScreen ? {width: "calc(100% - 75px)", height: "100%", marginLeft: "75px"} : {width: "calc(100% - 240px)", height: "100%"}) : (isSmallScreen ? {width: "calc(100% - 75px)", height: "100%", marginLeft: "75px"} : {width: "calc(100% - 75px)", height: "100%"})}>
            <StyledSmallScreenDarken $isSmallScreen={isSmallScreen} isSideOpen={isSideOpen}/>
            <Outlet />
          </div>
        </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
  display: flex;
`

const StyledSmallScreenDarken = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.$isSmallScreen && props.isSideOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isSmallScreen && props.isSideOpen ? 'auto' : 'none')};
  transition: opacity 0.2s;
`


export default CommonLayouts