export interface PostsState {
  page: number;
  perPage: number;
}

export enum PostsActionEnum {
  SET_PAGE = "SET_POSTS_PAGE",
  SET_PER_PAGE = "SET_POSTS_PER_PAGE",
}

export interface SetPostsPageAction {
  type: PostsActionEnum.SET_PAGE;
  payload: number;
}
export interface SetPostsPerPageAction {
  type: PostsActionEnum.SET_PER_PAGE;
  payload: number;
}

export type PostsAction = SetPostsPageAction | SetPostsPerPageAction;
