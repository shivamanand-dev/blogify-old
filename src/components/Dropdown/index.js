import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { StyledDropdown } from "./StyledDropdown";

function Dropdown({
  dropdownMenu = [],
  helperText = "",
  label = "",
  customStyle,
  textFieldStyle,
  onChange,
  value,
}) {
  return (
    <StyledDropdown style={customStyle}>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="standard-select-currency"
          select
          label={label}
          helperText={helperText}
          variant="standard"
          sx={textFieldStyle}
          onChange={onChange}
          value={value}
        >
          {dropdownMenu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </StyledDropdown>
  );
}

export default Dropdown;
