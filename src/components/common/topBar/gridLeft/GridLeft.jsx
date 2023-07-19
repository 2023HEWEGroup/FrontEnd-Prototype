import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { booleanFloatSideBar } from '../../../../redux/features/floatSideBarSlice';

const GridLeft = () => {

    const dispatch = useDispatch();
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const isSideOpen = useSelector((state => state.floatSideBar.value));

    const handleMenuIconClick = () =>{
        dispatch(booleanFloatSideBar());
    }

    return (
    <>
    <Tooltip title="Esc" placement='right-end'>
        <StyledIconButtonLeft onClick={handleMenuIconClick}>
        {isSideOpen ? <StyledCloseIcon color="icon"/> : <StyledMenuIcon color="icon"/>}
        </StyledIconButtonLeft>
    </Tooltip>
    <Link to={"/home"} style={{ display: 'inline-flex'}}>
        <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo.svg`} alt='LMAPロゴ' />
    </Link>
    </>
    )
}


const StyledIconButtonLeft = styled(IconButton)`
    && {
        margin-left: -10px;
    }
`

const StyledMenuIcon = styled(MenuIcon)`
    && {
    width: 30px;
    height: 30px;
    }
`

const StyledCloseIcon = styled(CloseIcon)`
    && {
    width: 30px;
    height: 30px;
    }
`

const StyledLmapLogo = styled.img`
    width: 150px;
    margin-left: 15px;
    cursor: pointer;
`;


export default GridLeft