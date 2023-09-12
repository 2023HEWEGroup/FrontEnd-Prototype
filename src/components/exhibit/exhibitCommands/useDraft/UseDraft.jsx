import styled from '@emotion/styled'
import { ViewList } from '@mui/icons-material'
import { Avatar, Tooltip } from '@mui/material'
import React from 'react'


const UseDraft = () => {
    return (
        <Tooltip title="下書きを使う" placement='bottom' arrow>
            <StyledAvatar sx={{width:"50px", height: "50px"}} variant='circular'>
                <ViewList sx={{width: "50%", height: "50%"}}/>
            </StyledAvatar>
        </Tooltip>
    )
}


const StyledAvatar = styled(Avatar)`
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`


export default UseDraft