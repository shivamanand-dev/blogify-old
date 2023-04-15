import { useSelector } from "react-redux";

import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { userState } from "@/store/user";

function Profile() {
  const state = useSelector(userState);

  //   console.log(state.user);
  return (
    <StyledProfile>
      <UserAccountInfo
        src={
          state?.profileImageUrl ||
          "https://firebasestorage.googleapis.com/v0/b/blogify-9a1bd.appspot.com/o/anonymous.png?alt=media&token=4b23045c-6f36-4054-a026-02922bff24c6"
        }
        name={state?.name || "Anonymous"}
        userName={state?.username || "Anonymous"}
        follower={state?.followers?.length || "Anonymous"}
        following={state?.following?.length || "Anonymous"}
      />
    </StyledProfile>
  );
}

export default Profile;
