import { Editor } from "@tinymce/tinymce-react";

import { tinyMCE } from "@/utils/constants/app_config";

import { StyledBlogPreview } from "./StyledBlogPreview";

function TextEditor({ editorContent, isPreview = false, onChange }) {
  const editorConfig = {
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
    toolbar:
      "undo redo | emoticons | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | charmap | removeformat",
    resize: true,
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

  return (
    <StyledBlogPreview isPreview={isPreview}>
      <Editor
        init={editorConfig}
        onEditorChange={isPreview ? () => {} : onChange}
        value={editorContent}
        apiKey={tinyMCE}
        disabled={isPreview ? true : false}
      />
    </StyledBlogPreview>
  );
}

export default TextEditor;
