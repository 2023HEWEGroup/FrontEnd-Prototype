import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProductStatusInput = (props) => {

    const theme = useTheme();

    return (
        <StyledInput>
            <FormControl fullWidth>
                <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.status ? null : "選択してください"}</InputLabel>
                <Select theme={theme} value={props.product.status} onChange={props.handleOptionChange}
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.palette.text.main,
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.line.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.main,
                    },
                    '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.secondary.main,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.line.main,
                    },
                    '.MuiSvgIcon-root ': {
                        fill: `${theme.palette.line.main} !important`,
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            bgcolor: theme.palette.background.pop,
                            color: theme.palette.text.main,
                        }
                    }
                }}>
                    <MenuItem value={1}>新品、未使用</MenuItem>
                    <MenuItem value={2}>未使用に近い</MenuItem>
                    <MenuItem value={3}>目立った傷や汚れなし</MenuItem>
                    <MenuItem value={4}>やや傷や汚れあり</MenuItem>
                    <MenuItem value={5}>傷や汚れあり</MenuItem>
                    <MenuItem value={6}>全体的に状態が悪い</MenuItem>
                </Select>
            </FormControl>
        </StyledInput>
    )
}


const StyledInput = styled.div`
    width: 30%;
`


export default ProductStatusInput