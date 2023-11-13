import { useTheme } from '@mui/system'
import React from 'react'
import styled from 'styled-components'


const ProductDetailInput = (props) => {

    const theme = useTheme();

    return (
        <>
        <StyledTextArea theme={theme} value={props.product.detail} placeholder='商品説明 (1~500字)' maxLength={500} autoComplete='off'
            onChange={props.handleProductDetailInput} error={props.productError.detail}>
        </StyledTextArea>
        </>
    )
}


const StyledTextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 20px 15px;
    color: ${(props) => props.theme.palette.text.main};
    background-color: transparent;
    outline: solid 1px ${(props) => props.error ? props.theme.palette.text.error : props.theme.palette.line.main};
    border-radius: 5px;
    border: none;
    resize: none;
    font-size: 100%;
    font-weight: normal;
    font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;

    &:focus-within {
        outline: solid 2px ${(props) => props.theme.palette.secondary.main};
    }
`


export default ProductDetailInput