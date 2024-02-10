import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Settings, SettingsOutlined } from '@mui/icons-material';


const SideBar = (props) => {

  const theme = useTheme();

  return (
    <StyledSideBar style={{backgroundColor: theme.palette.primary.main}}>
      
      <StyledSideBarCell>
        <StyledLink to={"/home"}>
          <StyledSideBarElements theme={theme} style={props.page === "/home" ? {backgroundColor: theme.palette.background.hover} : null}>
            {props.page === "/home" ? <StyledHomeIcon color='secondary' /> : <StyledHomeOutlinedIcon color="icon"/>}
            <StyledIconName style={{color: theme.palette.text.main}}>ホーム</StyledIconName>
          </StyledSideBarElements>
        </StyledLink>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <StyledLink to={"/products"}>
          <StyledSideBarElements theme={theme}  style={props.page === "/products" ? {backgroundColor: theme.palette.background.hover} : null}>
            {props.page === "/products" ? <StyledShoppingCartIcon color='secondary' /> : <StyledShoppingCartOutlinedIcon color="icon"/>}
            <StyledIconName style={{color: theme.palette.text.main}}>商品</StyledIconName>
          </StyledSideBarElements>
        </StyledLink>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <StyledLink to={"/following"}>
          <StyledSideBarElements theme={theme}  style={props.page === "/following" ? {backgroundColor: theme.palette.background.hover} : null}>
            {props.page === "/following" ? <StyledGroupIcon color='secondary' /> : <StyledGroupOutlinedIcon color="icon"/>}
            <StyledIconName style={{color: theme.palette.text.main}}>フォロー中</StyledIconName>
          </StyledSideBarElements>
        </StyledLink>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <StyledLink to={"/groups"}>
          <StyledSideBarElements theme={theme}  style={props.page === "/groups" ? {backgroundColor: theme.palette.background.hover} : null}>
            {props.page === "/groups" ? <StyledFolderSharedIcon color='secondary' /> : <StyledFolderSharedOutlinedIcon color="icon"/>}
            <StyledIconName style={{color: theme.palette.text.main}}>グループ</StyledIconName>
          </StyledSideBarElements>
        </StyledLink>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <StyledLink to={"/setting"}>
          <StyledSideBarElements theme={theme}  style={props.page.startsWith('/setting') ? {backgroundColor: theme.palette.background.hover} : null}>
            {props.page.startsWith('/setting') ? <StyledSettings color='secondary' /> : <StyledSettingsOutlined color="icon"/>}
            <StyledIconName style={{color: theme.palette.text.main}}>設定</StyledIconName>
          </StyledSideBarElements>
        </StyledLink>
      </StyledSideBarCell>

    </StyledSideBar>
  )
}


const StyledSideBar = styled.div`
    z-index: 100;
    position: fixed;
    width: 75px;
    height: 100vh;
    padding: 5px;
`

const StyledSideBarCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
`

const StyledLink = styled(Link)`
  && {
    width: 100%;
    height: 100%;
    color: #000;
    text-decoration: none;
  }
`

const StyledSideBarElements = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.palette.background.hover};
    }
`

const StyledHomeIcon = styled(HomeIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledHomeOutlinedIcon = styled(HomeOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`
const StyledShoppingCartOutlinedIcon = styled(ShoppingCartOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledGroupIcon = styled(GroupIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledGroupOutlinedIcon = styled(GroupOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledFolderSharedIcon = styled(FolderSharedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledFolderSharedOutlinedIcon = styled(FolderSharedOutlinedIcon)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledSettings = styled(Settings)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledSettingsOutlined = styled(SettingsOutlined)`
    && {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-bottom: -10px;
    }
`

const StyledIconName = styled.p`
    width: 100%;
    font-size 0.7rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`


export default SideBar