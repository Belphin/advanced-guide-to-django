import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOARDS } from "api/queries";
import { IBoard } from "models/IBoard";
import { Table } from "react-bootstrap";
import { Pagination, PaginationProps, Spin } from "antd";
import { errorMessage } from "utils/messages";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useActions } from "hooks/useActions";
import { useNavigate } from "react-router-dom";
import { goToRoute } from "utils/goToRoute";
import AppBreadcrumbs from "components/AppBreadcrumbs";

const Boards: FC = () => {
  const router = useNavigate();
  const { page, perPage } = useTypedSelector((state) => state.boards);
  const { setBoardsPage, setBoardsPrePage } = useActions();

  const {
    loading: boardsLoading,
    error: boardsError,
    data: boardsData,
  } = useQuery(GET_BOARDS, {
    variables: {
      page,
      perPage,
    },
  });

  const onPageChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setBoardsPage(pageNumber);
    setBoardsPrePage(pageSize);
  };

  if (boardsLoading)
    return (
      <div className="d-flex justify-content-center">
        <Spin size="large" />
      </div>
    );

  if (boardsError?.message) {
    errorMessage(boardsError.message);
    return <div className="text-center text-muted">{boardsError.message}</div>;
  }

  return (
    <>
      <AppBreadcrumbs />
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Board</th>
            <th>Posts</th>
            <th>Topics</th>
            <th>Last Post</th>
          </tr>
        </thead>
        <tbody>
          {boardsData?.boards?.items?.map((board: IBoard) => (
            <tr key={board.id}>
              <td>
                <a href="#" onClick={goToRoute(board.id, router)}>
                  {board.name}
                </a>
                <small className="text-muted d-block">
                  {board.description}
                </small>
              </td>
              <td className="align-middle">{board.postsCount}</td>
              <td className="align-middle">{board.topicsCount}</td>
              <td className="align-middle">
                <small className="text-muted">
                  <em>
                    {board?.latestPost
                      ? board?.latestPost.createdAt
                      : "No posts yet."}
                  </em>
                </small>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {boardsData?.boards?.items?.length === 0 && (
        <div className="text-center text-muted">Boards not found!</div>
      )}
      {boardsData?.boards?.totalPages > 1 && (
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={page}
          total={boardsData?.boards?.totalElements}
          onChange={onPageChange}
          pageSize={perPage}
        />
      )}
    </>
  );
};

export default Boards;
