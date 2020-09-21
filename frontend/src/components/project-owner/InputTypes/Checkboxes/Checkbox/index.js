import React, { useState } from "react";

import { Checkbox } from "antd";

import "./styles.scss";

export default function (props) {
  let text = "default value";
  const [checked, toggleCheck] = useState(false);

  if (props.checkBoxProps) {
    text = props.checkBoxProps.text
      ? props.checkBoxProps.text
      : "default value";
  }

  function onChange(e) {
    toggleCheck(!checked);
    props.checkChange(text);
  }

  return <Checkbox onChange={(e) => onChange(e)}>{text}</Checkbox>;
}
