import React, { useEffect, useState, useRef } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./RichText.module.css";
const RichText = (props) => {
  let initialContent = "";
  const divRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { initHtml } = props;
  useEffect(() => {
    const contentBlock = htmlToDraft(initHtml || "");
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      initialContent = EditorState.createWithContent(contentState);
      setEditorState(initialContent);      
    }
  }, [initHtml]);
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  };
  return (
    <>
      <div className={classes.richTextContainer}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <label style={{margin:0,padding:0,paddingBottom:"10px"}}>{props.title}</label>
        </div>
        <div className="editor">
          <Editor
            editorState={editorState}
            onEditorStateChange={(state) => {              
              setEditorState(state);
              props.setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            }}            
            editorClassName={classes.editor}
            wrapperClassName={classes.wrapper}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallBack,
                alt: { present: true, mandatory: true },
              },
            }}
          />
        </div>
      </div>
      {/* <hr /> */}
      {/* <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }}
      /> */}
    </>
  );
};

export default RichText;
