import { Editor } from "@tinymce/tinymce-react";
import { arrayUnion, orderBy } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

import { userState } from "@/redux/userSlice";
import { tinyMCE } from "@/utils/constants/app_config";
import { firestoreApi } from "@/utils/firebase/firestore";

import { PrimaryButton } from "../Buttons";

function TextEditor() {
  const state = useSelector(userState);
  const router = useRouter();
  const [editorContent, setEditorContent] = useState();

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
      const blogData = await firestoreApi.getDocument(
        "Blog",
        state?.user?.username,
        // desc for desending
        orderBy("createdAt", "asc")
      );

      if (blogData) {
        await firestoreApi.updateData("Blog", state?.user?.username, {
          posts: arrayUnion({
            type: "public",
            content: editorContent,
            createdAt: firestoreApi.now,
          }),
        });
      } else {
        await firestoreApi.addDocument("Blog", state?.user?.username, {
          posts: arrayUnion({
            type: "public",
            content: editorContent,
            createdAt: firestoreApi.now,
          }),
        });
      }

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
