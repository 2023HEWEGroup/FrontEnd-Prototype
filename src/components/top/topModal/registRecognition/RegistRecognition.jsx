import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import images from "react-payment-inputs/images";

const RegistRecognition = (props) => {
  return (
    <>
      <SRecognition style={{ marginBottom: "30px" }}>
        <SRecognitionItem>
          <SRecognitionName>ユーザーネーム</SRecognitionName>
          <SRecognitionContent>{props.registUserName}</SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>ユーザーID</SRecognitionName>
          <SRecognitionContent>{props.registUserId}</SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>パスワード</SRecognitionName>
          <SRecognitionContent>
            {props.recognitionPasswordVisible
              ? props.registPassword
              : "*".repeat(props.registPassword.length)}
            {props.recognitionPasswordVisible ? (
              <SVisibility onClick={props.handleRecognitionPasswordVisible} />
            ) : (
              <SVisibilityOff
                onClick={props.handleRecognitionPasswordVisible}
              />
            )}
          </SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>メールアドレス</SRecognitionName>
          <SRecognitionContent>{props.registMailAddress}</SRecognitionContent>
        </SRecognitionItem>
      </SRecognition>
      <SRecognition style={{ marginBottom: "30px" }}>
        <SRecognitionItem>
          <SRecognitionName>お名前</SRecognitionName>
          <SRecognitionContent>
            {props.upperName} {props.lowerName}
          </SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>お名前 (フリガナ)</SRecognitionName>
          <SRecognitionContent>
            {props.upperNameKana} {props.lowerNameKana}
          </SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>郵便番号</SRecognitionName>
          <SRecognitionContent>{props.postalCode}</SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>住所</SRecognitionName>
          <SRecognitionContent>
            {props.prefecture} {props.city} {props.town} {props.houseNumber}
          </SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>電話番号</SRecognitionName>
          <SRecognitionContent>{props.phoneNumber}</SRecognitionContent>
        </SRecognitionItem>
      </SRecognition>
      <SRecognition style={{ marginBottom: "60px" }}>
        <SRecognitionItem>
          <SRecognitionName>
            <SRecognitionCardImg {...props.getCardImageProps({ images })} />
          </SRecognitionName>
          <SRecognitionContent>
            {props.meta.cardType
              ? props.meta.cardType.displayName
              : "クレジットカードが選択されていません"}
          </SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>カード番号</SRecognitionName>
          <SRecognitionContent>{props.creditCard.number}</SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>有効期限</SRecognitionName>
          <SRecognitionContent>{props.creditCard.expiry}</SRecognitionContent>
        </SRecognitionItem>
        <SRecognitionItem>
          <SRecognitionName>CVC</SRecognitionName>
          <SRecognitionContent>
            {props.recognitionCVCVisible
              ? props.creditCard.cvc
              : "*".repeat(props.creditCard.cvc.length)}{" "}
            {props.recognitionCVCVisible ? (
              <SVisibility onClick={props.handleRecognitionCVCVisible} />
            ) : (
              <SVisibilityOff onClick={props.handleRecognitionCVCVisible} />
            )}
          </SRecognitionContent>
        </SRecognitionItem>
      </SRecognition>
    </>
  );
};

const SVisibility = Styled(Visibility)`
    && {
        color: #777;
        cursor: pointer;
    }
`;

const SVisibilityOff = Styled(VisibilityOff)`
    && {
        color: #777;
        cursor: pointer;
    }
`;

const SRecognitionCardImg = styled.svg`
  width: 50%;
  max-width: 100px;
  height: fit-content;
`;

const SRecognition = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: solid 0.5px #333;
  border-radius: 5px;
  background-color: #000;
`;

const SRecognitionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 5px;
  color: #777;
`;

const SRecognitionName = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  word-wrap: break-word;
`;

const SRecognitionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  word-break: break-all;
  overflow: hidden;
`;

export default RegistRecognition;
