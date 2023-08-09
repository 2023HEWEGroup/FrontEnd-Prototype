import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components';


const ProductCategorySelect = (props) => {

    const theme = useTheme();

    const categories = [
        "キムチ", "カクテキ", "elon"
    ]

    return (
        <StyledInput>
            <FormControl fullWidth>
                <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.category ? null : "選択してください"}</InputLabel>
                <Select theme={theme} value={props.product.category} onChange={props.handleCategoryChange}
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
                    {categories.map((prefecture, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                        {prefecture}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </StyledInput>
    )
}


const StyledInput = styled.div`
    width: 30%;
`


export default ProductCategorySelect