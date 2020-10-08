import React from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function (props) {
  let files = React.createRef();

  function onChange(e) {
    files = files.current.files

    //upload the files
    
  }

  return (
    <div className="upload-files-container">
      <div className="upload-files">
        <input
          type="file"
          multiple
          title=""
          ref={files}
          onChange={onChange}
        ></input>
        <div className="icon">
          <CloudUploadOutlined />
        </div>
        Drag and Drop<br></br>or<br></br>Upload Files
      </div>
    </div>
  );
}
