import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Input, Select, Spin } from "antd";
import { Container, FormGroup, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { GET_USER_ROLES } from "api/queries";
import { useQuery } from "@apollo/client";
import "./styles.css";

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: number;
  password: string;
  confirmPassword: string;
}

interface IUserRolesData {
  id: number;
  name: string;
}

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    loading: userRolesLoading,
    error: userRolesError,
    data: userRolesData,
  } = useQuery(GET_USER_ROLES);
  const userRoles = userRolesData?.roles.map((role: IUserRolesData) => ({
    value: role.id,
    label: role.name,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card title="Register Form" type="inner" style={{ width: "440px" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Email *</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  status={errors.email ? "error" : ""}
                  type="text"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </FormGroup>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">First name</FormLabel>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input type="text" {...field} maxLength={55} />
              )}
            />
          </FormGroup>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Last name</FormLabel>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input type="text" {...field} maxLength={55} />
              )}
            />
          </FormGroup>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Role *</FormLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  status={errors.role ? "error" : ""}
                  style={{ display: "block" }}
                  options={userRoles}
                />
              )}
            />
            {errors.role && (
              <div className="text-danger">{errors.role.message}</div>
            )}
          </FormGroup>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Password *</FormLabel>
            <Controller
              name="password"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.password ? "error" : ""}
                  suffix={
                    passwordVisible ? (
                      <EyeTwoTone onClick={togglePasswordVisibility} />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={togglePasswordVisibility}
                      />
                    )
                  }
                  type={passwordVisible ? "" : "password"}
                />
              )}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </FormGroup>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Confirm Password *</FormLabel>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.confirmPassword ? "error" : ""}
                  suffix={
                    passwordVisible ? (
                      <EyeTwoTone onClick={togglePasswordVisibility} />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={togglePasswordVisibility}
                      />
                    )
                  }
                  type={passwordVisible ? "" : "password"}
                />
              )}
            />
            {errors.confirmPassword && (
              <div className="text-danger">
                {errors.confirmPassword.message}
              </div>
            )}
          </FormGroup>
          <div className="mt-2 d-flex justify-content-between">
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
