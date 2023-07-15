import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'


const Folowing = () => {
    return (
    <>
        <TopBar />
        <FloatSideBar page="following"/>
        <StyledMain>
            <SideBar page="following"/>
        </StyledMain>
    </>
    )
}


const StyledMain = styled.div`
    display:flex;
`


export default Folowing