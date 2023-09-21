import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { multipleTopBarNotifyScroll } from "../../../../../redux/features/topBarNotifyScrollSlice";
import styled from "styled-components";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  useTheme,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { isWindowScrollable } from "../../../../../redux/features/windowScrollaleSlice";

const NotifyPopper = () => {
  const notifies = [
    {
      id: 1,
      src: "xxx",
      notifyClass: 1,
    },
    {
      id: 2,
      src: "xxx",
      notifyClass: 2,
    },
    {
      id: 3,
      src: "ああああああああああああああああああああああああああああああああああああああああああああああああああ",
      notifyClass: 1,
    },
    {
      id: 4,
      src: "xxx",
      notifyClass: 1,
    },
    {
      id: 5,
      src: "@abcd_xyz",
      notifyClass: 2,
    },
    {
      id: 6,
      src: "aaaaa",
      notifyClass: 3,
    },
    {
      id: 7,
      src: "xxx",
      notifyClass: 1,
    },
    {
      id: 8,
      src: "xxx",
      notifyClass: 4,
    },
    {
      id: 9,
      src: "owaaaaa",
      notifyClass: 5,
    },
    {
      id: 10,
      src: "xxx",
      notifyClass: 6,
    },
    {
      id: 11,
      src: "xxx",
      notifyClass: 1,
    },
    {
      id: 12,
      src: "xxx",
      notifyClass: 2,
    },
    {
      id: 13,
      src: "ああああああああああああああああああああああああああああああああああああああああああああああああああ",
      notifyClass: 1,
    },
    {
      id: 14,
      src: "xxx",
      notifyClass: 1,
    },
    {
      id: 15,
      src: "@abcd_xyz",
      notifyClass: 2,
    },
  ];

  const [isNotifyPopperOpen, setIsNotifyPopperOpen] = useState(false);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const [multipleNotifyDisplay, setMultipleNotifyDisplay] = useState(1);
  const dispatch = useDispatch();
  const notifyPopperRef = useRef(null);
  const notifyContainerRef = useRef();
  const theme = useTheme();
  const multiple = useSelector((state) => state.topBarNotifyScroll.value);
  const displayNotifies = notifies.slice(0, 10 * multipleNotifyDisplay);

  const handleNotifyPopper = (e) => {
    if (!isNotifyPopperOpen) {
      setNotifyAnchorEl(e.currentTarget);
      setIsNotifyPopperOpen(true);
    } else {
      setNotifyAnchorEl(null);
      setIsNotifyPopperOpen(false);
    }
  };

  const handleScroll = () => {
    const notifyContainer = notifyContainerRef.current;
    if (
      Math.floor(notifyContainer.scrollHeight - notifyContainer.scrollTop) ===
      Math.floor(notifyContainer.offsetHeight)
    ) {
      dispatch(multipleTopBarNotifyScroll());
    }
  };

  useEffect(() => {
    setMultipleNotifyDisplay(multiple);
  }, [multiple]);

  useEffect(() => {
    const handleNotifyPopperClose = (e) => {
      if (
        notifyAnchorEl &&
        !notifyAnchorEl.contains(e.target) &&
        !notifyPopperRef.current.contains(e.target)
      ) {
        setNotifyAnchorEl(null);
        setIsNotifyPopperOpen(false);
      }
    };
    document.addEventListener("click", handleNotifyPopperClose);

    return () => {
      document.removeEventListener("click", handleNotifyPopperClose);
    };
  }, [notifyAnchorEl]);

  useEffect(() => {
    if (isNotifyPopperOpen) {
      // ポッパーが展開されたときにスクロールを無効化
      dispatch(isWindowScrollable());
    } else {
      dispatch(isWindowScrollable());
    }
  }, [isNotifyPopperOpen, dispatch]);

  return (
    <>
      <Tooltip title="通知" placement="bottom" arrow={true}>
        <SIconButton size="small" onClick={handleNotifyPopper} theme={theme}>
          <Badge color="secondary" badgeContent={5}>
            {isNotifyPopperOpen ? (
              <SNotificationsOutlinedIcon color="secondary" />
            ) : (
              <SNotificationsOutlinedIcon color="icon" />
            )}
          </Badge>
        </SIconButton>
      </Tooltip>

      <SPopper
        open={isNotifyPopperOpen}
        anchorEl={notifyAnchorEl}
        placement="bottom-end"
        ref={notifyPopperRef}
      >
        <SNotifyPopperPaper theme={theme} elevation={3}>
          <SNotifyListHeader>
            <div style={{ color: theme.palette.text.main }}>通知</div>
            <SNotifyHeadText style={{ color: theme.palette.secondary.main }}>
              すべて既読
            </SNotifyHeadText>
          </SNotifyListHeader>

          <Divider
            style={{ borderBottom: `solid 0.5px ${theme.palette.line.main}` }}
          />

          <SNotifyList ref={notifyContainerRef} onScroll={handleScroll}>
            {displayNotifies.map((notify) => (
              <div key={notify.id}>
                <SNotifyListItemButton theme={theme}>
                  <Badge color="secondary" variant="dot">
                    <SNotifyAvatar />
                  </Badge>
                  <div>
                    <ListItemText
                      primary={`${notify.src}があああああああああああああああああああああああああああああああああああああああああああああああああああああ`}
                      primaryTypographyProps={{
                        color: theme.palette.text.main,
                        fontSize: "0.9rem",
                      }}
                    />
                    <STimeAgo style={{ color: theme.palette.text.sub }}>
                      NaN時間前
                    </STimeAgo>
                  </div>
                </SNotifyListItemButton>
              </div>
            ))}
          </SNotifyList>
        </SNotifyPopperPaper>
      </SPopper>
    </>
  );
};

const SPopper = Styled(Popper)`
    && {
        z-index: 200;
    }
`;

const SNotificationsOutlinedIcon = Styled(NotificationsOutlinedIcon)`
    && {
        width: 35px;
        height: 35px;
    }
`;

const SIconButton = Styled(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`;

const SNotifyPopperPaper = Styled(Paper)`
    && {
        height: calc(90vh - 55px);
        width: 425px;
        border-radius: 15px;
        background-color: ${(props) => props.theme.palette.background.pop}
    }
`;

const SNotifyListHeader = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 95%;
    margin: 0 auto;
  }
`;

const SNotifyHeadText = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
  }
`;

const SNotifyList = Styled(List)`
    && {
        height: calc(100% - 50px);
        overflow-y: scroll;

        &::-webkit-scrollbar {
        display: none;
        width: 10px;
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

const SNotifyListItemButton = Styled(ListItemButton)`
    && {
    align-items: start;
    gap: 20px;
    min-height: 100px;
    width: 415px;
    padding: 15px;
    cursor: pointer;

    .MuiTouchRipple-child {
        background-color: ${(props) => props.theme.palette.secondary.main};
    }

    &:nth-child(1) {
        margin-top: -8px;
    }

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover}
    }
    }
`;

const SNotifyAvatar = Styled(Avatar)`
    && {
    width: 50px;
    height: 50px;
    }
`;

const STimeAgo = styled.div`
  font-size: 0.8rem;
  margin-top: 15px;
`;

export default NotifyPopper;
