import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the snow theme
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [socket, setSocket] = useState(null);
  const [quillInstance, setQuillInstance] = useState(null);
  const quillRef = useRef(null);

  const {id: documentId} = useParams();

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

  useEffect(() => {

    const s = io.connect("http://localhost:8080");
    setSocket(s);

    return () => {

      s.disconnect();
    }
  }, []);


  useEffect(() => {

    if(quillRef.current){

      const editor = quillRef.current.getEditor(); //get the quill editor instance

      //initially editor will be in disable state
      editor.disable();
      editor.setText("Loading...");
      setQuillInstance(editor);
    }
  }, [quillInstance]);


  useEffect(() => {

    if(quillInstance == null || socket == null) return;

    quillInstance.on("text-change", (delta, oldDelta, source) => {

      //we want to track only the changes user made not the quill team changes
      if(source !== "user") return;

      //delta -> not the entire document but the small changes that occur in the document.
      //delta -> it tracks small small changes what are happening on the editor
      socket.emit("send-changes", delta);

    });

    // Clean up the listener when the component is unmounted
    return () => {

      if (quillInstance) {
        quillInstance.off('text-change'); // Remove the listener
      }
    }

  }, [quillInstance, socket]);


  useEffect(() => {

    if(quillInstance == null || socket == null) return;
    
    socket.on("receive-changes", (delta) => {
      console.log(delta);
      quillInstance.updateContents(delta);
    });

    // Clean up the listener when the component is unmounted
    return () => {

      socket.off("receive-changes"); // Remove the listener
    }

  }, [quillInstance, socket]);


  useEffect(() => {

    if(socket === null || quillInstance === null) return;

    socket.on("load-document", document => {

      quillInstance.setContents(document);
      quillInstance.enable(); //we can only edit on the editor when the loading operation will be complete
    });

    socket.emit("get-document", documentId);

  }, [documentId, quillInstance, socket]);
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
