import React from "react";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Boards from "pages/Boards";

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  LOGIN = "/login",
  REGISTER = "/register",
  BOARDS = "/",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.REGISTER, element: Register },
  { path: RouteNames.BOARDS, element: Boards },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.BOARDS, element: Boards },
];
