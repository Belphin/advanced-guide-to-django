import { PostsActionEnum, PostsAction, PostsState } from "./types";

const initialState: PostsState = {
  page: 1,
  perPage: 10,
};

export default function postsReducer(
  state = initialState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case PostsActionEnum.SET_PAGE:
      return { ...state, page: action.payload };
    case PostsActionEnum.SET_PER_PAGE:
      return { ...state, perPage: action.payload };
    default:
      return state;
  }
}
