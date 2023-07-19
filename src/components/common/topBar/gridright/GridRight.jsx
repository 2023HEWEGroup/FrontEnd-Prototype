import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NotifyPopper from './notifyPopper/NotifyPopper';
import ProfilePopper from './profilePopper/ProfilePopper';


const GridRight = () => {

    return (
    <>
    <Tooltip title="出品する" placement='bottom' arrow={true}>
        <StyledLink to={"/exhibit"}>
            <IconButton size='small'>
                <StyledAddBoxOutlinedIcon color="icon"/>
            </IconButton>
        </StyledLink>
    </Tooltip>

    <NotifyPopper/> 

    <ProfilePopper />
    </>
    )
}


const StyledAddBoxOutlinedIcon = styled(AddBoxOutlinedIcon)`
    && {
        width: 35px;
        height: 35px;
    }
`

const StyledLink = styled(Link)`
    && {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
`


export default GridRight