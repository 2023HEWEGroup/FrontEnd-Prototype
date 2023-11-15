import { Paper, Popper, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components';


const StagingImagePopper = (props) => {

    const theme = useTheme();

    const handleImageDelete = (index) => {
        const newImages = [...props.uploadImages];
        newImages.splice(index, 1);

        const newOriginalImages = [...props.originalImages];
        newOriginalImages.splice(index, 1);

        const newProductImages = [...props.productImages];
        newProductImages.splice(index, 1);

        const newCrops = [...props.crops];
        newCrops.splice(props.index, 1);
        newCrops.push({x: 0, y: 0});

        const newZooms = [...props.zooms];
        newZooms.splice(props.index, 1);
        newZooms.push(1);

        props.setUploadImages(newImages);
        props.setOriginalImages(newOriginalImages);
        props.setProductImages(newProductImages);
        props.setCrops(newCrops);
        props.setZooms(newZooms)
        props.setIsPopperOpen(false);
        props.setAnchorEl(null);
    };

    const handleTrimmingModalOpen = () => {
        props.setTrimmingModal(true);
        props.setIsPopperOpen(false);
        props.setAnchorEl(null);
    }

    return (
        <Popper open={props.isPopperOpen} anchorEl={props.anchorEl} placement="bottom-end" ref={props.popperRef}>
            <StyledPopperPaper theme={theme}>
                <StyledPopperItem theme={theme} onClick={handleTrimmingModalOpen}>トリミング</StyledPopperItem>
                <StyledPopperItem theme={theme} onClick={() => handleImageDelete(props.index)}><StyledSpan theme={theme}>削除</StyledSpan></StyledPopperItem>
            </StyledPopperPaper>
        </Popper>
    )
}


const StyledPopperPaper = styled(Paper)`
    && {
        width: 150px;
        max-width: 25vw;
        padding: 5px 0;
        border-radius: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.pop};
    }
`

const StyledPopperItem = styled.div`
    width: 95%;
    margin: 0 auto;
    padding: 7px 0 7px 3px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
    &:active {
        background-color: transparent;
    }
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.text.error};
`


export default StagingImagePopper