import { TextField, useTheme } from "@mui/material";
import styled from "styled-components";

const RegistPersonalInfo = (props) => {
  const theme = useTheme();

  return (
    <>
      <SName>
        <STextField
          style={{ marginBottom: "15px", width: "50%" }}
          helperText=" "
          theme={theme}
          fullWidth
          label="姓 (全角)"
          required
          autoComplete="new-off"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          value={props.upperName}
          onChange={props.handleUpperNameInput}
        />
        <STextField
          style={{ marginBottom: "15px", width: "50%" }}
          helperText=" "
          theme={theme}
          fullWidth
          label="名 (全角)"
          required
          autoComplete="new-off"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          value={props.lowerName}
          onChange={props.handleLowerNameInput}
        />
      </SName>
      <SName>
        <STextField
          style={{ marginBottom: "15px", width: "50%" }}
          helperText=" "
          theme={theme}
          fullWidth
          label="姓 (カナ)"
          required
          autoComplete="new-off"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          value={props.upperNameKana}
          onChange={props.handleUpperNameKanaInput}
        />
        <STextField
          style={{ marginBottom: "15px", width: "50%" }}
          helperText=" "
          theme={theme}
          fullWidth
          label="名 (カナ)"
          required
          autoComplete="new-off"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          value={props.lowerNameKana}
          onChange={props.handleLowerNameKanaInput}
        />
      </SName>
      <SPostalCode>
        <STextField
          style={{ width: "50%" }}
          theme={theme}
          fullWidth
          label="郵便番号"
          required
          autoComplete="new-off"
          variant="outlined"
          inputProps={{ maxLength: 7 }}
          value={props.postalCode}
          onChange={props.handlePostalCodeInput}
        />
        <SPostalComment>郵便番号から住所が自動で入力されます</SPostalComment>
      </SPostalCode>
      <STextField
        style={{ marginBottom: "15px", pointerEvents: "none" }}
        theme={theme}
        fullWidth
        label="都道府県 (自動入力)"
        autoComplete="new-off"
        variant="filled"
        value={props.prefecture}
      />
      <STextField
        style={{ marginBottom: "15px", pointerEvents: "none" }}
        theme={theme}
        fullWidth
        label="市区町村 (自動入力)"
        autoComplete="new-off"
        variant="filled"
        value={props.city}
      />
      <STextField
        style={{ marginBottom: "40px", pointerEvents: "none" }}
        theme={theme}
        fullWidth
        label="町名 (自動入力)"
        autoComplete="new-off"
        variant="filled"
        value={props.town}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="番地・建物名など"
        autoComplete="new-off"
        variant="outlined"
        inputProps={{ maxLength: 50 }}
        value={props.houseNumber}
        onChange={props.handleHouseNumberInput}
      />
      <STextField
        style={{ marginBottom: "15px" }}
        helperText=" "
        theme={theme}
        fullWidth
        label="電話番号"
        required
        autoComplete="new-off"
        variant="outlined"
        inputProps={{ maxLength: 11 }}
        value={props.phoneNumber}
        onChange={props.handlePhoneNumberInput}
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

const SName = S.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const SPostalCode = S.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: fit-content;
    margin-top: 50px;
    margin-bottom: 30px;
`;

const SPostalComment = S.div`
    width: 50%;
    color: #777;
    font-size: 0.9rem;
`;

export default RegistPersonalInfo;
