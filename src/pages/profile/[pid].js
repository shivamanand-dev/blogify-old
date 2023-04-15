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
        src={state?.profileImageUrl || "Anonymous"}
        name={state?.name || "Anonymous"}
        userName={state?.username || "Anonymous"}
        follower={state?.followers?.length || "Anonymous"}
        following={state?.following?.length || "Anonymous"}
      />
    </StyledProfile>
  );
}

export default Profile;
