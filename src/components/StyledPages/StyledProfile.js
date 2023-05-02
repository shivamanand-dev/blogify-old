import styled from "styled-components";

export const StyledProfile = styled.section`
  margin-top: 2rem;
  padding-bottom: 5rem;
  .mainContainer {
    margin-top: 5rem;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-start;
    .sidebar {
      max-width: 25%;
      width: 100%;
    }

    .posts-container {
      width: 70%;
      .posts {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
`;
