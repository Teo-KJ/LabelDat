import React, { useState, useEffect } from 'react';

import ImagePreview from './ImagePreview'
import TextInputPreview from './TextInputPreview'

import './styles.scss'

export default function (props) {
  return(
    <div>
      <ImagePreview 
        imgStyle={props.imgStyle}
      ></ImagePreview>
      <div className="input-area-preview">
        <TextInputPreview placeholder={props.textInputStyle.placeholder}></TextInputPreview>
      </div>
    </div>
  )
}