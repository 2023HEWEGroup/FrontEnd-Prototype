import { Apps } from "@mui/icons-material";
import { Avatar, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminNav = () => {
  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const theme = useTheme();

  return (
    <SNavBar>
      <SLogo>
        <SLink to="/home">
          <SLmapLogo
            src={`${siteAssetsPath}/LMAP_logo_reversal.svg`}
            alt="LMAPロゴ"
          />
        </SLink>
      </SLogo>
      <SIcons>
        <SUser>
          <div style={{ width: "26px", height: "26px" }}>
            <Avatar style={{ width: "100%", height: "100%" }} />
          </div>
          <SSpan style={{ color: theme.palette.text.sub }}>Example</SSpan>
        </SUser>
        <Apps color="icon" />
      </SIcons>
    </SNavBar>
  );
};

const SNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const SLink = Styled(Link)`
    && {
        height: fit-content;
        text-decoration: none;
    }
`;

const SLogo = styled.div`
  display: flex;
  align-items: center;
`;

const SLmapLogo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const SIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SSpan = styled.span`
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default AdminNav;
