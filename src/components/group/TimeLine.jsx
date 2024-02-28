import { Avatar, Box, CircularProgress, Typography, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useEnv } from '../../provider/EnvProvider';
import { Link } from 'react-router-dom';


const TimeLine = (props) => {

    const [isLoading, setIsLoading]= useState(true);
    const [users, setUsers] = useState({});
    const theme = useTheme();
    const { backendAccessPath, siteAssetsPath } = useEnv();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/group/getMember/${props.group._id}?page=${1}&pageSize=${props.group.member.length}`);
                let obj = {};
                for (const user of response.data) {
                    obj[user._id] = user;
                }
                setUsers(obj)
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, [props.group.chat]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!isLoading ?
            <Box display="flex" justifyContent="start" alignItems="center" flexDirection="column" width="95%" margin="0 auto" padding="25px 0">
                {props.group.chat.map((chat, index) => 
                    chat._id !== props.currentUser._id ?
                    users[chat._id] ?
                    <Box key={index} display="flex" justifyContent="start" alignItems="center" width="100%" paddingTop={(index > 0 && chat._id === props.group.chat[index - 1]._id) ? "5px" : "30px"}>
                        <Box display="flex" gap="10px" justifyContent="start" alignItems="start" maxWidth="90%">
                            {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? <Avatar style={{opacity: 0}} /> : <Link to={`/user/${chat._id}`} style={{textDecoration: "none"}}><Avatar src={users[chat._id].icon ? `${backendAccessPath}/uploads/userIcons/${users[chat._id].icon}` : `${siteAssetsPath}/default_icons/${users[chat._id].defaultIcon}`}/></Link>}
                            <Box>
                                {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? null : <Typography variant="body1" color={theme.palette.text.sub} style={{paddingBottom: "5px"}}>{users[chat._id].username}</Typography>}
                                <Box display="flex" alignItems="end" gap="5px">
                                    <StyledComment currentId={props.currentUser._id} chatId={chat._id} theme={theme}>{chat.chat}</StyledComment>
                                    <Typography variant='body2' color={theme.palette.text.sub} style={{fontSize: "0.8rem"}}>14:30</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <Box key={index} display="flex" justifyContent="start" alignItems="center" width="100%" paddingTop={(index > 0 && chat._id === props.group.chat[index - 1]._id) ? "5px" : "30px"}>
                        <Box display="flex" gap="10px" justifyContent="start" alignItems="start" maxWidth="90%">
                        {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? <Avatar style={{opacity: 0}} /> : <Link to={`/user/${chat._id}`} style={{textDecoration: "none"}}><Avatar src={`${siteAssetsPath}/default_group_icons/${props.group.defaultIcon}`}/></Link>}
                            <Box>
                                {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? null : <Typography variant="body1" color={theme.palette.text.sub} style={{paddingBottom: "5px"}}>退会したメンバー</Typography>}
                                <Box display="flex" alignItems="end" gap="5px">
                                    <StyledComment currentId={props.currentUser._id} chatId={chat._id} theme={theme}>{chat.chat}</StyledComment>
                                    <Typography variant='body2' color={theme.palette.text.sub} style={{fontSize: "0.8rem"}}>14:30</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    :

                    users[chat._id] ?
                    <Box key={index} display="flex" justifyContent="end" alignItems="center" width="100%" paddingTop={(index > 0 && chat._id === props.group.chat[index - 1]._id) ? "5px" : "30px"}>
                        <Box display="flex" gap="10px" justifyContent="end" alignItems="start" maxWidth="90%">
                            <Box display="flex" flexDirection="column" alignItems="end">
                            {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? null : <Typography variant="body1" color={theme.palette.text.sub} style={{paddingBottom: "5px"}}>{users[chat._id].username}</Typography>}
                                <Box display="flex" alignItems="end" gap="5px">
                                    <Typography variant='body2' color={theme.palette.text.sub} style={{fontSize: "0.8rem"}}>14:30</Typography>
                                    <StyledComment currentId={props.currentUser._id} chatId={chat._id} theme={theme}>{chat.chat}</StyledComment>
                                </Box>
                            </Box>
                            {(index > 0 && chat._id === props.group.chat[index - 1]._id) ?  <Avatar style={{opacity: 0}} /> : <Link to={`/user/${chat._id}`} style={{textDecoration: "none"}}><Avatar src={users[chat._id].icon ? `${backendAccessPath}/uploads/userIcons/${users[chat._id].icon}` : `${siteAssetsPath}/default_icons/${users[chat._id].defaultIcon}`}/></Link>}
                        </Box>
                    </Box>
                    :
                    <Box key={index} display="flex" justifyContent="end" alignItems="center" width="100%" paddingTop={(index > 0 && chat._id === props.group.chat[index - 1]._id) ? "5px" : "30px"}>
                        <Box display="flex" gap="10px" justifyContent="end" alignItems="start" maxWidth="90%">
                            <Box display="flex" flexDirection="column" alignItems="end">
                            {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? null : <Typography variant="body1" color={theme.palette.text.sub} style={{paddingBottom: "5px"}}>退会したメンバー</Typography>}
                                <Box display="flex" alignItems="end" gap="5px">
                                    <Typography variant='body2' color={theme.palette.text.sub} style={{fontSize: "0.8rem"}}>14:30</Typography>
                                    <StyledComment currentId={props.currentUser._id} chatId={chat._id} theme={theme}>{chat.chat}</StyledComment>
                                </Box>
                            </Box>
                            {(index > 0 && chat._id === props.group.chat[index - 1]._id) ? <Avatar style={{opacity: 0}} /> : <Link to={`/user/${chat._id}`} style={{textDecoration: "none"}}><Avatar src={`${siteAssetsPath}/default_group_icons/${props.group.defaultIcon}`}/></Link>}
                        </Box>
                    </Box>
                )}
            </Box>
            :
            <Box display="flex" justifyContent="center" alignItems="center" height="75px">
                <CircularProgress color='secondary' />
            </Box>
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
    width: fit-content;
`


export default TimeLine