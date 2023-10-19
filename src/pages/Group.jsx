import { Grid } from "@mui/material";
import React from "react";
import GroupCard from "../components/group/GroupCard";
const Group = () => {
  return (
    <>
      <Grid
        container
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "90%",
        }}
      >
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </Grid>
    </>
  );
};

export default Group;
