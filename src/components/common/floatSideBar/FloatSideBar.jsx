import { Divider, Drawer, List, useTheme } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { booleanFloatSideBar } from "../../../redux/features/floatSideBarSlice";
import UpperListSection from "./upperListSection/UpperListSection";
import LowerListSection from "./lowerListSection/LowerListSection";
import FollowingListSection from "./followingListSection/FollowingListSection";
import GroupListSection from "./groupListSection/GroupListSection";

const FloatSideBar = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSideOpen = useSelector((state) => state.floatSideBar.value);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        dispatch(booleanFloatSideBar());
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSideOpen}
      PaperProps={{
        style: { borderRight: "none", marginTop: "55px", zIndex: 150 },
      }}
      transitionDuration={0}
    >
      <SList style={{ backgroundColor: theme.palette.primary.main }}>
        <UpperListSection page={props.page} />

        <SDivider>
          <SListTitle>フォロー中</SListTitle>
        </SDivider>

        <FollowingListSection />

        <SDivider>
          <SListTitle>グループ</SListTitle>
        </SDivider>

        <GroupListSection />

        <Divider />

        <LowerListSection page={props.page} />
      </SList>
    </Drawer>
  );
};

const SList = S(List)`
    && {
        position: fixed;
        overflow-y: scroll;
        width: 240px;
        height: calc(100vh - 55px);

        &::-webkit-scrollbar {
            display: none;
        }
        &::-webkit-scrollbar-track {
            background-color: transparent;
        }
        &:hover {
            &::-webkit-scrollbar {
                display: inline;
            }
        }
    }
`;

const SListTitle = styled.div`
  height: 50%;
  width: 95%;
  text-align: left;
  padding-left: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #777;
`;

const SDivider = S(Divider)`
    && {
        width: 230px;
    }
`;

export default FloatSideBar;
