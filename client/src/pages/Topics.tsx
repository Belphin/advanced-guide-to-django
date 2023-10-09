import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { Pagination, PaginationProps, Spin } from "antd";
import { GET_TOPICS } from "api/queries";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ITopic } from "models/ITopic";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { goToRoute } from "utils/goToRoute";
import { errorMessage } from "utils/messages";

const Topics: FC = () => {
  const router = useNavigate();
  const { pathname } = useLocation();

  const { page, perPage } = useTypedSelector((state) => state.topics);
  const { setTopicsPage, setTopicsPrePage } = useActions();

  const parts = pathname.split("/");
  const boardName = parts[1];

  const {
    loading: topicsLoading,
    error: topicssError,
    data: topicsData,
  } = useQuery(GET_TOPICS, {
    variables: {
      page,
      perPage,
      boardName,
    },
  });

  const onPageChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setTopicsPage(pageNumber);
    setTopicsPrePage(pageSize);
  };

  if (topicsLoading)
    return (
      <div className="d-flex justify-content-center">
        <Spin size="large" />
      </div>
    );

  if (topicssError?.message) {
    errorMessage(topicssError.message);
  }

  return (
    <>
      <Table striped bordered hover>
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
                <a
                  href="#"
                  onClick={goToRoute(
                    `${topic.board.name}/${topic.subject}`,
                    router
                  )}>
                  {topic.subject}
                </a>
                <small className="text-muted d-block">
                  {topic.board.description}
                </small>
              </td>
              <td className="align-middle">{topic.starter.email}</td>
              <td className="align-middle">{topic.postsCount}</td>
              <td className="align-middle">{topic.views}</td>
              <td className="align-middle">{topic.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        showQuickJumper
        showSizeChanger
        defaultCurrent={page}
        total={topicsData?.topics?.totalPages}
        onChange={onPageChange}
        pageSize={perPage}
      />
    </>
  );
};

export default Topics;
