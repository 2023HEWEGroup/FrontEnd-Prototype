import styled from "styled-components";
import { Home } from "@mui/icons-material";
import { Avatar, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BackToHome = () => {
  const theme = useTheme();

  return (
    <Link to="/home">
      <Tooltip title="ホームに戻る" placement="bottom" arrow>
        <SAvatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            width: "50px",
            height: "50px",
          }}
          variant="circular"
        >
          <Home sx={{ width: "50%", height: "50%" }} />
        </SAvatar>
      </Tooltip>
    </Link>
  );
};

const SAvatar = S(Avatar)`
    cursor: pointer;
    pointer-events: auto;
    &:hover {
        opacity: 0.8;
    }
`;

export default BackToHome;
