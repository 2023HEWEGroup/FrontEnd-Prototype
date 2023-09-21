import { Avatar, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";

const TopBox = () => {
  const theme = useTheme();

  const users = [
    {
      key: 1,
      name: "HARD CORDINGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      id: "kurucccccccccccccccccccccccccc",
      value: 555,
    },
    { key: 2, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 3, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 4, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 5, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 6, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 7, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 8, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 9, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 10, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 11, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 12, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 13, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 14, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 15, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 16, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 17, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
    { key: 18, name: "CODING KURU*C", id: "kuruc_net", value: 555 },
  ];

  return (
    <STopBox>
      <STitle>トップユーザー</STitle>

      <SList theme={theme}>
        {users.map((user) => (
          <SListItem key={user.key}>
            <SUser>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <SAvatar />
              </div>
              <SUserDesc>
                <SUserName>{user.name}</SUserName>
                <SUserId theme={theme}>@{user.id}</SUserId>
                <SAmount theme={theme}>{user.value}</SAmount>
              </SUserDesc>
            </SUser>
          </SListItem>
        ))}
      </SList>
    </STopBox>
  );
};

const STopBox = S.div`
    width: 100%;
`;

const STitle = S.div`
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.2rem;
`;

const SList = S.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    &:hover {
        &::-webkit-scrollbar-thumb {
            background-color: ${(props) =>
              props.theme.palette.background.scrollBar};
        }
    }
`;

const SListItem = S.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

const SUser = S.div`
    display: flex;
    gap: 20px;
`;

const SAvatar = S(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`;

const SUserDesc = S.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
`;

const SUserName = S.span`
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const SUserId = S.span`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.text.sub};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const SAmount = S.span`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.secondary.main};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export default TopBox;
