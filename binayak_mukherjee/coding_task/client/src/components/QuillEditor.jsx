import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the snow theme

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const TOOL_BAR_OPTIONS = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];


  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      value={editorContent}
      onChange={handleChange}
      modules={{toolbar: TOOL_BAR_OPTIONS}}
    />
  );
};

export default QuillEditor;
