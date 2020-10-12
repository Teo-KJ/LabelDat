import React, { useState, useEffect } from "react";

import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "./styles.scss";

import Dropdown from "./Dropdown";

export default function (props) {
  const [dataTypeSettingOpen, toggleDataTypeSetting] = useState(false);
  const [inputTypeSettingOpen, toggleInputTypeSetting] = useState(false);
  const [descriptionSettingOpen, toggleDescriptionSetting] = useState(false);
  const dataType = props.dataType;
  const inputType = props.inputType;

  const [textInputPlaceholder, changeTextInputPlaceholder] = useState(
    "What do you think about the image?"
  );

  useEffect(newTextInputStyle, [textInputPlaceholder]);

  function newTextInputStyle() {
    let style = {
      placeholder: textInputPlaceholder,
    };
    props.changeTextInputStyle(style);
  }

  const [maxSlider, changeMaxSlider] = useState(10);
  const [minSlider, changeMinSlider] = useState(0);

  useEffect(newSliderProps, [maxSlider, minSlider]);

  function newSliderProps() {
    props.changeSliderProps({
      min: minSlider,
      max: maxSlider,
    });
  }

  /* 
  For Input Type Template Setting =================================================================================
  */

  function InputTypeSetting() {
    switch (inputType) {
      case "Text":
        return (
          <React.Fragment>
            <div className="input-setting-row">
              <label>Placeholder</label>
              <Input
                value={textInputPlaceholder}
                onChange={(e) => {
                  changeTextInputPlaceholder(e.target.value);
                }}
              ></Input>
            </div>
          </React.Fragment>
        );
      case "Slider":
        return (
          <React.Fragment>
            <div className="input-setting-row">
              <label>Max</label>
              <Input
                value={maxSlider}
                onChange={(e) => {
                  changeMaxSlider(e.target.value);
                }}
              ></Input>
            </div>
            <div className="input-setting-row">
              <label>Min</label>
              <Input
                value={minSlider}
                onChange={(e) => {
                  changeMinSlider(e.target.value);
                }}
              ></Input>
            </div>
          </React.Fragment>
        );
      case "Checkbox":
        return (
          <React.Fragment>
            <div className="input-setting-row">
              <label>Values</label>
              <Input
                value={checkboxValue}
                onChange={(e) => {
                  addCheckboxValue(e.target.value);
                }}
              ></Input>
              <Button type="primary" onClick={newCheckboxValue}>
                Add
              </Button>
            </div>
            <div className="input-setting-row input-setting-row-sp">
              {props.checkBoxProps
                ? props.checkBoxProps.values
                  ? props.checkBoxProps.values.map((_) => (
                      <Button
                        type="primary"
                        danger
                        onClick={() => deleteValue(_, "checkbox")}
                      >
                        <DeleteOutlined />
                        {_}
                      </Button>
                    ))
                  : null
                : null}
            </div>
          </React.Fragment>
        );
      case "Radio":
        return (
          <React.Fragment>
            <div className="input-setting-row">
              <label>Values</label>
              <Input
                value={optionsValue}
                onChange={(e) => {
                  addOptionsValue(e.target.value);
                }}
              ></Input>
              <Button type="primary" onClick={newOptionsValue}>
                Add
              </Button>
            </div>
            <div className="input-setting-row input-setting-row-sp">
              {props.optionsProps
                ? props.optionsProps.values
                  ? props.optionsProps.values.map((_, i) => (
                      <Button
                        key={i}
                        type="primary"
                        danger
                        onClick={() => deleteValue(_, "radio")}
                      >
                        <DeleteOutlined />
                        {_}
                      </Button>
                    ))
                  : null
                : null}
            </div>
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  const [optionsValue, addOptionsValue] = useState("");

  function newOptionsValue() {
    props.changeOptionsProps({
      ...props.optionsProps,
      values: props.optionsProps.values
        ? [...props.optionsProps.values, optionsValue]
        : [optionsValue],
    });
    addOptionsValue("");
  }

  const [checkboxValue, addCheckboxValue] = useState("");

  function deleteValue(value, type) {
    if (type === "checkbox") {
      let newList = [...props.checkBoxProps.values];
      newList = newList.filter((_) => _ !== value);
      props.changeCheckBoxProps({
        ...props.checkBoxProps,
        values: newList,
      });
    } else if (type === "radio") {
      let newList = [...props.optionsProps.values];
      newList = newList.filter((_) => _ !== value);
      props.changeOptionsProps({
        ...props.optionsProps,
        values: newList,
      });
    }
  }

  function newCheckboxValue() {
    props.changeCheckBoxProps({
      ...props.checkBoxProps,
      values: props.checkBoxProps.values
        ? [...props.checkBoxProps.values, checkboxValue]
        : [checkboxValue],
    });
    addCheckboxValue("");
  }

  function DescriptionSetting() {
    const { TextArea } = Input;
    return (
      <form>
        <div className="input-setting-row">
          <label>Description</label>
          <TextArea
            rows={4}
            value={props.desc}
            onChange={(e) => props.changeDesc(e.target.value)}
          />
        </div>
      </form>
    );
  }

  return (
    <div className="setting-component">
      <Input
        className="project-name"
        placeholder="Project Name"
        value={props.projectName}
        onChange={(e) => {
          props.changeProjectName(e.target.value);
        }}
      />
      <Dropdown
        text="Select Data Type"
        list={["Image", "Sound"]}
        toggle={toggleDataTypeSetting}
        settingIsOpen={dataTypeSettingOpen}
        selectType={props.changeDataType}
        dropdown={true}
        value={dataType}
        isSetting={false}
      />
      {dataTypeSettingOpen ? (
        <div className="setting-sct setting-data">
          <strong>
            <p>Help</p>
          </strong>
          <p style={{ textAlign: "justify" }}>
            This option allows you and your labellers to label data. Some of the
            recommended labellling options include checkbox, radio buttons,
            bounding boxes, joint-markings &amp; drawing polygons
          </p>
        </div>
      ) : null}

      <Dropdown
        dropdown={false}
        settingIsOpen={descriptionSettingOpen}
        toggle={toggleDescriptionSetting}
      />
      {descriptionSettingOpen ? (
        <div className="setting-sct setting-data">
          <strong>
            <p>Description Setting</p>
          </strong>
          {DescriptionSetting()}
        </div>
      ) : null}

      <Dropdown
        text="Select Input Type"
        list={["Text", "Slider", "Radio", "Checkbox"]}
        toggle={toggleInputTypeSetting}
        settingIsOpen={inputTypeSettingOpen}
        selectType={props.changeInputType}
        dropdown={true}
        value={inputType}
        isSetting={true}
      />
      {inputTypeSettingOpen && inputType ? (
        <div className="setting-sct setting-data">
          <strong>
            <p>{inputType} Setting</p>
          </strong>
          {InputTypeSetting()}
        </div>
      ) : null}
    </div>
  );
}
