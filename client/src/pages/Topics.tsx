import React, { FC, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Pagination, PaginationProps, Spin } from "antd";
import { GET_TOPICS } from "api/queries";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ITopic } from "models/ITopic";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { goToRoute } from "utils/goToRoute";
import AppBreadcrumbs from "components/AppBreadcrumbs";

const Topics: FC = () => {
  const router = useNavigate();
  const { pathname } = useLocation();

  const { page, perPage } = useTypedSelector((state) => state.topics);
  const { setTopicsPage, setTopicsPrePage } = useActions();

  const parts = pathname.split("/");
  const boardId = +parts[1];

  const {
    loading: topicsLoading,
    error: topicssError,
    data: topicsData,
  } = useQuery(GET_TOPICS, {
    variables: {
      page,
      perPage,
      boardId,
    },
  });

  const onPageChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setTopicsPage(pageNumber);
    setTopicsPrePage(pageSize);
  };

  useEffect(() => {
    if (topicsData?.topics?.totalPages < page) {
      setTopicsPage(1);
    }
  }, [topicsData]);

  if (topicsLoading)
    return (
      <div className="d-flex justify-content-center">
        <Spin size="large" />
      </div>
    );

  if (topicssError?.message) {
    return <div className="text-center text-muted">{topicssError.message}</div>;
  }

  return (
    <>
      <AppBreadcrumbs boardName={topicsData?.topics?.boardName} />
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Topic</th>
            <th>Starter</th>
            <th>Replies</th>
            <th>Views</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {topicsData?.topics?.items?.map((topic: ITopic) => (
            <tr key={topic.id}>
              <td>
                <a href="#" onClick={goToRoute(topic.id, router)}>
                  {topic.subject}
                </a>
              </td>
              <td className="align-middle">{topic.starter?.email}</td>
              <td className="align-middle">{topic.postsCount}</td>
              <td className="align-middle">{topic.views}</td>
              <td className="align-middle">
                <small className="text-muted">
                  <em>{topic.lastUpdated}</em>
                </small>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {topicsData?.topics?.items?.length === 0 && (
        <div className="text-center text-muted">Topics not found!</div>
      )}
      {topicsData?.topics?.totalPages > 1 && (
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={page}
          total={topicsData?.topics?.totalElements}
          onChange={onPageChange}
          pageSize={perPage}
        />
      )}
    </>
  );
};

export default Topics;
