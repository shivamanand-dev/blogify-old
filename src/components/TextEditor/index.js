import { Editor } from "@tinymce/tinymce-react";

import { tinyMCE } from "@/utils/constants/app_config";

function TextEditor({ setEditorContent, editorContent }) {
  const editorConfig = {
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
    toolbar:
      "undo redo | emoticons | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | charmap | removeformat",
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
    keep_styles: true,
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
      />
    </>
  );
}

export default TextEditor;
