import React from "react";
import { Formik, Field, Form } from "formik";
import { Radio } from "antd";

const LabelForm = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          picked: 3,
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <div id="my-radio-group">Picked</div>
            <div role="group" aria-labelledby="my-radio-group">
              <Field
                name="picked"
                style={radioStyle}
                type="radio"
                as={Radio}
                value={1}
              >
                Option A
              </Field>
              <Field
                name="picked"
                style={radioStyle}
                type="radio"
                as={Radio}
                value={2}
              >
                Option B
              </Field>
              <Field
                name="picked"
                style={radioStyle}
                type="radio"
                as={Radio}
                value={3}
              >
                Option C
              </Field>
              <div>Picked: {values.picked}</div>
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export default LabelForm;
