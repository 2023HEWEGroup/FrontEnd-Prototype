import { Paper, Popper, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StagingImagePopper = (props) => {
  const theme = useTheme();

  const handleImageDelete = (index) => {
    const newImages = [...props.uploadImages];
    newImages.splice(index, 1);
    const newOriginalImages = [...props.originalImages];
    newOriginalImages.splice(index, 1);

    const newCrops = [...props.crops];
    newCrops.splice(props.index, 1);
    newCrops.push({ x: 0, y: 0 });

    const newZooms = [...props.zooms];
    newZooms.splice(props.index, 1);
    newZooms.push(1);

    props.setUploadImages(newImages);
    props.setOriginalImages(newOriginalImages);
    props.setCrops(newCrops);
    props.setZooms(newZooms);
    props.setIsPopperOpen(false);
    props.setAnchorEl(null);
  };

  const handleTrimmingModalOpen = () => {
    props.setTrimmingModal(true);
    props.setIsPopperOpen(false);
    props.setAnchorEl(null);
  };

  return (
    <Popper
      open={props.isPopperOpen}
      anchorEl={props.anchorEl}
      placement="bottom-end"
      ref={props.popperRef}
    >
      <SPopperPaper theme={theme}>
        <SPopperItem theme={theme} onClick={handleTrimmingModalOpen}>
          トリミング
        </SPopperItem>
        <SPopperItem
          theme={theme}
          onClick={() => handleImageDelete(props.index)}
        >
          <SSpan theme={theme}>削除</SSpan>
        </SPopperItem>
      </SPopperPaper>
    </Popper>
  );
};

const SPopperPaper = S(Paper)`
    && {
        width: 150px;
        max-width: 25vw;
        padding: 5px 0;
        border-radius: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.pop};
    }
`;

const SPopperItem = S.div`
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
`;

const SSpan = S.span`
    color: ${(props) => props.theme.palette.text.error};
`;

export default StagingImagePopper;