import { TextField } from "@mui/material";
import styled from "styled-components";


export const StyledTextField = styled(TextField)(({ theme }) => ({

    '& .MuiInputBase-input': {
        color: theme.palette.text.main, // 入力文字の色
        borderRadius: "5px",
    },
    '& .MuiInputBase-root.Mui-disabled': {
        backgroundColor: theme.palette.background.hover2,
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: theme.palette.text.sub,
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
    '& .MuiInputLabel-root.Mui-disabled': {
        color: theme.palette.text.sub,
    },
    "& .MuiFormHelperText-root.Mui-error": {
        color: theme.palette.text.error,
    },
    "& .MuiFormLabel-root.Mui-error": {
        color: theme.palette.text.error,
    },
    '& .MuiOutlinedInput-root.Mui-error': {
        '&:hover fieldset': {
            borderColor: theme.palette.text.error,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.text.error,
        },
        '&.Mui-focused:hover fieldset': {
            borderColor: theme.palette.text.error,
        }
    }
}));