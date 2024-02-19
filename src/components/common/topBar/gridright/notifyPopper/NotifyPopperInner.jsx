import { SettingsOutlined } from '@mui/icons-material';
import { Avatar, Badge, CircularProgress, Divider, List, ListItemButton, ListItemText, Paper, Popper, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { formatRelativeTime } from '../../../../../utils/formatRelativeTime';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEnv } from '../../../../../provider/EnvProvider';


const NotifyPopperInner = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isNextLoading, setIsNextLoading] = useState(true);
    const [notifies, setNotifies] = useState();
    const [pageNumber, setPasgeNumber] = useState(1);
    const user = useSelector((state) => state.user.value);
    const PAGE_SIZE = 10;
    const notifyPopperRef = useRef(null);
    const notifyRef = useRef();
    const theme = useTheme();
    const { backendAccessPath } = useEnv();

    const handleScroll = async () => {
        try {
            // スクロール位置が一番下に達したら新しいデータをフェッチ (スクロール最下層判定誤差1px許容)
            if (notifyRef.current.scrollHeight - (notifyRef.current.scrollTop + notifyRef.current.clientHeight) <= 1) {
                const response = await axios.get(`${backendAccessPath}/client/notify/get/${user._id}?page=${pageNumber + 1}&pageSize=${PAGE_SIZE}`);
            if (response.data.length === 0) {
                setIsNextLoading(false);
                return; // 通知がそれ以上フェッチできない場合、終了
            }
            setNotifies((prev) => [...prev, ...response.data]);
            setPasgeNumber((prev) => (prev + 1));
        }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        props.setNotifyAnchorEl(null);
        props.setIsNotifyPopperOpen(false);
    }

    useEffect(() => {
        const handleNotifyPopperClose = (e) => {
            if (props.notifyAnchorEl && notifyPopperRef && !props.notifyAnchorEl.contains(e.target) && !notifyPopperRef.current.contains(e.target)) {
                props.setNotifyAnchorEl(null);
                props.setIsNotifyPopperOpen(false);
            }
        }
        document.addEventListener('click', handleNotifyPopperClose);
    
        return () => {
            document.removeEventListener('click', handleNotifyPopperClose);
        }
    }, [props]);

    useEffect(() => {
        const fetchNotifies = async () => {
            try {
                if (user) {
                    const response = await axios.get(`${backendAccessPath}/client/notify/get/${user._id}/?page=${1}&pageSize=${PAGE_SIZE}`);
                    setNotifies(response.data);
                    if (response.data.length < 10) {
                        setIsNextLoading(false);
                    }
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchNotifies();
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledPopper open={props.isNotifyPopperOpen} anchorEl={props.notifyAnchorEl} placement='bottom-end' ref={notifyPopperRef}>
            <StyledNotifyPopperPaper theme={theme} elevation={3}>

            <StyledNotifyListHeader>
                <div style={{color: theme.palette.text.main}}>通知</div>
                <SettingsOutlined sx={{color: theme.palette.icon.main}}/>
            </StyledNotifyListHeader>

            <Divider style={{borderBottom: `solid 0.5px ${theme.palette.line.main}`}}/>

            {!isLoading ?
            <StyledNotifyList ref={notifyRef} onScroll={handleScroll}>
                {notifies.map((notify, index) => 
                    <Link key={index} onClick={handleClose} style={{textDecoration: "none"}} to={notify.class === "アドミン" ? `user/${notify.from._id}` : "#"}>
                        <StyledNotifyListItemButton theme={theme}>
                            <Badge color='secondary' variant='dot'>
                                <StyledNotifyAvatar src={`${backendAccessPath}/uploads/userIcons/${notify.from.icon}`}/>
                            </Badge>
                            <div>
                                <ListItemText primary={notify.main}
                                primaryTypographyProps={{
                                color: theme.palette.text.main,
                                fontSize: "0.9rem",
                                }}/>
                                <StyledTimeAgo style={{color: theme.palette.text.sub}}>{formatRelativeTime(notify.createdAt)}</StyledTimeAgo>
                            </div>
                        </StyledNotifyListItemButton>
                    </Link>
                )}
                {isNextLoading &&
                <StyledNextZone>
                    <CircularProgress color='secondary'/>
                </StyledNextZone>
                }
            </StyledNotifyList>
            :
            user &&
            <StyledNextZone>
                <CircularProgress color='secondary'/>
            </StyledNextZone>
            }

            </StyledNotifyPopperPaper>
        </StyledPopper>
    )
}


const StyledPopper = styled(Popper)`
    && {
        z-index: 200;
    }
`

const StyledNotifyPopperPaper = styled(Paper)`
    && {
        height: 600px;
        max-height: calc(100vh - 55px);
        width: 425px;
        max-width: 60vw;
        border-radius: 15px;
        background-color: ${(props) => props.theme.palette.background.profilePop};
    }
`

const StyledNotifyListHeader = styled.div`
    && {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        width: 95%;
        margin: 0 auto;
    }
`

const StyledNotifyList = styled(List)`
    && {
        height: calc(100% - 50px);
        overflow-y: scroll;

        &::-webkit-scrollbar {
        display: none;
        width: 10px;
        }
        &::-webkit-scrollbar-track {
        background-color: transparent;
        }

        &:hover {
        &::-webkit-scrollbar {
            display: inline;
        }
        }
    }
`

const StyledNextZone = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
`

const StyledNotifyListItemButton = styled(ListItemButton)`
    && {
    align-items: start;
    gap: 20px;
    min-height: 100px;
    width: 415px;
    padding: 15px;
    cursor: pointer;

    .MuiTouchRipple-child {
        background-color: ${(props) => props.theme.palette.secondary.main};
    }

    &:nth-child(1) {
        margin-top: -8px;
    }

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover}
    }
    }
`

const StyledNotifyAvatar = styled(Avatar)`
    && {
    width: 50px;
    height: 50px;
    }
`

const StyledTimeAgo = styled.div`
    font-size: 0.8rem;
    margin-top: 15px;
`


export default NotifyPopperInner