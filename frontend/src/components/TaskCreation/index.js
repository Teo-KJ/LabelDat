import React, { useState, useEffect } from 'react';
import './styles.scss'

import SettingComponent from './SettingComponent'
import Preview from './Preview'

export default function () {

  const [imgStyle, changeImgStyle] = useState({});
  const [textInputStyle, changeTextInputStyle] = useState({});

  return (
    <div className="task-creation">
      <div className="editor">
        <div className="title">Editor</div>
        <div className="editor-setting">
          <SettingComponent
            changeImgStyle={changeImgStyle}
            changeTextInputStyle={changeTextInputStyle}
          ></SettingComponent>
        </div>
      </div>
      <div className="preview">
        <div className="title">Preview</div>
        <Preview
          imgStyle={imgStyle}
          textInputStyle={textInputStyle}
        ></Preview>
      </div>
    </div>
  )
}