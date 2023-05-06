/* eslint-disable security/detect-object-injection */
import StarRateIcon from "@mui/icons-material/StarRate";
import { where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "@/components/Buttons";
import InputField from "@/components/InputField";
import { StyledCreatePost } from "@/components/StyledPages/StyledCreatePost";
import TextEditor from "@/components/TextEditor";
import { setBlogs } from "@/redux/blogsSlice";
import { userState } from "@/redux/userSlice";
import { firestoreApi } from "@/utils/firebase/firestore";
import { blogServices } from "@/utils/firebase/services/blogServices";

function CreatePost() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userStateData = useSelector(userState);

  const [editorContent, setEditorContent] = useState();
  const [blogHeading, setBlogHeading] = useState();

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
    if (editorContent && blogHeading) {
      await blogServices.createBlog({
        title: blogHeading,
        content: editorContent,
        lastEdited: firestoreApi.now,
        email: userStateData?.user?.email,
        displayName: userStateData?.user?.displayName,
        uid: userStateData?.user?.uid,
      });

      const blogsData = await blogServices.getBlog(
        where("uid", "==", userStateData?.user?.uid)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledCreatePost>
      <h4>{currentStaticHeading.heading}</h4>
      <div className="label flex">
        {/* {currentStaticHeading.label} */}
        <InputField
          placeholder={currentStaticHeading.label}
          required={true}
          value={blogHeading}
          onChange={(e) => setBlogHeading(e.target.value)}
        />
        <StarRateIcon color="error" fontSize="5px" />
      </div>
      <TextEditor
        handleSaveBlog={handleSaveBlog}
        setEditorContent={setEditorContent}
        editorContent={editorContent}
      />

      <PrimaryButton
        buttonText="Publish"
        onClick={handleSaveBlog}
        customStyle={{ marginTop: "2rem", width: "100%" }}
        disabled={editorContent && blogHeading ? false : true}
      />
    </StyledCreatePost>
  );
}

export default CreatePost;
