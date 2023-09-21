import styled from "styled-components";
import {
  Alert,
  Avatar,
  CircularProgress,
  Fade,
  Slide,
  Snackbar,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};

const SaveInput = () => {
  const [isSave, setIsSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    setIsSave(true);
    setIsOpen(true);
    setTimeout(() => {
      navigate("/home");
      document.body.style.pointerEvents = "auto";
      document.body.style.overflow = "auto";
    }, 2000);
  };

  const handleSnackClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SDarkWrap isSave={isSave}>
        <Fade in unmountOnExit>
          <CircularProgress color="secondary" />
        </Fade>
      </SDarkWrap>

      <Tooltip title="下書きを保存" placement="bottom" arrow>
        <SAvatar
          sx={{ width: "50px", height: "50px" }}
          variant="circular"
          onClick={handleSave}
        >
          <Save sx={{ width: "50%", height: "50%" }} />
        </SAvatar>
      </Tooltip>

      <Snackbar
        open={isOpen}
        onClose={handleSnackClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={5000}
      >
        <Alert severity="info">下書きを保存しました</Alert>
      </Snackbar>
    </>
  );
};

const SDarkWrap = styled.div`
  display: ${(props) => (props.isSave ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 150;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const SAvatar = Styled(Avatar)`
    cursor: pointer;
    pointer-events: auto;
    &:hover {
        opacity: 0.8;
    }
`;

export default SaveInput;
