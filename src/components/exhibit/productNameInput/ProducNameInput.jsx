import { TextField, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProducNameInput = (props) => {

    const theme = useTheme();

    return (
        <>
        <StyledProductNameZone>
            <StyledTextField theme={theme} value={props.product.name} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "商品名 (1~50字)"}}
                onChange={props.handleProductNameInput}/>
            <StyledInputLength theme={theme}>{`${props.product.name.length}/50`}</StyledInputLength>
        </StyledProductNameZone>
        </>
    )
}


const StyledProductNameZone = styled.div`
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

const StyledInputLength = styled.div`
    width: 100%;
    text-align: right;
    color: ${(props) => props.theme.palette.text.sub};
`


export default ProducNameInput