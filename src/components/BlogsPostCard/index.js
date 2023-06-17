import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// import Parser from "html-react-parser";
import { PrimaryButton } from "../Buttons";
import { StyledBlogsPostCard } from "./StyledBlogsPostCard";

function BlogsPostCard({ title, description }) {
  return (
    <StyledBlogsPostCard>
      <Card sx={{ width: "100%", display: "inline-block" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>

          {/* {Parser(description)} */}
          {description}
        </CardContent>
        <CardActions>
          <PrimaryButton
            color="warning"
            variant="text"
            size="small"
            buttonText="Learn More"
          />
        </CardActions>
      </Card>
    </StyledBlogsPostCard>
  );
}

export default BlogsPostCard;
