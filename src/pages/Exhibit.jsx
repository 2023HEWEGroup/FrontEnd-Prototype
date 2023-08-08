import { AddBox, AddPhotoAlternateOutlined } from '@mui/icons-material';
import { Avatar, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'


const Exhibit = () => {

  const [isDragging, setIsDragging] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const fileInputRef = useRef();
  const theme = useTheme();
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (uploadImages.length >= 4) return;
    const file = event.dataTransfer.files[0];
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedFormats.includes(file.type)) {
      setUploadImages([...uploadImages, URL.createObjectURL(file)]);
      setIsDragging(false);
    } else {
      console.log("許可されていない形式");
    }
  };

  const handleFileSelected = (event) => {
    if (uploadImages.length >= 4) return;
    const file = event.target.files[0];
    if (file) {
      setUploadImages([...uploadImages, URL.createObjectURL(file)]);
    }
  };

  return (
    <>
    <StyledExhibit>
      <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <StyledLmapLogo src={`${siteAssetsPath}/LMAP_logo_reversal.svg`} alt='LMAPロゴ' />
      </div>

      <StyledImgs theme={theme} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} imageLength={uploadImages.length}>
      {uploadImages.length === 0 && (
        <StyledLetsUpload $isDragging={isDragging} theme={theme} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          onClick={handleUploadClick}>
          <StyledAddPhotoAlternateOutlined theme={theme}/>
          <div style={{textAlign: "center"}}>
            {isDragging ? "商品画像をここにドロップ" : "クリックまたはドラッグで商品画像をアップロード"}
          </div>
        </StyledLetsUpload>
      )}
      {uploadImages.length !== 0 && (
        <>
          {uploadImages.map((image, index) => (
            <StyledProductImg key={index} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
              <StyledAvatar variant="square" src={image} />
            </StyledProductImg>
          ))}
          {uploadImages.length < 4 && (
            <StyledAddProductImg theme={theme} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen} $isDragging={isDragging} imageLength={uploadImages.length}
              onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleUploadClick}>
              <StyledAddBox theme={theme} />
              <div style={{textAlign: "center"}}>
                {isDragging ? "商品画像をここにドロップ" : "クリックまたはドラッグで商品画像を追加"}
              </div>
            </StyledAddProductImg>
          )}
        </>
      )}
        <HiddenInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef} onChange={handleFileSelected}/>
      </StyledImgs>
      <div style={{color: theme.palette.text.sub, marginTop: "5px"}}>※ png, jpg, jpeg形式のみ対応</div>
    </StyledExhibit>
    </>
  )
}


const StyledLmapLogo = styled.img`
  height: 50%;
`;

const StyledExhibit = styled.div`
  width: 1000px;
  height: 2000px;
  max-width: 90vw;
  margin: 0 auto;
`

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

const StyledProductImg = styled.div`
    aspect-ratio: 1/1;
    width: calc(${(props) => (props.$isXsScreen ? "50% - 10px" : (props.$isSmallScreen ? "25% - 10px" : "25% - 10px"))});
    border-radius: 5px;
    overflow: hidden;
    margin: 0 0 10px 10px;
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

const StyledAvatar = styled(Avatar)`
  && {
    width: 100%;
    height: 100%;
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
`;


export default Exhibit