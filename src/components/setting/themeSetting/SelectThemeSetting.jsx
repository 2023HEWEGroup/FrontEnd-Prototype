import { Avatar, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import { themeList } from '../../../layouts/theme/themeList';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/features/userSlice';
import { ArrowBack, Check } from '@mui/icons-material';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { useEnv } from '../../../provider/EnvProvider';


const SelectThemeSetting = (props) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { backendAccessPath } = useEnv();

    const handleUpdate = debounce(async (themeName) => {
        try {
            if (props.currentUser.theme === themeName) return;
            await axios.put(`${backendAccessPath}/client/setting/theme/${props.currentUser._id}`, {theme: themeName});
            const newUser = await axios.get(`${backendAccessPath}/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
        } catch (err) {
            console.log(err);
        }
    }, 250);

    return (
        <>
        <StyledHeader>
            <StyledTitle theme={theme}>
                {isSmallScreen &&
                <Link to="/setting">
                    <IconButton color='secondary'>
                        <ArrowBack style={{color: theme.palette.text.main}}/>
                    </IconButton>
                </Link>
                }
                <div>テーマ</div>
            </StyledTitle>
            <StyledDesc theme={theme}>サイトのテーマをカスタマイズすることができます。</StyledDesc>
        </StyledHeader>
        <StyledThemeZone>
            <StyledThemes>
            {themeList.map((theme, index) =>
                <Tooltip key={index} title={theme.palette.themeName} arrow>
                    <StyledThemeBox
                    style={{background: theme.palette.primary.listBack}}
                    onClick={() => handleUpdate(theme.palette.themeName)}
                    $isLargeScreen={isLargeScreen}
                    $isMiddleScreen={isMiddleScreen}
                    $isSmallScreen={isSmallScreen}
                    $isXsScreen={isXsScreen}>
                        {props.currentUser.theme === theme.palette.themeName &&
                        <StyledAvatar theme={theme} variant="square">
                            <Check fontSize='large' style={{color: "#fff"}}/>
                        </StyledAvatar>
                        }
                    </StyledThemeBox>
                </Tooltip>
            )}
            </StyledThemes>
        </StyledThemeZone>
        </>
    )
}


const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 0 15px;
`

const StyledTitle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: 50px;
    color: ${(props) => props.theme.palette.text.main};
    font-weight: bold;
    font-size: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledDesc = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.85rem;
    word-wrap: break-word;
`

const StyledThemeZone = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 15px;
`

const StyledThemes = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    padding: 10px 0 0 10px;
`

const StyledThemeBox = styled.div`
    width: calc(${(props) => (props.$isXsScreen ? "50%" : (props.$isSmallScreen ? "33%" : (props.$isMiddleScreen ? "25%" : props.$isLargeScreen ? "20%" : "16.7%")))} - 10px);
    aspect-ratio: 1/1;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
    overflow: hidden;
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.palette.background.slideComment};
    }
`


export default SelectThemeSetting