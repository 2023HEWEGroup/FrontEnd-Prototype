import { Verified } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const VerifiedBadge = () => {
    return (
        <Tooltip title='認証済み' placement='top' arrow>
            <StyledVerified />
        </Tooltip>
    )
}

const StyledVerified = styled(Verified)`
    && {
        color: #00f;
        cursor: pointer;
    }
`


export default VerifiedBadge