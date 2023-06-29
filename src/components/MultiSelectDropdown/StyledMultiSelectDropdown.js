import styled from "styled-components";

export const StyledMultiSelectDropdown = styled.section`
  color: #fff;
  display: flex;
  width: 100%;
  position: relative;

  .MuiStack-root {
    width: 100%;
  }
  .MuiAutocomplete-root {
    width: 100%;
  }

  .MuiFormControl-root,
  .MuiOutlinedInput-notchedOutline,
  .MuiInputBase-root {
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
    svg {
      color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
      option {
        color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
      }
    }
  }

  label {
    color: ${({ theme }) => theme.COLORS.LIGHTS_COLOR};
  }
  .MuiInputBase-root:before {
    border-color: #e0e1dd !important;
  }
  .starIcon {
    color: #d32f2f;
    position: absolute;
    right: 0;
  }
`;
