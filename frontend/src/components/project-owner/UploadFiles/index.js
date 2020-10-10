import React, { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./styles.scss";
import axios from 'axios';
import history from '../../../history';

export default function (props) {
  let files = React.createRef();

  const [error, changeError] = useState("");

  function onChange(e) {
    files = files.current.files;
    let location = history.location.pathname;

    // Request to backend
    // send the files

    let url = `/api${location}`;
    axios.post(url, files)
      .then(res => res.data)
      .then(res => {
        history.push(`/`);
      })
      .catch(e => {
        changeError("Failed to process.");
      })

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
      <div className="feedback">{error}</div>
    </div>
  );
}
