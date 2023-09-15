import { HighlightOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Chip, Modal, Tooltip, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProductRecognitionModal = (props) => {

    const theme = useTheme();

    return (
        <Modal open={props.isModalOpen}>
            <StyledModalInner theme={theme}>
                <Tooltip title="閉じる" placement='top'>
                <StyledHighlightOff onClick={props.handleModalClose}/>
                </Tooltip>
                <StyledModalTitle>
                出品内容のご確認
                </StyledModalTitle>
                <StyledRecognitionInner>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>商品名</StyledName>
                        <StyledElement theme={theme}>{props.product.name}</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>説明文</StyledName>
                        <StyledElement theme={theme}>{props.product.detail}</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>値段</StyledName>
                        <StyledElement theme={theme}>{props.product.price} (収益 <StyledSpan theme={theme}>{props.product.benefit}</StyledSpan>)</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>商品の状態</StyledName>
                        <StyledElement theme={theme}>{props.status[props.product.status]}</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>発送元地域</StyledName>
                        <StyledElement theme={theme}>{props.prefectures[props.product.shippingArea]}</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>配送料の負担</StyledName>
                        <StyledElement theme={theme}>{props.deliveryCost[props.product.deliveryCost]}</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>カテゴリー</StyledName>
                        <StyledElement theme={theme}>{props.categories[props.product.category]}</StyledElement>
                    </StyledItem>
                    <StyledItem theme={theme}>
                        <StyledName theme={theme}>タグ</StyledName>
                        <StyledElement theme={theme}>
                            <StyledTagZone>
                            {props.product.tags.map((tag, index) =>
                            <StyledTagChip key={index} color="secondary" label={tag} variant='outlined'></StyledTagChip>
                            )}
                            </StyledTagZone>
                        </StyledElement>
                    </StyledItem>
                    <LoadingButton color='secondary' variant='outlined' fullWidth sx={{m: "30px 0;", p: 2}}>出品する</LoadingButton>
                </StyledRecognitionInner>
            </StyledModalInner>
        </Modal>
    )
}


const StyledModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90vw;
    min-width: 35vw;
    height: 85%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 15px;
    border: solid 1px #444;
    background-color: ${(props) => props.theme.palette.background.modal};
`

const StyledModalTitle = styled.div`
    text-align: center;
    color: #aaa;
    font-size: 1.5rem;
    font-weight: bold;
    width: 70%;
    margin: 60px 0 60px 0;
`

const StyledHighlightOff = styled(HighlightOff)`
    && {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 35px;
        height: 35px;
        color: #444;
        cursor: pointer;
    }
`

const StyledRecognitionInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`

const StyledItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 20px;
    width: 100%;
    padding: 15px 0;
    border-bottom: solid 0.5px ${(props) => props.theme.palette.line.disable};
`

const StyledName = styled.div`
    width: 20%;
    color: ${(props) => props.theme.palette.text.sub};
    word-break: break-all;
`

const StyledElement = styled.div`
    width: 80%;
    color: ${(props) => props.theme.palette.text.sub};
    word-break: break-all;
    white-space: pre-line;
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.secondary.main};
`

const StyledTagZone = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    height: 100%;
`

const StyledTagChip = styled(Chip)`
    && {
        font-size: 1rem;
        height: 35px;
        padding: 10px;
    }
`


export default ProductRecognitionModal