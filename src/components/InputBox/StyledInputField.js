import styled from "styled-components";

const StyledInputField = styled.section`
  width: 100%;
  margin: 0.5rem auto;
  .MuiInput-root,
  .MuiInputBase-root,
  .MuiInputBase-input {
    width: 100%;
    color: ${({ theme }) => theme.COLORS.LIGHT_TEXT_COLOR};
  }
`;

export default StyledInputField;
