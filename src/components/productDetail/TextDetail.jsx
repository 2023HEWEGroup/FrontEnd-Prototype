import { Box, Typography, Button } from "@mui/material";
import React from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";

const TextDetail = () => {
  return (
    <Box sx={{ ml: 5, width: "500px" }}>
      <Typography color="#fff">商品名</Typography>
      <Typography color="#fff">1010¥</Typography>
      <Typography color="#fff">商品説明</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "row", width: 100 }} textAlign={"center"}>
          <StyledFavoriteBorder />
          <Typography color="#fff" fontSize={"8px"}>
            お気に入り
          </Typography>
        </Box>
        <Box
          sx={{ display: "row", flexDirection: "row", width: 100 }}
          textAlign={"center"}
        >
          <StyledFavoriteBorder />
          <Typography color="#fff" fontSize={"8px"}>
            保存
          </Typography>
        </Box>
      </Box>
      <Box textAlign={"center"}>
        <Button variant="contained" color="secondary" sx={{ color: "#fff" }}>
          購入取引へ
        </Button>
      </Box>
    </Box>
  );
};

const StyledFavoriteBorder = styled(FavoriteBorder)`
  && {
    width: 30px;
    height: 30px;
    color: #fff;

    &:hover {
      color: #ff0000;
    }
  }
`;

export default TextDetail;
