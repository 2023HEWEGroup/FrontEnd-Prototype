import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, List, ListItem, ListItemText, Paper, Popper, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const GridCenter = () => {

    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputhWord, setInputWord] = useState("");
    const [activeSearchMode, setActiveSearchMode] = useState(1);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const searchInput = useRef();
    const theme = useTheme();

    const handleInputChange = (e) => {
        setInputWord(searchInput.current.value);
        if (searchInput.current.value.length > 0) {
            setAnchorEl(e.currentTarget);
            setIsPopperOpen(true);
        } else {
            setIsPopperOpen(false);
        }
    }

    const handlePopperOpen = (e) => {
        if (searchInput.current.value.length > 0) {
        setAnchorEl(e.currentTarget);
        setIsPopperOpen(true);
        }
    };
    
    const handlePopperClose = () => {
        setAnchorEl(null);
        setIsPopperOpen(false);
    };
    
    const handleKeyDown = (e) => {
        if (searchInput.current.value.length > 0) {
            if (e.key === "ArrowDown") {
                setActiveSearchMode((prev) => (prev < 4 ? prev + 1 : 1))
            } else if (e.key === "ArrowUp") {
                setActiveSearchMode((prev) => (prev > 1 ? prev - 1 : 4))
            }
        }
    }

    useEffect(() => {
        if (isSmallScreen) {
            handlePopperClose();
        }
    }, [isSmallScreen]);

    return (
    <>
    <div style={{ display: "flex", alignItems: "center" , width: "80%" }}>
        <StyledPaper elevation={0} style={{backgroundColor: theme.palette.background.search}} component="form" theme={theme}>
            <StyledInputBase placeholder='キーワードで検索' onChange={handleInputChange} onKeyDown={handleKeyDown}
            onFocus={handlePopperOpen} onBlur={handlePopperClose} inputRef={searchInput} theme={theme}/>
            <Tooltip title="検索" placement='bottom' arrow={true}>
                <StyledIconButton type='submit' size='small' theme={theme}>
                    <SearchIcon color="icon"/>
                </StyledIconButton>
            </Tooltip>
            <Divider orientation='vertical' style={{height: "30px", width: "5px", borderRightWidth: "2px", borderColor: "#aaa", margin: "0 10px"}}/>
            <Tooltip title="画像で検索" placement='bottom' arrow={true}>
                <StyledIconButton size='small' theme={theme}>
                    <StyledImageSearchIcon color="icon"/>
                </StyledIconButton>
            </Tooltip>
        </StyledPaper>
    </div>
    <StyledPopper open={isPopperOpen} anchorEl={anchorEl} placement='bottom-start' modifiers={[{
        name: 'offset',
        options: {
        offset: [0, 12],
        },
    }]}>
        <StyledPopperPaper elevation={3} theme={theme}>
            <List>
                <StyledListItem theme={theme} key={1} style={activeSearchMode === 1 ? { backgroundColor: theme.palette.background.hover } : null}>
                    <ListItemText primary={'"' + inputhWord + '" を商品で検索'} />
                </StyledListItem>
                <StyledDivider style={{width: "95%", margin: "0 auto"}}/>
                <StyledListItem theme={theme} key={2} style={activeSearchMode === 2 ? { backgroundColor: theme.palette.background.hover } : null}>
                    <ListItemText primary={'"' + inputhWord + '" をユーザーで検索'} />
                </StyledListItem>
                <StyledDivider style={{width: "95%", margin: "0 auto"}}/>
                <StyledListItem theme={theme} key={3} style={activeSearchMode === 3 ? { backgroundColor: theme.palette.background.hover } : null}>
                    <ListItemText primary={'"' + inputhWord + '" をグループで検索'} />
                </StyledListItem>
                <StyledDivider />
                <StyledListItem theme={theme} key={4} style={activeSearchMode === 4 ? { backgroundColor: theme.palette.background.hover } : null}>
                    <ListItemText primary={'"' + inputhWord + '" をタグで検索'} />
                </StyledListItem>
            </List>
        </StyledPopperPaper>
    </StyledPopper>
    </>
    )
}


const StyledPaper = styled(Paper)`
    && {
        display: flex;
        align-items: center;
        height: 40px;
        width: 100%;
        padding-right: 10px;
        border: solid 1px ${(props) => props.theme.palette.line.disable};

        &:focus-within {
            outline: solid 2px ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledInputBase = styled(InputBase)`
    && {
        height: 100%;
        width: 100%;
        padding-left: 2%;
        color: ${(props) => props.theme.palette.text.main};
        & input::placeholder {
            color: ${(props) => props.theme.palette.text.main};
        }
    }
`

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`

const StyledImageSearchIcon = styled(ImageSearchIcon)`
    && {
        width: 30px;
        height: 30px;
        margin-bottom: 3px;
    }
`

const StyledPopper = styled(Popper)`
    && {
        width: 37%;
        z-index: 100;
    }
`

const StyledPopperPaper = styled(Paper)`
    && {
        height: 200px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.pop};
    }
`

const StyledListItem = styled(ListItem)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
    &:nth-child(1) {
        margin-top: -8px;
    }
    }
`

const StyledDivider = styled(Divider)`
    && {
        margin: 0 auto;
        width: 95%;
    }
`


export default GridCenter