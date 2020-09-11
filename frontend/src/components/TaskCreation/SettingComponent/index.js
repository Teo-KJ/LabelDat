import React, { useState, useEffect } from 'react';

import { Input, Select } from 'antd'

import './styles.scss'

import Dropdown from './Dropdown'

export default function (props) {

  const [dataTypeSettingOpen, toggleDataTypeSetting ] = useState(true)
  const [inputTypeSettingOpen, toggleInputTypeSetting ] = useState(true)
  const [descriptionSettingOpen, toggleDescriptionSetting ] = useState(false)
  const [dataType, selectDataType] = useState("Image")
  const [inputType, selectInputType] = useState("Text")

  // For the Data Type Setting 
  const [test, changeTest] = useState("hello");

  /* 
  For Data Type Template Setting =================================================================================
  */

  const [imgWidth, changeImgWidth] = useState("500");
  const [imgHeight, changeImgHeight] = useState("300");
  const [imgObjectFit, changeImgObjectFit] = useState("cover");

  //to compute new style after setting
  useEffect(()=>{
    newImgStyle()
  }, [imgWidth, imgHeight, imgObjectFit])

  function newImgStyle () {
    let style = {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      objectFit: imgObjectFit
    }
    props.changeImgStyle(style)
  }

  /* 
  For Data Type Template Setting =================================================================================
  */

  /* 
  For Input Type Template Setting =================================================================================
  */

  const [textInputPlaceholder, changeTextInputPlaceholder] = useState("What do you think about the image?");

  useEffect(()=>{
    newTextInputStyle()
  }, [textInputPlaceholder])

  function newTextInputStyle () {
    let style = {
      placeholder: textInputPlaceholder
    }
    props.changeTextInputStyle(style)
  }

  /* 
  For Input Type Template Setting =================================================================================
  */

  function DataTypeSetting () {
    const {Option} = Select
      switch (dataType) {
        case "Image":
          return (
            <React.Fragment>
              <div className="input-setting-row">
                <label>Width</label>
                <Input value={imgWidth} onChange={(e)=>{changeImgWidth(e.target.value)}}/>px
              </div>
              <div className="input-setting-row">
                <label>Height</label>
                <Input value={imgHeight} onChange={(e)=>{changeImgHeight(e.target.value)}}/>px
              </div>
              <div className="input-setting-row">
                <label><span>Object&nbsp;Fit</span></label>
                <Select value={imgObjectFit} onChange={(v)=>{changeImgObjectFit(v)}}>
                  <Option value="cover">Cover</Option>
                  <Option value="contain">Contain</Option>
                </Select>
              </div>
            </React.Fragment>
          )
        default:
            return null;
      }
  }

  function InputTypeSetting () {
    switch (inputType) {
      case "Text":
        return (
          <React.Fragment>
            <div className="input-setting-row">
              <label>Placeholder</label>
              <Input value={textInputPlaceholder} onChange={(e)=>{e.preventDefault();changeTextInputPlaceholder(e.target.value)}}></Input>
            </div>
          </React.Fragment>
        )
      default:
        return null;
    }
    
  }

  function DescriptionSetting () {
    const { TextArea } = Input;
    return (
      <form>
        <div className="input-setting-row">
          <label>Title</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>Description</label>
          <TextArea rows={4} />
        </div>
      </form>
    )
  }

  return (
    <div className="setting-component">
      <Dropdown 
        text="Select Data Type"
        list={["Image", "Sound"]}
        toggle={toggleDataTypeSetting}
        settingIsOpen={dataTypeSettingOpen}
        selectType={selectDataType}
        dropdown={true}
        value={dataType}
        />
      {
        dataTypeSettingOpen && dataType ? 
        <div className="setting-sct setting-data">
          <strong><p>{dataType} Setting</p></strong>
          {DataTypeSetting()}
        </div> : null
      }
      <Dropdown 
        text="Select Input Type"
        list={["Text", "Slider", "Options"]}
        toggle={toggleInputTypeSetting}
        settingIsOpen={inputTypeSettingOpen}
        selectType={selectInputType}
        dropdown={true}
        value={inputType}
        />
      {
        inputTypeSettingOpen && inputType ? 
        <div className="setting-sct setting-data">
          <strong><p>{inputType} Setting</p></strong>
          {InputTypeSetting()}
        </div> : null
      }
      <Dropdown
        dropdown={false}
        settingIsOpen={descriptionSettingOpen}
        toggle={toggleDescriptionSetting}
      />
      {
        descriptionSettingOpen ? 
        <div className="setting-sct setting-data">
          <strong><p>Description Setting</p></strong>
          {DescriptionSetting()}
        </div> : null
      }
    </div>
  )
}