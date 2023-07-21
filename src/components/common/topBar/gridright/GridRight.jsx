import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton, Tooltip, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NotifyPopper from './notifyPopper/NotifyPopper';
import ProfilePopper from './profilePopper/ProfilePopper';


const GridRight = (props) => {

    const theme = useTheme();

    return (
    <>
    <Tooltip title="出品する" placement='bottom' arrow={true}>
        <StyledLink to={"/exhibit"}>
            <StyledIconButton size='small' theme={theme}>
                {props.page === "/exhibit" ? <StyledAddBoxOutlinedIcon color='secondary' /> : <StyledAddBoxOutlinedIcon color="icon"/>}
            </StyledIconButton>
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

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`


export default GridRight