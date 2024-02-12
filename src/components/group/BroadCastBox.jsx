import { Fullscreen } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, Typography } from '@mui/material';
import axios from 'axios';


const BroadCastBox = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [liver, setLiver] = useState(null);
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;

    const handleEnterRoom = (roomId, userId, groupId, index) => {
        props.handleEnterRequest(roomId, userId, groupId, index);
        // 配信ウィンドウを開く
        window.open(`/broadcastAudience/${props.room.roomId}`, '_blank', 'width=600, height=400');
    };

    useEffect(() => {
        const fetchLiver = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/user/getById/${props.room.liverId}`);
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
        <StyledRoom onClick={() => handleEnterRoom(props.room.roomId, props.currentUser._id, props.group._id, props.index)}>
            <StyledDarkness />
            <Avatar sx={{ width: 56, height: 56 }} src={liver.icon ? `http://localhost:5000/uploads/userIcons/${liver.icon}` : `${siteAssetsPath}/default_icons/${liver.defaultIcon}`} />
            <StyledIconOpacity>
                <Typography sx={{color: "#fff", position: "absolute", top: 0, left: 0, width: "100%", padding: "5px 10px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} variant='body1'>{props.room.name}</Typography>
                <Fullscreen style={{color: "#fff"}} fontSize='large'/>
            </StyledIconOpacity>
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
    width: calc(50% - 30px);
    aspect-ratio: 16/9;
    cursor: pointer;
    background-color: #a677df;
    border-radius: 5px;
    overflow: hiddden;
`

const StyledDarkness = styled.div`
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`

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