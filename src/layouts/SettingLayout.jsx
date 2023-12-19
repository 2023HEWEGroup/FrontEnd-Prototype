import { Grid, Hidden, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import SelectSetting from '../components/setting/SelectSetting'
import ShowSetting from '../components/setting/ShowSetting'
import { useLocation, useNavigate } from 'react-router-dom'


const SettingLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    useEffect(() => {
        if (!isSmallScreen && location.pathname === "/setting") {
            navigate("/setting/account");
        }
    }, [isSmallScreen]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledSettingLayout>
            <StyledGrid container style={{height: "100%", width: "100%", display: "flex", justifyContent: "center"}}>
            <Grid style={{height: "100%"}} item xl={4.5} lg={4.5} md={4.5} sm={12} xs={12}>
                {isSmallScreen ?
                    location.pathname === "/setting" ?
                    <SelectSetting />
                    :
                    <ShowSetting />
                :
                <SelectSetting />
                }
            </Grid>
            <Hidden only={["xs", "sm"]}>
                <Grid style={{height: "100%"}} item xl={7.5} lg={7.5} md={7.5} sm={0} xs={0}>
                    <ShowSetting />
                </Grid>
            </Hidden>
            </StyledGrid>
        </StyledSettingLayout>
        </>
    )
}


const StyledSettingLayout = styled.div`
    position: relative;
    width: 1300px;
    min-height: calc(100vh - 55px);
    max-width: 100%;
    margin: 0 auto;
    overflow-y: hidden;
`

const StyledGrid = styled(Grid)`
    && {
        height: 100%;
    }
`


export default SettingLayout