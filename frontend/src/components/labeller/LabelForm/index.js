import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../shared/Loading";
import { Form, Formik } from "formik";
import validate from "../validate";
import LabelFormTask from "../LabelFormTask";
import { Typography, Button, Alert, Row, Col } from "antd";
import "./styles.scss";
import history from "../../../history";

const LabelForm = (props) => {
  const [tasksData, setTasksData] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get(
        `/api/projects/${
          props.match.params.projectId
        }/tasks?count=${new URLSearchParams(props.location.search).get(
          "count"
        )}`
      );

      setTasksData(res.data);
    };

    fetchTasks();
  }, [props.location.search, props.match.params.projectId]);

  const handleSubmit = async (values) => {
    const results = tasksData.data.map(({ id }, index) => ({
      taskId: id,
      data: {
        picked: values.picked[index],
      },
    }));

    const res = await axios.post("/api/projects/tasks", results);

    if (res.status === 200) history.push("/");
  };

  // Fetching
  if (!tasksData.data) return <Loading />;

  // No more tasks to label
  if (!Object.keys(tasksData.data).length)
    return (
      <Alert
        className="completed-message"
        message="Completed"
        description={`You have finished labelling all the tasks for ${tasksData.projectName}.`}
        type="success"
        showIcon
      />
    );

  return (
    <div>
      <Typography.Title level={2} className="project-title">
        {tasksData.projectName}
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
              itemDataType={tasksData.itemDataType}
              taskIndex={index}
              data={task}
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
            <Row justify="end">
              <Col span={8}>
                <div>
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
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

export default LabelForm;
