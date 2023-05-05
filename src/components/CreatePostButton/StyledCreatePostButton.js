import styled from "styled-components";

export const StyledCreatePostButton = styled.section`
  padding: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.BLUE_COLOR_A};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  cursor: pointer;
  transition: box-shadow ease-in-out 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0px #2e7d32;
  }
  svg {
    font-size: 2.5rem;
  }
`;
