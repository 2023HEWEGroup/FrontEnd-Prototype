import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProductDeliveryCostInput = (props) => {

    const theme = useTheme();

    return (
        <StyledInput>
            <FormControl fullWidth>
                <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.deliveryCost ? null : "選択してください"}</InputLabel>
                <Select theme={theme} value={props.product.deliveryCost} onChange={props.handleDeliveryCostChange}
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
                    <MenuItem value={1}>送料込み（出品者負担）</MenuItem>
                    <MenuItem value={2}>着払い（購入者負担）</MenuItem>
                </Select>
            </FormControl>
        </StyledInput>
    )
}


const StyledInput = styled.div`
    width: 30%;
`


export default ProductDeliveryCostInput