import React from "react";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Boards from "pages/Boards";
import Topics from "pages/Topics";

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  LOGIN = "/login",
  REGISTER = "/register",
  BOARDS = "/",
  TOPICS = "/:board",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.REGISTER, element: Register },
  { path: RouteNames.BOARDS, element: Boards },
  { path: RouteNames.TOPICS, element: Topics },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.BOARDS, element: Boards },
  { path: RouteNames.TOPICS, element: Topics },
];
