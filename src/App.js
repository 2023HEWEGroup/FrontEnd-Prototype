import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkBlueTheme } from "./layouts/theme";
import React, { useEffect } from "react";
import Routing from "./Routing";
import styled from "styled-components";

function App() {
  const location = useLocation();

  // 遷移で画面トップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0); // 画面のトップにスクロール
  }, [location]);

  return (
    <ThemeProvider theme={darkBlueTheme}>
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
