import { Editor } from "@tinymce/tinymce-react";

import { tinyMCE } from "@/utils/constants/app_config";

import { StyledBlogPreview } from "./StyledBlogPreview";

function BlogPreview({ content }) {
  const editorConfig = {
    plugins:
      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
    toolbar: "",
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
  return (
    <StyledBlogPreview>
      {content && (
        <Editor
          apiKey={tinyMCE}
          value={content}
          init={editorConfig}
          disabled={true}
          // onEditorChange={handleEditorChange}
        />
      )}
    </StyledBlogPreview>
  );
}

export default BlogPreview;
