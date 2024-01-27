import React, { useEffect, useRef, useState } from 'react'
import TopBar from '../components/common/topBar/TopBar'
import SideBar from '../components/common/sideBar/SideBar'
import FloatSideBar from '../components/common/floatSideBar/FloatSideBar'
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'
import ImageSearchPopper from '../components/common/ImageSearchPopper'


const CommonLayouts = (props) => {

  const [isImagePopper, setIsImagePopper] = useState(false);
  const location = useLocation();
  const imagePopperRef = useRef();
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isScrollable = useSelector((state => state.windowScrollable.value));

  useEffect(() => {
    if ((isSmallScreen && isSideOpen) || (!isScrollable)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSmallScreen, isSideOpen, isScrollable]);

  useEffect(() => {
    const handleDragStart = (event) => {
      const draggedImageUrl = event.dataTransfer.getData('avatarImage');
      // 商品画像の場合にのみPopper表示(詳しくはproductCard内のAvatar::onDragStartを参照)
      if (draggedImageUrl) {
        setIsImagePopper(true);
      } else {
        // 商品画像以外が画面でドラッグされた場合受け付けない
        setIsImagePopper(false);
      }
    };

    const handleDragEnd = () => {
      // setIsImagePopper(false);
    };

    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);

    return () => {
      // クリーンアップ関数でイベントリスナーを削除する
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  return (
    <>
        <div style={{width: "100vw", position: "fixed", top: 0, left: 0}} ref={imagePopperRef}></div>
        {isImagePopper && <ImageSearchPopper open={isImagePopper} onClose={setIsImagePopper} imagePopperRef={imagePopperRef} setIsImagePopper={setIsImagePopper}/>}
        <div style={{width: "100%"}}>
          <TopBar page={location.pathname} setIsImagePopper={setIsImagePopper}/>
        </div>
        <FloatSideBar page={location.pathname} currentUser={props.currentUser}/>
        <div style={{width: "100vw", height: "55px"}}/>
        <StyledMain>
          {!isSmallScreen && <SideBar page={location.pathname}/>}
          <div style={isSideOpen ? (isSmallScreen ? {display: "none"} : {width: "240px", height: "100%"}) : (isSmallScreen ? {display: "none"} : {width: "75px", height: "100%"})}/>
          <div style={isSideOpen ? (isSmallScreen ? {width: "calc(100%)", height: "100%"} : {width: "calc(100% - 240px)", height: "100%"}) : (isSmallScreen ? {width: "calc(100%)", height: "100%"} : {width: "calc(100% - 75px)", height: "100%"})}>
            <StyledSmallScreenDarken $isSmallScreen={isSmallScreen} isSideOpen={isSideOpen}/>
            <Outlet />
          </div>
        </StyledMain>
    </>
  )
}


const StyledMain = styled.div`
  display: flex;
`

const StyledSmallScreenDarken = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.$isSmallScreen && props.isSideOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.$isSmallScreen && props.isSideOpen ? 'auto' : 'none')};
  transition: opacity 0.2s;
`


export default CommonLayouts