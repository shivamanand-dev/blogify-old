import Parser from "html-react-parser";

import { StyledBlogsPostCard } from "./StyledBlogsPostCard";

function BlogsPostCard({ title, content }) {
  return (
    <StyledBlogsPostCard>
      <div>
        <h1>{title}</h1>
        <p>{Parser(content)}</p>
      </div>
    </StyledBlogsPostCard>
  );
}

export default BlogsPostCard;
