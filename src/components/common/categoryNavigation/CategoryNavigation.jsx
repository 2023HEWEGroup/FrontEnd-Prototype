import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { AppBar, Chip, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const CategoryNavigation = () => {

    const categories = [
        "すべての商品", "レディース", "メンズ", "ベビー・キッズ", "インテリア・住まい・小物", "本・音楽・ゲーム", "おもちゃ・ホビー・グッズ", "コスメ・香水。美容",
        "家電・スマホ・カメラ", "スポーツ・レジャー", "ハンドメイド", "チケット", "自動車・オートバイ", "食品", "ダイエット・健康", "花・園芸用品", "アート", "その他"
    ]

    const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
    const [isRightButtonVisible, setIsRightButtonVisible] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const theme = useTheme();
    const navRef = useRef(null);
    const isSideOpen = useSelector((state => state.floatSideBar.value));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isScrollable = useSelector((state => state.windowScrollable.value));

    const handleScroll = (direction) => {
        const navBar = navRef.current;
        if (navBar) {
            const scrollOffset = direction === "left" ? -1000 : 1000;
            navBar.scrollBy({
                left: scrollOffset,
                behavior: "smooth"
            })
        }
    }

    const handleIconVisible = () => {
        const navBar = navRef.current;
        setIsLeftButtonVisible(navBar.scrollLeft > 0);
        setIsRightButtonVisible(navBar.scrollLeft < navBar.scrollWidth - navBar.clientWidth - 10);
    }

    const handleSelectedCategory = (id) => {
        setSelectedCategoryId(id);
    }

    return (
        <>
        <StyledAppBar $isSideOpen={isSideOpen} $isSmallScreen={isSmallScreen} $isScrollable={isScrollable} style={ isSideOpen ? {top: "55px", left: "240px", width: "calc(100% - 240px)"} : {top: "55px", left: "75px", width: "calc(100% - 75px)"}}>
            <StyledCategoryBarParent>
                <StyledIconButtonLeft onClick={() => handleScroll("left")} theme={theme} style={isLeftButtonVisible ? null : {display: "none"}}>
                    <ArrowBack />
                </StyledIconButtonLeft>
                <StyledCategoryBar onScroll={handleIconVisible} ref={navRef}>
                    {categories.map((category, index) => (
                        <div key={index}>
                            <StyledChip label={category} clickable theme={theme}
                            style={selectedCategoryId === index + 1 ? {
                                backgroundColor: theme.palette.text.categoryActive,
                                color: theme.palette.background.categoryActive} : null}
                            onClick={() => handleSelectedCategory(index + 1)}/>
                        </div>
                    ))}
                </StyledCategoryBar>
                <StyledIconButtonRight onClick={() => handleScroll("right")} theme={theme} style={isRightButtonVisible ? null : {display: "none"}}>
                    <ArrowForward />
                </StyledIconButtonRight>
            </StyledCategoryBarParent>
        </StyledAppBar>
        <div style={{width: "100%", height: "60px"}}></div>
        </>
    )
}


const StyledAppBar = styled(AppBar)`
    && {
        z-index: 100;
        box-shadow: none;
        height: 60px;
        padding-right: ${(props) => (props.$isSideOpen && props.$isSmallScreen) || !props.$isScrollable ? '10px' : '0'};
    }
`

const StyledCategoryBarParent = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    overflow-y: hidden;
`

const StyledCategoryBar = styled.div`
    display: flex;
    justify-content: start;
    gap: 15px;
    width: calc(100% - 120px);
    margin: 0 auto;
    padding: 10px;
    overflow-x: scroll;

    &::-webkit-scrollbar{
        display: none;
    }
`

const StyledIconButtonLeft = styled(IconButton)`
    && {
        position: absolute;
        left: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.opacity};

        .MuiTouchRipple-child {
            background-color: transparent;
        }

        &:hover {
            background-color: ${(props) => props.theme.palette.background.opacityHover};
        }

        &:active {
            background-color: ${(props) => props.theme.palette.background.opacityActive};
        }
    }
`

const StyledIconButtonRight = styled(IconButton)`
    && {
        position: absolute;
        right: 10px;
        color: ${(props) => props.theme.palette.text.main};
        background-color: ${(props) => props.theme.palette.background.opacity};

        .MuiTouchRipple-child {
            background-color: transparent;
        }

        &:hover {
            background-color: ${(props) => props.theme.palette.background.opacityHover};
        }

        &:active {
            background-color: ${(props) => props.theme.palette.background.opacityActive};
        }
    }
`

const StyledChip = styled(Chip)`
    && {
        padding: 20px;
        color: ${(props) => props.theme.palette.text.main};
        border-radius: 5px;
        background-color: ${(props) => props.theme.palette.background.pop};

        .MuiTouchRipple-child {
            background-color: transparent;
        }

        &&:hover {
            background-color: ${(props) => props.theme.palette.background.hover};
        }
    }
`


export default CategoryNavigation