import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { tagsData } from "../data/tags";
import { StyledMultiSelectDropdown } from "./StyledMultiSelectDropdown";

function MultiSelectDropdown({ tags = tagsData, onChange, value }) {
  return (
    <StyledMultiSelectDropdown>
      <Stack sx={{ margin: "1rem 0" }}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={tags.map((option) => option)}
          renderTags={(value, getTagProps) =>
            value.map((e, i) => (
              <Chip
                variant="outlined"
                {...getTagProps({ i })}
                key={i}
                label={e}
                sx={{ color: "#e0e1dd" }}
                //   clickable={clickable}
                //   onClick={onClickTagsChip}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
          value={value}
          onChange={onChange}
        />
      </Stack>
    </StyledMultiSelectDropdown>
  );
}

export default MultiSelectDropdown;
