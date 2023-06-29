import styled from "styled-components";

const StyledInputField = styled.section`
  width: 100%;
  margin: 0.5rem auto;
  margin-bottom: 1rem;
  position: relative;
  .MuiInput-root,
  .MuiInputBase-root,
  .MuiInputBase-input {
    width: 100%;
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
  }
  .MuiInput-root:before {
    border-color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR} !important;
  }
  svg {
    position: absolute;
    right: 0;
  }
`;

export default StyledInputField;
