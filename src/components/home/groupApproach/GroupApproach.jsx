import { Avatar, Button, useTheme } from '@mui/material';
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { ArrowBackIosNew, ArrowForwardIos, Inventory, People } from '@mui/icons-material';


const GroupApproach = () => {
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const theme = useTheme();

    const CustomGroupArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomGroupArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: "-50px"} : {right: "-50px"}}>
            <StyledButton theme={theme}>
            {direction === "prev" ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </StyledButton>
        </StyledCustomGroupArrow>
        );
    };

    const groupSlideSettings = {
        infinite: true,
        speed: 350,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomGroupArrow theme={theme} direction="prev"/>,
        nextArrow: <CustomGroupArrow theme={theme} direction="next"/>,
    }

    const groupSlides = [
        {id: 1, groupIconUrl: `${siteAssetsPath}/tanoc_icon.png`, groupHeaderUrl: `${siteAssetsPath}/image_copy.png`, groupName: "HARDCORE TANO*C", desc: "Everybody Say 'HARDCORE TANO*C !!!!!'", userNum: 100, productNum: 30},
        {id: 2, groupIconUrl: `${siteAssetsPath}/tanoc_icon_black.png`, groupHeaderUrl: `${siteAssetsPath}/image_copy.png`, groupName: "CODING KURU*C", desc: "Reactの作業量おかしいんじゃないかww", userNum: 66, productNum: 24},
        {id: 3, groupIconUrl: `${siteAssetsPath}/demae.png`, groupHeaderUrl: `${siteAssetsPath}/image_copy.png`, groupName: "CODING KURU*Cんじゃこらwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", desc: "推しと組体操したいです(率直)", userNum: 500, productNum: 64},
        {id: 4, groupIconUrl: `${siteAssetsPath}/elon.png`, groupHeaderUrl: `${siteAssetsPath}/maxresdefault.jpg`,groupName: "グループE", desc: "グループEはすばらしい(当社比)", userNum: 7558, productNum: 500},
        {id: 5, groupIconUrl: `${siteAssetsPath}/ikaruga.png`, groupHeaderUrl: `${siteAssetsPath}/maxresdefault.jpg`, groupName: "釣り", desc: "フィッシング(ハンティング)にいきたい", userNum: 123, productNum: 50},
        {id: 6, groupIconUrl: `${siteAssetsPath}/tanoc_icon_black.png`, groupHeaderUrl: `${siteAssetsPath}/senzyou.png`, groupName: "The Vibe Cafe", desc: "カフェいきたすぎるああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああカフェいきたすぎるああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああカフェいきたすぎるああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああカフェいきたすぎるああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ", userNum: 98, productNum: 33}
    ]

    return (
        <>
        <StyledGroupApproach>
            <StyledGroupSlider {...groupSlideSettings} theme={theme}>
                {groupSlides.map(groupSlide => 
                    <StyledGroupSlide key={groupSlide.id} slideUrl={groupSlide.groupHeaderUrl}>
                        <StyledSlideInner theme={theme}>
                            <StyledSlideHeader>
                                <StyledGroupIconParent>
                                    <StyledAvatar src={groupSlide.groupIconUrl} variant="square"/>
                                </StyledGroupIconParent>
                                <StyledGroupName theme={theme}>{groupSlide.groupName}</StyledGroupName>
                            </StyledSlideHeader>
                            <StyledSlideDesc>
                                <StyledGroupDesc theme={theme}>
                                    {groupSlide.desc}
                                </StyledGroupDesc>
                                <StyledGroupInfo theme={theme}>
                                    <div style={{display: "flex", gap: "5px"}}><People />{groupSlide.userNum}</div>
                                    <div style={{display: "flex", gap: "5px"}}><Inventory />{groupSlide.productNum}</div>
                                </StyledGroupInfo>
                            </StyledSlideDesc>
                        </StyledSlideInner>
                    </StyledGroupSlide>
                )}
            </StyledGroupSlider>
        </StyledGroupApproach>
    </>
    )
}


const StyledGroupApproach = styled.div`
    width: 80%;
    height: fit-content;
`

const StyledButton = styled(Button)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: ${(props) => props.theme.palette.text.tab};
    }
`

const StyledGroupSlider = styled(Slider)`
    && {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`

const StyledGroupSlide = styled.div`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-image: url(${(props => props.slideUrl)});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
`

const StyledSlideInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    background: ${(props) => props.theme.palette.background.groupApproachBackground};
`

const StyledSlideHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 30%;
    height: 100%;
`

const StyledGroupIconParent = styled.div`
    aspect-ratio: 1/1;
    width: 60%;
    border-radius: 5px;
    overflow: hidden;
`


const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledGroupName = styled.div`
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1.2rem;
    font-weight: bold;
    width: 90%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledSlideDesc = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 70%;
    height: 100%;
`

const StyledGroupDesc = styled.div`
    width: 90%;
    height: 100%;
    color: ${(props) => props.theme.palette.text.main};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
`

const StyledGroupInfo = styled.div`
    display: flex;
    gap: 50px;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledCustomGroupArrow = styled.div`
    z-index: 50;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 50px;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    background-color: transparent;

    &: hover {
        border: solid 1px ${(props) => props.theme.palette.line.main};
        background-color: ${(props) => props.theme.palette.background.slideHover};
    }
`


export default GroupApproach