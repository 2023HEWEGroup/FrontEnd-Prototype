import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'


const Home = () => {
  return (
    <>
      <TopBar />
      <FloatSideBar page="home"/>
      <StyledMain>
        <SideBar page="home"/>
      </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
  display:flex;
`


export default Home