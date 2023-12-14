import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components';


const ProductCategorySelect = (props) => {

    const theme = useTheme();

    return (
        <StyledInput>
            <div style={{width: "30%"}}>
                <FormControl fullWidth>
                    <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.category === "" ? "選択してください" : null }</InputLabel>
                    <Select theme={theme} value={props.product.category} onChange={props.handleCategoryChange} error={props.productError.category}
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
                        {props.categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                            {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </StyledInput>
    )
}


const StyledInput = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
`


export default ProductCategorySelect