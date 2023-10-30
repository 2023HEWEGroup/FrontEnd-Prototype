import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProductShippingAreaInput = (props) => {

    const theme = useTheme();

    return (
        <StyledInput>
            <div style={{width: "30%"}}>
                <FormControl fullWidth>
                    <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.shippingArea === "" ? "選択してください" : null }</InputLabel>
                    <Select theme={theme} value={props.product.shippingArea} onChange={props.handleShippingAreaChange}
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
                        {props.prefectures.map((prefecture, index) => (
                            <MenuItem key={index} value={prefecture}>
                            {prefecture}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <StyledFormControlLabel control={<Checkbox color='secondary' sx={{ color: theme.palette.text.sub, '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
            label="プロフィールの地域を設定"/>
        </StyledInput>
    )
}


const StyledInput = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
`

const StyledFormControlLabel = styled(FormControlLabel)`
    && {
        color: #777;
    }
`


export default ProductShippingAreaInput