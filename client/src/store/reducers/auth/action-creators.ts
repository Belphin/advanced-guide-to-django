import { IUser } from "models/IUser";
import { AuthActionEnum, SetAuthAction, SetUserAction } from "./types";
import { AppDispatch } from "store";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload,
  }),
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
