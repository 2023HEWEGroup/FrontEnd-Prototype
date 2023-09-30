import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  Grid,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
const VideoPage = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setOpenEmojiPicker(false);
  };

  return (
    <Container
      style={{ backgroundColor: "#000", color: "#FFF", height: "100vh" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {/* 動画プレイヤー */}
          <div style={{ borderRadius: "15px", overflow: "hidden" }}>
            <video width="100%" controls>
              <source src="YOUR_VIDEO_SOURCE_URL" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Avatar alt="User Avatar" src="YOUR_USER_AVATAR_URL" />
            <Typography
              variant="h5"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              Video Title
            </Typography>
          </div>
          <Typography variant="subtitle1" gutterBottom>
            User Name
          </Typography>

          {/* 高評価・低評価ボタン */}
          <div>
            <IconButton color="secondary" aria-label="like">
              <ThumbUpIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="dislike">
              <ThumbDownIcon />
            </IconButton>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div
            style={{
              borderRadius: "15px",
              padding: "10px",
              border: "1px solid #444",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* コメント表示エリア */}
            <Grid container spacing={1} height={"400px"}>
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              <List>
                <ListItem>
                  <Typography>f:米米</Typography>
                </ListItem>
                <ListItem>
                  <Typography>U: ふおおお</Typography>
                </ListItem>
              </List>
            </Grid>

            {/* コメント投稿 */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <TextField
                variant="standard"
                fullWidth
                placeholder="Write your comment here..."
                InputProps={{
                  style: { color: "#FFF" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#FFF" }}
                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                      >
                        <InsertEmoticonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  disableUnderline: false,
                }}
              />
              <Button
                variant="text"
                style={{
                  color: "#FFF",
                  border: "1px solid #FFF",
                  borderRadius: "5px",
                }}
              >
                <SendIcon />
              </Button>
            </div>

            {openEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </div>
        </Grid>
      </Grid>

      <Divider style={{ margin: "20px 0", backgroundColor: "#FFF" }} />
    </Container>
  );
};

export default VideoPage;
