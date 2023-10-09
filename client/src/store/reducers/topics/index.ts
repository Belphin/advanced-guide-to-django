import { TopicsAction, TopicsActionEnum, TopicsState } from "./types";

const initialState: TopicsState = {
  page: 1,
  perPage: 10,
};

export default function topicsReducer(
  state = initialState,
  action: TopicsAction
): TopicsState {
  switch (action.type) {
    case TopicsActionEnum.SET_PAGE:
      return { ...state, page: action.payload };
    case TopicsActionEnum.SET_PER_PAGE:
      return { ...state, perPage: action.payload };
    default:
      return state;
  }
}
