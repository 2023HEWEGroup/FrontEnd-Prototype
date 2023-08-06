import React from "react";
import ImgCard from "../components/productDetail/ImgCard";
import TextDetail from "../components/productDetail/TextDetail";
import { Box } from "@mui/material";
const ProductDetail = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ImgCard />
        <TextDetail />
      </Box>
    </>
  );
};

export default ProductDetail;
