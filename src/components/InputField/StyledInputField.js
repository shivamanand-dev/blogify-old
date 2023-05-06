import styled from "styled-components";

const StyledInputField = styled.section`
  width: 100%;
  margin: 0.5rem auto;
  .MuiInput-root,
  .MuiInputBase-root,
  .MuiInputBase-input {
    width: 100%;
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
  }
  .css-q0jhri-MuiInputBase-root-MuiInput-root:before {
    border-color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR} !important;
  }
`;

export default StyledInputField;
