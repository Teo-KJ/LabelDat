import React, { useState, useEffect } from 'react';
import './styles.scss'

import SettingComponent from './SettingComponent'
import Preview from './Preview'

export default function () {

  //Image Data Type Styling
  const [imgProps, changeImgProps] = useState({});

  //Text Input Type Styling
  const [textInputStyle, changeTextInputStyle] = useState({});

  //Slider Input Type Styling
  const [sliderProps, changeSliderProps] = useState({});

  //Data Types Selection
  const [dataType, changeDataType] = useState("Sound");

  //Input Types Selection
  const [inputType, changeInputType] = useState("");

  //Description
  const [titleDesc, changeTitleDesc] = useState("Hello World!");
  const [desc, changeDesc] = useState("Please tell your labellers what to do.");

  return (
    <div className="task-creation">
      <div className="editor">
        <div className="title">Editor</div>
        <div className="editor-setting">
          <SettingComponent
            dataType={dataType}
            inputType={inputType}
            changeDataType={changeDataType}
            changeInputType={changeInputType}
            changeImgProps={changeImgProps}
            changeTextInputStyle={changeTextInputStyle}
            changeSliderProps={changeSliderProps}
            desc={desc}
            changeDesc={changeDesc}
            titleDesc={titleDesc}
            changeTitleDesc={changeTitleDesc}
          ></SettingComponent>
        </div>
      </div>
      <div className="preview">
        <div className="title">Preview</div>
        <Preview
          dataType={dataType}
          inputType={inputType}
          desc={desc}
          titleDesc={titleDesc}
          imgProps={imgProps}
          sliderProps={sliderProps}
          textInputStyle={textInputStyle}
        ></Preview>
      </div>
    </div>
  )
}