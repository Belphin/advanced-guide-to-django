import { BoardsAction, BoardsActionEnum, BoardsState } from "./types";

const initialState: BoardsState = {
  page: 1,
  perPage: 10,
};

export default function boardsReducer(
  state = initialState,
  action: BoardsAction
): BoardsState {
  switch (action.type) {
    case BoardsActionEnum.SET_PAGE:
      return { ...state, page: action.payload };
    case BoardsActionEnum.SET_PER_PAGE:
      return { ...state, perPage: action.payload };
    default:
      return state;
  }
}
