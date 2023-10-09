export interface BoardsState {
  page: number;
  perPage: number;
}

export enum BoardsActionEnum {
  SET_PAGE = "SET_BOARDS_PAGE",
  SET_PER_PAGE = "SET_BOARDS_PER_PAGE",
}

export interface SetBoardsPageAction {
  type: BoardsActionEnum.SET_PAGE;
  payload: number;
}
export interface SetBoardsPerPageAction {
  type: BoardsActionEnum.SET_PER_PAGE;
  payload: number;
}

export type BoardsAction = SetBoardsPageAction | SetBoardsPerPageAction;
