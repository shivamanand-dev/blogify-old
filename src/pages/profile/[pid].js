/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { PrimaryButton } from "@/components/Buttons";
import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { blogsState } from "@/redux/blogsSlice";
import { userState } from "@/redux/userSlice";
import { firestoreApi } from "@/utils/firebase/firestore";

function Profile() {
  const usersState = useSelector(userState);
  const blogsDataState = useSelector(blogsState);
  const [userData, setUserData] = useState();
  const [blogsData, setBlogsData] = useState();
  const [currentPid, setCurrentPid] = useState();

  const router = useRouter();

  const getData = async (pid) => {
    const userData = await firestoreApi.getDocument(pid);
    setUserData(userData);
    const blogsData = await firestoreApi.getCollection(pid);
    setBlogsData(blogsData);
  };

  useEffect(() => {
    if (
      router.query.pid &&
      router.query.pid !== currentPid &&
      currentPid !== usersState?.user?.username
    ) {
      setCurrentPid(router.query.pid);
      getData(router.query.pid);
    } else {
      setUserData(usersState?.user);
      setBlogsData(blogsDataState?.blogs);
    }
  }, [router.query.pid, usersState?.user]);

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
          <PrimaryButton
            buttonText="Create Post"
            onClick={() => {
              router.push("/createPost");
            }}
          />

          <div className="posts">
            {blogsData?.map((e) => {
              return (
                <div key={e.title}>
                  <h1>{e.title}</h1>
                  <p>{e.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StyledProfile>
  );
}

export default Profile;
