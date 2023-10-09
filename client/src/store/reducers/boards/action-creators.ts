import {
  BoardsActionEnum,
  SetBoardsPageAction,
  SetBoardsPerPageAction,
} from "./types";

export const BoardsActionCreators = {
  setBoardsPage: (payload: number): SetBoardsPageAction => ({
    type: BoardsActionEnum.SET_PAGE,
    payload,
  }),
  setBoardsPrePage: (payload: number): SetBoardsPerPageAction => ({
    type: BoardsActionEnum.SET_PER_PAGE,
    payload,
  }),
};
