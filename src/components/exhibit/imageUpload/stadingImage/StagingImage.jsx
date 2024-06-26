import { MoreVert } from '@mui/icons-material'
import { Avatar, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import StagingImagePopper from './stagingImagePopper/StagingImagePopper';
import TrimmingExhibit from './trimmingExhibit/TrimmingExhibit';


const StagingImage = (props) => {

    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [trimmingModal, setTrimmingModal] = useState(false);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const popperRef = useRef();
    const theme = useTheme();

    const handlePoper = (e) => {
        if (!isPopperOpen) {
            setIsPopperOpen(true);
            setAnchorEl(e.currentTarget);
            } else {
            setIsPopperOpen(false);
            setAnchorEl(null);
            }
    } 

    useEffect(() => {
        const handlePopperClose = (e) => {
            if (anchorEl && !anchorEl.contains(e.target) && !popperRef.current.contains(e.target)) {
                setAnchorEl(null);
                setIsPopperOpen(false);
            }
        }
        document.addEventListener('click', handlePopperClose);
    
        return () => {
            document.removeEventListener('click', handlePopperClose);
        }
    }, [anchorEl]);

    return (
        <>
        <StyledProductImg $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <StyledAvatar variant="square" src={props.image} />
            <StyledUploadOption theme={theme}>
                <StyledIconButton onClick={handlePoper}>
                    <MoreVert />
                </StyledIconButton>
            </StyledUploadOption>
        </StyledProductImg>

        <StagingImagePopper isPopperOpen={isPopperOpen} anchorEl={anchorEl} popperRef={popperRef} index={props.index} productImages={props.productImages} setProductImages={props.setProductImages}
            uploadImages={props.uploadImages} setUploadImages={props.setUploadImages} originalImages={props.originalImages} setOriginalImages={props.setOriginalImages}
            setIsPopperOpen={setIsPopperOpen} setAnchorEl={setAnchorEl} setTrimmingModal={setTrimmingModal}
            crops={props.crops} setCrops={props.setCrops} zooms={props.zooms} setZooms={props.setZooms}/>
        
        <TrimmingExhibit trimmingModal={trimmingModal} setTrimmingModal={setTrimmingModal} image={props.image} uploadImages={props.uploadImages} setUploadImages={props.setUploadImages}
            originalImages={props.originalImages} index={props.index} crops={props.crops} setCrops={props.setCrops} zooms={props.zooms} setZooms={props.setZooms} productImages={props.productImages} setProductImages={props.setProductImages}/>
        </>
    )
}


const StyledProductImg = styled.div`
    position: relative;
    width: calc(${(props) => (props.$isXsScreen ? "50% - 10px" : (props.$isSmallScreen ? "25% - 10px" : "25% - 10px"))});
    height: calc(100% - 10px);
    border-radius: 5px;
    overflow: hidden;
    margin: 0 0 10px 10px;
`

const StyledUploadOption = styled.div`
    && {
        position: absolute;
        top: 5px;
        right: 5px;
        opacity: 0;
        border-radius: 50%;
        background-color: ${(props) => props.theme.palette.background.slideHover};

        ${StyledProductImg}:hover & {
            opacity: 1;
        }
    }
`

const StyledIconButton = styled(IconButton)`
    && {
        color: #fff;
    }
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`


export default StagingImage