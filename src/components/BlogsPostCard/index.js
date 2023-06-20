import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { app_routes } from "@/utils/constants/app_constants";
import { userServices } from "@/utils/firebase/services/userServices";

// import Parser from "html-react-parser";
import { PrimaryButton } from "../Buttons";
import { StyledBlogsPostCard } from "./StyledBlogsPostCard";

function BlogsPostCard({ title, description, uid, email }) {
  const router = useRouter();
  const [userData, setUserData] = useState();

  const getUserDetails = async (email) => {
    const user = await userServices.getUser(email);
    setUserData(user);
  };

  useEffect(() => {
    if (!router.pathname.includes("profile")) {
      getUserDetails(email);
    }
  }, []);

  return (
    <StyledBlogsPostCard>
      <Card sx={{ width: "100%", display: "inline-block" }}>
        <CardContent>
          {userData?.displayName || email}
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>

          {/* {Parser(description)} */}
          {description}
        </CardContent>
        <CardActions>
          <PrimaryButton
            color="warning"
            variant="text"
            size="small"
            buttonText="Learn More"
            onClick={() => {
              router.push(`${app_routes.blog}/${uid}`);
            }}
          />
        </CardActions>
      </Card>
    </StyledBlogsPostCard>
  );
}

export default BlogsPostCard;
