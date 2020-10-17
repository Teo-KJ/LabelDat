import React, { useState, useEffect } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import Loading from "../../shared/Loading";
import "./styles.scss";
import axios from "axios";
import history from "../../../history";

export default function (props) {
  const [error, changeError] = useState("");
  const [project, setProject] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      const res = await axios.get("/api/projects");
      console.log(res);
      if (res.status === 200) {
        let { itemDataType, projectName } = res.data.data.projects.filter(
          ({ id }) => id === props.match.params.projectId
        )[0];
        setProject({
          itemDataType,
          projectName,
        });
      }
    };

    getProject();
  }, [props.match.params.projectId]);

  let files = React.createRef();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function onChange(e) {
    files = files.current.files;
    let promises = [];
    let names = [];
    let p;

    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
      p = toBase64(files[i]);
      promises.push(p);
    }
    Promise.all(promises).then((res) => {
      files = [];
      for (let i = 0; i < res.length; i++) {
        files.push({
          filename: names[i],
          itemData: res[i],
        });
      }

      let url = `/api/projects/${props.match.params.projectId}/tasks`;
      axios
        .post(url, files)
        .then((res) => res.data)
        .then((res) => {
          history.push(`/`);
        })
        .catch((e) => {
          changeError("Failed to process.");
        });
    });
  }

  if (!project) return <Loading />;

  return (
    <div className="upload-files-container">
      <Divider orientation="left">
        <Typography.Title>Add Tasks for {project.projectName}</Typography.Title>
      </Divider>
      <div className="upload-files">
        <input
          type="file"
          accept={
            project.itemDataType === "AUDIO"
              ? "audio/*"
              : project.itemDataType === "IMAGE"
              ? "image/*"
              : null
          }
          multiple
          title=""
          ref={files}
          onChange={onChange}
        ></input>
        <div className="icon">
          <CloudUploadOutlined />
        </div>
        Drag and Drop<br></br>or<br></br>Click to Upload Files
      </div>
      <div className="feedback">{error}</div>
    </div>
  );
}
