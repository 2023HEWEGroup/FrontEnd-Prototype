import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const RegistUserInfo = (props) => {
  const [registPasswordVisible, setRegistPasswordVisible] = useState(false);
  const theme = useTheme();

  const handleRegistPasswordVisible = () => {
    setRegistPasswordVisible(!registPasswordVisible);
  };

  return (
    <>
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="ユーザーネーム (1~30字)"
        required
        autoComplete="new-off"
        variant="outlined"
        inputProps={{ maxLength: 30 }}
        value={props.registUserName}
        onChange={props.handleRegistUserNameInput}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="ユーザーID (3~20字)"
        required
        autoComplete="new-off"
        variant="outlined"
        inputProps={{ maxLength: 20 }}
        value={props.registUserId}
        onChange={props.handleRegistUserIdInput}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="パスワード (8~20字)"
        required
        autoComplete="new-off"
        type={registPasswordVisible ? "text" : "password"}
        variant="outlined"
        inputProps={{ maxLength: 20 }}
        value={props.registPassword}
        onChange={props.handleRegistPasswordInput}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleRegistPasswordVisible}
            >
              {registPasswordVisible ? <SVisibility /> : <SVisibilityOff />}
            </InputAdornment>
          ),
        }}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="確認用パスワード (8~20字)"
        required
        autoComplete="new-off"
        type={registPasswordVisible ? "text" : "password"}
        variant="outlined"
        inputProps={{ maxLength: 20 }}
        value={props.registConfirmPassword}
        onChange={props.handleRegistConfirmPasswordInput}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleRegistPasswordVisible}
            >
              {registPasswordVisible ? <SVisibility /> : <SVisibilityOff />}
            </InputAdornment>
          ),
        }}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="メールアドレス"
        required
        autoComplete="new-off"
        type="email"
        variant="outlined"
        value={props.registMailAddress}
        onChange={props.handleRegistMailAddressInput}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="確認用メールアドレス"
        required
        autoComplete="new-off"
        type="email"
        variant="outlined"
        value={props.registConfirmMailAddress}
        onChange={props.handleRegistConfirmMailAddressInput}
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

export default RegistUserInfo;
