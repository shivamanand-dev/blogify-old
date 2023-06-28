/* eslint-disable security/detect-object-injection */
import { where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "@/components/Buttons";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { StyledCreatePost } from "@/components/StyledPages";
import TextArea from "@/components/TextArea";
import TextEditor from "@/components/TextEditor";
import { setBlogs } from "@/redux/blogsSlice";
import { userState } from "@/redux/userSlice";
import { app_routes } from "@/utils/constants/app_constants";
import { firestoreApi } from "@/utils/firebase/firestore";
import { blogServices } from "@/utils/firebase/services/blogServices";

function CreatePost() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userStateData = useSelector(userState);

  const [editorContent, setEditorContent] = useState();
  const [blogContent, setBlogContent] = useState({
    heading: "",
    description: "",
  });

  const [tags, setTags] = useState([]);

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
    if (
      editorContent &&
      blogContent.heading.length !== 0 &&
      blogContent.description.length !== 0
    ) {
      await blogServices.createBlog({
        title: blogContent.heading,
        description: blogContent.description,
        content: editorContent,
        lastEdited: firestoreApi.now,
        email: userStateData?.user?.email,
        uid: userStateData?.user?.uid,
        comments: [
          {
            uid: "sfdfdsf43fdf34rf",
            message: "Awesome",
            likes: 0,
            postedAt: firestoreApi.now,
            reply: [
              {
                uid: "sfdfdsf43fdf34rf",
                message: "Reply",
                likes: 0,
                postedAt: firestoreApi.now,
              },
            ],
          },
        ],
        claps: 0,
        tags: ["sad", "happy"],
        bookmarks: [],
        clicks: 0,
      });

      const blogsData = await blogServices.getBlog(
        where("uid", "==", userStateData?.user?.uid)
      );

      dispatch(setBlogs(blogsData));

      router.push(app_routes.explore);
    }
  };

  const onChangeBlogContent = (e) => {
    setBlogContent({ ...blogContent, [e.target.name]: e.target.value });
  };

  const onChangeTags = (e, array) => {
    setTags(array);
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
      <InputField
        placeholder={currentStaticHeading.label}
        required={true}
        value={blogContent.heading}
        name="heading"
        onChange={onChangeBlogContent}
      />
      <TextArea
        placeholder="A Description About your Blog"
        required={true}
        value={blogContent.description}
        name="description"
        onChange={onChangeBlogContent}
      />

      <MultiSelectDropdown onChange={onChangeTags} value={tags} />

      <TextEditor
        handleSaveBlog={handleSaveBlog}
        setEditorContent={setEditorContent}
        editorContent={editorContent}
      />

      <PrimaryButton
        buttonText="Publish"
        onClick={handleSaveBlog}
        customStyle={{ marginTop: "2rem", width: "100%" }}
        disabled={
          editorContent
            ? blogContent.heading.length !== 0
              ? blogContent.description.length !== 0
                ? false
                : true
              : true
            : true
        }
      />

      <Dropdown />
    </StyledCreatePost>
  );
}

export default CreatePost;
