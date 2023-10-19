import React from "react";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
export const GroupCard = ({ iconSrc, name, description }) => {
  const tags = [];
  return (
    <Grid
      item
      xs={3}
      sx={{
        backgroundColor: "#666",
        width1: "300px",
        height: "30%",

        mx: 2,
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          px: 2,
          py: 1,
          background: "#333",
        }}
      >
        <Avatar src='' />
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 2,
          }}
          variant='h5'
        >
          name
        </Typography>
      </Box>
      <Grid
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "left",
          ml: 1,
          mt: 1,
        }}
      >
        <Grid item xs={12}>
          {[1, 2, 4, 3, 3].map((tag) => (
            <Chip
              sx={{
                ":hover": {
                  backgroundColor: "#333",
                  color: "#fff",
                },
                m: 0.5,
              }}
              key={tag}
              label={"hogeee" + tag}
            />
          ))}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          allignItems: "center",
          mt: 3,
        }}
      >
        <Typography
          sx={{
            height: "100px",
            overflow: "auto",
            width: "90%",
            textAlign: "center",
          }}
        >
          descrip tiondescri
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          allignItems: "center",
          my: 3,
        }}
      >
        <Button
          variant='outlined'
          sx={{
            ":hover": {
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        >
          詳細
        </Button>
      </Box>
    </Grid>
  );
};
