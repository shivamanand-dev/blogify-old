import styled from "styled-components";

export const StyledUserAccountInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0px 0px 30px 5px #415a77;
  border-radius: 15px;
  /* width: 100%; */
  margin: 0 auto;

  @media all and (max-width: 768px) {
    .container {
      flex-direction: column;
      text-align: center;
    }
    h4,
    h6 {
      margin: 0;
      text-align: center;
    }
    .following {
      margin-left: 1rem;
    }
  }
`;
