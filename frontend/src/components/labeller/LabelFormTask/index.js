import React from "react";
import { Field, ErrorMessage } from "formik";
import { Radio, Checkbox, Alert } from "antd";
import Image from "../../project-owner/DataTypes/Image";
import Description from "../../project-owner/Description";
import "./styles.scss";

const LabelFormTask = ({ data, layout, taskIndex }) => {
  switch (layout.type) {
    case "radio":
      return (
        <div>
          <Image />

          <div className="container">
            <Description description="Label what you see in the picture" />
            {layout.labelData.map((value) => (
              <React.Fragment key={value}>
                <Field
                  name={`picked[${taskIndex}]`}
                  type="radio"
                  as={Radio}
                  value={value}
                >
                  {value}
                </Field>
              </React.Fragment>
            ))}
            <ErrorMessage
              name={`picked`}
              render={(msg) =>
                msg[taskIndex] ? (
                  <Alert type="error" showIcon message={msg[taskIndex]} />
                ) : null
              }
            />
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div>
          <Image />

          <div className="container">
            <Description description="Label what you see in the picture" />
            {layout.labelData.map((value) => (
              <React.Fragment key={value}>
                <Field
                  name={`picked[${taskIndex}]`}
                  type="checkbox"
                  as={Checkbox}
                  value={value}
                >
                  {value}
                </Field>
              </React.Fragment>
            ))}
            <ErrorMessage
              name={`picked`}
              render={(msg) =>
                msg[taskIndex] ? (
                  <Alert type="error" showIcon message={msg[taskIndex]} />
                ) : null
              }
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default LabelFormTask;
