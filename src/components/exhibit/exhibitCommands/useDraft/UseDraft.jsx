import styled from "styled-components";
import { ViewList } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import SelectDraft from "./selectDraft/SelectDraft";

const UseDraft = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSideOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <SelectDraft isOpen={isOpen} setIsOpen={setIsOpen} />

      <Tooltip title="下書きを使う" placement="bottom" arrow>
        <SAvatar
          sx={{ width: "50px", height: "50px" }}
          variant="circular"
          onClick={handleSideOpen}
        >
          <ViewList sx={{ width: "50%", height: "50%" }} />
        </SAvatar>
      </Tooltip>
    </>
  );
};

const SAvatar = S(Avatar)`
    cursor: pointer;
    pointer-events: auto;
    &:hover {
        opacity: 0.8;
    }
`;

export default UseDraft;
