import { useTheme } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import { StyledTextField } from '../../../utils/StyledTextField';


const ProductPriceInput = (props) => {

    const theme = useTheme();

    return (
        <>
        <StyledProductPriceZone>
            <div style={{width: "30%"}}>
                <StyledTextField theme={theme} value={props.product.price} autoComplete='new-off' fullWidth inputProps={{maxLength: 7, placeholder: "値段 (100~9999999)"}}
                    onChange={props.handleProductPriceInput} error={props.productError.price}/>
            </div>
            <StyledBenefit theme={theme}>収益 <StyledSpan theme={theme}>{props.product.benefit}</StyledSpan>ポイント</StyledBenefit>
        </StyledProductPriceZone>
        </>
    )
}


const StyledProductPriceZone = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    width: 100%;
`

const StyledBenefit = styled.div`
    color: ${(props) => props.theme.palette.text.sub};
    font-size: 0.9rem;
`

const StyledSpan = styled.span`
    color: ${(props) => props.theme.palette.secondary.main};
`


export default ProductPriceInput