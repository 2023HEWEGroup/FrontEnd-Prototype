import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Result from "./pages/Result";
import SettlementFin from "./pages/SettlementFin";
import AdminLayouts from "./layouts/AdminLayouts";
import AdminTop from "./pages/admin/AdminTop";
import UserManage from "./pages/admin/UserManage";
import { useSelector } from "react-redux";


const Routing = () => {

  const user = useSelector((state) => state.user.value);

  return (
    <>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/exhibit" element={user ? <Exhibit /> : <Navigate to="/?recommend=true&back=/" />} />

      <Route path="/" element={<CommonLayouts />}>
        <Route path="home" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="following" element={<Following />} />
        <Route path="group" element={<Group />} />
        <Route path="notify" element={<Notify />} />
        <Route path="profile/:userId" element={<Profile />} />
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

    
    </>
  );
};

export default Routing;
