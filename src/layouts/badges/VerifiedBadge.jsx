import { Verified } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const VerifiedBadge = (props) => {
    return (
        <Tooltip title='認証済み' placement='top' arrow>
            <StyledVerified color="secondary" fontSize={props.fontSize}/>
        </Tooltip>
    )
}

const StyledVerified = styled(Verified)`
    && {
        cursor: pointer;
    }
`


export default VerifiedBadge