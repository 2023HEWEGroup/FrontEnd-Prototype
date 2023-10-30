import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProductStatusInput = (props) => {

    const theme = useTheme();

    return (
        <StyledInput>
            <FormControl fullWidth>
                <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.status === "" ? "選択してください" : null }</InputLabel>
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
                    {props.status.map((state, index) =>
                        <MenuItem key={index} value={state}>{state}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </StyledInput>
    )
}


const StyledInput = styled.div`
    width: 30%;
`


export default ProductStatusInput