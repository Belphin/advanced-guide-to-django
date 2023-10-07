import { IUser } from "models/IUser";

export interface AuthState {
  isAuth: boolean;
  user: IUser;
}

export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
  SET_USER = "SET_USER",
}

export interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}
export interface SetUserAction {
  type: AuthActionEnum.SET_USER;
  payload: IUser;
}

export type AuthAction = SetAuthAction | SetUserAction;
