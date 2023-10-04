import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Input, Select } from "antd";
import { Container, FormGroup, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "router";

const Register = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card title="Register Form" type="inner" style={{ width: "440px" }}>
        <Form>
          <FormGroup className="mb-3">
            <FormLabel>Email *</FormLabel>
            <Input type="text" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>First name</FormLabel>
            <Input type="text" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Last name</FormLabel>
            <Input type="text" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Role *</FormLabel>
            <Select
              style={{ display: "block" }}
              options={[{ value: 0, label: "Blogger" }]}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Password *</FormLabel>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Confirm Password *</FormLabel>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </FormGroup>
          <div className="mt-4 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "4px" }}>Have an account?</div>
              <Link to={RouteNames.LOGIN}>Log in</Link>
            </div>
            <Button type="primary">Register</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
