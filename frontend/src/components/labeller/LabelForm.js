import React, { useState } from "react";
import { Form, Formik } from "formik";
import validate from "./validate";
import LabelFormTask from "./LabelFormTask";
import { Typography } from "antd";

// Mock API Data
// const apiProjectData = {
//   layout: { type: "radio", labelData: ["Dog", "Cat"] },
//   data: [{ taskData: "Test Image" }, { taskData: "Test Image 2" }],
// };
const apiProjectData = {
  layout: { type: "checkbox", labelData: ["Dog", "Cat", "Rabbit", "Bird"] },
  data: [
    { taskData: "Test Image" },
    { taskData: "Test Image 2" },
    { taskData: "Test Image 3" },
  ],
};

const LabelForm = () => (
  <div>
    <Typography.Title level={2}>Insert Project Name Here</Typography.Title>

    <Wizard
      initialValues={{
        picked: [],
      }}
      onSubmit={(values) => console.log("Top level submit", values)}
    >
      {/* Render a particular number of tasks in the form of pages here  */}
      {apiProjectData.data.map((task, index) => (
        <WizardStep
          key={index}
          validate={(values) => validate(values, index)}
          onSubmit={() => console.log("page submit")}
        >
          <LabelFormTask
            taskIndex={index}
            data={task.taskData}
            layout={apiProjectData.layout}
          />
        </WizardStep>
      ))}
    </Wizard>
  </div>
);

const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validate={step.props.validate}
    >
      {(formik) => (
        <Form>
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

export default LabelForm;
