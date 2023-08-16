import React from 'react'
import AdminNav from '../components/admin/adminNav/AdminNav'
import AdminFooter from '../components/admin/adminFooter/AdminFooter'
import styled from 'styled-components'
import AdminMenu from '../components/admin/adminMenu/AdminMenu'
import { useMediaQuery, useTheme } from '@mui/material'
import AdminMain from '../components/admin/adminMain/AdminMain'


const Admin = () => {

    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();

    return (
        <>
        <AdminNav />
        <StyledAdminMain>
            <StyledMenuContainer theme={theme} $isXsScreen={isXsScreen}>
                <AdminMenu />
            </StyledMenuContainer>
            <StyledMainContainer $isXsScreen={isXsScreen}>
                <AdminMain />
            </StyledMainContainer>
        </StyledAdminMain>
        <AdminFooter />
        </>
    )
}


const StyledAdminMain = styled.div`
    display: flex;
`

const StyledMenuContainer = styled.div`
    width: ${(props) => props.$isXsScreen ? "100px" : "250px"};
    padding: 5px 20px;
    border-right: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledMainContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 20px;
    width: ${(props) => props.$isXsScreen ? "calc(100vw - 100px)" : "calc(100vw - 250px)"};
`


export default Admin