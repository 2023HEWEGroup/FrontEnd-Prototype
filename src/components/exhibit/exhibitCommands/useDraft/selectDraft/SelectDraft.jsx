import { Close, EditNote } from '@mui/icons-material';
import { Drawer, IconButton, Tooltip, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import DraftList from './draftList/DraftList';


const SelectDraft = (props) => {

    const theme = useTheme();

    const handleSideClose = () => {
        props.setIsOpen(false);
    }

    return (
        <Drawer anchor='left' open={props.isOpen} onClose={handleSideClose} PaperProps={{style: { borderRight: 'none'}}}>
            <StyledInner theme={theme} style={{backgroundColor: theme.palette.primary.main}}>

            <StyledListHeader>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <StyledEditNote theme={theme}/>
                        <StyledHeaderComment theme={theme}>下書き一覧</StyledHeaderComment>
                    </div>
                    <Tooltip title="閉じる(Esc)" placement='right' arrow>
                        <StyledIconButton onClick={handleSideClose}>
                            <StyledArrowBackIosNew theme={theme}/>
                        </StyledIconButton>
                    </Tooltip>
            </StyledListHeader>

            <DraftList setIsOpen={props.setIsOpen}/>

            </StyledInner>
        </Drawer>
    )
}


const StyledInner = styled.div`
    && {
        position: fixed;
        width: 350px;
        height: 100vw;
    }
`

const StyledListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 30px 15px;
    overflow: hidden;
`

const StyledEditNote = styled(EditNote)`
    && {
        color: ${(props) => props.theme.palette.text.sub2};
    }
`

const StyledHeaderComment= styled.div`
    color: ${(props) => props.theme.palette.text.sub2};
`

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: transparent;
        }
    }
`

const StyledArrowBackIosNew = styled(Close)`
    && {
        color: ${(props) => props.theme.palette.text.sub2};
    }
`


export default SelectDraft