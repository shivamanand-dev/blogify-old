/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "@/components/Buttons";
import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { blogsState } from "@/redux/blogsSlice";
import { setUser, userState } from "@/redux/userSlice";
import app from "@/utils/firebase";
import { firestoreApi } from "@/utils/firebase/firestore";

function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(app);

  const userDataState = useSelector(userState);
  const blogsDataState = useSelector(blogsState);
  const [userData, setUserData] = useState();
  const [blogsData, setBlogsData] = useState();
  const [currentPid, setCurrentPid] = useState(userDataState?.user?.email);
  const [displayName, setDisplayName] = useState(name);
  const [editProfile, setEditProfile] = useState(false);

  const getData = async (pid) => {
    const userData = await firestoreApi.getDocument(pid);
    setUserData(userData);
    const blogsData = await firestoreApi.getCollection(pid);
    setBlogsData(blogsData);
  };

  const switchProfileModal = () => {
    setEditProfile(!editProfile);
  };

  const onClickSaveName = async () => {
    if (
      userData?.displayName !== displayName &&
      userDataState?.user?.email === userData?.email
    ) {
      await firestoreApi.updateData(router.query.pid, {
        displayName: displayName,
      });
      const updatedData = await firestoreApi.getDocument(router.query.pid);
      dispatch(setUser(updatedData));
    }
    switchProfileModal();
  };

  useEffect(() => {
    if (
      router.query.pid &&
      router.query.pid !== currentPid &&
      router.query.pid !== userDataState?.user?.email
    ) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setCurrentPid(router.query.pid);
          getData(router.query.pid);
        }
      });
    } else {
      setUserData(userDataState?.user);
      setBlogsData(blogsDataState?.blogs);
    }
  }, [router.query.pid, userDataState?.user]);

  return (
    <StyledProfile>
      <UserAccountInfo
        src={userData?.profileImageUrl}
        name={userData?.displayName || "Anonymous"}
        email={userData?.email || "Anonymous"}
        follower={userData?.followers?.length || "0"}
        following={userData?.following?.length || "0"}
        onClickSaveName={onClickSaveName}
        setDisplayName={setDisplayName}
        editProfile={editProfile}
        switchProfileModal={switchProfileModal}
        displayName={displayName}
        showEditBtn={router.query.pid === userDataState?.user?.email}
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
                <div key={e.id}>
                  <h1>{e.data.title}</h1>
                  <p>{e.data.content}</p>
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
