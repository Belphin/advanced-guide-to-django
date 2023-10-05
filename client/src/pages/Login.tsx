import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { Container, FormGroup, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card title="Login Form" type="inner" style={{ width: "440px" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="mb-3">
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <Controller
              name="password"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  {...field}
                />
              )}
            />
          </FormGroup>
          <div className="mt-4 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "4px" }}>No account?</div>
              <Link to={RouteNames.REGISTER}>Register</Link>
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
