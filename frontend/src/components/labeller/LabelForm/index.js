import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import validate from "../validate";
import LabelFormTask from "../LabelFormTask";
import { Typography, Button } from "antd";
import "./styles.scss";

// Mock API Data
const generateApiTasksData = (count) => {
  const tasksData = {
    // layout: { type: "radio", labelData: ["Dog", "Cat"] },
    layout: { type: "checkbox", labelData: ["Dog", "Cat", "Rabbit", "Bird"] },
    data: [],
  };

  for (let i = 1; i <= count; i++) {
    tasksData.data.push({ taskId: i, taskData: `Test Data ${i}` });
  }

  return tasksData;
};

const LabelForm = (props) => {
  const [tasksData, setTasksData] = useState({});
  console.log(props);
  useEffect(() => {
    //TODO: Replace with GET call: /api/projects/:projectId/tasks?count=5
    setTasksData({
      ...generateApiTasksData(
        new URLSearchParams(props.location.search).get("count")
      ),
    });
  }, [props.location.search]);

  const handleSubmit = (values) => {
    //TODO: Replace with POST call: /api/projects/:projectId/tasks

    const results = tasksData.data.map(({ taskId }, index) => ({
      taskId,
      picked: values.picked[index],
    }));
    console.log(props.match.params.projectId);
    console.log(results);
  };

  if (!tasksData.data) return <div>Loading...</div>;
  return (
    <div>
      <Typography.Title level={2} className="project-title">
        Insert Project Name Here
      </Typography.Title>

      <Wizard
        initialValues={{
          picked: [],
        }}
        onSubmit={handleSubmit}
      >
        {/* Render a particular number of tasks in the form of pages here  */}
        {tasksData.data.map((task, index) => (
          <WizardStep
            key={index}
            validate={(values) => validate(values, index)}
            onSubmit={() => console.log("page submit")}
          >
            <LabelFormTask
              taskIndex={index}
              data={task.taskData}
              layout={tasksData.layout}
            />
          </WizardStep>
        ))}
      </Wizard>
    </div>
  );
};

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
          <div className="main-form-container">
            {step}
            <div className="button-group">
              {stepNumber > 0 && (
                <Button
                  className="form-button"
                  onClick={() => previous(formik.values)}
                  shape="round"
                >
                  Back
                </Button>
              )}
              <Button
                className="form-button"
                disabled={formik.isSubmitting}
                type="primary"
                htmlType="submit"
                shape="round"
              >
                {isLastStep ? "Submit" : "Next"}
              </Button>
              <Button
                type="dashed"
                className="task-counter"
                shape="round"
                size="small"
              >
                {stepNumber + 1}/{totalSteps}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

export default LabelForm;
