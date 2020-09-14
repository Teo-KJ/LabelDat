import React, { useState, useEffect } from 'react';

import './styles.scss'

import imgTemplate from './template.jpg'

export default function (props) {
  return(
    <div className="img-preview">
      <img 
        src={props.img ? props.img : imgTemplate} 
        style={props.imgProps ? (props.imgProps.style ? props.imgProps.style : {}) : {}}
      ></img>
    </div>
  )
}