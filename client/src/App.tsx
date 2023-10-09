import React, { useEffect } from "react";
import AppRouter from "components/AppRouter";
import { useMutation } from "@apollo/client";
import { VERIFY_TOKEN } from "api/mutation";
import { useTypedSelector } from "hooks/useTypedSelector";
import NavBar from "components/NavBar";
import { useActions } from "hooks/useActions";
import "./styles.css";
import AppBreadcrumbs from "components/AppBreadcrumbs";
import { Container } from "react-bootstrap";

function App() {
  const [verifyTokenMutation, { loading, error }] = useMutation(VERIFY_TOKEN);
  const { setUser, setIsAuth } = useActions();
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  const verifyToken = async () => {
    if (isAuth) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await verifyTokenMutation({ variables: { token } });
    const { success, user } = response.data.verifyToken;
    if (!success) return;
    delete user.__typename;
    setUser(user);
    setIsAuth(true);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <NavBar />
      <Container className="pt-3 pb-3">
        <AppBreadcrumbs />
        <AppRouter />
      </Container>
    </>
  );
}

export default App;
