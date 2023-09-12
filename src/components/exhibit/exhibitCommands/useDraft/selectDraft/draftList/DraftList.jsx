import { Delete } from '@mui/icons-material'
import { Avatar, List, ListItemButton, Tooltip } from '@mui/material'
import { useTheme } from '@mui/system'
import React from 'react'
import styled from 'styled-components'


const DraftList = (props) => {

    const theme = useTheme();

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // イベント伝播を停止する
      };

    return (
        <StyledList theme={theme}>

            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledNoImage theme={theme}>画像なし</StyledNoImage>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledNoImage theme={theme}>画像なし</StyledNoImage>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>
            <StyledListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
                <StyledInner>
                    <StyledImageArea theme={theme}>
                        <StyledAvatar variant='square'/>
                    </StyledImageArea>
                    <StyledDesc>
                        <StyledProductName theme={theme}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</StyledProductName>
                        <StyledCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</StyledCreatedAt>
                    </StyledDesc>
                </StyledInner>
                <Tooltip title="削除" placement='right' arrow>
                    <StyledDelete theme={theme} onClick={handleDeleteClick}/>
                </Tooltip>
            </StyledListItemButton>

        </StyledList>
    )
}


const StyledList = styled(List)`
    && {
        overflow-y: scroll;
        height: calc(100vh - 50px);

        &::-webkit-scrollbar{
            width: 7px;
        },
        &::-webkit-scrollbar-thumb {
            background-color: transparent;
        }
    
        &:hover {
            &::-webkit-scrollbar-thumb {
                background-color: ${(props) => props.theme.palette.background.scrollBar};
            }
        }
    }
`

const StyledListItemButton = styled(ListItemButton)`
    && {
        width: 100%;
        padding: 25px 15px;
        .MuiTouchRipple-child {
            background-color: traansparent;
        }
        &:hover {
            background-color: ${(props) => props.theme.palette.background.hover2}
        }
    }
`

const StyledInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    width: 100%;
`

const StyledImageArea = styled.div`
    width: 80px;
    height: 80px;
    outline: solid 1px ${(props) => props.theme.palette.text.sub};
`

const StyledNoImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledDesc = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    width: calc(100% - 95px);
    height: 80px;
`

const StyledProductName = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const StyledCreatedAt = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const StyledDelete = styled(Delete)`
    && {
        opacity: 0;
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: ${(props) => props.theme.palette.text.error2};

        ${StyledListItemButton}:hover & {
            opacity: 1;
        }
    }
`


export default DraftList