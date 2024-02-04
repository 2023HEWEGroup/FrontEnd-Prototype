import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { booleanFloatSideBar } from '../../../../redux/features/floatSideBarSlice';
import { useGlitch } from 'react-powerglitch';

const GridLeft = () => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const glitch = useGlitch();
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const isSideOpen = useSelector((state => state.floatSideBar.value));

    const handleMenuIconClick = () =>{
        dispatch(booleanFloatSideBar());
    }

    useEffect(() => {
        glitch.setOptions({
            playMode: "hover"
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
    <>
    <Tooltip title="Esc" placement='right-end'>
        <StyledIconButtonLeft onClick={handleMenuIconClick} theme={theme}>
        {isSideOpen ? <StyledCloseIcon color="icon"/> : <StyledMenuIcon color="icon"/>}
        </StyledIconButtonLeft>
    </Tooltip>
    <Link to={"/home"} style={{ display: 'inline-flex'}} ref={glitch.ref}>
        <StyledLmapLogo src={`${siteAssetsPath}/${theme.palette.siteLogo}`} alt='UNGRAロゴ' />
    </Link>
    </>
    )
}


const StyledIconButtonLeft = styled(IconButton)`
    && {
        margin-left: -10px;

        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
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
    width: 180px;
    margin-left: 15px;
    cursor: pointer;
`;


export default GridLeft