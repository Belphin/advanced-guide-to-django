import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Input, Select } from "antd";
import { Container, FormGroup, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  password: string;
  confirmPassword: string;
}

const Register = () => {
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
      <Card title="Register Form" type="inner" style={{ width: "440px" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="mb-3">
            <FormLabel>Email *</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>First name</FormLabel>
            <Controller
              name="firstName"
              control={control}
              // rules={{ required: "This field is required" }}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Last name</FormLabel>
            <Controller
              name="lastName"
              control={control}
              // rules={{ required: "This field is required" }}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Role *</FormLabel>
            <Controller
              name="role"
              control={control}
              // rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ display: "block" }}
                  options={[{ value: 0, label: "Blogger" }]}
                />
              )}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Password *</FormLabel>
            <Controller
              name="password"
              control={control}
              // rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Confirm Password *</FormLabel>
            <Controller
              name="confirmPassword"
              control={control}
              // rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
          </FormGroup>
          <div className="mt-4 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "4px" }}>Have an account?</div>
              <Link to={RouteNames.LOGIN}>Log in</Link>
            </div>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
