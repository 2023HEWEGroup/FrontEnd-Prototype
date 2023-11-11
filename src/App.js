import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkBlueTheme } from "./layouts/theme";
import React, { useEffect } from "react";
import Routing from "./Routing";
import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

function App() {

  const location = useLocation();

  function ErrorFallback({ error, resetErrorBoundary }) {
    console.log(1)
    return (
      <div role="alert">
        <p>エラーが発生しました。</p>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>リロード</button>
      </div>
    );
  }

  // 遷移で画面トップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0); // 画面のトップにスクロール
  }, [location]);

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error, info) => console.error('ErrorBoundary caught an error:', error, info)}>
        <StyledApp>
          <Routing />
        </StyledApp>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  overflow-x: hidden;
  width: calc(100vw - 10px);
`;

export default App;
