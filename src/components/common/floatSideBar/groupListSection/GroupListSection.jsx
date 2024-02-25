import { Avatar, ListItem, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { booleanFloatSideBarGroup } from '../../../../redux/features/floatSideBarGroupSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEnv } from '../../../../provider/EnvProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';


const GroupListSection = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState(null);
    const { siteAssetsPath, backendAccessPath } = useEnv();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const PAGE_SIZE = user ? user.groups.length : 0;
    const isOpenGroup = useSelector((state => state.floatSideBarGroup.value));
    const visibleGroups = groups ? isOpenGroup ? groups : groups.slice(0, 5) : null;
    const theme = useTheme();

    const toggleGroupShowAll = () => {
        dispatch(booleanFloatSideBarGroup());
    }

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/group/userGroup/${user._id}?page=${1}&pageSize=${PAGE_SIZE}`);
                setGroups(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGroups();
    }, [props.page]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!isLoading &&
                <StyledListBlockWithTitle>
                    {visibleGroups.map((group, index) => 
                    <Link to={`/group/${group._id}`} key={index} style={{textDecoration: "none"}}>
                        <StyledListItem key={index}>
                            <StyledListElements theme={theme}>
                                <StyledAvatar variant='square' src={group.icon ? `${backendAccessPath}/uploads/groupIcons/${group.icon}` : `${siteAssetsPath}/default_group_icons/${group.defaultIcon}`}/>
                                <StyledListItemText theme={theme.palette.text.main}>{group.name}</StyledListItemText>
                            </StyledListElements>
                        </StyledListItem>
                    </Link>
                    )}
                    {groups.length > 5 && !isOpenGroup && (
                        <StyledListItem>
                            <StyledListElements theme={theme} onClick={toggleGroupShowAll}>
                                <StyledListItemText theme={theme.palette.text.sub2}>すべて表示</StyledListItemText>
                                <StyledExpandMoreIcon color="icon"/>
                            </StyledListElements>
                        </StyledListItem>
                    )}
                    {groups.length > 5 && isOpenGroup && (
                        <StyledListItem>
                            <StyledListElements theme={theme} onClick={toggleGroupShowAll}>
                            <StyledListItemText theme={theme.palette.text.sub2}>折りたたむ</StyledListItemText>
                                <StyledExpandLessIcon color="icon"/>
                            </StyledListElements>
                    </StyledListItem>
                    )}
                </StyledListBlockWithTitle>
            }
        </>
    )
}


const StyledListItem = styled(ListItem)`
    && {
        justify-content: center;
        height: 45px;
        width: 230px;
        padding: 0;
    }
`

const StyledListItemText = styled.div`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme};
`

const StyledListBlockWithTitle = styled.div`
    padding-bottom 15px;

    &:nth-child(1) {
        padding-top: 0;
    }
`

const StyledListElements = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    height: 100%;
    width: 95%;
    padding-left: 5px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.hover};
    }
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 35px;
        height: 35px;
    }
`

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`

const StyledExpandLessIcon = styled(ExpandLessIcon)`
    && {
        width: 25px;
        height: 25px;
    }
`


export default GroupListSection