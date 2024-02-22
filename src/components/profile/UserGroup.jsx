import styled from '@emotion/styled'
import { CircularProgress, Slide, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GroupCard from '../groups/GroupCard';
import { useEnv } from '../../provider/EnvProvider';


const UseGroup = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState(null);
    const { backendAccessPath } = useEnv();
    const PAGE_SIZE = 9;
    const theme = useTheme();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${backendAccessPath}/client/group/userGroup/${props.user._id}?page=${1}&pageSize=${PAGE_SIZE}`);
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
        <Slide in direction={props.direction}>
            <StyledUserGroup>
                <StyledTitle theme={theme}>
                    参加中 ({groups ? groups.length : ""}件)
                </StyledTitle>
                <StyledGroupTable>
                    {!isLoading ?
                        groups.map((group, index) => 
                            <GroupCard key={index} group={group}/>
                        )
                        :
                        <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <CircularProgress color='secondary' />
                        </div>
                    }
                </StyledGroupTable>
            </StyledUserGroup>
        </Slide>
        </>
    )
}


const StyledUserGroup = styled.div`
    width: 100%;
`

const StyledTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
    font-size: 1.2rem;
    margin: 30px auto;
    color: ${(props) => props.theme.palette.text.main};
`

const StyledGroupTable = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    padding-left: 10px;
    margin: 0 auto;
`


export default UseGroup