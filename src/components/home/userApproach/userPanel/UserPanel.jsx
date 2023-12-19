import { Avatar, Chip, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const UserPanel = (props) => {

    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();

    return (
        <>
            <StyledUserPanel $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px"}}>
                    <StyledUserSlideAvatar src={props.userSlide.userIconUrl} alt='出品者アイコン' $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}/>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        <StyledUserSlideName theme={theme}>{props.userSlide.userName}</StyledUserSlideName>
                        <StyledUserSlideId theme={theme}>{`@${props.userSlide.userId}`}</StyledUserSlideId>
                    </div>
                    <StyledFollowTab label="フォロー" variant="contained" color="secondary" clickable onClick={props.handleFollowSnack}/>
                </div>
            </StyledUserPanel>
        </>
    )
}


const StyledUserPanel = styled.div`
    height: 100%;
    padding: 5px 0;
`

const StyledUserSlideAvatar = styled(Avatar)`
    && {
        cursor: pointer;
        width: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : (props.$isMiddleScreen ? "100px" : "125px")))};
        height: ${(props) => (props.$isXsScreen ? "100px" : (props.$isSmallScreen ? "100px" : (props.$isMiddleScreen ? "100px" : "125px")))};
        margin: 0 auto 0 auto;
    }
`

const StyledUserSlideName = styled.div`
    color: ${(props) => props.theme.palette.text.main};
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 auto;
    text-align: center;
`

const StyledUserSlideId = styled.div`
    color: ${(props) => props.theme.palette.text.sub};
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 auto;
    text-align: center;
`

const StyledFollowTab = styled(Chip)`
    && {
        width: 70%;
        height: 45px;
        font-size: 1rem;
        font-weight: bold;
        max-width: 250px;
        margin: 0 auto 0 auto;
    }
`


export default UserPanel