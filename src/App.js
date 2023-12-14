import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import Routing from "./Routing";
import styled from "styled-components";
import { themeList } from "./layouts/theme/themeList";
import { useSelector } from "react-redux";
import { darkBlueTheme } from "./layouts/theme/darkTheme/darkBlueTheme";

function App() {

  const location = useLocation();
  const currentUser = useSelector((state) => state.user.value);
  const userTheme = currentUser ? themeList.find(theme =>  theme.palette.themeName === currentUser.theme) : darkBlueTheme;

  // 遷移で画面トップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0); // 画面のトップにスクロール
  }, [location]);

  return (
    <ThemeProvider theme={userTheme}>
      <CssBaseline />
      <StyledApp>
        <Routing />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  overflow-x: hidden;
  width: calc(100vw - 10px);
`;

export default App;
