import React, { Fragment } from "react";
import "../styles.scss";
import { Form, Input, Select, Row, Col, Card, Button } from "antd";

const { Option } = Select;

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //TODO: POST to route /signup
    //TODO: Redirect to another page
    console.log("Received values of form: ", values);
  };

  return (
    <Fragment>
      <Row align="middle" className="auth-form">
        <Col span={8} />
        <Col span={8}>
          <Card title={<b>Sign Up</b>}>
            <Form
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                className="form-item"
                name="userId"
                label="User ID"
                rules={[
                  {
                    required: true,
                    message: "Please input your User ID!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="form-item"
                name="userType"
                label="User Type"
                rules={[
                  {
                    required: true,
                    message: "Please select a User Type!",
                  },
                ]}
              >
                <Select>
                  <Option value="projectOwner">Project Owner</Option>
                  <Option value="labeller">Labeller</Option>
                </Select>
              </Form.Item>

              <Form.Item
                className="form-item"
                name="orgId"
                label="Organization ID"
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="form-item"
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                className="form-item"
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className="submit-button">
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8} />
      </Row>
    </Fragment>
  );
};

export default SignUp;
