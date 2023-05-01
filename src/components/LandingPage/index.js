import { PrimaryButton } from "../Buttons";
import { StyledLandingPage } from "./StyledLandingPage";

function LandingPage() {
  return (
    <StyledLandingPage>
      <div className="hero flex">
        <h1>Welcome to Our Blogging Community</h1>
        <h2>Join thousands of writers and readers around the world</h2>
        <PrimaryButton buttonText="Join now" />
      </div>
    </StyledLandingPage>
  );
}

export default LandingPage;
