import { FavoriteBorder, MoreVert } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  IconButton,
  Paper,
  Popper,
  Slide,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SlideTransition = (props) => {
  return <Slide {...props} direction="right" />;
};

const ProductCard = (props) => {
  const [isLinkSnack, setIsLinkSnack] = useState(false);
  const [isProductPopperOpen, setIsProductPopperOpen] = useState(false);
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const productPopperRef = useRef(null);
  const theme = useTheme();

  const handleProductPopper = (e) => {
    if (!isProductPopperOpen) {
      setIsProductPopperOpen(true);
      setProductAnchorEl(e.currentTarget);
    } else {
      setIsProductPopperOpen(false);
      setProductAnchorEl(null);
    }
  };

  const handleLinkCopy = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setIsLinkSnack(!isLinkSnack);
      });
    }
  };

  const handleLinkSnackClose = () => {
    setIsLinkSnack(false);
  };

  useEffect(() => {
    const handleProductPopperClose = (e) => {
      if (
        productAnchorEl &&
        !productAnchorEl.contains(e.target) &&
        !productPopperRef.current.contains(e.target)
      ) {
        setProductAnchorEl(null);
        setIsProductPopperOpen(false);
      }
    };
    document.addEventListener("click", handleProductPopperClose);

    return () => {
      document.removeEventListener("click", handleProductPopperClose);
    };
  }, [productAnchorEl]);

  useEffect(() => {
    if (isMiddleScreen || isSmallScreen || isXsScreen) {
      setProductAnchorEl(null);
      setIsProductPopperOpen(false);
    }
  }, [isMiddleScreen, isSmallScreen, isXsScreen]);

  return (
    <SProduct
      $isMiddleScreen={isMiddleScreen}
      $isSmallScreen={isSmallScreen}
      $isXsScreen={isXsScreen}
    >
      <SProductImgZone>
        <SAvatar variant="square" src={props.product.imageUrl} alt="商品画像" />
        <SProductOption theme={theme} productAnchorEl={productAnchorEl}>
          <SIconButton onClick={handleProductPopper}>
            <MoreVert />
          </SIconButton>
        </SProductOption>
      </SProductImgZone>
      <SProductDesc>
        <SProductName theme={theme}>{props.product.productName}</SProductName>
        <SSellerId theme={theme}>{`by @${props.product.sallerId}`}</SSellerId>
        <SPriceAndLike>
          <SPrice theme={theme}>{`${props.product.point} ポイント`}</SPrice>
          <SFavoriteBorder theme={theme} />
        </SPriceAndLike>
      </SProductDesc>

      <Popper
        open={isProductPopperOpen}
        anchorEl={productAnchorEl}
        placement="bottom-end"
        theme={theme}
        ref={productPopperRef}
      >
        <SPopperPaper elevation={3} theme={theme}>
          <SPopperItem theme={theme} onClick={handleLinkCopy}>
            リンクをコピー
          </SPopperItem>
          <SPopperItem theme={theme}>共有</SPopperItem>
          <SPopperItem theme={theme}>いいねする</SPopperItem>
        </SPopperPaper>
      </Popper>

      <Snackbar
        open={isLinkSnack}
        onClose={handleLinkSnackClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
      >
        <Alert severity="success">リンクをコピーしました</Alert>
      </Snackbar>
    </SProduct>
  );
};

const SProduct = styled.div`
  width: calc(
    ${(props) =>
        props.$isXsScreen
          ? "50%"
          : props.$isSmallScreen
          ? "33%"
          : props.$isMiddleScreen
          ? "25%"
          : "20%"} - 20px
  );
  height: fit-content;
  cursor: pointer;
  margin-bottom: 20px;
`;

const SAvatar = S(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`;

const SProductImgZone = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background-color: #444;
`;

const SProductOption = styled.div`
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${(props) => props.theme.palette.background.slideHover};
  border-radius: 50%;
  pointer-events: ${(props) =>
    props.productAnchorEl !== null ? "none" : "auto"};

  ${SProductImgZone}:hover & {
    opacity: 1;
  }
`;

const SIconButton = S(IconButton)`
    && {
        color: #fff;
    }
`;

const SProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 10px;
  width: 100%;
`;

const SProductName = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.product};
  overflow: hidden;
  width: 100%;
  height: 50px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SSellerId = styled.div`
  width: fit-content;
  color: ${(props) => props.theme.palette.text.sub};
  font-size: 0.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
  }
`;

const SPriceAndLike = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SPrice = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.palette.secondary.main};
`;

const SFavoriteBorder = S(FavoriteBorder)`
    && {
        width: 30px;
        height: 30px;
        color: ${(props) => props.theme.palette.icon.main};

        &:hover {
        color: ${(props) => props.theme.palette.icon.like};
        }
    }
`;

const SPopperPaper = S(Paper)`
    && {
        width: 150px;
        padding: 5px 0;
        border-radius: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.pop};
    }
`;

const SPopperItem = styled.div`
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

export default ProductCard;
