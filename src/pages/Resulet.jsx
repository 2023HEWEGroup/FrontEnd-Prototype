import { useTheme } from '@mui/system';
import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';


const Resulet = () => {

    const theme = useTheme();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchWord = searchParams.get('word');
    const searchMode = searchParams.get('mode');

    return (
        <>
        <StyledResults>
            <StyledResultHeader theme={theme}><StyledSpan theme={theme}>"{searchWord}"</StyledSpan> の検索結果 (NaN/NaN件)</StyledResultHeader>
        </StyledResults>
        </>
    )
}


const StyledResults = styled.div`
    width: 90%;
    margin: 0 auto;
`

const StyledResultHeader  = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 50px;
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1.1rem;
    font-weight: bold;
    word-break: break-all;
`

const StyledSpan = styled.span`
    margin-right: 5px;
    color: ${(props) => props.theme.palette.secondary.main};
`


export default Resulet