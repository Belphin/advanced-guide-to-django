import { IUser } from "models/IUser";
import { AuthActionEnum, SetAuthAction, SetUserAction } from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload,
  }),
};
