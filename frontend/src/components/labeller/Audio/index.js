import React from "react";

import "./styles.scss";

export default function (props) {
  return (
    <div className="audio-preview">
      <audio controls="disabled" src={props.audio}></audio>
    </div>
  );
}
