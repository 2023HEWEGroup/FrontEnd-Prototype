import { AppBar, Box, CircularProgress, Dialog, DialogContent, DialogTitle, Slide, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { useEnv } from '../../provider/EnvProvider';
import { Close } from '@mui/icons-material';
import GroupCard from './GroupCard';


const SlideTransition = forwardRef((props, ref) => {
    return <Slide {...props} ref={ref} direction="left" />;
});


const MyGroups = (props) => {

    const [groups, setGroups] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const PAGE_SIZE = props.currentUser?.groups.length;
    const { backendAccessPath } = useEnv();

    useEffect(() => {
        if (props.open) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, [props.open]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/group/userGroup/${props.currentUser._id}?page=${1}&pageSize=${PAGE_SIZE}`);
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
        <Dialog fullScreen scroll='paper' open={props.open} onClose={() => props.setOpen(false)} TransitionComponent={SlideTransition}>
            <DialogTitle style={{marginTop: "30px"}}>
                <AppBar>
                    <Toolbar >
                        <Tooltip title="Esc" placement="bottom">
                            <Close onClick={() => props.setOpen(false)} style={{color: theme.palette.text.main, cursor: "pointer"}}/>
                        </Tooltip>
                        <Typography variant='h6' fontWeight="bold" color={theme.palette.text.main} style={{marginLeft: "10px"}}>マイグループ一覧</Typography>
                    </Toolbar>
                </AppBar>
            </DialogTitle>

            <DialogContent style={{backgroundColor: theme.palette.primary.main, padding: "20px 0"}} >
                {!isLoading ?
                    <Box width="80%" margin="0 auto" display="flex" justifyContent="start" alignItems="start" flexWrap="wrap" gap="20px">
                        {groups.map((group, index) => 
                            <GroupCard key={index} group={group}/>
                        )}
                    </Box>
                :
                <Box width="100%" height="100px" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color='secondary'/>
                </Box>
                }
            </DialogContent>
        </Dialog>
        </>
    )
}


export default MyGroups