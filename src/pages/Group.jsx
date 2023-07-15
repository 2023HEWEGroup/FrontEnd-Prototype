import React from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'


const Group = () => {
    return (
        <>
        <TopBar />
        <FloatSideBar page="group"/>
        <StyledMain>
            <SideBar page="group"/>
        </StyledMain>
    </>
    )
}


const StyledMain = styled.div`
    display:flex;
`


export default Group