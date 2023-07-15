import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightBlueTheme } from "./layouts/theme";
import Top from "./pages/Top";
import Home from "./pages/Home";
import Product from "./pages/product/Product";
import Folowing from "./pages/Folowing";
import Group from "./pages/Group";
import Setting from "./pages/Setting";
import Exhibit from "./pages/Exhibit";
import Notify from "./pages/Notify";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Info from "./pages/Info";
import Trading from "./pages/product/trading/Trading";


function App() {

  return (
    <ThemeProvider theme={lightBlueTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/product" element={<Product />}>
            <Route path="trading" element={<Trading />}></Route>
          </Route>
          <Route path="/following" element={<Folowing />}></Route>
          <Route path="/group" element={<Group />}></Route>
          <Route path="/exhibit" element={<Exhibit />}></Route>
          <Route path="/notify" element={<Notify />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/help" element={<Help />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;