import React from "react";

import "./styles.scss";

import soundTemplate from "./template.mp3";

export default function (props) {
  return (
    <div className="audio-preview">
      <audio
        controls="disabled"
        src={props.sound ? props.sound : soundTemplate}
      ></audio>
    </div>
  );
}
