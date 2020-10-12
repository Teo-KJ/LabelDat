import React, { useEffect, useState } from "react";
import "./styles.scss";
import landingImage from "./landing.svg";
import { Button } from "antd";
import history from "../../../history";

export default function () {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  function genClass() {
    if (loaded) {
      return " landing-stop";
    } else {
      return " landing-start";
    }
  }

  function onClick() {
    history.push("/signup");
  }

  return (
    <div className={`landing` + genClass()}>
      <div className="left-segment">
        <strong>
          <div className="title title-line">Data Labelling,</div>
          <div className="title title-line">Made easy.</div>
        </strong>
        <p className="text">
          Our platform offers a streamlined, smooth data labelling system for
          research and professional work.
        </p>
        <Button type="primary" onClick={onClick}>
          Try for free
        </Button>
      </div>
      <div className="right-segment">
        <img src={landingImage} alt="vector"></img>
      </div>
    </div>
  );
}
