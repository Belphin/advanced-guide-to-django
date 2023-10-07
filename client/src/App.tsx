import React, { useEffect } from "react";
import AppRouter from "components/AppRouter";
import { useMutation } from "@apollo/client";
import { VERIFY_TOKEN } from "api/mutation";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "store/reducers/auth/action-creators";

function App() {
  const [verifyTokenMutation, { loading, error }] = useMutation(VERIFY_TOKEN);
  const dispatch = useDispatch();
  const { isAuth } = useTypedSelector((state) => state.auth);

  const verifyToken = async () => {
    if (isAuth) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await verifyTokenMutation({ variables: { token } });
    const { success, user } = response.data.verifyToken;
    if (!success) return;
    delete user.__typename;
    dispatch(AuthActionCreators.setUser(user));
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
