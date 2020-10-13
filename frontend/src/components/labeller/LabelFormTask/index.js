import React from "react";
import { Field, ErrorMessage } from "formik";
import { Radio, Checkbox, Alert, Row, Col } from "antd";
import Image from "../Image";
import Audio from "../Audio";
import "./styles.scss";

const LabelFormTask = ({ data, layout, taskIndex, itemDataType }) => {
  switch (layout.type) {
    case "radio":
    case "checkbox":
      return (
        <div className={itemDataType === "IMAGE" ? "image-task-container" : ""}>
          {itemDataType === "IMAGE" ? (
            <Row gutter={[0, 32]} justify="center">
              <Col span={16}>
                <Image img={data.itemData} />
              </Col>
            </Row>
          ) : itemDataType === "AUDIO" ? (
            <Audio audio={data.itemData} />
          ) : null}

          <Row justify="center">
            <Col span={16}>
              <div className="task-description">
                <p>{layout.description}</p>
              </div>
            </Col>
          </Row>
          <Row justify="center">
            {layout.labels.map((value) => (
              <Col className="flex-item" span={2} key={value}>
                <Field
                  name={`picked[${taskIndex}]`}
                  type={
                    layout.type === "radio"
                      ? "radio"
                      : layout.type === "checkbox"
                      ? "checkbox"
                      : null
                  }
                  as={
                    layout.type === "radio"
                      ? Radio
                      : layout.type === "checkbox"
                      ? Checkbox
                      : null
                  }
                  value={value}
                >
                  {value}
                </Field>
              </Col>
            ))}
          </Row>
          <Row justify="center" className="req-error">
            <Col span={4}>
              <ErrorMessage
                name={`picked`}
                render={(msg) =>
                  msg[taskIndex] ? (
                    <Alert type="error" showIcon message={msg[taskIndex]} />
                  ) : null
                }
              />
            </Col>
          </Row>
        </div>
      );
    default:
      return null;
  }
};

export default LabelFormTask;
