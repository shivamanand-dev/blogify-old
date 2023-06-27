import styled from "styled-components";

export const StyledLandingPage = styled.section`
  .hero {
    font-family: "Foldit", cursive;
    font-weight: 500;
    h1 {
      font-size: 3.5rem;
    }
    h2 {
      max-width: 70%;
      font-size: 2rem;
      font-family: "Bruno Ace SC", cursive;
      margin-bottom: 1rem;
    }
    text-align: center;
    min-height: calc(100vh - 64px);
    flex-direction: column;
    justify-content: center;
  }
`;
