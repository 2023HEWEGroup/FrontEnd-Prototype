import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton, Tooltip, useTheme } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import NotifyPopper from './notifyPopper/NotifyPopper';
import ProfilePopper from './profilePopper/ProfilePopper';
import LoginRequiredModal from '../../loginRequiredModal/LoginRequiredModal';
import { useSelector } from 'react-redux';


const GridRight = () => {

    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const [isLoginModal, setIsLoginModal] = useState(false);
    const theme = useTheme();

    const handleGoExhibit = (e) => {
        e.preventDefault();
        if (!user) {
            setIsLoginModal(true);
        } else {
            navigate("/exhibit");
        }
    }

    const handleLoginModalClose = () => {
        setIsLoginModal(false);
    }

    return (
    <>
    <Tooltip title="出品する" placement='bottom' arrow={true}>
        <StyledLink to={"/exhibit"}  onClick={handleGoExhibit}>
            <StyledIconButton size='small' theme={theme}>
                <StyledAddBoxOutlinedIcon color="icon"/>
            </StyledIconButton>
        </StyledLink>
    </Tooltip>

    <NotifyPopper/> 

    <ProfilePopper />

    <LoginRequiredModal open={isLoginModal} onClose={handleLoginModalClose} header="ログインが必要です" desc={"商品を出品しますか？今すぐユーザーのログインを完了させましょう！"}/>
    </>
    )
}


const StyledAddBoxOutlinedIcon = styled(AddBoxOutlinedIcon)`
    && {
        width: 35px;
        height: 35px;
    }
`

const StyledLink = styled(Link)`
    && {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
`

const StyledIconButton = styled(IconButton)`
    && {
        .MuiTouchRipple-child {
            background-color: ${(props) => props.theme.palette.secondary.main};
        }
    }
`


export default GridRight