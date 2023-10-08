import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { Container, FormGroup, Form, FormLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";
import { useMutation } from "@apollo/client";
import { LOGIN } from "api/mutation";
import { useActions } from "hooks/useActions";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN);

  const { setUser, setIsAuth } = useActions();
  const router = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const response = await loginMutation({
      variables: formData,
    });
    const { user, token, success, error } = response.data.login;
    if (success) {
      localStorage.setItem("token", token);
      delete user.__typename;
      setUser(user);
      setIsAuth(true);
      router(RouteNames.BOARDS);
    } else {
      if (error?.validationErrors[0]?.field === "__all__") {
        const errorOptions = {
          type: "manual",
          message: "Please enter a correct email and password",
        };
        setError("username", errorOptions);
        setError("password", errorOptions);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card title="Login Form" type="inner" style={{ width: "500px" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Email</FormLabel>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <Input
                  status={errors.username ? "error" : ""}
                  type="text"
                  {...field}
                />
              )}
            />
            {errors.username && (
              <div className="text-danger">{errors.username.message}</div>
            )}
          </FormGroup>
          <FormGroup className="form-field">
            <FormLabel className="fw-semibold">Password</FormLabel>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  status={errors.password ? "error" : ""}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </FormGroup>
          <div className="mt-3 d-flex justify-content-between">
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
