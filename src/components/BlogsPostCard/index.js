/* eslint-disable @next/next/no-img-element */
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import { PiHandsClappingLight } from "react-icons/pi";
import { useSelector } from "react-redux";

import { userState } from "@/redux/userSlice";
import { app_routes } from "@/utils/constants/app_constants";
import { userServices } from "@/utils/firebase/services/userServices";

import { PrimaryButton } from "../Buttons";
// import Parser from "html-react-parser";
import { StyledBlogsPostCard } from "./StyledBlogsPostCard";

function BlogsPostCard({ data, id, name }) {
  const {
    email,
    title,
    description,
    claps,
    bookmarks,
    comments,
    lastEdited,
    tags,
  } = data;

  const router = useRouter();
  const [userData, setUserData] = useState();
  const [timeDifference, setTimeDifference] = useState();

  const userDataState = useSelector(userState);

  const getUserDetails = async (email) => {
    const user = await userServices.getUser(email);
    setUserData(user);
  };

  const getTime = () => {
    const seconds = lastEdited.seconds;

    const currentDate = new Date();
    const pastDate = new Date(seconds * 1000); // Subtract 4 minutes in milliseconds

    const timeDifferenceInMinutes = Math.floor(
      (currentDate - pastDate) / 60000
    );
    setTimeDifference(timeDifferenceInMinutes);
  };

  useEffect(() => {
    if (!router.pathname.includes("profile")) {
      getUserDetails(email);
    }
    getTime();
  }, []);

  return (
    <StyledBlogsPostCard>
      <Card sx={{ width: "100%", display: "inline-block" }}>
        <CardContent>
          <div className="creatorDetails">
            <div className="flex space-between profileDetails">
              <div className="flex">
                <img
                  src={
                    userData?.profileImageUrl ||
                    userDataState.user.profileImageUrl
                  }
                  alt=""
                />
                <h3>{userData?.displayName || name || email}</h3>
              </div>
              <div>
                <p>
                  {timeDifference < 60
                    ? `${timeDifference} minutes ago`
                    : timeDifference / 60 < 23
                    ? `${Math.floor(timeDifference / 60)} hours ago`
                    : `${Math.floor(timeDifference / 60 / 24)} days ago`}
                </p>
              </div>
            </div>
          </div>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            onClick={() => {
              router.push(`${app_routes.blog}/${id}`);
            }}
            className="blogTitle"
          >
            {title}
          </Typography>

          {/* {Parser(description)} */}
          {description}

          <div className="postTags">
            {tags &&
              tags.map((e, i) => {
                return (
                  <PrimaryButton
                    key={i}
                    variant="outlined"
                    buttonText={`#${e}`}
                  />
                );
              })}
          </div>
        </CardContent>

        <CardActions>
          <div>
            <IconButton sx={{ color: "#778DA9" }} className="claps">
              <PiHandsClappingLight
                fontSize={24}
                style={{ marginRight: "0.5rem" }}
                color="#E0E1DD"
              />
              {claps.length}
            </IconButton>

            <IconButton sx={{ color: "#778DA9" }} className="claps">
              <FaRegComments
                fontSize={24}
                style={{ marginRight: "0.5rem" }}
                color="#E0E1DD"
              />
              {comments?.length || 0}
            </IconButton>

            {/* {tags} */}
          </div>
          <IconButton sx={{ color: "#778DA9" }} className="claps">
            <MdBookmarkAdd
              fontSize={24}
              style={{ marginRight: "0.5rem" }}
              color="#E0E1DD"
            />
            {bookmarks?.length || 0}
          </IconButton>
        </CardActions>
      </Card>
    </StyledBlogsPostCard>
  );
}

export default BlogsPostCard;
