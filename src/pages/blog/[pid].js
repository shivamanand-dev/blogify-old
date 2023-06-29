/* eslint-disable security/detect-object-injection */
import { where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "@/components/Buttons";
import { heading, labelMessage } from "@/components/data/editorContent";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { StyledBlogPost } from "@/components/StyledPages";
import TextArea from "@/components/TextArea";
import TextEditor from "@/components/TextEditor";
import { setBlogs } from "@/redux/blogsSlice";
import { setLoading, userState } from "@/redux/userSlice";
import { app_routes } from "@/utils/constants/app_constants";
import { firestoreApi } from "@/utils/firebase/firestore";
import { blogServices } from "@/utils/firebase/services/blogServices";

function BlogPost() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pid = router.query.pid;

  const userStateData = useSelector(userState);
  const { user } = userStateData;

  const dropdownMenu = [
    {
      value: "public",
      label: "Public",
    },
    {
      value: "private",
      label: "Private",
    },
    {
      value: "draft",
      label: "Draft",
    },
  ];

  const [blogPostData, setBlogPostData] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [editorContent, setEditorContent] = useState();
  const [blogContent, setBlogContent] = useState({
    heading: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
  const [postType, setPostType] = useState("draft");
  const [currentStaticHeading, setCurrentStaticHeading] = useState({
    heading: "",
    label: "",
  });
  const [docId, setDocId] = useState();

  const onChangeBlogContent = (e) => {
    setBlogContent({ ...blogContent, [e.target.name]: e.target.value });
  };

  const onChangeTags = (e, array) => {
    setTags(array);
  };

  const onChangePostType = (event, value) => {
    setPostType(value.props.value);
  };

  const getBlogData = async (uid) => {
    dispatch(setLoading(true));

    const data = await blogServices.getSinglePost(uid);

    setBlogPostData(data);
    setEditorContent(data?.content);
    setBlogContent({
      ...blogContent,
      heading: data?.title,
      description: data?.description,
    });

    setTags(data?.tags);
    setPostType(data?.postType);
    setIsEditable(
      user?.uid === data?.uid
        ? data?.postType === "private"
          ? true
          : data?.postType === "draft"
          ? true
          : false
        : false
    );

    dispatch(setLoading(false));
  };

  const handleSaveBlog = async () => {
    if (
      editorContent &&
      blogContent.heading.length !== 0 &&
      blogContent.description.length !== 0
    ) {
      await blogServices.updateBlog(docId, {
        title: blogContent.heading,
        description: blogContent.description,
        content: editorContent,
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
        tags: tags,
        bookmarks: 0,
        clicks: 0,
        postType: postType,
      });

      const blogsData = await blogServices.getBlog(
        where("uid", "==", userStateData?.user?.uid)
      );

      dispatch(setBlogs(blogsData));

      router.push(app_routes.explore);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 8);
    setCurrentStaticHeading({
      heading: heading[randomNumber],
      label: labelMessage[randomNumber],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pid) {
      getBlogData(pid);
      setDocId(pid);
    }
  }, [pid]);

  return (
    <StyledBlogPost>
      {!isEditable && (
        <>
          <h3>{blogPostData?.title}</h3>
          <h5>{blogPostData?.description}</h5>
        </>
      )}

      {isEditable && (
        <>
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

          <MultiSelectDropdown
            onChange={onChangeTags}
            value={tags}
            label="Tags"
            customStyle={{ marginBottom: "1rem" }}
            required={true}
          />
        </>
      )}

      <TextEditor
        isPreview={!isEditable}
        editorContent={editorContent}
        onChange={handleEditorChange}
      />

      {isEditable && (
        <div
          className="flex space-between"
          style={{ alignItems: "flex-start" }}
        >
          <Dropdown
            dropdownMenu={dropdownMenu}
            label="Post"
            customStyle={{ margin: "1rem 0", width: "45%" }}
            textFieldStyle={{ width: "100%" }}
            onChange={onChangePostType}
            value={postType}
          />

          <PrimaryButton
            buttonText="Publish"
            onClick={handleSaveBlog}
            customStyle={{ marginTop: "2rem", width: "45%" }}
            disabled={
              editorContent
                ? blogContent?.heading?.length !== 0
                  ? blogContent?.description?.length !== 0
                    ? tags?.length !== 0
                      ? false
                      : true
                    : true
                  : true
                : true
            }
          />
        </div>
      )}
    </StyledBlogPost>
  );
}

export default BlogPost;
