import StarRateIcon from "@mui/icons-material/StarRate";
import { TextField } from "@mui/material";

import StyledInputField from "../InputField/StyledInputField";

function TextArea({
  placeholder,
  label,
  required = false,
  value,
  onChange,
  error,
  name,
  rows = 4,
  customStyle = {},
}) {
  return (
    <StyledInputField style={customStyle} className="flex alignItemsTop">
      <TextField
        sx={{ width: "100%" }}
        placeholder={placeholder}
        label={label}
        multiline
        rows={rows}
        value={value}
        variant="standard"
        required={required}
        onChange={onChange}
        error={error}
        name={name}
      />
      {required && <StarRateIcon color="error" fontSize="5px" />}
    </StyledInputField>
  );
}

export default TextArea;
