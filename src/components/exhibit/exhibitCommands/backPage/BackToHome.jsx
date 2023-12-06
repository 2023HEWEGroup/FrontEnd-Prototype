import styled from '@emotion/styled'
import { Home } from '@mui/icons-material'
import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const BackToHome = (props) => {

    const handleClick = (e) => {
        const isMove = props.handleDestructOpen();
        if (!isMove) {
            e.preventDefault();
        }
    }

    return (
        <Link to="/home" onClick={handleClick}>
            <Tooltip title="ホームに戻る" placement='right' arrow>
                <StyledAvatar sx={{width:"50px", height: "50px"}} variant='circular'>
                    <Home sx={{width: "50%", height: "50%"}}/>
                </StyledAvatar>
            </Tooltip>
        </Link>
    )
}


const StyledAvatar = styled(Avatar)`
    cursor: pointer;
    pointer-events: auto;
    &:hover {
        opacity: 0.8;
    }
`


export default BackToHome