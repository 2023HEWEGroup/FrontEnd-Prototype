import { FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'

const StyledSelect = (props) => {

    const theme = useTheme();

    return (
        <FormControl fullWidth>
            <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.value === "" ? "選択してください" : null }</InputLabel>
            <Select theme={theme} value={props.value} onChange={props.onChange}
            sx={{
                height: "50px",
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
                        bgcolor: theme.palette.background.commandPop,
                        color: theme.palette.text.main,
                    }
                }
            }}>
                {props.menu.map((menu, index) =>
                    <MenuItem key={index} value={menu}>{menu}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default StyledSelect