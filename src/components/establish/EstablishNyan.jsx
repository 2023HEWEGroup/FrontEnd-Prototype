import React, { useEffect } from 'react'
import Particles from 'react-tsparticles'
import particle from '../../layouts/particles/nyanCat.json';
import styled from 'styled-components';
import { Avatar, Button, Grow, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Home, Replay } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEnv } from '../../provider/EnvProvider';


const EstablishNyan = (props) => {

    const theme = useTheme();
    const { siteAssetsPath, backendAccessPath } = useEnv();

    useEffect(() => {
        // Topページがマウントされたときに限定して背景部分の色を変更する
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                background-color: #043564;
            }
        `;
        document.head.appendChild(style);
        // コンポーネントのアンマウント時にスタイルを元に戻す
        return () => {
            document.head.removeChild(style);
        };
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Grow in={props.nyan} mountOnEnter unmountOnExit timeout={500}>
            <div style={{width: "100vw", height: "100vh", overflow: "hidden"}}>

                <StyledHeader theme={theme}>
                    <StyledTitle>グループが作成されました！</StyledTitle>
                    <StyledSubTitle>{`グループ設立記念日だ！${props.currentUser.username}！`}</StyledSubTitle>
                </StyledHeader>

                <motion.div initial={{ x: '-60%', position: "fixed", top: 0, left: 0 }} animate={{ x: '0px', position: "fixed", top: 0, left: 0 }} transition={{ duration: 3, ease: "easeOut" }} >
                    <div style={{width: "100vw", height: "100vh" }}>
                        <Particles options={particle} />
                    </div>
                </motion.div>

                <motion.div initial={{ x: '-60%', position: "fixed", top: 0, left: 0 }} animate={{ x: '0px', position: "fixed", top: 0, left: 0 }} transition={{ duration: 3, ease: "easeOut" }} >
                    
                    <div style={{width: "100vw", height: "100vh", zIndex: 10 }}>
                        <Link to={`/group/${props.group._id}`}>
                            <StyledProductAvatarZone theme={theme}>
                                <StyledAvatar variant='square' src={props.group.icon ? `${backendAccessPath}/uploads/groupIcons/${props.group.icon}` : `${siteAssetsPath}/default_group_icons/${props.group.defaultIcon}`}/>
                            </StyledProductAvatarZone>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                initial={{ opacity: 0, position: "fixed", bottom: '10%', left: 0, right: 0 }}
                animate={{ opacity: 1, position: "fixed", bottom: '10%', left: 0, right: 0 }}
                transition={{ duration: 0.3, delay: 3, ease: 'easeOut' }}>
                    <StyledButtons>
                        <StyledLink to="/home"><StyledButton variant='contained' size='large'><Home />ホームへ戻る</StyledButton></StyledLink>
                        <StyledLink to={`/group/${props.group._id}`}><StyledButton variant='contained' size='large'><Replay />グループを見る</StyledButton></StyledLink>
                    </StyledButtons>
                </motion.div>
                
            </div>
        </Grow>
        </>
    )
}


const StyledHeader = styled.div`
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10%;
    position: fixed;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: fit-content;
    max-width: 90vw;
    color: ${(props) => props.theme.palette.text.main2};
`

const StyledTitle = styled.div`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 2rem;
    text-align: center;
`

const StyledSubTitle = styled.div`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1rem;
    text-align: center;
`

const StyledProductAvatarZone = styled.div`
    position: absolute;
    left: 60%;
    top: 35%;
    aspect-ratio: 1/1;
    width: 15%;
    border-radius: 5%;
    transform: rotate(20deg);
    background-color: #aff;
    transition: transform 0.2s ease;
    cursor: pointer;
    overflow: hidden;
    background-color: ${(props) => props.theme.palette.background.productBack};
    &:hover {
        transform: rotate(10deg);
    }
`;

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10%;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 10%;
    margin: 0 auto;
    width: 500px;
    max-width: 90vw;
`

const StyledLink = styled(Link)`
    && {
        width: 50%;
        text-decoration: none;
    }
`

const StyledButton = styled(Button)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5%;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`


export default EstablishNyan