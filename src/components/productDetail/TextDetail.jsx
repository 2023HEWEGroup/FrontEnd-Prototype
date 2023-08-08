import { Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";

const TextDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box sx={{ width: "450px", height: "500px", overflow: "auto" }}>
      <Grid>
        <Typography color="#fff" fontSize={"32px"}>
          商品名
        </Typography>
        <Typography color="#fff" fontSize={"24px"}>
          1010¥
        </Typography>
        <Typography
          color="#fff"
          fontSize={"18px"}
          sx={{ mt: 2, borderBottom: "1px solid #fff" }}
        >
          商品説明
        </Typography>

        {isOpen && (
          <Typography color="#fff" fontSize={"20px"} mt={2}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Typography>
        )}
        <Button onClick={toggleOpen} style={{ color: "#fff", m: "auto" }}>
          {isOpen ? "▲ 閉じる" : "▼ クリックで展開"}
        </Button>
        <Typography
          color="#fff"
          fontSize={"18px"}
          sx={{ mt: 2, borderBottom: "1px solid #fff" }}
        >
          商品情報
        </Typography>

        {/* 商品項目一覧 */}
        <Box>
          <Box display={"flex"}>
            <Typography color="#fff" fontSize={"20px"} mt={2}>
              項目1 :
            </Typography>
            {/* 複数項目並ぶ場合は縦並び */}
            <Box display={"row"} mt={2} ml={3}>
              <Typography color="#fff" fontSize={"20px"}>
                テキスト
              </Typography>
              <Typography color="#fff" fontSize={"20px"}>
                テキスト
              </Typography>
            </Box>
          </Box>

          <Box display={"flex"}>
            <Typography color="#fff" fontSize={"20px"} mt={2}>
              項目2 :
            </Typography>
            <Box display={"row"} mt={2} ml={3}>
              <Typography color="#fff" fontSize={"20px"}>
                テキスト
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography
          color="#fff"
          fontSize={"18px"}
          sx={{ mt: 2, borderBottom: "1px solid #fff" }}
        >
          出品者
        </Typography>
        <Grid></Grid>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Grid sx={{ display: "row", width: 100 }} textAlign={"center"}>
          <StyledFavoriteBorder />
          <Typography color="#fff" fontSize={"8px"}>
            お気に入り
          </Typography>
        </Grid>
        <Grid
          sx={{ display: "row", flexDirection: "row", width: 100 }}
          textAlign={"center"}
        >
          <StyledFavoriteBorder />
          <Typography color="#fff" fontSize={"8px"}>
            保存
          </Typography>
        </Grid>
      </Grid>
      <Grid textAlign={"center"}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ color: "#fff" }}
        >
          購入取引へ
        </Button>
      </Grid>
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
