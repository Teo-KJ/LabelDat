import React, { useState, useEffect } from 'react';
import './styles.scss'

import SettingComponent from './SettingComponent'

export default function () {
  return (
    <div className="task-creation">
      <div className="editor">
        <div className="title">Editor</div>
        <div className="editor-setting">
          <SettingComponent></SettingComponent>
        </div>
      </div>
      <div className="preview">
        <div className="title">Preview</div>
      </div>
    </div>
  )
}