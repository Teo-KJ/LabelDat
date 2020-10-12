import React, { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./styles.scss";
import axios from 'axios';
import history from '../../../history';

export default function (props) {
  let files = React.createRef();
  const [error, changeError] = useState("");
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async function onChange(e) {
    files = files.current.files;
    let location = history.location.pathname;
    location = location.split("/")[2];
    let promises = [];
    let names = [];
    let p;
    for (let i = 0; i<files.length; i++) {
      names.push(files[i].name);
      p = toBase64(files[i]);
      promises.push(p);
    }
    Promise.all(promises).then(res => {
      files = []
      for (let i = 0; i<res.length; i++) {
        files.push({
          filename: names[i],
          itemData: res[i]
        }) 
      }
      let url = `/api/projects/${location}/tasks`;
      axios.post(url, files)
        .then(res => res.data)
        .then(res => {
          history.push(`/`);
        })
        .catch(e => {
          changeError("Failed to process.");
        })
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
