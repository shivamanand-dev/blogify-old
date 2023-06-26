import styled from "styled-components";

export const StyledPicture = styled.section`
  .image {
    height: 150px;
    width: 150px;
    border-radius: ${(props) => (props.rounded ? "50%" : "4px")};
    object-fit: cover;
    object-position: top;
    cursor: pointer;
  }

  @media all and (max-width: 768px) {
    .image {
      height: 125px;
      width: 125px;
    }
  }
`;
