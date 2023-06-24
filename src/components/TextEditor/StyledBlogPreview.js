import styled from "styled-components";

export const StyledBlogPreview = styled.section`
  .tox-editor-header {
    display: ${(props) => (props.isPreview ? "none !important" : "block")};
  }
`;
