import styled from "styled-components";

export const StyledBlogsPostCard = styled.section`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .creatorDetails {
    margin-bottom: 0.25rem;
    .profileDetails {
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.75rem;
      }
      h3 {
        font-family: "Ysabeau Infant", sans-serif;
        font-weight: 300;
        cursor: pointer;
      }
      p {
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }
    }
  }
  .claps {
    font-size: 0.875rem;
  }
  .blogTitle {
    cursor: pointer;
    font-family: "Alef", sans-serif;
  }
  .postTags {
    margin-top: 1rem;
    button {
      color: ${({ theme }) => theme.COLORS.BLUE_COLOR_B};
      margin-right: 0.75rem;
      text-transform: lowercase;
      border: none;
      padding: 0;
      min-width: 10px;
      border-bottom: 1px solid;
      border-radius: 0;
      border-color: transparent;
      :hover {
        border-color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
      }
    }
  }
  .MuiCard-root {
    background: ${({ theme }) => theme.COLORS.DARK_COLOR_A};
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
    max-width: 650px;
  }
  .MuiTypography-root {
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
  }

  .MuiCardActions-root {
    border-top: 1px solid;
    border-color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
    justify-content: space-between;
  }

  @media all and (max-width: 768px) {
    .profileDetails {
      flex-direction: row;
      div {
        flex-direction: row;
      }
    }
  }
`;
