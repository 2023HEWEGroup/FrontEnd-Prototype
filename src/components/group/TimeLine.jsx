import { Avatar, Box, Typography, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useEnv } from '../../provider/EnvProvider';


const TimeLine = (props) => {

    const [isLoading, setIsLoading]= useState(true);
    const [users, setUsers] = useState({});
    const theme = useTheme();
    const { backendAccessPath, siteAssetsPath } = useEnv();

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`${backendAccessPath}/client/user/getById/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            for (const chat of props.group.chat) {
                if (!users[chat._id]) {
                    const user = await fetchUser(chat._id);
                    users[chat._id] = user;
                }
            }
            setUsers(users);
            setIsLoading(false);
        };
        fetchUsers();
    }, [props.group.chat]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!isLoading ?
            <Box display="flex" justifyContent="start" alignItems="center" flexDirection="column" gap="30px" width="95%" margin="0 auto" padding="25px 0">
                {props.group.chat.map((chat, index) => 
                    chat._id !== props.currentUser._id ?
                    <Box key={index} display="flex" justifyContent="start" alignItems="center" width="100%">
                        <Box position="relative" display="flex" gap="10px" justifyContent="start" alignItems="center" width="fit-content">
                            <Avatar src={users[chat._id] ? users[chat._id].icon ? `${backendAccessPath}/uploads/userIcons/${users[chat._id].icon}` : `${siteAssetsPath}/default_icons/${users[chat._id].defaultIcon}` : null}/>
                            <StyledComment currentId={props.currentUser._id} chatId={chat._id} theme={theme}>{chat.chat}</StyledComment>
                            <Typography variant='body2' color={theme.palette.text.sub} style={{position: "absolute", bottom: 0, right: 0, transform: "translateY(100%)"}}>aaaaaaaaaaa</Typography>
                        </Box>
                    </Box>
                    :
                    <Box key={index} display="flex" justifyContent="end" alignItems="center" width="100%">
                        <Box position="relative" display="flex" gap="10px" justifyContent="start" alignItems="center" width="fit-content">
                            <StyledComment currentId={props.currentUser._id} chatId={chat._id} theme={theme}>{chat.chat}</StyledComment>
                            <Avatar src={users[chat._id] ? users[chat._id].icon ? `${backendAccessPath}/uploads/userIcons/${users[chat._id].icon}` : `${siteAssetsPath}/default_icons/${users[chat._id].defaultIcon}` : null}/>
                            <Typography variant='body2' color={theme.palette.text.sub} style={{position: "absolute", bottom: 0, left: 0, transform: "translateY(100%)"}}>aaaaaaaaaaa</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
            :
            null
            }
        </>
    )
}


const StyledComment = styled.div`
    background-color: ${(props) => props.currentId === props.chatId ? props.theme.palette.secondary.main : props.theme.palette.background.profilePop};
    color: ${(props) => props.currentId === props.chatId ? props.theme.palette.text.main2 : props.theme.palette.text.main};
    padding: 10px;
    border-radius: 5px;
    word-break: break-all;
    white-space: pre-line;
`


export default TimeLine