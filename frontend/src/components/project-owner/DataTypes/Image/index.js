import React from "react";

import "./styles.scss";

import imgTemplate from "./template.jpg";

export default function (props) {
  return (
    <div className="img-preview">
      <img
        alt=""
        src={props.img ? props.img : imgTemplate}
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
