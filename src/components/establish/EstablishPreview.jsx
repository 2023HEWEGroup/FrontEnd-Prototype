import { Chat, ExpandLess, ExpandMore, Inventory, LiveTv, People, Star } from '@mui/icons-material';
import { Avatar, Box, Chip, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const EstablishPreview = (props) => {

    const [truncatedDesc, setTruncatedDesc] = useState("");
    const [lineCount, setLineCount] = useState(NaN);
    const theme = useTheme();
    const user = useSelector((state) => state.user.value);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }

    const formatDate = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '/' + month + '/' + day;
    }

    useEffect(() => {
        if (props.group) {
            setTruncatedDesc(props.isExpanded ? props.group.desc : props.group.desc.split('\n').slice(0, 10).join('\n'))
            setLineCount(props.group.desc.split('\n').length);
        }
    }, [props.group, props.isExpanded]);

    return (
        <>
        <StyledGroupHeader theme={theme} backHeader={props.previewHeader}></StyledGroupHeader>

        <Box width="90%" margin="0 auto" display="flex" flexDirection="column" borderBottom={`solid 1px ${theme.palette.line.disable}`}>
        <Box display="flex" alignItems="center" width="100%" padding="30px 0" gap="25px">
            <StyledAvatarZone>
            <Avatar variant='square' sx={{width: "100%", height: "100%"}} src={props.previewIcon}/>
            </StyledAvatarZone>
            <Box display="flex" flexDirection="column" gap="10px" width="80%">
            <Typography sx={{wordBreak: "break-all"}} variant='h5' color={theme.palette.text.main}>{props.group.name}</Typography>
            <Typography sx={{wordBreak: "break-all"}} variant='body1' color={theme.palette.text.sub}>{props.group.subTitle}</Typography>
            </Box>
        </Box>
        <Box display="flex" justifyContent="end" gap="20px" paddingBottom="5px" color={theme.palette.text.main}>
            <Chat style={{color: theme.palette.icon.comment, cursor: "pointer"}}/>
            <Box display="flex" gap="2px"><People style={{color: theme.palette.icon.comment}} fontSize='small'/><div>{formatNumber(100)}</div></Box>
            <Box display="flex" gap="2px"><Inventory style={{color: theme.palette.icon.inventory}} fontSize='small'/><div>{formatNumber(300)}</div></Box>
            <Box display="flex" gap="2px" sx={{cursor: "pointer"}}><Star style={{color: theme.palette.icon.star}} fontSize='small'/><div>{formatNumber(13200)}</div></Box>
            <LiveTv style={{color: theme.palette.broadcast.main, cursor: "pointer", paddingBottom: "3px"}}/>
        </Box>
        </Box>

        <Box width="90%" padding="30px 0" margin="0 auto" display="flex" gap="15px" flexDirection="column" borderBottom={`solid 1px ${theme.palette.line.disable}`}>
        <Typography sx={{wordBreak: "break-all", whiteSpace: 'pre-line'}} variant='body1' color={theme.palette.text.sub}>{truncatedDesc}</Typography>
        {lineCount > 10 &&
            <StyledMoreRead theme={theme} onClick={() => props.setIsExpanded((prev) => !prev)}>
                {props.isExpanded ?
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0", margin: "0 auto"}}><div>折りたたむ</div><ExpandLess color="secondary"/></div>
                :
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0", margin: "0 auto"}}><div>すべて表示</div><ExpandMore color="secondary"/></div>}
            </StyledMoreRead>
        }
        <Box display="flex" flexWrap="wrap" gap="15px" padding="15px 0">
        {props.group.tags.map((tag, index) => (
            <StyledTagChip key={index} theme={theme} clickable label={`# ${tag}`} />
        ))}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="end">
            <Typography sx={{wordBreak: "break-all"}} variant='body2' color={theme.palette.text.sub}>作成： {formatDate()}</Typography>
            <Typography sx={{wordBreak: "break-all"}} variant='body2' color={theme.palette.text.sub}>オーナー： {user.username}</Typography>
        </Box>
        </Box>
        </>
    )
}


const StyledGroupHeader = styled.div`
    width: 100%;
    aspect-ratio: 5/1;
    background-image: url(${(props => props.backHeader)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledAvatarZone = styled.div`
    aspect-ratio: 1/1;
    width: 20%;
    overflow: hidden;
`

const StyledMoreRead = styled.div`
    display: flex;
    justify-contet: center;
    align-items: center;
    color: ${(props) => props.theme.palette.secondary.main};
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;
    overflow: hidden;
    user-select: none;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover2};
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


export default EstablishPreview