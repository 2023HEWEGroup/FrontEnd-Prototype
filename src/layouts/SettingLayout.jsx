import { Grid } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import SelectSetting from '../components/setting/SelectSetting'
import ShowSetting from '../components/setting/ShowSetting'


const SettingLayout = () => {

    return (
        <>
        <StyledSettingLayout>
            <Grid container style={{height: "100%", width: "100%"}}>
            <Grid style={{height: "100%"}} item xl={4.5} lg={4.5} md={4.5} sm={12} xs={12}>
                <SelectSetting />
            </Grid>
            <Grid style={{height: "100%",  width: "100%"}} item xl={7.5} lg={7.5} md={7.5} sm={0} xs={0}>
                <ShowSetting />
            </Grid>
            </Grid>
        </StyledSettingLayout>
        </>
    )
}


const StyledSettingLayout = styled.div`
    width: 1300px;
    height: 2000px;
    max-width: 100%;
    margin: 0 auto;
`


export default SettingLayout