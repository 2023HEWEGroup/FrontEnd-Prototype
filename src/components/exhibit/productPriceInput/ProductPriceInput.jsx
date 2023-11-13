import { TextField, useTheme } from '@mui/material';
import React from 'react'
import styled from 'styled-components';


const ProductPriceInput = (props) => {

    const theme = useTheme();

    return (
        <>
        <StyledProductPriceZone>
            <div style={{width: "30%"}}>
                <StyledTextField theme={theme} value={props.product.price} autoComplete='new-off' fullWidth inputProps={{maxLength: 7, placeholder: "値段 (100~9999999)"}}
                    onChange={props.handleProductPriceInput} error={props.productError.price}/>
            </div>
            <StyledBenefit theme={theme}>収益 <StyledSpan theme={theme}>{props.product.benefit}</StyledSpan>ポイント</StyledBenefit>
        </StyledProductPriceZone>
        </>
    )
}


const StyledProductPriceZone = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
`

const StyledTextField = styled(TextField)(({ theme }) => ({

    '& .MuiInputBase-input': {
        color: theme.palette.text.main, // 入力文字の色
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: '#777', // 通常時のボーダー色(アウトライン)
        },
        '&:hover:not(.Mui-disabled) fieldset': {
        borderColor: '#777', // 非フォーカス時のホバー時のボーダー色(アウトライン)
        },
        '&.Mui-focused:hover fieldset': {
        borderColor: theme.palette.secondary.main, // フォーカス時にホバーしたときのボーダー色(アウトライン)
        },
        '&:focus-within fieldset': {
        borderColor: theme.palette.secondary.main, // フォーカス時のボーダー色(アウトライン)
        },
    },
    '& .MuiInputLabel-root': {
        color: '#777', // ラベルの通常時の色
        '&.Mui-focused': {
        color: theme.palette.secondary.main, // フォーカス時のラベルの色
        },
    },
}));

const StyledBenefit = styled.div`
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.secondary.main};
`


export default ProductPriceInput