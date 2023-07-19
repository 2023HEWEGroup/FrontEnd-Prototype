import { Avatar, ListItem, ListItemText, Tooltip } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { booleanFloatSideBarFollowing } from '../../../../redux/features/floatSideBarFollowingSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const FollowingListSection = () => {

    const accounts = [{
        id: 1,
        name: "account1aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
        id: 2,
        name: "account2ああああああああああああああ",
    },
    {
        id: 3,
        name: "account3",
    },
    {
        id: 4,
        name: "account4",
    },
    {
        id: 5,
        name: "account5",
    },
    {
        id: 6,
        name: "account6",
    },
    {
        id: 7,
        name: "account7",
    },];

    const dispatch = useDispatch();
    const isOpenFollowing = useSelector((state => state.floatSideBarFollowing.value));
    const visibleAccounts = isOpenFollowing ? accounts : accounts.slice(0, 5);

    const toggleFollowingShowAll = () => {
        dispatch(booleanFloatSideBarFollowing());
    }

    return (
        <>
            <StyledListBlockWithTitle>
                {visibleAccounts.map((account) => 
                <StyledListItem key={account.id}>
                    <Tooltip title={account.name} placement='right' arrow={true}>
                        <StyledListElements>
                            <StyledAvatar />
                            <StyledListItemText primary={account.name} />
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>)}
                {accounts.length > 5 && !isOpenFollowing && (
                    <StyledListItem>
                        <Tooltip title="すべて表示" placement='right'>
                            <StyledListElements onClick={toggleFollowingShowAll}>
                                <StyledListItemText primary="すべて表示"/>
                                <StyledExpandMoreIcon color="icon"/>
                            </StyledListElements>
                        </Tooltip>
                    </StyledListItem>
                )}
                {accounts.length > 5 && isOpenFollowing && (
                    <StyledListItem>
                    <Tooltip title="折りたたむ" placement='right'>
                        <StyledListElements onClick={toggleFollowingShowAll}>
                            <StyledListItemText primary="折りたたむ"/>
                            <StyledExpandLessIcon color="icon"/>
                        </StyledListElements>
                    </Tooltip>
                </StyledListItem>
                )}
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

const StyledListItemText = styled(ListItemText)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
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
        background-color: rgba(0, 0, 0, 0.1);
        transition: 0.2s;
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