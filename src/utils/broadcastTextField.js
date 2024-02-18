import { TextField } from "@mui/material";
import styled from "styled-components";


export const BroadCastTextField = styled(TextField)(({ theme }) => ({

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
    '& .MuiInput-underline:before': {
        borderBottomColor: theme.palette.text.sub, // 通常時のボーダー色
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.palette.text.main,  // ホバー時のボーダー色
    },
    '& .MuiInputLabel-root': {
        color: '#777', // ラベルの通常時の色
        '&.Mui-focused': {
        color: theme.palette.broadcast.main, // フォーカス時のラベルの色
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