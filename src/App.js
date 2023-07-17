import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightBlueTheme } from "./layouts/theme";
import Top from "./pages/Top";
import Home from "./pages/Home";
import Product from "./pages/product/Product";
import Following from "./pages/Following";
import Group from "./pages/Group";
import Setting from "./pages/Setting";
import Exhibit from "./pages/Exhibit";
import Notify from "./pages/Notify";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Info from "./pages/Info";
import Trading from "./pages/product/trading/Trading";
import CommonLayouts from "./layouts/CommonLayout";


function App() {

  return (
    <ThemeProvider theme={lightBlueTheme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/" element={<CommonLayouts />}>
            <Route path="home" element={<Home />} />
            <Route path="product" element={<Product />}>
              <Route path="trading" element={<Trading />} />
            </Route>
            <Route path="following" element={<Following />} />
            <Route path="group" element={<Group />} />
            <Route path="exhibit" element={<Exhibit />} />
            <Route path="notify" element={<Notify />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Setting />} />
            <Route path="info" element={<Info />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;