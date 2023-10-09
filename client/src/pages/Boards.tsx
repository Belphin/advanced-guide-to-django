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
  }

  return (
    <>
      <Table striped bordered hover>
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
                <a href="#" onClick={goToRoute(board.name, router)}>
                  {board.name}
                </a>
                <small className="text-muted d-block">
                  {board.description}
                </small>
              </td>
              <td className="align-middle">{0}</td>
              <td className="align-middle">{board.topicsCount}</td>
              <td className="align-middle">
                {/* {board.get_last_post ? (
							<small>
								<a
									href={`/topic_posts/${board.pk}/${board.get_last_post.topic.pk}`}>
									By {board.get_last_post.created_by.username} at{" "}
									{board.get_last_post.created_at}
								</a>
							</small>
						) : ( */}
                <small className="text-muted">
                  <em>No posts yet.</em>
                </small>
                {/* )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        showQuickJumper
        showSizeChanger
        defaultCurrent={page}
        total={boardsData?.boards?.totalPages}
        onChange={onPageChange}
        pageSize={perPage}
      />
    </>
  );
};

export default Boards;
