import StarRateIcon from "@mui/icons-material/StarRate";
import { Input } from "@mui/material";

import StyledInputField from "./StyledInputField";

function InputField({
  placeholder,
  required = false,
  type = "text",
  value,
  onChange,
  error,
  name,
  customStyle = {},
}) {
  return (
    <StyledInputField style={customStyle}>
      <Input
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        name={name}
        endAdornment={required && <StarRateIcon color="error" fontSize="5px" />}
      />
    </StyledInputField>
  );
}

export default InputField;
