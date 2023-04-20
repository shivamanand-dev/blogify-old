import { useSelector } from "react-redux";

import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { userState } from "@/redux/userSlice";

function Profile() {
  const state = useSelector(userState);

  return (
    <StyledProfile>
      <UserAccountInfo
        src={
          state?.user?.user?.profileImageUrl ||
          "https://firebasestorage.googleapis.com/v0/b/blogify-9a1bd.appspot.com/o/anonymous.png?alt=media&token=4b23045c-6f36-4054-a026-02922bff24c6"
        }
        name={state?.user?.user?.name || "Anonymous"}
        email={state?.user?.user?.email || "Anonymous"}
        follower={state?.user?.user?.followers?.length || "0"}
        following={state?.user?.user?.following?.length || "0"}
      />
    </StyledProfile>
  );
}

export default Profile;
