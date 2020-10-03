import React from "react";
import { Spin } from "antd";
import "./styles.scss";

const Loading = () => (
  <div>
    <Spin className="loading" tip="Loading" />
  </div>
);

export default Loading;
