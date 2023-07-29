import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Trimming from "./Trimming";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function BasicModal({ theme }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <StyledIconButton size="small" theme={theme}>
          <ImageSearchIcon color="icon" />
        </StyledIconButton>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, height: 500, width: 600 }}>
          <Trimming />
        </Box>
      </Modal>
    </>
  );
}

const StyledIconButton = styled(IconButton)`
  && {
    .MuiTouchRipple-child {
      background-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;