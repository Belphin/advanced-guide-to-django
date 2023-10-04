import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { Container, FormGroup, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "router";

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card title="Login Form" type="inner" style={{ width: "440px" }}>
        <Form>
          <FormGroup className="mb-3">
            <FormLabel>Email</FormLabel>
            <Input />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </FormGroup>
          <div className="mt-4 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "4px" }}>No account?</div>
              <Link to={RouteNames.REGISTER}>Register</Link>
            </div>
            <Button type="primary">Login</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
