import { Chip, Stack } from "@mui/material";

import { StyledStckChip } from "./StyledStckChip";

const StckChip = ({
  selectedHashTags = [],
  onClickTagsChip,
  tags = [
    "Technology",
    "Business",
    "Entrepreneurship",
    "Finance",
    "Marketing",
    "Social Media",
    "Health & Wellness",
    "Fitness",
    "Nutrition",
    "Mental Health",
    "Lifestyle",
    "Travel",
    "Food & Recipes",
    "Beauty",
    "Fashion",
    "Personal Development",
    "Relationships",
    "Education",
    "Entertainment",
    "News",
    "Sports",
    "Culture",
    "Arts & Crafts",
    "Photography",
    "Writing",
    "Books & Literature",
    "Music",
    "Film & TV",
    "Science",
    "Environment",
    "Politics",
    "History",
    "Religion & Spirituality",
  ],
  clickable = false,
}) => {
  return (
    <StyledStckChip>
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
    </StyledStckChip>
  );
};

export default StckChip;
