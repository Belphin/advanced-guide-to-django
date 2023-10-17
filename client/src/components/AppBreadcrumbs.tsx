import React, { FC } from "react";
import { Breadcrumb, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteNames } from "router";
import { goToRoute } from "utils/goToRoute";

interface AppBreadcrumbsProps {
  boardName?: string;
  boardId?: string;
  topicName?: string;
}

const AppBreadcrumbs: FC<AppBreadcrumbsProps> = (props) => {
  const excludedRoutes: string[] = [RouteNames.LOGIN, RouteNames.REGISTER];
  const { pathname } = useLocation();
  const parts = pathname.split("/");
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
        {props.boardName && props.boardId && (
          <Breadcrumb.Item
            active={parts.length === 2}
            onClick={goToRoute("/" + props.boardId, router)}>
            {props.boardName}
          </Breadcrumb.Item>
        )}
        {props.topicName && props.boardName && (
          <Breadcrumb.Item
            active={parts.length === 3}
            onClick={goToRoute(props.topicName, router)}>
            {props.topicName}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </Card>
  );
};

export default AppBreadcrumbs;
