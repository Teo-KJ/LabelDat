import React, { useState, useEffect } from 'react';

import './styles.scss'

import imgTemplate from './template.jpg'

export default function (props) {
  return(
    <div className="img-preview">
      <img src={imgTemplate} style={props.imgStyle}></img>
    </div>
  )
}