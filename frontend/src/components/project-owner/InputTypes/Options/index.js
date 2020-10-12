import React, { useState } from "react";

import "./styles.scss";

import { Radio } from "antd";

export default function (props) {
  let values = ["default"];
  if (props.optionsProps) {
    if (props.optionsProps.values) {
      values = props.optionsProps.values;
    }
  }

  const [value, changeValue] = useState(-1);

  return (
    <div className="options-container">
      <Radio.Group
        value={value}
        onChange={(e) => {
          changeValue(e.target.value);
        }}
      >
        {values.map((_, i) => (
          <Radio key={i} value={i}>
            {_}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
}
