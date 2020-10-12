import React, { useEffect, useState } from "react";
import axios from "axios";
import history from "../../../history";
import "./styles.scss";
import SettingComponent from "./SettingComponent";
import Preview from "./Preview";

import { Button } from "antd";

export default function () {
  const [projectName, changeProjectName] = useState("");

  const [error, changeError] = useState("");

  //Text Input Type Styling
  const [textInputStyle, changeTextInputStyle] = useState({});

  //Slider Input Type Styling
  const [sliderProps, changeSliderProps] = useState({});

  //Checkbox Input Type Styling
  const [checkBoxProps, changeCheckBoxProps] = useState({
    values: ["default"],
  });

  //Options Input Type Styling
  const [optionsProps, changeOptionsProps] = useState({ values: ["default"] });

  //Data Types Selection
  const [dataType, changeDataType] = useState("");

  //Input Types Selection
  const [inputType, changeInputType] = useState("");

  //Description
  const [desc, changeDesc] = useState("Please tell your labellers what to do.");

  useEffect(() => {
    changeError("");
  }, [
    textInputStyle,
    sliderProps,
    checkBoxProps,
    optionsProps,
    dataType,
    inputType,
    desc,
    projectName,
  ]);

  function submitTask() {
    let form = {};
    if (!projectName) {
      changeError("Project name is empty!");
    }
    if (!dataType) {
      changeError("Data type is empty!");
    }
    if (!desc) {
      changeError("Description is empty!");
    }
    if (!inputType) {
      changeError("Input type is empty!");
    }
    form.projectName = projectName;
    form.itemDataType = dataType.toUpperCase();
    form.description = desc;
    form.layout = {
      type: inputType.toLowerCase(),
    };
    switch (inputType.toLowerCase()) {
      case "checkbox":
        form.layout.labels = [...checkBoxProps.values];
        break;
      case "radio":
        form.layout.labels = [...optionsProps.values];
        break;
      case "slider":
        form.layout.min = sliderProps.min;
        form.layout.max = sliderProps.max;
        break;
      default:
        break;
    }

    if (error) return;

    // Request to backend
    // send the form
    axios
      .post("/api/projects", form)
      .then((res) => res.data)
      .then((res) => {
        history.push(`/projects/${res.data.id}/add-tasks`);
      })
      .catch((e) => {
        changeError("Failed to process.");
      });
  }

  return (
    <div className="task-creation">
      <div className="editor">
        <div className="title">Editor</div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "red",
          }}
        >
          <i>{error}</i>
        </div>
        <div className="editor-setting">
          <SettingComponent
            projectName={projectName}
            changeProjectName={changeProjectName}
            dataType={dataType}
            inputType={inputType}
            changeDataType={changeDataType}
            changeInputType={changeInputType}
            changeTextInputStyle={changeTextInputStyle}
            changeSliderProps={changeSliderProps}
            changeCheckBoxProps={changeCheckBoxProps}
            checkBoxProps={checkBoxProps}
            changeOptionsProps={changeOptionsProps}
            optionsProps={optionsProps}
            desc={desc}
            changeDesc={changeDesc}
          ></SettingComponent>
        </div>
      </div>
      <div className="preview">
        <div className="title">Preview</div>
        <Preview
          dataType={dataType}
          inputType={inputType}
          desc={desc}
          sliderProps={sliderProps}
          checkBoxProps={checkBoxProps}
          optionsProps={optionsProps}
          textInputStyle={textInputStyle}
        ></Preview>
      </div>
      <Button type="primary" className="btn-next" onClick={submitTask}>
        Create Project
      </Button>
    </div>
  );
}
