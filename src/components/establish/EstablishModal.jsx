import { Box, Button, Modal, useTheme } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components';
import EstablishPreview from './EstablishPreview';


const EstablishModal = (props) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();
    
    return (
        <>
        <Modal open={props.open} onClose={() => props.setOpen(false)} slotProps={{backdrop: {sx: {backgroundColor: theme.palette.background.modalShadow}}}}>
            <StyledModalInner theme={theme}>
                <Box width="100%" display="flex" flexDirection="column">
                    <EstablishPreview group={props.group} isExpanded={isExpanded} setIsExpanded={setIsExpanded} previewHeader={props.previewHeader} previewIcon={props.previewIcon}/>
                    <Button color='secondary' variant='outlined' sx={{p: 1, m: "50px auto", width: "90%"}} onClick={props.establish}>グループを作成する</Button>
                </Box>
            </StyledModalInner>
        </Modal>
        </>
    )
}


const StyledModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90vw;
    min-width: 35vw;
    height: 85%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 15px;
    border: solid 1px #444;
    background-color: ${(props) => props.theme.palette.background.modal};
`


export default EstablishModal