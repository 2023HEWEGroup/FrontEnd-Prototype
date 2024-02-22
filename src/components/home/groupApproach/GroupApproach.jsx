import { Avatar, Button, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { ArrowBackIosNew, ArrowForwardIos, Inventory, People, StarBorder } from '@mui/icons-material';
import { useEnv } from '../../../provider/EnvProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';


const GroupApproach = () => {

    const [groups, setGroups] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { backendAccessPath } = useEnv();
    const PAGE_SIZE = 10;
    const theme = useTheme();

    const CustomGroupArrow = ({ onClick, theme, direction }) => {
        return (
        <StyledCustomGroupArrow theme={theme} onClick={onClick} style={direction === "prev" ? {left: "-100px"} : {right: "-100px"}}>
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

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/group/randomGroup?pageSize=${PAGE_SIZE}`);
                setGroups(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGroups();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {!isLoading &&
        <StyledGroupApproach>
            <StyledGroupSlider {...groupSlideSettings} theme={theme}>
                {groups.map((group, index) => 
                        <StyledGroupSlide  key={index} backHeader={`${backendAccessPath}/uploads/groupHeaders/${group.header ? group.header : null}`}>
                            <Link to={`/group/${group._id}`} style={{width: "100%", height: "100%", textDecorationLine: "none"}}>
                                <StyledSlideInner theme={theme}>
                                    <StyledSlideHeader>
                                        <StyledGroupIconParent>
                                            <StyledAvatar src={`${backendAccessPath}/uploads/groupIcons/${group.icon ? group.icon : null}`} variant="square"/>
                                        </StyledGroupIconParent>
                                        <StyledGroupName theme={theme}>{group.name}</StyledGroupName>
                                    </StyledSlideHeader>
                                    <StyledSlideDesc>
                                        <StyledGroupDesc theme={theme}>
                                            {group.desc}
                                        </StyledGroupDesc>
                                        <StyledGroupInfo theme={theme}>
                                            <div style={{display: "flex", gap: "5px"}}><People />{group.member.length}</div>
                                            <div style={{display: "flex", gap: "5px"}}><Inventory />{group.products.length}</div>
                                            <div style={{display: "flex", gap: "5px"}}><StarBorder />{group.star}</div>
                                        </StyledGroupInfo>
                                    </StyledSlideDesc>
                                </StyledSlideInner>
                            </Link>
                        </StyledGroupSlide>
                )}
            </StyledGroupSlider>
        </StyledGroupApproach>
        }
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
        background-image: url(${(props => props.backHeader)});
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
    width: 100%;
    height: 100%;
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
    color: ${(props) => props.theme.palette.text.main2};
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
    color: ${(props) => props.theme.palette.text.main2};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
`

const StyledGroupInfo = styled.div`
    display: flex;
    gap: 50px;
    color: ${(props) => props.theme.palette.text.main2};
`

const StyledCustomGroupArrow = styled.div`
    z-index: 50;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100px;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    background-color: transparent;

    &: hover {
        border: solid 1px ${(props) => props.theme.palette.line.main};
    }
`


export default GroupApproach