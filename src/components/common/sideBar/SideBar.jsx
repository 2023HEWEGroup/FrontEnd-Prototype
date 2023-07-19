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
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';


const SideBar = (props) => {

  const theme = useTheme();

  return (
    <StyledSideBar style={{backgroundColor: theme.palette.primary.main}}>
      
      <StyledSideBarCell>
        <Tooltip title="ホーム" placement='right' arrow={true}>
          <StyledLink to={"/home"}>
            <StyledSideBarElements>
              {props.page === "/home" ? <StyledHomeIcon color='secondary' /> : <StyledHomeOutlinedIcon color="icon"/>}
              <StyledIconName>ホーム</StyledIconName>
            </StyledSideBarElements>
          </StyledLink>
        </Tooltip>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <Tooltip title="商品" placement='right' arrow={true}>
          <StyledLink to={"/product"}>
            <StyledSideBarElements>
              {props.page === "/product" ? <StyledShoppingCartIcon color='secondary' /> : <StyledShoppingCartOutlinedIcon color="icon"/>}
              <StyledIconName>商品</StyledIconName>
            </StyledSideBarElements>
          </StyledLink>
        </Tooltip>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <Tooltip title="フォロー中" placement='right' arrow={true}>
          <StyledLink to={"/following"}>
            <StyledSideBarElements>
              {props.page === "/following" ? <StyledGroupIcon color='secondary' /> : <StyledGroupOutlinedIcon color="icon"/>}
              <StyledIconName>フォロー中</StyledIconName>
            </StyledSideBarElements>
          </StyledLink>
        </Tooltip>
      </StyledSideBarCell>

      <StyledSideBarCell>
        <Tooltip title="グループ" placement='right' arrow={true}>
          <StyledLink to={"/group"}>
            <StyledSideBarElements>
              {props.page === "/group" ? <StyledFolderSharedIcon color='secondary' /> : <StyledFolderSharedOutlinedIcon color="icon"/>}
              <StyledIconName>グループ</StyledIconName>
            </StyledSideBarElements>
          </StyledLink>
        </Tooltip>
      </StyledSideBarCell>

    </StyledSideBar>
  )
}


const StyledSideBar = styled.div`
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
      background-color: rgba(0, 0, 0, 0.1);
      transition: 0.2s;
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

const StyledIconName = styled.p`
    width: 100%;
    font-size 0.7rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`


export default SideBar