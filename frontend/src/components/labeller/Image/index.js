import React from "react";

import "./styles.scss";

export default function (props) {
  return (
    <div className="image-preview">
      <img
        alt=""
        src={props.img}
        style={
          props.imgProps
            ? props.imgProps.style
              ? props.imgProps.style
              : {}
            : {}
        }
      ></img>
    </div>
  );
}
