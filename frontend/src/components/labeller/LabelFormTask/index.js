import React from "react";
import { Field, ErrorMessage } from "formik";
import { Radio, Checkbox, Alert } from "antd";
import Image from "../Image";
import Description from "../../project-owner/Description";
import "./styles.scss";

const LabelFormTask = ({ data, layout, taskIndex, itemDataType }) => {
  switch (layout.type) {
    case "radio":
      return (
        <div>
          {itemDataType === "IMAGE" ? <Image img={data.itemData} /> : null}

          <div className="container">
            <Description description={layout.description} />
            {layout.labels.map((value) => (
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
          {itemDataType === "IMAGE" ? <Image img={data.itemData} /> : null}

          <div className="container">
            <Description description={layout.description} />
            {layout.labels.map((value) => (
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
