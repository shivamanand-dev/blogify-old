/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { PrimaryButton } from "@/components/Buttons";
import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { userState } from "@/redux/userSlice";
import { firestoreApi } from "@/utils/firebase/firestore";

function Profile() {
  const state = useSelector(userState);
  const [userData, setUserData] = useState();
  const [currentPid, setCurrentPid] = useState();

  const router = useRouter();

  const getData = async (pid) => {
    const data = await firestoreApi.getDocument("user", pid);
    setUserData(data);
  };

  useEffect(() => {
    if (router.query.pid && router.query.pid !== currentPid) {
      setCurrentPid(router.query.pid);
      getData(router.query.pid);
    }
  }, [router.query.pid, state?.user]);

  return (
    <StyledProfile>
      <UserAccountInfo
        src={userData?.profileImageUrl}
        name={userData?.displayName || "Anonymous"}
        email={userData?.email || "Anonymous"}
        follower={userData?.followers?.length || "0"}
        following={userData?.following?.length || "0"}
      />
      <div className="flex mainContainer">
        <div className="sidebar">Hashtags Used</div>
        <div className="posts-container">
          <PrimaryButton buttonText="Create Post" />
        </div>
      </div>
    </StyledProfile>
  );
}

export default Profile;
