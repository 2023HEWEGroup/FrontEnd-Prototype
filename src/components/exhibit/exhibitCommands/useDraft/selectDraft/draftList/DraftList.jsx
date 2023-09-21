import { Delete } from "@mui/icons-material";
import { Avatar, List, ListItemButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import styled from "styled-components";

const DraftList = (props) => {
  const theme = useTheme();

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // イベント伝播を停止する
  };

  return (
    <SList theme={theme}>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SNoImage theme={theme}>画像なし</SNoImage>
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SNoImage theme={theme}>画像なし</SNoImage>
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
      <SListItemButton theme={theme} onClick={() => props.setIsOpen(false)}>
        <SInner>
          <SImageArea theme={theme}>
            <SAvatar variant="square" />
          </SImageArea>
          <SDesc>
            <SProductName theme={theme}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </SProductName>
            <SCreatedAt theme={theme}>xxxx年xx月xx日 xx:xx</SCreatedAt>
          </SDesc>
        </SInner>
        <Tooltip title="削除" placement="right" arrow>
          <SDelete theme={theme} onClick={handleDeleteClick} />
        </Tooltip>
      </SListItemButton>
    </SList>
  );
};

const SList = S(List)`
    && {
        overflow-y: scroll;
        height: calc(100vh - 50px);

        &::-webkit-scrollbar{
            width: 7px;
        },
        &::-webkit-scrollbar-thumb {
            background-color: transparent;
        }
    
        &:hover {
            &::-webkit-scrollbar-thumb {
                background-color: ${(props) =>
                  props.theme.palette.background.scrollBar};
            }
        }
    }
`;

const SListItemButton = S(ListItemButton)`
    && {
        width: 100%;
        padding: 25px 15px;
        .MuiTouchRipple-child {
            background-color: traansparent;
        }
        &:hover {
            background-color: ${(props) =>
              props.theme.palette.background.hover2}
        }
    }
`;

const SInner = S.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    width: 100%;
`;

const SImageArea = S.div`
    width: 80px;
    height: 80px;
    outline: solid 1px ${(props) => props.theme.palette.text.sub};
`;

const SNoImage = S.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`;

const SAvatar = S(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`;

const SDesc = S.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    width: calc(100% - 95px);
    height: 80px;
`;

const SProductName = S.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`;

const SCreatedAt = S.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`;

const SDelete = S(Delete)`
    && {
        opacity: 0;
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: ${(props) => props.theme.palette.text.error2};

        ${SListItemButton}:hover & {
            opacity: 1;
        }
    }
`;

export default DraftList;
