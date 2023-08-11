import { Box, Typography } from "@mui/material";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const SettlementFin = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Typography sx={{ mb: 2, color: "#fff", fontSize: 40 }}>
          決済完了
        </Typography>
        <TaskAltIcon sx={{ color: "#fff", fontSize: 200 }} />
      </Box>
    </Box>
  );
};

export default SettlementFin;
