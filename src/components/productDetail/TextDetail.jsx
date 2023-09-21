import { Box, Typography, Button, Grid, Avatar, Rating } from "@mui/material";
import React from "react";
import { useState } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

const TextDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box
      sx={{ width: "450px", height: "500px", overflow: "auto", pb: 3, pr: 2 }}
    >
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
        <Grid sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ m: 2 }}>
            <img
              style={{ width: "100%" }}
              src="https://source.unsplash.com/random"
              alt=""
            />
          </Avatar>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography sx={{ color: "#fff", mb: 1 }}>ユーザー名</Typography>
            <Box display={"flex"} sx={{ mb: 1 }}>
              <Rating name="read-only" value={5} readOnly />
              <Typography sx={{ ml: 2.5, color: "#fff" }}>10000000</Typography>
            </Box>
            <Box display={"flex"}>
              <VerifiedUserOutlinedIcon sx={{ color: "#fff", mr: 0.5 }} />
              <Typography sx={{ color: "#fff" }}>本人確認済み</Typography>
            </Box>
          </Box>
        </Grid>
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
          <SFavoriteBorder />
          <Typography color="#fff" fontSize={"8px"}>
            お気に入り
          </Typography>
        </Grid>
        <Grid
          sx={{ display: "row", flexDirection: "row", width: 100 }}
          textAlign={"center"}
        >
          <SBookmark sx={{ color: "#fff" }} />
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

const SFavoriteBorder = Styled(FavoriteBorder)`
  && {
    width: 30px;
    height: 30px;
    color: #fff;

    &:hover {
      color: #ff0000;
    }
  }
`;

const SBookmark = Styled(BookmarkAddOutlinedIcon)`
  && {
    width: 30px;
    height: 30px;
    color: #fff;

    &:hover {
      color: #00ffff;
    }
  }
`;

export default TextDetail;
