import { Avatar, ListItem, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { booleanFloatSideBarFollowing } from '../../../../redux/features/floatSideBarFollowingSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEnv } from '../../../../provider/EnvProvider';


const FollowingListSection = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [followers, setFollowers] = useState();
    const PAGE_SIZE = props.currentUser ? props.currentUser.followings.length : 0;
    const dispatch = useDispatch();
    const isOpenFollowing = useSelector((state => state.floatSideBarFollowing.value));
    const { siteAssetsPath, backendAccessPath } = useEnv();
    const theme = useTheme();

    const toggleFollowingShowAll = () => {
        dispatch(booleanFloatSideBarFollowing());
    }

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/user/getFollowings/${props.currentUser._id}/?page=${1}&pageSize=${PAGE_SIZE}`);
                setFollowers(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        if (props.currentUser) fetchFollowers();
    }, [props.page]); // eslint-disable-line react-hooks/exhaustive-deps
    // ユーザーがページを切り替える度に最新表示

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/user/getFollowings/${props.currentUser._id}/?page=${1}&pageSize=${PAGE_SIZE}`);
                setFollowers(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        if (props.currentUser) fetchFollowers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <StyledListBlockWithTitle>
            {!isLoading ? (
                <>
                    {isOpenFollowing ?
                    followers.map((account, index) => (
                        <Link to={`/user/${account._id}`} key={index} style={{textDecoration: "none"}}>
                            <StyledListItem>
                                <StyledListElements theme={theme}>
                                    <StyledAvatar src={account.icon ? `${backendAccessPath}/uploads/userIcons/${account.icon}` : `${siteAssetsPath}/default_icons/${account.defaultIcon}`}/>
                                    <StyledListItemText theme={theme.palette.text.main}>{account.username}</StyledListItemText>
                                </StyledListElements>
                            </StyledListItem>
                        </Link>
                    ))
                    :
                    followers.slice(0, 5).map((account, index) => (
                        <Link to={`/user/${account._id}`} key={index} style={{textDecoration: "none"}}>
                            <StyledListItem>
                                <StyledListElements theme={theme}>
                                    <StyledAvatar src={account.icon ? `${backendAccessPath}/uploads/userIcons/${account.icon}` : `${siteAssetsPath}/default_icons/${account.defaultIcon}`}/>
                                    <StyledListItemText theme={theme.palette.text.main}>{account.username}</StyledListItemText>
                                </StyledListElements>
                            </StyledListItem>
                        </Link>
                    ))
                    }
                    {followers.length > 5 && !isOpenFollowing && (
                        <StyledListItem>
                            <StyledListElements theme={theme} onClick={toggleFollowingShowAll}>
                                <StyledListItemText theme={theme.palette.text.sub2}>すべて表示</StyledListItemText>
                                <StyledExpandMoreIcon color="icon"/>
                            </StyledListElements>
                        </StyledListItem>
                    )}
                    {followers.length > 5 && isOpenFollowing && (
                        <StyledListItem>
                            <StyledListElements theme={theme} onClick={toggleFollowingShowAll}>
                                <StyledListItemText theme={theme.palette.text.sub2}>折りたたむ</StyledListItemText>
                                <StyledExpandLessIcon color="icon"/>
                            </StyledListElements>
                        </StyledListItem>
                    )}
                </>
            ) : null}
            </StyledListBlockWithTitle>
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


export default FollowingListSection