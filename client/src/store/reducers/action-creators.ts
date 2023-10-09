import { AuthActionCreators } from "./auth/action-creators";
import { BoardsActionCreators } from "./boards/action-creators";
import { TopicsActionCreators } from "./topics/action-creators";

export default {
  ...AuthActionCreators,
  ...BoardsActionCreators,
  ...TopicsActionCreators,
};
