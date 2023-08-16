import { Avatar, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const TopBox = () => {

    const theme = useTheme();

    const users = [
        {key: 1, name: "HARD CORDINGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", id: "kurucccccccccccccccccccccccccc", value: 555},
        {key: 2, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 3, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 4, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 5, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 6, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 7, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 8, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 9, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 10, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 11, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 12, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 13, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 14, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 15, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 16, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 17, name: "CODING KURU*C", id: "kuruc_net", value: 555},
        {key: 18, name: "CODING KURU*C", id: "kuruc_net", value: 555},
    ]

    return (
        <StyledTopBox>
            <StyledTitle>トップユーザー</StyledTitle>

            <StyledList theme={theme}>
                {users.map(user =>
                    <StyledListItem key={user.key}>
                        <StyledUser>
                        <div style={{width: "40px", height: "40px", overflow: "hidden", flexShrink: 0}}>
                        <StyledAvatar />
                        </div>
                        <StyledUserDesc>
                            <StyledUserName>{user.name}</StyledUserName>
                            <StyledUserId theme={theme}>@{user.id}</StyledUserId>
                            <StyledAmount theme={theme}>{user.value}</StyledAmount>
                        </StyledUserDesc>
                        </StyledUser>
                    </StyledListItem>
                )}
            </StyledList>
        </StyledTopBox>
    )
}


const StyledTopBox = styled.div`
    width: 100%;
`

const StyledTitle = styled.div`
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.2rem;
`

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    &:hover {
        &::-webkit-scrollbar-thumb {
            background-color: ${(props) => props.theme.palette.background.scrollBar};
        }
    }
`

const StyledListItem = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`

const StyledUser = styled.div`
    display: flex;
    gap: 20px;
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledUserDesc = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow: hidden;
`

const StyledUserName = styled.span`
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledUserId = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.text.sub};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledAmount = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.secondary.main};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`


export default TopBox