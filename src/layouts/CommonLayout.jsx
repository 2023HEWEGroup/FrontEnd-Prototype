import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'


const CommonLayouts = (props) => {
  return (
    <>
        <TopBar />
        <FloatSideBar page={props.page}/>
        <StyledMain>
        <SideBar page={props.page}/>
        </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
    display:flex;
`


export default CommonLayouts