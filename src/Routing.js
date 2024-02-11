import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Top from "./pages/Top";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Following from "./pages/Following";
import Group from "./pages/Group";
import Exhibit from "./pages/Exhibit";
import Notify from "./pages/Notify";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Info from "./pages/Info";
import CommonLayouts from "./layouts/CommonLayout";
import SettlementFin from "./pages/SettlementFin";
import AdminLayouts from "./layouts/AdminLayouts";
import AdminTop from "./pages/admin/AdminTop";
import UserManage from "./pages/admin/UserManage";
import { useSelector } from "react-redux";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import NotFound from "./pages/NotFound";
import TimeOut from "./pages/TimeOut";
import SettingLayout from "./layouts/SettingLayout";
import SelectAccountSetting from "./components/setting/accountSetting/SelectAccountSetting";
import SelectAccountInfoSetting from "./components/setting/accountSetting/accountInfoSetting/SelectAccountInfoSetting";
import UserIdSetting from "./components/setting/accountSetting/accountInfoSetting/UserIdSetting";
import PhoneNumberSetting from "./components/setting/accountSetting/accountInfoSetting/PhoneNumberSetting";
import MailAddressSetting from "./components/setting/accountSetting/accountInfoSetting/MailAddressSetting";
import SelectThemeSetting from "./components/setting/themeSetting/SelectThemeSetting";
import SelectSetting from "./components/setting/SelectSetting";
import SelectPaymentInfoSetting from "./components/setting/accountSetting/accountInfoSetting/SelectPaymentInfoSetting";
import PointSetting from "./components/setting/accountSetting/accountInfoSetting/PointSetting";
import CreditCardDetailSetting from "./components/setting/accountSetting/accountInfoSetting/CreditCardDetailSetting";
import Establish from "./pages/Establish";
import BroadcastRoom from "./pages/BroadcastRoom";


const Routing = () => {

  const user = useSelector((state) => state.user.value);

  return (
    <>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/exhibit" element={user ? <Exhibit /> : <Navigate to="/?recommend=true&back=/" />} />
      <Route path="/establish" element={user ? <Establish currentUser={user}/> : <Navigate to="/?recommend=true&back=/" />} />
      <Route path="/broadcast/:roomId" element={user ? <BroadcastRoom currentUser={user}/> : <Navigate to="/?recommend=true&back=/" />} />

      <Route path="/" element={<CommonLayouts currentUser={user}/>}>
        <Route path="home" element={<Home currentUser={user}/>} />
        <Route path="product/:productId" element={<Product currentUser={user}/>} />
        <Route path="following" element={user ? <Following currentUser={user}/> : <Navigate to="/?recommend=true&back=/" />} />
        <Route path="group/:groupId" element={<Group currentUser={user}/>} />
        <Route path="notify" element={<Notify />} />
        <Route path="user/:userId" element={<Profile />} />
        <Route path="info" element={<Info />} />
        <Route path="help" element={<Help />} />
        <Route path="products" element={<Products currentUser={user}/>} />
        <Route path="users" element={<Users />} />
        <Route path="groups" element={<Groups />} />
        <Route path="settlementFin" element={<SettlementFin />} />
        <Route path="timeOut" element={<TimeOut />} />
        <Route path="notFound" element={<NotFound />} />

        <Route path="setting" element={user ? <SettingLayout /> : <Navigate to="/?recommend=true&back=/" />}>
          <Route index element={<SelectSetting />} />
          <Route path="account" element={<SelectAccountSetting currentUser={user}/>} />
          <Route path="account/accountInfo" element={<SelectAccountInfoSetting currentUser={user}/>} />
          <Route path="account/userId" element={<UserIdSetting currentUser={user}/>} />
          <Route path="account/phoneNumber" element={<PhoneNumberSetting currentUser={user}/>} />
          <Route path="account/mailAddress" element={<MailAddressSetting currentUser={user}/>} />

          <Route path="account/paymentInfo" element={<SelectPaymentInfoSetting currentUser={user}/>} />
          <Route path="account/point" element={<PointSetting currentUser={user}/>} />
          <Route path="account/creditCardDetail" element={<CreditCardDetailSetting currentUser={user}/>} />

          <Route path="theme" element={<SelectThemeSetting currentUser={user}/>} />
        </Route>
        
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
