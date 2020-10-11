import React from "react";

import { Slider } from "antd";

import "./styles.scss";

export default function (props) {
  let min = 0;
  let max = 10;

  if (props.sliderProps) {
    min = props.sliderProps.min ? Number(props.sliderProps.min) : 0;
    max = props.sliderProps.max ? Number(props.sliderProps.max) : 10;
  }

  return (
    <div className="slider-container">
      {min ? min : 0}
      <Slider defaultValue={0} max={max ? max : 10} min={min ? min : 0} />
      {max ? max : 10}
    </div>
  );
}
