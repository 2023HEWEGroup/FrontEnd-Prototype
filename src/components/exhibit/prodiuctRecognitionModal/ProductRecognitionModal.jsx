import { HighlightOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Chip, Modal, Tooltip, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ProductRecognitionModal = (props) => {
  const theme = useTheme();

  return (
    <Modal open={props.isModalOpen}>
      <SModalInner theme={theme}>
        <Tooltip title="閉じる" placement="top">
          <SHighlightOff onClick={props.handleModalClose} />
        </Tooltip>
        <SModalTitle>出品内容のご確認</SModalTitle>
        <SRecognitionInner>
          <SItem theme={theme}>
            <SName theme={theme}>商品名</SName>
            <SElement theme={theme}>{props.product.name}</SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>説明文</SName>
            <SElement theme={theme}>{props.product.detail}</SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>値段</SName>
            <SElement theme={theme}>
              {props.product.price} (収益{" "}
              <SSpan theme={theme}>{props.product.benefit}</SSpan>)
            </SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>商品の状態</SName>
            <SElement theme={theme}>
              {props.status[props.product.status]}
            </SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>発送元地域</SName>
            <SElement theme={theme}>
              {props.prefectures[props.product.shippingArea]}
            </SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>配送料の負担</SName>
            <SElement theme={theme}>
              {props.deliveryCost[props.product.deliveryCost]}
            </SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>カテゴリー</SName>
            <SElement theme={theme}>
              {props.categories[props.product.category]}
            </SElement>
          </SItem>
          <SItem theme={theme}>
            <SName theme={theme}>タグ</SName>
            <SElement theme={theme}>
              <STagZone>
                {props.product.tags.map((tag, index) => (
                  <STagChip
                    key={index}
                    color="secondary"
                    label={tag}
                    variant="outlined"
                  ></STagChip>
                ))}
              </STagZone>
            </SElement>
          </SItem>
          <LoadingButton
            color="secondary"
            variant="outlined"
            fullWidth
            sx={{ m: "30px 0;", p: 2 }}
          >
            出品する
          </LoadingButton>
        </SRecognitionInner>
      </SModalInner>
    </Modal>
  );
};

const SModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 90vw;
  min-width: 35vw;
  height: 85%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 15px;
  border: solid 1px #444;
  background-color: ${(props) => props.theme.palette.background.modal};
`;

const SModalTitle = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  font-weight: bold;
  width: 70%;
  margin: 60px 0 60px 0;
`;

const SHighlightOff = S(HighlightOff)`
    && {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 35px;
        height: 35px;
        color: #444;
        cursor: pointer;
    }
`;

const SRecognitionInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const SItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 20px;
  width: 100%;
  padding: 15px 0;
  border-bottom: solid 0.5px ${(props) => props.theme.palette.line.disable};
`;

const SName = styled.div`
  width: 20%;
  color: ${(props) => props.theme.palette.text.sub};
  word-break: break-all;
`;

const SElement = styled.div`
  width: 80%;
  color: ${(props) => props.theme.palette.text.sub};
  word-break: break-all;
  white-space: pre-line;
`;

const SSpan = styled.span`
  color: ${(props) => props.theme.palette.secondary.main};
`;

const STagZone = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const STagChip = S(Chip)`
    && {
        font-size: 1rem;
        height: 35px;
        padding: 10px;
    }
`;

export default ProductRecognitionModal;
