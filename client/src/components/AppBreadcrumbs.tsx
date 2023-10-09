import React, { FC } from "react";
import { Breadcrumb, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "router";
import { goToRoute } from "utils/goToRoute";

const excludedRoutes: string[] = [RouteNames.LOGIN, RouteNames.REGISTER];

const AppBreadcrumbs: FC = () => {
  const { pathname } = useLocation();
  const router = useNavigate();

  if (excludedRoutes.includes(pathname)) return null;

  return (
    <Card className="p-3 pb-0 mb-3">
      <Breadcrumb>
        <Breadcrumb.Item
          active={pathname === RouteNames.BOARDS}
          onClick={goToRoute(RouteNames.BOARDS, router)}>
          Boards
        </Breadcrumb.Item>
      </Breadcrumb>
    </Card>
  );
};

export default AppBreadcrumbs;
