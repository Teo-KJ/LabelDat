import React, { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function (props) {
  const files = React.createRef();
  const [uploadedFiles, changeUploadedFiles] = useState([]);

  function onChange(e) {
    let files = files.current.files

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
      <div className="upload-files-log">
        {uploadedFiles.map((_) => {
          return <div className="log-suc">{_}</div>;
        })}
      </div>
    </div>
  );
}
