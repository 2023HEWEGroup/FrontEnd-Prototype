import { Close, EditNote } from "@mui/icons-material";
import { Drawer, IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import DraftList from "./draftList/DraftList";

const SelectDraft = (props) => {
  const theme = useTheme();

  const handleSideClose = () => {
    props.setIsOpen(false);
  };

  return (
    <Drawer
      anchor="left"
      open={props.isOpen}
      onClose={handleSideClose}
      PaperProps={{ style: { borderRight: "none" } }}
    >
      <SInner
        theme={theme}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <SListHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <SEditNote theme={theme} />
            <SHeaderComment theme={theme}>下書き一覧</SHeaderComment>
          </div>
          <Tooltip title="閉じる(Esc)" placement="right" arrow>
            <SIconButton onClick={handleSideClose}>
              <SArrowBackIosNew theme={theme} />
            </SIconButton>
          </Tooltip>
        </SListHeader>

        <DraftList setIsOpen={props.setIsOpen} />
      </SInner>
    </Drawer>
  );
};

const SInner = S.div`
    && {
        position: fixed;
        width: 350px;
        height: 100vw;
    }
`;

const SListHeader = S.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 30px 15px;
    overflow: hidden;
`;

const SEditNote = S(EditNote)`
    && {
        color: ${(props) => props.theme.palette.text.sub2};
    }
`;

const SHeaderComment = S.div`
    color: ${(props) => props.theme.palette.text.sub2};
`;

const SIconButton = S(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: transparent;
        }
    }
`;

const SArrowBackIosNew = S(Close)`
    && {
        color: ${(props) => props.theme.palette.text.sub2};
    }
`;

export default SelectDraft;
