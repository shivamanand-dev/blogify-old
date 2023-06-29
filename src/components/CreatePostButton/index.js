import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { setBlogs } from "@/redux/blogsSlice";
import { userState } from "@/redux/userSlice";
import { app_routes } from "@/utils/constants/app_constants";
import { firestoreApi } from "@/utils/firebase/firestore";
import { blogServices } from "@/utils/firebase/services/blogServices";

import { StyledCreatePostButton } from "./StyledCreatePostButton";

function CreatePostButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userStateData = useSelector(userState);

  const handleCreatePost = async () => {
    const data = await blogServices.createBlog({
      title: "",
      description: "",
      content: "",
      lastEdited: firestoreApi.now,
      email: userStateData?.user?.email,
      uid: userStateData?.user?.uid,
      comments: [
        // {
        //   uid: "sfdfdsf43fdf34rf",
        //   message: "Awesome",
        //   likes: 0,
        //   postedAt: firestoreApi.now,
        //   reply: [
        //     {
        //       uid: "sfdfdsf43fdf34rf",
        //       message: "Reply",
        //       likes: 0,
        //       postedAt: firestoreApi.now,
        //     },
        //   ],
        // },
      ],
      claps: [
        // {
        //   uid: "sfdfdsf43fdf34rf",
        // },
      ],
      tags: [],
      bookmarks: 0,
      clicks: 0,
      postType: "draft",
    });

    const blogsData = await blogServices.getBlog(
      where("uid", "==", userStateData?.user?.uid)
    );

    dispatch(setBlogs(blogsData));

    router.push(`${app_routes.blog}/${data.id}`);
  };
  return (
    <StyledCreatePostButton>
      <PostAddOutlinedIcon onClick={handleCreatePost} />
    </StyledCreatePostButton>
  );
}

export default CreatePostButton;
