export interface TopicsState {
  page: number;
  perPage: number;
}

export enum TopicsActionEnum {
  SET_PAGE = "SET_TOPICS_PAGE",
  SET_PER_PAGE = "SET_TOPICS_PER_PAGE",
}

export interface SetTopicsPageAction {
  type: TopicsActionEnum.SET_PAGE;
  payload: number;
}
export interface SetTopicsPerPageAction {
  type: TopicsActionEnum.SET_PER_PAGE;
  payload: number;
}

export type TopicsAction = SetTopicsPageAction | SetTopicsPerPageAction;
