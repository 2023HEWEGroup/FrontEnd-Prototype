import { useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { StyledTextField } from '../../../utils/StyledTextField';


const ProducNameInput = (props) => {

    const theme = useTheme();

    return (
        <>
        <StyledProductNameZone>
            <StyledTextField theme={theme} value={props.product.name} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "商品名 (1~50字)"}}
                onChange={props.handleProductNameInput} error={props.productError.name}/>
        </StyledProductNameZone>
        </>
    )
}


const StyledProductNameZone = styled.div`
    width: 100%;
`


export default ProducNameInput