import React from 'react'
import TopBar from '../../components/common/topBar/TopBar'
import SideBar from '../../components/common/sideBar/SideBar'
import FloatSideBar from '../../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'


const Product = () => {
    return (
    <>
        <TopBar />
        <FloatSideBar page="product"/>
        <StyledMain>
            <SideBar page="product"/>
            <Outlet />
        </StyledMain>
    </>
    )
}


const StyledMain = styled.div`
    display:flex;
`


export default Product