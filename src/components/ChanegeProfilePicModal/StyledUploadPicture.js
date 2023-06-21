import styled from "styled-components";

export const StyledUploadPicture = styled.section`
  width: 100%;
  margin: 0 auto;
  .box {
    background: ${({ theme }) => theme.COLORS.DARK_COLOR_A};
    padding: 3rem;
    border-radius: 0.5rem;

    .profilePic {
      height: 150px;
      width: 150px;
      border-radius: ${(props) => (props.rounded ? "50%" : "4px")};
      object-fit: cover;
      object-position: top;
      cursor: pointer;
    }
    .image-container {
      margin-bottom: 1rem;
      text-align: center;
    }
  }
`;
