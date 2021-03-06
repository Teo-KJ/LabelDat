import React, { Fragment, useContext } from "react";

import "../styles.scss";
import { Form, Input, Select, Row, Col, Card, Button } from "antd";
import { AuthContext } from "../../../context/auth-context";

const { Option } = Select;

const SignIn = () => {
  const [form] = Form.useForm();
  const authContext = useContext(AuthContext);

  const onFinish = (values) => {
    authContext.signIn(values);
  };

  return (
    <Fragment>
      <Row align="middle" className="auth-form">
        <Col span={8} />
        <Col span={8}>
          <Card title={<b>Sign In</b>}>
            <Form
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                className="form-item"
                name="username"
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
                  <Option value="PROJECT_OWNER">Project Owner</Option>
                  <Option value="LABELLER">Labeller</Option>
                </Select>
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
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="submit-button">
                <Button type="primary" htmlType="submit">
                  Sign In
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

export default SignIn;
