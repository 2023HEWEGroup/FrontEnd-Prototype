import { Avatar, ListItem, Tooltip, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { booleanFloatSideBarFollowing } from "../../../../redux/features/floatSideBarFollowingSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const FollowingListSection = () => {
  const accounts = [
    {
      id: 1,
      name: "account1aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      id: 2,
      name: "account2ああああああああああああああ",
    },
    {
      id: 3,
      name: "account3",
    },
    {
      id: 4,
      name: "account4",
    },
    {
      id: 5,
      name: "account5",
    },
    {
      id: 6,
      name: "account6",
    },
    {
      id: 7,
      name: "account7",
    },
  ];

  const dispatch = useDispatch();
  const isOpenFollowing = useSelector(
    (state) => state.floatSideBarFollowing.value
  );
  const visibleAccounts = isOpenFollowing ? accounts : accounts.slice(0, 5);
  const theme = useTheme();

  const toggleFollowingShowAll = () => {
    dispatch(booleanFloatSideBarFollowing());
  };

  return (
    <>
      <SListBlockWithTitle>
        {visibleAccounts.map((account) => (
          <SListItem key={account.id}>
            <Tooltip title={account.name} placement="right" arrow={true}>
              <SListElements theme={theme}>
                <SAvatar />
                <SListItemText theme={theme.palette.text.main}>
                  {account.name}
                </SListItemText>
              </SListElements>
            </Tooltip>
          </SListItem>
        ))}
        {accounts.length > 5 && !isOpenFollowing && (
          <SListItem>
            <Tooltip title="すべて表示" placement="right" arrow>
              <SListElements theme={theme} onClick={toggleFollowingShowAll}>
                <SListItemText theme={theme.palette.text.sub2}>
                  すべて表示
                </SListItemText>
                <SExpandMoreIcon color="icon" />
              </SListElements>
            </Tooltip>
          </SListItem>
        )}
        {accounts.length > 5 && isOpenFollowing && (
          <SListItem>
            <Tooltip title="折りたたむ" placement="right" arrow>
              <SListElements theme={theme} onClick={toggleFollowingShowAll}>
                <SListItemText theme={theme.palette.text.sub2}>
                  折りたたむ
                </SListItemText>
                <SExpandLessIcon color="icon" />
              </SListElements>
            </Tooltip>
          </SListItem>
        )}
      </SListBlockWithTitle>
    </>
  );
};

const SListItem = S(ListItem)`
    && {
        justify-content: center;
        height: 45px;
        width: 230px;
        padding: 0;
    }
`;

const SListItemText = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.theme};
`;

const SListBlockWithTitle = styled.div`
    padding-bottom 15px;

    &:nth-child(1) {
        padding-top: 0;
    }
`;

const SListElements = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  height: 100%;
  width: 95%;
  padding-left: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.background.hover};
  }
`;

const SAvatar = S(Avatar)`
    && {
        width: 35px;
        height: 35px;
    }
`;

const SExpandMoreIcon = S(ExpandMoreIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

const SExpandLessIcon = S(ExpandLessIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`;

export default FollowingListSection;
