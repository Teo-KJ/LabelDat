import React, { useState, useEffect } from 'react';

import { Input } from 'antd'

import './styles.scss'

import Dropdown from './Dropdown'

export default function () {

  const [dataTypeSettingOpen, toggleDataTypeSetting ] = useState(false)
  const [inputTypeSettingOpen, toggleInputTypeSetting ] = useState(false)
  const [descriptionSettingOpen, toggleDescriptionSetting ] = useState(false)
  const [dataType, selectDataType] = useState("")
  const [inputType, selectInputType] = useState("")

  // For the Data Type Setting 
  const [test, changeTest] = useState("hello");


  function DataTypeSetting () {
    return (
      <form>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
      </form>
    )
  }

  function InputTypeSetting () {
    return (
      <form>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
        <div className="input-setting-row">
          <label>test</label>
          <Input placeholder="Basic usage" />
        </div>
      </form>
    )
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
        list={["Slider", "Options"]}
        toggle={toggleInputTypeSetting}
        settingIsOpen={inputTypeSettingOpen}
        selectType={selectInputType}
        dropdown={true}
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