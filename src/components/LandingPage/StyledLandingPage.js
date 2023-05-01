import styled from "styled-components";

export const StyledLandingPage = styled.section`
  .hero {
    font-family: "Foldit", cursive;
    font-weight: 300;
    h1 {
      font-size: 3.5rem;
    }
    h2 {
      max-width: 70%;
      font-size: 2rem;
      font-family: "Bruno Ace SC", cursive;
    }
    text-align: center;
    min-height: calc(100vh - 64px);
    flex-direction: column;
    justify-content: center;
  }
`;
