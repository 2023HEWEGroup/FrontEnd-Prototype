import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';


const ShowSetting = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <StyledShowSetting theme={theme} $isSmallScreen={isSmallScreen}>
            <Outlet />
        </StyledShowSetting>
    )
}


const StyledShowSetting = styled.div`
    width: 100%;
    min-height: calc(100vh - 55px);
    padding: 20px 0;
    border-right: solid 1px ${(props) => props.theme.palette.line.tab};
    border-left: ${(props) => props.$isSmallScreen && `solid 1px ${props.theme.palette.line.tab}`}
`


export default ShowSetting