import {
  PostsActionEnum,
  SetPostsPageAction,
  SetPostsPerPageAction,
} from "./types";

export const PostsActionCreators = {
  setPostsPage: (payload: number): SetPostsPageAction => ({
    type: PostsActionEnum.SET_PAGE,
    payload,
  }),
  setPostsPrePage: (payload: number): SetPostsPerPageAction => ({
    type: PostsActionEnum.SET_PER_PAGE,
    payload,
  }),
};
