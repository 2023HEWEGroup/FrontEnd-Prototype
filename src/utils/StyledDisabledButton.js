import { Button } from "@mui/material";
import styled from "styled-components";


export const StyledDisabledButton = styled(Button)`
    && {
        &.Mui-disabled {
            background-color: ${(props) => props.theme.palette.primary.disabled};
            color: ${(props) => props.theme.palette.text.disabled};
        }
    }
`