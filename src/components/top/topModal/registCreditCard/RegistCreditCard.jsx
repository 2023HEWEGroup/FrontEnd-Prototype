import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import images from "react-payment-inputs/images";
import React from "react";
import styled from "styled-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegistCreditCard = (props) => {
  const theme = useTheme();

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <SCardImg {...props.getCardImageProps({ images })} />
        <SCardType>
          {props.meta.cardType
            ? props.meta.cardType.displayName
            : "クレジットカードが選択されていません"}
        </SCardType>
      </div>
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="カード番号"
        autoComplete="new-off"
        variant="outlined"
        inputProps={{ ...props.getCardNumberProps(), placeholder: "" }}
        value={props.creditCard.number}
        onChange={props.handleCreditCardNumberChange}
      />
      <div style={{ width: "100%", display: "flex", gap: "20px" }}>
        <STextField
          style={{ marginBottom: "15px", width: "50%" }}
          helperText=" "
          theme={theme}
          fullWidth
          label="有効期限 (MM/YY)"
          autoComplete="new-off"
          variant="outlined"
          inputProps={{ ...props.getExpiryDateProps(), placeholder: "" }}
          value={props.creditCard.expiry}
          onChange={props.handleCreditCardExpiryChange}
        />
        <STextField
          style={{ marginBottom: "15px", width: "50%" }}
          helperText=" "
          theme={theme}
          fullWidth
          label="CVC"
          autoComplete="new-off"
          variant="outlined"
          inputProps={{
            ...props.getCVCProps(),
            placeholder: "",
            type: props.CVCVisible ? "text" : "password",
          }}
          value={props.creditCard.cvc}
          onChange={props.handleCreditCardCVCChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={props.handleCVCVisible}>
                {props.CVCVisible ? <SVisibility /> : <SVisibilityOff />}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <SFormControlLabel
        control={
          <Checkbox
            color="top"
            checked={props.cardChecked}
            onChange={props.handleCardChecked}
            sx={{ color: "#777", "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
        }
        label="お支払い方法にクレジットカードを追加します (任意)"
      />
    </>
  );
};

const STextField = S(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "#777", // 入力文字の色
    backgroundColor: "#000",
    borderRadius: "5px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#777", // 通常時のボーダー色(アウトライン)
    },
    "&:hover:not(.Mui-disabled) fieldset": {
      borderColor: "#777", // 非フォーカス時のホバー時のボーダー色(アウトライン)
    },
    "&.Mui-focused:hover fieldset": {
      borderColor: theme.palette.top.main, // フォーカス時にホバーしたときのボーダー色(アウトライン)
    },
    "&:focus-within fieldset": {
      borderColor: theme.palette.top.main, // フォーカス時のボーダー色(アウトライン)
    },
  },
  "& .MuiInputLabel-root": {
    color: "#777", // ラベルの通常時の色
    "&.Mui-focused": {
      color: theme.palette.top.main, // フォーカス時のラベルの色
    },
  },
}));

const SCardType = S.div`
    color: #777;
`;

const SFormControlLabel = S(FormControlLabel)`
    && {
        color: #777;
        margin-bottom: 40px;
    }
`;

const SCardImg = S.svg`
    width: 75px;
    height: fit-content;
`;

const SVisibility = S(Visibility)`
    && {
        color: #777;
        cursor: pointer;
    }
`;

const SVisibilityOff = S(VisibilityOff)`
    && {
        color: #777;
        cursor: pointer;
    }
`;

export default RegistCreditCard;
