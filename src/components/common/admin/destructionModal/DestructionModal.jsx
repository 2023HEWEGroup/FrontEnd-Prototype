import { Button, Grow, Modal, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";

const DestructionModal = (props) => {
  const theme = useTheme();

  return (
    <SModal
      open={props.isDestructOpen}
      onClose={() => props.setIsDestructOpen(false)}
    >
      <Grow in={props.isDestructOpen}>
        <SModalInner theme={theme}>
          <SInner>
            <SDetails>
              <SHeader theme={theme}>{props.header}</SHeader>
              <SDesc theme={theme}>{props.desc}</SDesc>
            </SDetails>
            <SButtons>
              <SDeleteButton
                fullWidth
                size="large"
                variant="contained"
                onClick={props.handleInputDelete}
                theme={theme}
              >
                破棄
              </SDeleteButton>
              <SCancelButton
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                onClick={() => props.setIsDestructOpen(false)}
                theme={theme}
              >
                キャンセル
              </SCancelButton>
            </SButtons>
          </SInner>
        </SModalInner>
      </Grow>
    </SModal>
  );
};

const SModal = S(Modal)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const SModalInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.modal};
  width: 325px;
  height: 270px;
  border-radius: 20px;
  border: solid 1px ${(props) => props.theme.palette.line.disable};
`;

const SInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 80%;
`;

const SDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SHeader = styled.div`
  width: 100%;
  color: ${(props) => props.theme.palette.text.main};
  font-size: 1.2rem;
  font-weight: bold;
  word-break: break-all;
`;

const SDesc = styled.div`
  width: 100%;
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
  word-break: break-all;
`;

const SButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  align-items: center;
  width: 100%;
`;

const SDeleteButton = S(Button)`
    && {
        background-color: ${(props) =>
          props.theme.palette.background.destructDelete};
        border-radius: 50px;
        font-weight: bold;

        &:hover {
            background-color: ${(props) =>
              props.theme.palette.background.destructDeleteHover};
        }
    }
`;

const SCancelButton = S(Button)`
    && {
        border: solid 1px ${(props) => props.theme.palette.line.main};
        border-radius: 50px;
        font-weight: bold;
        // background-color: #000;

        &:hover {
            background-color: ${(props) =>
              props.theme.palette.background.destructCancelHover};
        }
    }
`;

export default DestructionModal;
