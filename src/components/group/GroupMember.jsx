import { Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useEnv } from '../../provider/EnvProvider';
import { KeyboardArrowRight } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VerifiedBadge from '../../layouts/badges/VerifiedBadge';
import styled from 'styled-components';


const GroupMember = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const theme = useTheme();
    const PAGE_SIZE = 20;
    const { siteAssetsPath, backendAccessPath } = useEnv();

    const returnBadgeNameOwner = (user) => {
        if (user.isAuthorized) {
        return (<span style={{display: "flex", alignItems: "center", gap: "2px"}}><VerifiedBadge fontSize="small" />{user.username + "(オーナー)"}</span>)
        } else {
        return (<span style={{display: "flex", alignItems: "center", gap: "2px"}}>{user.username}</span>)
        }
    }

    const returnBadgeName = (user) => {
        if (user.isAuthorized) {
        return (<span style={{display: "flex", alignItems: "center", gap: "2px"}}><VerifiedBadge fontSize="small" />{user.username}</span>)
        } else {
        return (<span style={{display: "flex", alignItems: "center", gap: "2px"}}>{user.username}</span>)
        }
    }

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/group/getMember/${props.group._id}?page=${1}&pageSize=${PAGE_SIZE}`);
                setUsers(response.data);
                setIsLoading(false);
            } catch (err) {
                
            }
        };
        fetchMembers();
    }, [props.group]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                if (props.chatBottom) {
                    const response = await axios.get(`${backendAccessPath}/client/group/getMember/${props.group._id}?page=${pageNumber + 1}&pageSize=${PAGE_SIZE}`);
                    setPageNumber((prev) => (prev + 1));
                    setUsers((prev) => [...prev, ...response.data]);
                    setIsLoading(false);
                }
            } catch (err) {

            }
        };
        fetchMembers();
    }, [props.chatBottom]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width="95%" margin="0 auto" padding="10px 0">
            {!isLoading ?
            <List>
                {users.map((user, index) => 

                user._id === props.group.owner._id ?
                <Link key={index} to={`/user/${user._id}`} style={{textDecoration: "none"}}>
                    <StyledListItem theme={theme}>
                        <ListItemAvatar>
                            <Avatar src={user.icon ? `${backendAccessPath}/uploads/userIcons/${user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}`} />
                        </ListItemAvatar>
                        <ListItemText theme={theme} primary={returnBadgeNameOwner(user)} secondary={"@" + user.userId} 
                        primaryTypographyProps={{ color: theme.palette.broadcast.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItem>
                </Link>
                :
                <Link key={index} to={`/user/${user._id}`} style={{textDecoration: "none"}}>
                    <StyledListItem theme={theme}>
                        <ListItemAvatar>
                            <Avatar src={user.icon ? `${backendAccessPath}/uploads/userIcons/${user.icon}` : `${siteAssetsPath}/default_icons/${user.defaultIcon}`} />
                        </ListItemAvatar>
                        <ListItemText theme={theme} primary={returnBadgeName(user)} secondary={"@" + user.userId} 
                        primaryTypographyProps={{ color: theme.palette.text.main }} secondaryTypographyProps={{ color: theme.palette.text.sub }}/>
                        <KeyboardArrowRight style={{color: theme.palette.icon.main}}/>
                    </StyledListItem>
                </Link>
                )}
            </List>
            :
            <Box display="flex" justifyContent="center" alignItems="center" height="75px">
                <CircularProgress color='secondary' />
            </Box>
            }
        </Box>
    )
}


const StyledListItem = styled(ListItem)`
    && {
        transition: background-color ease-in-out 0.1s;
        &:hover {
            background-color: ${(props) => props.theme.palette.background.hover2};
        }
    }
`


export default GroupMember