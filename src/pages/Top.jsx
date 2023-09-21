import { ExitToApp, Shop } from "@mui/icons-material";
import { AppBar, Chip, Grid, Toolbar, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setWindowScrollable } from "../redux/features/windowScrollaleSlice";
import TopModal from "../components/top/topModal/TopModal";

const Top = () => {
  const [isTopModalOpen, setIsTopModalOpen] = useState(false);
  const isScrollable = useSelector((state) => state.windowScrollable.value);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleTopModalOpen = () => {
    setIsTopModalOpen(true);
  };

  // 同様にスクロール可否を問う。Poppr展開中に遷移した場合ポッパーは遷移に伴って強制的にデフォルトの閉じ状態になる(正式な閉じる手順を踏まない)
  // ため、ページマウント時にスクロールをuseEffectで可能とセットして、もう一つのseEffectでスクロール状態をdispatchする。
  // ページマウント時は必ずスクロール可能とする
  useEffect(() => {
    dispatch(setWindowScrollable(true));
  }, [dispatch]);

  useEffect(() => {
    if (!isScrollable) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isScrollable]);

  useEffect(() => {
    // Topページがマウントされたときに限定してスクロールバーのトラック部分の色を変更する
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        background-color: #000;
      }
    `;
    document.head.appendChild(style);
    // コンポーネントのアンマウント時にスタイルを元に戻す
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <SFullScrean>
      <SAppBar>
        <Toolbar></Toolbar>
      </SAppBar>

      <SGridContainer container>
        <SGridItem item xs={12} sm={12} md={12} lg={6}>
          <SWelcomeZone>
            <SWelcomeMessage theme={theme}>
              Welcome
              <br />
              To The
              <br />
              LMAP
            </SWelcomeMessage>
            <SButtons>
              <SLink to={"/home"}>
                <SGoToShopLabel
                  theme={theme}
                  icon={<Shop style={{ color: theme.palette.top.secondary }} />}
                  label="ショップを見てみる"
                  clickable
                />
              </SLink>
              <SLoginLabel
                theme={theme}
                icon={<ExitToApp style={{ color: theme.palette.top.main }} />}
                label="アカウント"
                clickable
                onClick={handleTopModalOpen}
              />
            </SButtons>
          </SWelcomeZone>
        </SGridItem>
        <SGridItem item xs={12} sm={12} md={12} lg={6}></SGridItem>
      </SGridContainer>

      <TopModal
        isTopModalOpen={isTopModalOpen}
        setIsTopModalOpen={setIsTopModalOpen}
      />
    </SFullScrean>
  );
};

const SFullScrean = S.div`
  width: 100vw;
  height: 2000px;
  overflow-y: scroll;
`;

const SAppBar = S(AppBar)`
  && {
    background-color: #222;
    height: 55px;
  }
`;

const SGridContainer = S(Grid)`
  && {
    margin-top: 55px;
    padding: 100px 0;
  }
`;

const SGridItem = S(Grid)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SWelcomeZone = S.div`
  width: 80%;
`;

const SWelcomeMessage = S.div`
  text-align: left;
  line-height: 1.2;
  font-size: 5.5rem;
  font-weight: bold;
  font-family: 'Michroma', sans-serif;

  display: inline-block;
  background: linear-gradient(90deg, ${(props) =>
    props.theme.palette.top.titleGradation});
  background: -webkit-linear-gradient(0deg, ${(props) =>
    props.theme.palette.top.titleGradation});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SButtons = S.div`
  display: flex;
  gap: 25px;
  width: fit-content;
  margin-top: 75px;
`;

const SLink = S(Link)`
  && {
    text-decoration: none;
  }
`;

const SGoToShopLabel = S(Chip)`
  && {
    height: 50px;
    padding: 0 25px;
    color: ${(props) => props.theme.palette.top.secondary};
    border: solid 2px ${(props) => props.theme.palette.top.secondary};
    border-radius: 25px;
    &:hover {
      background-color: ${(props) => props.theme.palette.top.secondaryHover};
    }
  }
`;

const SLoginLabel = S(Chip)`
  && {
    height: 50px;
    padding: 0 25px;
    color: ${(props) => props.theme.palette.top.main};
    border: solid 2px ${(props) => props.theme.palette.top.main};
    border-radius: 25px;
    &:hover {
      background-color: ${(props) => props.theme.palette.top.mainHover};
    }
  }
`;

export default Top;
