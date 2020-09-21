import React, { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function (props) {
  const files = React.createRef();
  const [uploadedFiles, changeUploadedFiles] = useState([]);

  function onChange(e) {
    console.log(files.current.files[0]);
    //Upload files
    //receive response
    let _ = [...uploadedFiles];
    for (let i = 0; i < files.current.files.length; i++) {
      _.push(files.current.files[i].name);
    }
    changeUploadedFiles(_);
    e.target.value = null;
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
