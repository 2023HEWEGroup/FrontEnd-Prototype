import { Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const RegistChangeStep = (props) => {
  return (
    <>
      <SStep>
        {props.currentStep === 0 && (
          <SNextStep
            variant="contained"
            color="top"
            onClick={props.handleNextStep}
          >
            次へ
          </SNextStep>
        )}
        {props.currentStep === 1 && (
          <>
            <SBackStep
              variant="outlined"
              color="top"
              onClick={props.handleBackStep}
            >
              戻る
            </SBackStep>
            <SNextStep
              variant="contained"
              color="top"
              onClick={props.handleNextStep}
            >
              次へ
            </SNextStep>
          </>
        )}
        {props.currentStep === 2 && (
          <>
            <SBackStep
              variant="outlined"
              color="top"
              onClick={props.handleBackStep}
            >
              戻る
            </SBackStep>
            <SNextStep
              variant="contained"
              color="top"
              onClick={props.handleNextStep}
            >
              次へ
            </SNextStep>
          </>
        )}
        {props.currentStep === 3 && (
          <>
            <SBackStep
              variant="outlined"
              color="top"
              onClick={props.handleBackStep}
            >
              戻る
            </SBackStep>
            <SNextStep variant="contained" color="top">
              アカウント作成
            </SNextStep>
          </>
        )}
      </SStep>
      <Button color="top" onClick={props.handleIsLogin}>
        <Login style={{ marginRight: "5px" }} />
        かわりにログインする
      </Button>
    </>
  );
};

const SStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-bottom: 10px;
`;

const SBackStep = S(Button)`
    && {
        width: 50%;
        height: 45px;
        border-radius: 10px;
    }
`;

const SNextStep = S(Button)`
    && {
        width: 50%;
        height: 45px;
        border-radius: 10px;
        font-weight: bold;
    }
`;

export default RegistChangeStep;
