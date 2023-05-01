import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBlogs } from "@/redux/blogsSlice";
import { userState } from "@/redux/userSlice";
import { tinyMCE } from "@/utils/constants/app_config";
import { fireStoreCollections } from "@/utils/constants/app_constants";
import { firestoreApi } from "@/utils/firebase/firestore";

import { PrimaryButton } from "../Buttons";

function TextEditor() {
  const usersDataState = useSelector(userState);
  const router = useRouter();
  const [editorContent, setEditorContent] = useState();

  const dispatch = useDispatch();

  const editorConfig = {
    plugins: "codesample",
    toolbar: "codesample",
    codesample_languages: [
      { text: "HTML/XML", value: "markup" },
      { text: "JavaScript", value: "javascript" },
      { text: "CSS", value: "css" },
      { text: "PHP", value: "php" },
      { text: "Python", value: "python" },
      { text: "Ruby", value: "ruby" },
      { text: "Java", value: "java" },
      { text: "C", value: "c" },
      { text: "C++", value: "cpp" },
      { text: "Objective-C", value: "objectivec" },
      { text: "Swift", value: "swift" },
      { text: "SQL", value: "sql" },
    ],
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

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

  return (
    <>
      <Editor
        init={editorConfig}
        onEditorChange={handleEditorChange}
        value={editorContent}
        apiKey={tinyMCE}
        toolbar="undo redo | bold italic codesample | alignleft aligncenter alignright | bullist numlist outdent indent"
      />

      <PrimaryButton buttonText="Post" onClick={handleSaveBlog} />
    </>
  );
}

export default TextEditor;
