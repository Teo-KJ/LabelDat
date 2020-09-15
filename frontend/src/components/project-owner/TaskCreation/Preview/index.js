import React, { useState, useEffect } from 'react';

import ImageDataType from '../../DataTypes/Image'
import SoundDataType from '../../DataTypes/Sound'

import Description from '../../Description'

import TextInputType from '../../InputTypes/Text'
import SliderInputType from '../../InputTypes/Slider'

import './styles.scss'

export default function (props) {

  function dataTypes () {
    switch (props.dataType) {
      case 'Image':
        return (
          <ImageDataType 
            imgProps={props.imgProps}/>
        )
      case 'Sound':
        return (
          <SoundDataType></SoundDataType>
        )

      default:
        return null;
    }
  }

  function inputTypes () {
    switch (props.inputType) {
      case 'Text':
        return <TextInputType placeholder={props.textInputStyle.placeholder}/>
      case 'Slider':
        return <SliderInputType sliderProps={props.sliderProps}></SliderInputType>
      default:
        return null;
    }
  }
  return(
    <div>
      {dataTypes()}
      <div className="input-area-preview">
        <Description
          title={props.titleDesc}
          description={props.desc}
        ></Description>
        {inputTypes()}
      </div>
    </div>
  )
}