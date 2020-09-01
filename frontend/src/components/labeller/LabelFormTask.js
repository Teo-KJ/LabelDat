import React from "react";
import { Field, ErrorMessage } from "formik";
import { Radio, Alert } from "antd";

const LabelFormTask = ({ data, layout, taskIndex }) => {
  if (layout.type === "radio") {
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
  }
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default LabelFormTask;
