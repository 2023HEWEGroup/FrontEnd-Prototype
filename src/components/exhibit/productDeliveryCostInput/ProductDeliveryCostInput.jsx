import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";
import styled from "styled-components";

const ProductDeliveryCostInput = (props) => {
  const theme = useTheme();

  return (
    <SInput>
      <FormControl fullWidth>
        <InputLabel shrink={false} sx={{ color: theme.palette.text.sub }}>
          {props.product.deliveryCost === "" ? "選択してください" : null}
        </InputLabel>
        <Select
          theme={theme}
          value={props.product.deliveryCost}
          onChange={props.handleDeliveryCostChange}
          sx={{
            "& .MuiInputBase-input": {
              color: theme.palette.text.main,
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.line.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
            },
            "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.line.main,
            },
            ".MuiSvgIcon-root ": {
              fill: `${theme.palette.line.main} !important`,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: theme.palette.background.pop,
                color: theme.palette.text.main,
              },
            },
          }}
        >
          {props.deliveryCost.map((delivery, index) => (
            <MenuItem key={index} value={index}>
              {delivery}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SInput>
  );
};

const SInput = S.div`
    width: 30%;
`;

export default ProductDeliveryCostInput;
