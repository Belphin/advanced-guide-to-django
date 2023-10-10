import React, { FC } from "react";
import { Breadcrumb, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "router";
import { goToRoute } from "utils/goToRoute";

const excludedRoutes: string[] = [RouteNames.LOGIN, RouteNames.REGISTER];

const AppBreadcrumbs: FC = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const router = useNavigate();

  const boardName = parts[1];
  const topicName = parts[2];

  if (excludedRoutes.includes(pathname)) return null;

  return (
    <Card className="p-3 pb-0 mb-3">
      <Breadcrumb>
        <Breadcrumb.Item
          active={pathname === RouteNames.BOARDS}
          onClick={goToRoute(RouteNames.BOARDS, router)}>
          Boards
        </Breadcrumb.Item>
        {boardName && (
          <Breadcrumb.Item
            active={parts.length === 2}
            onClick={goToRoute(boardName, router)}>
            {boardName}
          </Breadcrumb.Item>
        )}
        {topicName && (
          <Breadcrumb.Item
            active={parts.length === 3}
            onClick={goToRoute(topicName, router)}>
            {topicName}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </Card>
  );
};

export default AppBreadcrumbs;
