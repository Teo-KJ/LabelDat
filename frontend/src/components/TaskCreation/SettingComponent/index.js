import React, { useState, useEffect } from 'react';

import { Input, Select } from 'antd'

import './styles.scss'

import Dropdown from './Dropdown'

export default function (props) {

  const [dataTypeSettingOpen, toggleDataTypeSetting ] = useState(true)
  const [inputTypeSettingOpen, toggleInputTypeSetting ] = useState(true)
  const [descriptionSettingOpen, toggleDescriptionSetting ] = useState(false)
  const dataType = props.dataType
  const inputType = props.inputType

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
    newImgProps()
  }, [imgWidth, imgHeight, imgObjectFit])

  function newImgProps () {
    let style = {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      objectFit: imgObjectFit
    }
    props.changeImgProps({style})
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

  const [maxSlider, changeMaxSlider] = useState(10);
  const [minSlider, changeMinSlider] = useState(0);

  useEffect(()=>{
    newSliderProps()
  }, [maxSlider, minSlider])

  function newSliderProps () {
    console.log(minSlider)
    props.changeSliderProps({
      min: minSlider,
      max: maxSlider
    })
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
              <Input value={textInputPlaceholder} onChange={(e)=>{changeTextInputPlaceholder(e.target.value)}}></Input>
            </div>
          </React.Fragment>
        )
      case "Slider": 
        return (
          <React.Fragment>
            <div className="input-setting-row">
              <label>Max</label>
              <Input value={maxSlider} onChange={(e)=>{changeMaxSlider(e.target.value)}}></Input>
            </div>
            <div className="input-setting-row">
              <label>Min</label>
              <Input value={minSlider} onChange={(e)=>{changeMinSlider(e.target.value)}}></Input>
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
          <Input placeholder="Insert Title" value={props.titleDesc} onChange={(e)=>props.changeTitleDesc(e.target.value)}/>
        </div>
        <div className="input-setting-row">
          <label>Description</label>
          <TextArea rows={4} value={props.desc} onChange={(e)=>props.changeDesc(e.target.value)}/>
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
        selectType={props.changeDataType}
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

      <Dropdown 
        text="Select Input Type"
        list={["Text", "Slider", "Options"]}
        toggle={toggleInputTypeSetting}
        settingIsOpen={inputTypeSettingOpen}
        selectType={props.changeInputType}
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
    </div>
  )
}