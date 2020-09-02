import React from "react";
import { Field, ErrorMessage } from "formik";
import { Radio, Checkbox, Alert } from "antd";

const LabelFormTask = ({ data, layout, taskIndex }) => {
  switch (layout.type) {
    case "radio":
      return (
        <div>
          {data}
          {layout.labelData.map((value) => (
            <React.Fragment key={value}>
              <Field
                name={`picked[${taskIndex}]`}
                style={radioStyle}
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
      );
    case "checkbox":
      return (
        <div>
          {data}
          {layout.labelData.map((value) => (
            <React.Fragment key={value}>
              <Field
                name={`picked[${taskIndex}]`}
                style={checkboxStyle}
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
      );
    default:
      return null;
  }
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const checkboxStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default LabelFormTask;
