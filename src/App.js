import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkBlueTheme } from "./layouts/theme";
import React, { useEffect } from 'react'
import Top from "./pages/Top";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Following from "./pages/Following";
import Group from "./pages/Group";
import Setting from "./pages/Setting";
import Exhibit from "./pages/Exhibit";
import Notify from "./pages/Notify";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Info from "./pages/Info";
import CommonLayouts from "./layouts/CommonLayout";
import styled from "styled-components";
import Result from "./pages/Result";
import SettlementFin from "./pages/SettlementFin";
import AdminLayouts from "./layouts/AdminLayouts";
import AdminTop from "./pages/admin/AdminTop";
import UserManage from "./pages/admin/UserManage";

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
        <Routes>

          <Route path="/" element={<Top />} />
          <Route path="/exhibit" element={<Exhibit />} />

          <Route path="/" element={<CommonLayouts />}>
            <Route path="home" element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="following" element={<Following />} />
            <Route path="group" element={<Group />} />
            <Route path="notify" element={<Notify />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
            <Route path="info" element={<Info />} />
            <Route path="help" element={<Help />} />
            <Route path="result" element={<Result />} />
            <Route path="settlementFin" element={<SettlementFin />} />
          </Route>

          <Route path="/admin" element={<AdminLayouts />}>
            <Route index element={<AdminTop />} />
            <Route path="user" element={<UserManage />} />
          </Route>

        </Routes>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  overflow-x: hidden;
  width: calc(100vw - 10px);
`;

export default App;
