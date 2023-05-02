import styled from "styled-components";

export const StyledBlogsPostCard = styled.section`
  width: 100%;
  margin-bottom: 1rem;
  .MuiCard-root {
    background: ${({ theme }) => theme.COLORS.BLUE_COLOR_A};
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
  }
  .MuiTypography-root {
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
  }
`;
