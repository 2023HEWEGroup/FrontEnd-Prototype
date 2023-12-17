import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, Skeleton, useTheme } from '@mui/material';
import axios from 'axios';
import './glitch.css';
import { useGlitch } from 'react-powerglitch';


const TopBack = () => {

    const itemWidth = 200; // 1つの画像の横の長さ
    const gap = 10; // 画像間の感覚
    const itemWidthWithGap = itemWidth + gap; // 画像の横幅と、画像間の合計値
    const size = 20;
    const [isLoading, setIsLoading] = useState(true);
    const [imageBlocks, setImageBlocks] = useState();
    const [imageBlocks2, setImageBlocks2] = useState();
    const [imageBlocks3, setImageBlocks3] = useState();
    const [imageBlocks4, setImageBlocks4] = useState();
    const [imageBlocks5, setImageBlocks5] = useState();
    // onUpdate を使って判断しているので、2回fireさせないようrefを使って判定
    const isOrderingRef = useRef(false);
    const isOrderingRef2 = useRef(false);
    const isOrderingRef3 = useRef(false);
    const isOrderingRef4 = useRef(false);
    const isOrderingRef5 = useRef(false);
    const theme = useTheme();
    const glitch = useGlitch();

    const repeatedComponents = Array.from({ length: size }, (value, index) => (
        <StyledAvatarZone key={index} itemWidth={itemWidth}><StyledSkeleton variant="rectangular"/></StyledAvatarZone>
    ));

    useEffect(() => {
        const fetchRandomProduct = async () => {
            glitch.setOptions(
                {
                    timing: {
                        duration: 10000,
                        easing: 'ease-in-out',
                    },
                    glitchTimeSpan: {
                        start: 0.13,
                        end: 0.15,
                    },
                    shake: {
                        amplitudeX: 0,
                        amplitudeY: 0,
                    },
                    slice: {
                        count: 5,
                    }
                }
            );
            // glitch.stopGlitch();
            try {
                const response = await axios.get(`http://localhost:5000/client/product/getRandom/?size=${size}`);
                const response2 = await axios.get(`http://localhost:5000/client/product/getRandom/?size=${size}`);
                const response3 = await axios.get(`http://localhost:5000/client/product/getRandom/?size=${size}`);
                const response4 = await axios.get(`http://localhost:5000/client/product/getRandom/?size=${size}`);
                const response5 = await axios.get(`http://localhost:5000/client/product/getRandom/?size=${size}`);
                setImageBlocks(response.data);
                setImageBlocks2(response2.data);
                setImageBlocks3(response3.data);
                setImageBlocks4(response4.data);
                setImageBlocks5(response5.data);
                setIsLoading(false);
            } catch (err) {
            }

            // setIsLoading(false);
        }
        fetchRandomProduct();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {!isLoading ?
            <StyledTopBack className='glitch' gap={gap} ref={glitch.ref}>
                <AnimatePresence>
                    <motion.div
                    animate={{x: itemWidthWithGap}}
                    transition={{repeat: Infinity, duration: 5, ease: 'linear'}}
                    onUpdate={((latest) => {
                        if (latest.x < itemWidthWithGap - 2 && isOrderingRef.current) {
                            isOrderingRef.current = false;
                        }
                        if (latest.x > itemWidthWithGap - 2 && !isOrderingRef.current) {
                            isOrderingRef.current = true;
                            const newimageBlocks = [...imageBlocks];
                            newimageBlocks.unshift(imageBlocks[imageBlocks.length - 1]);
                            newimageBlocks.pop();
                            setImageBlocks(newimageBlocks);
                        }
                        }
                    )}
                    >
                        <StyledFlex gap={gap}>
                            {imageBlocks.map((image, index) => [
                                <StyledAvatarZone theme={theme} key={index} itemWidth={itemWidth}>
                                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${image.productImg[0]}`}/>
                                </StyledAvatarZone>
                            ])}
                        </StyledFlex>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.div
                    animate={{x: -itemWidthWithGap}}
                    transition={{repeat: Infinity, duration: 5, ease: 'linear'}}
                    onUpdate={((latest) => {
                        if (latest.x > -itemWidthWithGap + 2 && isOrderingRef2.current) {
                            isOrderingRef2.current = false;
                        }
                        if (latest.x < -itemWidthWithGap + 2 && !isOrderingRef2.current) {
                            isOrderingRef2.current = true;
                            const newimageBlocks2 = [...imageBlocks2];
                            newimageBlocks2.push(newimageBlocks2[0]);
                            newimageBlocks2.shift();
                            setImageBlocks2(newimageBlocks2);
                        }
                        }
                    )}
                    >
                        <StyledFlex gap={gap}>
                            {imageBlocks2.map((image, index) => [
                                <StyledAvatarZone theme={theme} key={index} itemWidth={itemWidth}>
                                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${image.productImg[0]}`}/>
                                </StyledAvatarZone>
                            ])}
                        </StyledFlex>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.div
                    animate={{x: itemWidthWithGap}}
                    transition={{repeat: Infinity, duration: 5, ease: 'linear'}}
                    onUpdate={((latest) => {
                        if (latest.x < itemWidthWithGap - 2 && isOrderingRef3.current) {
                            isOrderingRef3.current = false;
                        }
                        if (latest.x > itemWidthWithGap - 2 && !isOrderingRef3.current) {
                            isOrderingRef3.current = true;
                            const newimageBlocks3 = [...imageBlocks3];
                            newimageBlocks3.unshift(imageBlocks3[imageBlocks3.length - 1]);
                            newimageBlocks3.pop();
                            setImageBlocks3(newimageBlocks3);
                        }
                        }
                    )}
                    >
                        <StyledFlex gap={gap}>
                            {imageBlocks3.map((image, index) => [
                                <StyledAvatarZone theme={theme} key={index} itemWidth={itemWidth}>
                                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${image.productImg[0]}`}/>
                                </StyledAvatarZone>
                            ])}
                        </StyledFlex>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.div
                    animate={{x: -itemWidthWithGap}}
                    transition={{repeat: Infinity, duration: 5, ease: 'linear'}}
                    onUpdate={((latest) => {
                        if (latest.x > -itemWidthWithGap + 2 && isOrderingRef4.current) {
                            isOrderingRef4.current = false;
                        }
                        if (latest.x < -itemWidthWithGap + 2 && !isOrderingRef4.current) {
                            isOrderingRef4.current = true;
                            const newimageBlocks4 = [...imageBlocks4];
                            newimageBlocks4.push(newimageBlocks4[0]);
                            newimageBlocks4.shift();
                            setImageBlocks4(newimageBlocks4);
                        }
                        }
                    )}
                    >
                        <StyledFlex gap={gap}>
                            {imageBlocks4.map((image, index) => [
                                <StyledAvatarZone theme={theme} key={index} itemWidth={itemWidth}>
                                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${image.productImg[0]}`}/>
                                </StyledAvatarZone>
                            ])}
                        </StyledFlex>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.div
                    animate={{x: itemWidthWithGap}}
                    transition={{repeat: Infinity, duration: 5, ease: 'linear'}}
                    onUpdate={((latest) => {
                        if (latest.x < itemWidthWithGap - 2 && isOrderingRef5.current) {
                            isOrderingRef5.current = false;
                        }
                        if (latest.x > itemWidthWithGap - 2 && !isOrderingRef5.current) {
                            isOrderingRef5.current = true;
                            const newimageBlocks5 = [...imageBlocks5];
                            newimageBlocks5.unshift(imageBlocks5[imageBlocks5.length - 1]);
                            newimageBlocks5.pop();
                            setImageBlocks5(newimageBlocks5);
                        }
                        }
                    )}
                    >
                        <StyledFlex gap={gap}>
                            {imageBlocks5.map((image, index) => [
                                <StyledAvatarZone theme={theme} key={index} itemWidth={itemWidth}>
                                    <StyledAvatar variant='square' src={`http://localhost:5000/uploads/productImages/${image.productImg[0]}`}/>
                                </StyledAvatarZone>
                            ])}
                        </StyledFlex>
                    </motion.div>
                </AnimatePresence>

            </StyledTopBack>
            :
            <StyledTopBack gap={gap}>
                <StyledFlex gap={gap}>
                    {repeatedComponents}
                </StyledFlex>
                <StyledFlex gap={gap}>
                    {repeatedComponents}
                </StyledFlex>
                <StyledFlex gap={gap}>
                    {repeatedComponents}
                </StyledFlex>
                <StyledFlex gap={gap}>
                    {repeatedComponents}
                </StyledFlex>
                <StyledFlex gap={gap}>
                    {repeatedComponents}
                </StyledFlex>
            </StyledTopBack>
        }
        </>
    )
}


const StyledTopBack = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: ${(props) => `${props.gap}px`};
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: ${(props) => `${props.gap}px 0`};
    opacity: 0.5;
`

const StyledFlex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${(props) => `${props.gap}px`};
    width: fit-content;
    height: fit-content;
`

const StyledAvatarZone = styled.div`
    width: ${(props) => `${props.itemWidth}px`};
    aspect-ratio: 1/1;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
`

const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledSkeleton = styled(Skeleton)`
    && {
        width: 100%;
        height: 100%;
        color: #aff;
        background-color: #444;
    }
`


export default TopBack