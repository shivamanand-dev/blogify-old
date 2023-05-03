import { Editor } from "@tinymce/tinymce-react";

import { tinyMCE } from "@/utils/constants/app_config";

function TextEditor({ setEditorContent, editorContent }) {
  const editorConfig = {
    plugins: "codesample",
    toolbar: "codesample",
    resize: false,
    skin: "oxide-dark",
    content_css: "dark",
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

  return (
    <>
      <Editor
        init={editorConfig}
        onEditorChange={handleEditorChange}
        value={editorContent}
        apiKey={tinyMCE}
        toolbar="undo redo | bold italic codesample | alignleft aligncenter alignright | bullist numlist outdent indent"
      />
    </>
  );
}

export default TextEditor;
