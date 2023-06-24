import { Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogsPostCard from "@/components/BlogsPostCard";
import CreatePostButton from "@/components/CreatePostButton";
import StckChip from "@/components/StackChip";
import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { blogsState } from "@/redux/blogsSlice";
import { setUser, userState } from "@/redux/userSlice";
import app from "@/utils/firebase";
import { blogServices } from "@/utils/firebase/services/blogServices";
import { userServices } from "@/utils/firebase/services/userServices";

function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(app);

  const userDataState = useSelector(userState);
  const blogsDataState = useSelector(blogsState);

  const [userData, setUserData] = useState();
  const [blogsData, setBlogsData] = useState();
  const [currentPid, setCurrentPid] = useState(userDataState?.user?.email);
  const [displayName, setDisplayName] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const [selectedHashTags, setSelectedHashTags] = useState([]);

  const getData = async (pid) => {
    const userData = await userServices.getUser(pid);
    setUserData(userData);
    const blogsData = await blogServices.getBlog(
      where("uid", "==", userData?.uid)
    );

    setBlogsData(blogsData);
  };

  const switchProfileModal = () => {
    setEditProfile(!editProfile);
  };

  const onClickSaveName = async () => {
    if (
      displayName &&
      userData?.displayName !== displayName &&
      userDataState?.user?.email === userData?.email
    ) {
      await userServices.updateUser(router.query.pid, {
        displayName: displayName,
      });
      const updatedData = await userServices.getUser(router.query.pid);
      dispatch(setUser(updatedData));
    }
    switchProfileModal();
  };

  const onClickTagsChip = (e) => {
    if (selectedHashTags.includes(e.target.innerText)) {
      const updatedSelectedHashTags = selectedHashTags.filter(
        (h) => h !== e.target.innerText
      );
      setSelectedHashTags(updatedSelectedHashTags);
    } else {
      setSelectedHashTags([...selectedHashTags, e.target.innerText]);
    }
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
        <div className="sidebar">
          <Typography gutterBottom variant="h5" component="div">
            Filter Tags
          </Typography>

          <StckChip
            selectedHashTags={selectedHashTags}
            onClickTagsChip={onClickTagsChip}
            clickable={true}
          />
        </div>
        <div className="posts-container">
          <div className="posts">
            {blogsData?.map((e) => {
              return (
                <BlogsPostCard
                  key={e.id}
                  title={e.data.title}
                  content={e.data.content}
                  uid={e.id}
                  email={userData?.displayName || e.data.email}
                />
              );
            })}
          </div>
        </div>
      </div>
      <CreatePostButton />
    </StyledProfile>
  );
}

export default Profile;
