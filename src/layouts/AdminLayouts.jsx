import React from "react";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import AdminNav from "../components/common/admin/adminNav/AdminNav";
import AdminMenu from "../components/common/admin/adminMenu/AdminMenu";
import AdminFooter from "../components/common/admin/adminFooter/AdminFooter";

const AdminLayouts = () => {
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const location = useLocation();
  const theme = useTheme();

  return (
    <>
      <AdminNav />
      <SAdminMain>
        <SMenuContainer theme={theme} $isXsScreen={isXsScreen}>
          <AdminMenu page={location.pathname} />
        </SMenuContainer>
        <SMainContainer $isXsScreen={isXsScreen}>
          <div style={{ width: "100%" }}>
            <Outlet />
          </div>
        </SMainContainer>
      </SAdminMain>
      <AdminFooter />
    </>
  );
};

const SAdminMain = styled.div`
  display: flex;
`;

const SMenuContainer = styled.div`
  width: ${(props) => (props.$isXsScreen ? "fit-content" : "250px")};
  padding: 5px 20px;
  border-right: solid 1px ${(props) => props.theme.palette.line.disable};
`;

const SMainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  width: ${(props) =>
    props.$isXsScreen ? "calc(100% - 70px)" : "calc(100% - 250px)"};
`;

export default AdminLayouts;
