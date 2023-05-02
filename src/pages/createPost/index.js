/* eslint-disable security/detect-object-injection */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputField from "@/components/InputField";
import { StyledCreatePost } from "@/components/StyledPages/StyledCreatePost";
import TextEditor from "@/components/TextEditor";
import { setBlogs } from "@/redux/blogsSlice";
import { userState } from "@/redux/userSlice";
import { fireStoreCollections } from "@/utils/constants/app_constants";
import { firestoreApi } from "@/utils/firebase/firestore";

function CreatePost() {
  const usersDataState = useSelector(userState);
  const router = useRouter();
  const dispatch = useDispatch();

  const [editorContent, setEditorContent] = useState();
  const [currentStaticHeading, setCurrentStaticHeading] = useState({
    heading: "",
    label: "",
  });

  const heading = [
    "Create Your Own Blog Post",
    "Share Your Ideas with the World",
    "Tell Your Story",
    "Craft Your Next Masterpiece",
    "Share Your Expertise",
    "Become a Published Author",
    "Put Your Thoughts into Words",
    "Write, Publish, and Share Your Thoughts",
  ];

  const labelMessage = [
    "Enter your blog post title",
    "Add a title for your blog post",
    "What's your blog post about? Enter a title",
    "Title your blog post",
    "Give your blog post a catchy title",
    "Enter a heading for your blog post",
    "Create a heading for your blog post",
    "Title your post: What's on your mind?",
  ];

  const handleSaveBlog = async () => {
    if (editorContent) {
      await firestoreApi.addCollection(
        fireStoreCollections.blogs,
        usersDataState?.user?.email,
        {
          title: "fds",
          content: editorContent,
          lastEdited: firestoreApi.now,
        }
      );

      const blogsData = await firestoreApi.getCollection(
        usersDataState?.user?.email
      );

      dispatch(setBlogs(blogsData));

      router.push("/feed");
    }
  };

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 8);
    setCurrentStaticHeading({
      heading: heading[randomNumber],
      label: labelMessage[randomNumber],
    });
  }, []);

  return (
    <StyledCreatePost>
      <h4>{currentStaticHeading.heading}</h4>
      <div className="heading">
        {currentStaticHeading.label}
        <InputField placeholder="Post Heading" />
      </div>
      <TextEditor
        handleSaveBlog={handleSaveBlog}
        setEditorContent={setEditorContent}
        editorContent={editorContent}
      />
    </StyledCreatePost>
  );
}

export default CreatePost;
