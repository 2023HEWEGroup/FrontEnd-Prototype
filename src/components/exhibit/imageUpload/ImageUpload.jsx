import { AddBox, AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import styled from 'styled-components';
import StagingImage from './stadingImage/StagingImage';


const ImageUpload = (props) => {

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const fileInputRef = useRef();
    const theme= useTheme();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
        props.setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        props.setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (props.uploadImages.length >= 4) return;
        const file = event.dataTransfer.files[0];
        const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedFormats.includes(file.type)) {
            const fileUrl = URL.createObjectURL(file)
            props.setUploadImages([...props.uploadImages, fileUrl]);
            props.setOriginalImages([...props.uploadImages, fileUrl]);
            props.setIsDragging(false);
        } else {
            console.log("許可されていない形式");
            props.setIsDragging(false);
        }
    };
    
    const handleFileSelected = (event) => {
        if (props.uploadImages.length >= 4) return;
        const file = event.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            props.setUploadImages([...props.uploadImages, fileUrl]);
            props.setOriginalImages([...props.uploadImages, fileUrl]);
            event.target.value = '';
        }
    };

    return (
        <>
        <StyledImgs theme={theme} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} imageLength={props.uploadImages.length}>
        {props.uploadImages.length === 0 && (
            <StyledLetsUpload $isDragging={props.isDragging} theme={theme} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            onClick={handleUploadClick}>
            <StyledAddPhotoAlternateOutlined theme={theme}/>
            <div style={{textAlign: "center"}}>
                {props.isDragging ? "商品画像をここにドロップ" : "クリックまたはドラッグで商品画像をアップロード"}
            </div>
            </StyledLetsUpload>
        )}
        {props.uploadImages.length !== 0 && (
            <>
            {props.uploadImages.map((image, index) => (
                <StagingImage key={index} image={image} index={index} uploadImages={props.uploadImages} setUploadImages={props.setUploadImages}
                    originalImages={props.originalImages} />
            ))}
            {props.uploadImages.length < 4 && (
                <StyledAddProductImg theme={theme} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} $isDragging={props.isDragging} imageLength={props.uploadImages.length}
                onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleUploadClick}>
                <StyledAddBox theme={theme} />
                <div style={{textAlign: "center"}}>
                    {props.isDragging ? "商品画像をここにドロップ" : "クリックまたはドラッグで商品画像を追加"}
                </div>
                </StyledAddProductImg>
            )}
            </>
        )}
            <HiddenInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef} onChange={handleFileSelected}/>
        </StyledImgs>
        <div style={{color: theme.palette.text.sub, marginTop: "5px"}}>※ png, jpg, jpeg形式のみ対応</div>
        </>
    )
}


const StyledImgs = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    aspect-ratio: ${(props) => (props.$isXsScreen ? ((props.imageLength === 0 || props.imageLength === 1) ? "2/1" : "1/1") : (props.$isSmallScreen ? "4/1" : "4/1"))};
    width: 100%;
    padding: 10px 10px 0 0;
    border: dashed 2px ${(props) => props.theme.palette.line.main};
`

const StyledAddProductImg = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: calc(${(props) => (props.$isXsScreen ? (props.imageLength === 1 ? "100% - 10px" : "50% - 10px") : "100%")});
    width: calc(${(props) => (props.$isXsScreen ? (props.imageLength === 2 ? "100% - 10px" : "50% - 10px")  : `${100 - (props.imageLength * 25)}% - 10px`)});
    padding: 10px;
    margin: 0 0 10px 10px;
    border-radius: 5px;
    overflow: hidden;
    color: ${(props) => props.theme.palette.text.sub};
    background-color: ${(props) => (props.$isDragging ? props.theme.palette.background.uploadImgHover : "transparent")};
    transition: background-color 0.1s;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.uploadImgHover};
    }
`

const StyledAddBox = styled(AddBox)`
    && {
        width: 50px;
        height: 50px;
        color: ${(props) => props.theme.palette.text.sub};
    }
`

const StyledLetsUpload = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: calc(100% - 10px);
    height: 100%;
    margin: 0 0 10px 10px;
    cursor: pointer;
    overflow: hidden;
    word-break: break-all;
    color: ${(props) => props.theme.palette.text.sub};
    background-color: ${(props) => (props.$isDragging ? props.theme.palette.background.uploadImgHover : "transparent")};
    transition: background-color 0.1s;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.uploadImgHover};
    }
`

const StyledAddPhotoAlternateOutlined = styled(AddPhotoAlternateOutlined)`
    && {
        color: ${(props) => props.theme.palette.text.sub};
    }
`

const HiddenInput = styled.input`
    display: none;
`



export default ImageUpload