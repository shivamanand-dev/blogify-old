import styled from "styled-components";

export const StyledNavbar = styled.section`
  position: fixed;
  width: 100%;
  z-index: 9999;

  .bunglowBtn {
    padding: 0 !important;
  }
  button {
    min-width: 6rem;
    margin-left: 2rem;
    border-color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
    transition: border ease-in-out 0.3s, box-shadow ease-in-out 0.3s;

    :hover {
      border-color: ${({ theme }) => theme.COLORS.WARNING_COLOR_B};
      box-shadow: 0 0 10px 1px #ed7331;
      opacity: 0.9;
    }
  }
`;
