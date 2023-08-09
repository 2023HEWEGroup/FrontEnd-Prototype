import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const ProductShippingAreaInput = (props) => {

    const theme = useTheme();

    const prefectures = [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
        "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
        "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
        "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
    ];

    return (
        <StyledInput>
            <div style={{width: "30%"}}>
                <FormControl fullWidth>
                    <InputLabel shrink={false} sx={{color: theme.palette.text.sub}}>{props.product.shippingArea ? null : "選択してください"}</InputLabel>
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
                        {prefectures.map((prefecture, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
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