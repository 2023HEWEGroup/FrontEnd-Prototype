import { Button, Chip, InputAdornment, useTheme } from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import { StyledTextField } from '../../../utils/StyledTextField';


const ProductAddTag = (props) => {

    const theme = useTheme();

    const handleEnterKey = (event) => {
        if (event.key === 'Enter' && props.tag.length > 0) {
            event.preventDefault();
            props.handleTagAdd();
        }
    };

    return (
        <>
        {props.product.tags.length < 10 ?
        <>
        <StyledTextField theme={theme} value={props.tag} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "タグ (1~50字)"}}
            onChange={props.handleTagInput} onKeyDown={handleEnterKey}
            InputProps={props.tag.length > 0 ? {endAdornment: (<InputAdornment position="end" onClick={props.handleTagAdd}>{<Button color='secondary'>追加 (Enter)</Button>}</InputAdornment>)} : null}/>
        <StyledInputLength theme={theme}>{`${props.tag.length}/50`}</StyledInputLength>
        </> :
        <StyledStopTag theme={theme}>追加できるタグ数は10個までです</StyledStopTag>
        }
        
        <StyledTagZone>
            {props.product.tags.map((tag, index) => 
                <StyledTagChip key={index} color="secondary" label={tag} variant='outlined' clickable onDelete={() => props.handleTagDelete(index)}></StyledTagChip>
            )}
            <StyledInputLength theme={theme}>{`タグ ${props.product.tags.length}/10`}</StyledInputLength>
        </StyledTagZone>
        </>
    )
}

const StyledInputLength = styled.div`
    width: 100%;
    text-align: right;
    color: ${(props) => props.theme.palette.text.sub};
`

const StyledTagZone = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`

const StyledTagChip = styled(Chip)`
    && {
        font-size: 1rem;
        height: 35px;
        padding: 10px;
    }
`

const StyledStopTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    color: ${(props) => props.theme.palette.text.sub};
`


export default ProductAddTag