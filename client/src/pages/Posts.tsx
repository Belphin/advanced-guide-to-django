import React, { FC } from "react";
import AppBreadcrumbs from "components/AppBreadcrumbs";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "api/queries";
import { useLocation } from "react-router-dom";

const Posts: FC = () => {
  const { pathname } = useLocation();
  const { page, perPage } = useTypedSelector((state) => state.posts);

  const parts = pathname.split("/");
  const topicId = +parts[2];

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_POSTS, {
    variables: {
      page,
      perPage,
      topicId: topicId,
    },
  });

  return (
    <>
      <AppBreadcrumbs
        topicName={postsData?.posts?.topic?.subject}
        boardName={postsData?.posts?.topic?.board?.name}
        boardId={postsData?.posts?.topic?.board?.id}
      />
    </>
  );
};

export default Posts;
