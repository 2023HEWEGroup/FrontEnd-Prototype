import styled from '@emotion/styled'
import { ViewList } from '@mui/icons-material'
import { Avatar, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import SelectDraft from './selectDraft/SelectDraft'


const UseDraft = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleSideOpen = () => {
        setIsOpen(true);
    }

    return (
        <>
        <SelectDraft isOpen={isOpen} setIsOpen={setIsOpen}/>

            <Tooltip title="下書きを使う" placement='bottom' arrow>
                <StyledAvatar sx={{width:"50px", height: "50px"}} variant='circular' onClick={handleSideOpen}>
                    <ViewList sx={{width: "50%", height: "50%"}}/>
                </StyledAvatar>
            </Tooltip>
        </>
    )
}


const StyledAvatar = styled(Avatar)`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`


export default UseDraft