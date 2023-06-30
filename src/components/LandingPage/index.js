import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { userState } from "@/redux/userSlice";
import { app_routes } from "@/utils/constants/app_constants";

import { PrimaryButton } from "../Buttons";
import { StyledLandingPage } from "./StyledLandingPage";

function LandingPage() {
  const router = useRouter();
  const userStateData = useSelector(userState);
  const { user } = userStateData;
  return (
    <StyledLandingPage>
      <div className="hero flex">
        <h1>Welcome to Our Blogging Community</h1>
        <h2>Join thousands of writers and readers around the world</h2>
        <PrimaryButton
          buttonText={() => {
            user ? "Explore" : "Join Now";
          }}
          onClick={() => {
            user
              ? router.push(app_routes.explore)
              : router.push(app_routes.login);
          }}
        />
      </div>
    </StyledLandingPage>
  );
}

export default LandingPage;
