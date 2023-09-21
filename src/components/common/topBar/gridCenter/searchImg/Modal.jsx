import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Trimming } from "./Trimming";
import styled from "styled-components";
import { IconButton, Tooltip } from "@mui/material";
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
      <Tooltip title="画像で検索" placement="bottom" arrow>
        <SIconButton size="small" onClick={handleOpen} theme={theme}>
          <ImageSearchIcon color="icon" />
        </SIconButton>
      </Tooltip>
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

const SIconButton = S(IconButton)`
  && {
    .MuiTouchRipple-child {
      background-color: ${(props) => props.theme.palette.secondary.main};
    }
  }
`;

//react-jsx-dev-runtime.development.js:87 Warning: Failed prop type: Invalid prop `children` supplied to `ForwardRef(Tooltip)`. Expected an element that can hold a ref. Did you accidentally use a plain function component for an element instead? For more information see https://mui.com/r/caveat-with-refs-guide

//react-dom.development.js:67 Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
//    in div (created by ForwardRef(Tooltip))
//    in ForwardRef(Tooltip) (created by WithStyles(ForwardRef(Tooltip)))
//    in WithStyles(ForwardRef(Tooltip)) (created by ForwardRef(IconButton))
//    in ForwardRef(IconButton) (created by WithStyles(ForwardRef(IconButton)))
//    in WithStyles(ForwardRef(IconButton)) (created by BasicModal)
//    in div (created by ForwardRef(Modal))
//    in ForwardRef(Modal) (created by WithStyles(ForwardRef(Modal)))
//    in WithStyles(ForwardRef(Modal)) (created by BasicModal)
//    in BasicModal (created by WithStyles(BasicModal
