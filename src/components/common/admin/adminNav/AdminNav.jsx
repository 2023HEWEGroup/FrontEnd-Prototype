import { Apps } from '@mui/icons-material';
import { Avatar, useTheme } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const AdminNav = () => {

    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();

    return (
        <StyledNavBar>
            <StyledLogo>
                <StyledLink to="/home">
                    <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo_reversal.svg`} alt='LMAPロゴ' />
                </StyledLink>
            </StyledLogo>
            <StyledIcons>
                <StyledUser>
                    <div style={{width: "26px", height: "26px"}}>
                        <Avatar style={{width: "100%", height: "100%"}}/>
                    </div>
                    <StyledSpan style={{color: theme.palette.text.sub}}>Example</StyledSpan>
                </StyledUser>
                <Apps color='icon'/>
            </StyledIcons>
        </StyledNavBar>
    )
}


const StyledNavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
`

const StyledLink = styled(Link)`
    && {
        height: fit-content;
        text-decoration: none;
    }
`

const StyledLogo = styled.div`
    display: flex;
    align-items: center;
`

const StyledLmapLogo = styled.img`
    height: 40px;
    cursor: pointer;
`

const StyledIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const StyledUser = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const StyledSpan = styled.span`
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`


export default AdminNav