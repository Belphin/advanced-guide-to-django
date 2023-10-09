import {
  TopicsActionEnum,
  SetTopicsPageAction,
  SetTopicsPerPageAction,
} from "./types";

export const TopicsActionCreators = {
  setTopicsPage: (payload: number): SetTopicsPageAction => ({
    type: TopicsActionEnum.SET_PAGE,
    payload,
  }),
  setTopicsPrePage: (payload: number): SetTopicsPerPageAction => ({
    type: TopicsActionEnum.SET_PER_PAGE,
    payload,
  }),
};
