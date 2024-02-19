import { Circle, PeopleAltOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, Box, Chip, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEnv } from '../../provider/EnvProvider';


const BroadCastBox = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [liver, setLiver] = useState(null);
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSideOpen = useSelector((state => state.floatSideBar.value));
    const { siteAssetsPath, backendAccessPath } = useEnv();
    const theme = useTheme();

    const handleEnterRoom = (roomId, userId, groupId) => {
        props.handleEnterRequest(roomId, userId, groupId); // 一応SocketIOの方でも入室可否を問う (参加中なら拒否)
        // 配信ウィンドウを開く (配信に参加していないなら)
        if (!props.isLiving && !props.isParticipating) window.open(`/broadcastAudience/${props.room.roomId}?groupId=${props.group._id}`, '_blank', 'width=600, height=400');
    };

    useEffect(() => {
        const fetchLiver = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/user/getById/${props.room.liverId}`);
                setLiver(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchLiver();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {!isLoading ?
        <StyledRoom $isXsScreen={isXsScreen} $isMiddleScreen={isMiddleScreen} $isSideOpen={isSideOpen} room={props.room} currentUser={props.currentUser._id} theme={theme} onClick={() => handleEnterRoom(props.room.roomId, props.currentUser._id, props.group._id, props.index)}>

            <StyledIconOpacity>
                <Chip theme={theme} label={props.room.liverId === props.currentUser._id ? "あなたの配信" : props.room.users.some(user => user.userId === props.currentUser._id) ? "視聴中" : "配信を見る"} style={{backgroundColor: "#555", color: "#fff", fontSize: "0.8rem", cursor: "pointer"}}/>
            </StyledIconOpacity>

            <Box display="flex" flexDirection="column" justifyContent="space-between" width="100%" height="100%" padding="5px 10px">
                <Typography sx={{color: "#fff", width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} variant='body1'>{props.room.name}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap="5px" style={{color: "#fff"}}>
                        <Box display="flex" gap="2px" alignItems="center">
                            <Circle style={{color: "#f00"}} fontSize='20px' />
                            <PeopleAltOutlined fontSize='small'/>
                        </Box>
                        <span>{props.room.users.length}</span>
                    </Box>
                    <Tooltip title={props.room.liverName} arrow placement='bottom'>
                        <Avatar sx={{width: "30px", height: "30px", zIndex: 20}} src={liver.icon ? `${backendAccessPath}/uploads/userIcons/${liver.icon}` : `${siteAssetsPath}/default_icons/${liver.defaultIcon}`} />
                    </Tooltip>
                </Box>
            </Box>
        </StyledRoom>
        :
        null
        }
        </>
    )
}


const StyledRoom = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(${(props) => props.$isXsScreen || (props.$isMiddleScreen && props.$isSideOpen) ? "100%" : "50%"} - 30px);
    aspect-ratio: 16/9;
    cursor: pointer;
    background-color: #000;
    outline: ${(props) => props.room.users.some(user => user.userId === props.currentUser) ? `solid 3px ${props.theme.palette.broadcast.main}` : `solid 1px ${props.theme.palette.broadcast.boxLine}`};
    border-radius: 5px;
    z-index: 1;

    ${(props) => props.room.users.some(user => user.userId === props.currentUser) ?
    `
    &::before, &::after {
        z-index: -1; 
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        pointer-events: none;
        animation: waveAnimation 3s linear infinite;
    }

    &::after {
        animation-delay: 2s;
    }

    @keyframes waveAnimation {
        0% {
            transform: scale(1);
            opacity: 1;
            background-color: transparent;
            outline: solid 1px ${props.theme.palette.broadcast.main};
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: scale(1.4);
            opacity: 0;
        }
    }
    `
    :
    null
    }
`;

const StyledIconOpacity = styled.div`
    z-index: 15;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    transition: opacity ease 0.2s;
    &:hover {
        opacity: 1;
    }
`


export default BroadCastBox