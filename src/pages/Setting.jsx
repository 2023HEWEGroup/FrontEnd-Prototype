import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'


const Setting = () => {
  return (
    <>
    <TopBar />
    <FloatSideBar page="setting"/>
    <StyledMain>
        <SideBar page="setting"/>
    </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
    display:flex;
`


export default Setting