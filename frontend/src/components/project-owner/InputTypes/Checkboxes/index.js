import React, { useState } from "react";

import "./styles.scss";

import Checkbox from "./Checkbox";

export default function (props) {
  let values = ["v1", "v2", "v3"];

  if (props.checkBoxProps) {
    if (props.checkBoxProps.values) {
      values = props.checkBoxProps.values;
    }
  }

  const [selectedList, select] = useState([]);

  function checkChange(val) {
    let newSelectedList = [...selectedList];
    if (selectedList.includes(val)) {
      newSelectedList = selectedList.filter((_) => _ !== val);
    } else {
      newSelectedList.push(val);
    }
    select(newSelectedList);
  }

  return (
    <div className="checkbox-container">
      {values.map((_) => (
        <Checkbox
          checkChange={checkChange}
          checkBoxProps={{ text: _ }}
        ></Checkbox>
      ))}
    </div>
  );
}
