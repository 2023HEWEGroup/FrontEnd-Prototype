import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkBlueTheme } from "./layouts/theme";
import React, { useEffect } from "react";
import Routing from "./Routing";
import S from "S-components";

function App() {
  const location = useLocation();

  // 遷移で画面トップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0); // 画面のトップにスクロール
  }, [location]);

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <SApp>
        <Routing />
      </SApp>
    </ThemeProvider>
  );
}

const SApp = styled.div`
  overflow-x: hidden;
  width: calc(100vw - 10px);
`;

export default App;
