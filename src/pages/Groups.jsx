import { Add, FolderSharedOutlined, Search } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, InputBase, Paper, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import GroupCard from '../components/groups/GroupCard'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Groups = () => {

    const theme = useTheme();
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const ref = useRef(null);
    const PAGE_SIZE = 12;
    const [barPosition, setBarPosition] = useState("static");
    const [isLoading, setIsLoading] =  useState(true);
    const [favoriteGroups, setFavoriteGroups] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
        if (barPosition === "fixed" && window.scrollY <= ref.current.clientHeight) setBarPosition("static");
        if (barPosition === "static" && window.scrollY > ref.current.clientHeight) setBarPosition("fixed");
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [barPosition]);

    useEffect(() => {
        const fetchFavoriteGroups = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/group/favorite?page=${1}&pageSize=${PAGE_SIZE}`);
                setFavoriteGroups(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFavoriteGroups();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledGroups>

            <StyledGroupsHeader theme={theme} ref={ref} backHeader={`${siteAssetsPath}/robloxBackground.png`}>
            <StyledPaper elevation={0} theme={theme} style={{backgroundColor: theme.palette.background.search}}>
            <StyledInputBase placeholder="グループ名 または #タグ" theme={theme} inputProps={{maxLength: 50}}/>
            <Tooltip title="検索" placement="bottom" arrow={true}>
                <StyledIconButton size="small" theme={theme}>
                <Search color="icon" />
                </StyledIconButton>
            </Tooltip>
            </StyledPaper>
            </StyledGroupsHeader>
            
            <StyledBar theme={theme} barPosition={barPosition} $isSmallScreen={isSmallScreen}>
                {barPosition === "fixed" ?
                <StyledPaper2 elevation={0} theme={theme} style={{backgroundColor: theme.palette.background.search}}>
                <StyledInputBase placeholder="グループ名 または #タグ" theme={theme} inputProps={{maxLength: 50}}/>
                <Tooltip title="検索" placement="bottom" arrow={true}>
                    <StyledIconButton size="small" theme={theme}>
                    <Search color="icon" />
                    </StyledIconButton>
                </Tooltip>
                </StyledPaper2>
                :
                <div></div>
                }
                <Box display="flex" gap="10px">
                    <Button variant='contained' color='secondary' sx={{display: "flex", gap: "10px"}}><FolderSharedOutlined /><span>マイグループ</span></Button>
                    <Link to="/establish" style={{textDecoration: "none"}}><Button variant='contained' color='secondary' sx={{display: "flex", gap: "10px"}}><Add /><span>グループを作成</span></Button></Link>
                </Box>
            </StyledBar>
            {barPosition === "fixed" && <div style={{height: "55px", width: "100%"}}></div>}

            {!isLoading ?
                <StyledGroupsMain>

                    <StyledSection theme={theme}>人気のグループ</StyledSection>
                    {favoriteGroups.map((group, index) => 
                        <GroupCard key={index} group={group}/>
                    )}

                    <StyledSection theme={theme}>フォローに関連したグループ</StyledSection>
                </StyledGroupsMain>
                :
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100px">
                    <CircularProgress color='secondary'/>
                </Box>
            }

        </StyledGroups>
        </>
    )
}   


const StyledGroups = styled.div`
    width: 100%;
    max-width: 3000px;
    margin: 0 auto;
`

const StyledGroupsHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 5/1;
    background-image: url(${(props => props.backHeader)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledPaper = styled(Paper)`
    && {
        display: flex;
        align-items: center;
        height: 50px;
        width: 50%;
        max-height: 50%;
        padding-right: 10px;
        border: solid 1px ${(props) => props.theme.palette.line.disable};

        &:focus-within {
        border: solid 2px ${(props) => props.theme.palette.secondary.main};
        }
    }
`;

const StyledPaper2 = styled(Paper)`
    && {
        display: flex;
        align-items: center;
        height: 80%;
        width: 50%;
        padding-right: 10px;
        border: solid 1px ${(props) => props.theme.palette.line.disable};

        &:focus-within {
        border: solid 2px ${(props) => props.theme.palette.secondary.main};
        }
    }
`;

const StyledInputBase = styled(InputBase)`
    && {
        height: 100%;
        width: 100%;
        padding-left: 2%;
        color: ${(props) => props.theme.palette.text.main};
        & input::placeholder {
        color: ${(props) => props.theme.palette.text.main};
        }
    }
`;

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
        background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`;

const StyledBar = styled.div`
    position: ${(props) => !props.$isSmallScreen ? props.barPosition : "static"};
    z-index: 50;
    top: 55px;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px 0 ${(props) => props.$isSmallScreen ? "10px" : "250px"};
    background-color: ${(props) => props.theme.palette.primary.main};
    overflow: hidden;
`

const StyledGroupsMain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    gap: 20px;
    width: 90%;
    margin: 0 auto;
    padding: 50px 0;
`

const StyledSection = styled.div`
    width: 100%;
    margin: 20px 0;
    padding: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${(props) => props.theme.palette.text.sub};
    border-bottom: solid 0.5px ${(props) => props.theme.palette.text.sub};
`


export default Groups