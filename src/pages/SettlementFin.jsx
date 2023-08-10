import { Box, Typography } from "@mui/material";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const SettlementFin = () => {
  return (
    <Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transform: "translate(-50%,100%)",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Typography sx={{ color: "#fff" }}>決済完了</Typography>
        <TaskAltIcon sx={{ color: "#fff", fontSize: 100 }} />
      </Box>
    </Box>
  );
};

export default SettlementFin;
