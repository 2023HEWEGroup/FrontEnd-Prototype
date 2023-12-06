import { useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';


const ShowSetting = () => {

    const theme = useTheme();

    return (
        <StyledShowSetting theme={theme}>
            <Outlet />
        </StyledShowSetting>
    )
}


const StyledShowSetting = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 0;
    border-right: solid 1px ${(props) => props.theme.palette.line.tab};
`


export default ShowSetting