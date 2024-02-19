import { Inventory, People, Star } from '@mui/icons-material'
import { Avatar, AvatarGroup, Card, CardContent, CardHeader, Chip, Typography, useMediaQuery } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEnv } from '../../provider/EnvProvider'


const GroupCard = (props) => {

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }

    const theme = useTheme();
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { backendAccessPath } = useEnv();

    return (
        <StyledCard elevation={2} theme={theme} $isLargeScreen={isLargeScreen} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen} $isXsScreen={isXsScreen}>
            <Link to={`/group/${props.group._id}`} style={{textDecoration: "none"}}>
                <StyledCardHeader avatar={<Avatar variant='square' src={props.group.icon ? `${backendAccessPath}/uploads/groupIcons/${props.group.icon}` : null}/>} title={props.group.name} subheader={props.group.subTitle} titleTypographyProps={{ noWrap: true, color: theme.palette.text.main, fontSize: "1.2rem"}} subheaderTypographyProps={{ noWrap: true, color: theme.palette.text.sub}}></StyledCardHeader>
                <StyledCardContent>
                    <StyledTypography style={{ whiteSpace: 'pre-line'}} variant="body2" color={theme.palette.text.main}>
                        {props.group.desc}
                    </StyledTypography>
                </StyledCardContent>
                <StyledCardContent2>
                    {props.group.tags.map((tag, index) =>
                        <StyledTagChip key={index} theme={theme} clickable label={`# ${tag}`}/>
                    )}
                </StyledCardContent2>
                <StyledCardContent3  theme={theme}>
                    <Box display="flex" gap="10px">
                        <Box display="flex" gap="2px"><People style={{color: theme.palette.icon.comment}} fontSize='small'/><div>{formatNumber(props.group.member.length)}</div></Box>
                        <Box display="flex" gap="2px"><Inventory style={{color: theme.palette.icon.inventory}} fontSize='small'/><div>{formatNumber(props.group.products.length)}</div></Box>
                        <Box display="flex" gap="2px"><Star style={{color: theme.palette.icon.star}} fontSize='small'/><div>{formatNumber(props.group.star)}</div></Box>
                    </Box>
                    <AvatarGroup max={6} sx={{'& .MuiAvatar-root': { width: "30px", height: "30px", fontSize: 15 }}}>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                        <Avatar sx={{width: "30px", height: "30px"}}/>
                    </AvatarGroup>
                </StyledCardContent3>
            </Link>
        </StyledCard>
    )
}


const StyledCard = styled(Card)`
    && {
        display: flex;
        flex-direction: column;
        width: calc(${(props) => (props.$isXsScreen ? "100%" : (props.$isSmallScreen ? "50%" : (props.$isMiddleScreen ? "50%" : props.$isLargeScreen ? "33.3333%" : "25%")))} - 20px);
        height: fit-content;
        margin-bottom: 40px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        background-color: ${(props) => props.theme.palette.background.userCard};
    }
`

const StyledCardHeader = styled(CardHeader)`
    && {
        height: 80px;
    }
`

const StyledCardContent = styled(CardContent)`
    && {
        height: 80px;
    }
`

const StyledCardContent2 = styled(CardContent)`
    && {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        height: 50px;
        overflow: hidden;
    }
`

const StyledCardContent3 = styled(CardContent)`
    && {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 0.9rem;
        color: ${(props) => props.theme.palette.text.main};
    }
`

const StyledTypography = styled(Typography)`
    && {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
`

const StyledTagChip = styled(Chip)`
    && {
        height: 30px;
        color: ${(props) => props.theme.palette.secondary.main};
        border-radius: 5px;
        background-color: ${(props) => props.theme.palette.background.pop};

        &&:hover {
            background-color: ${(props) => props.theme.palette.background.hover};
        }
    }
`


export default GroupCard