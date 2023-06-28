import { Chip, Stack } from "@mui/material";

import { tagsData } from "../data/tags";
import { StyledStackChip } from "./StyledStckChip";

const StackChip = ({
  selectedHashTags = [],
  onClickTagsChip,
  tags = tagsData,
  clickable = false,
}) => {
  return (
    <StyledStackChip>
      <Stack direction="row" sx={{ flexWrap: "wrap" }} gap={1}>
        {tags.map((e) => {
          return (
            <Chip
              key={e}
              label={e}
              variant={selectedHashTags.includes(e) ? "filled" : "outlined"}
              color={selectedHashTags.includes(e) ? "success" : "primary"}
              sx={{ color: "#e0e1dd" }}
              clickable={clickable}
              onClick={onClickTagsChip}
            />
          );
        })}
      </Stack>
    </StyledStackChip>
  );
};

export default StackChip;
