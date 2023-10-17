import { AuthActionCreators } from "store/reducers/auth/action-creators";
import { BoardsActionCreators } from "store/reducers/boards/action-creators";
import { TopicsActionCreators } from "store/reducers/topics/action-creators";
import { PostsActionCreators } from "store/reducers/posts/action-creators";

export default {
  ...AuthActionCreators,
  ...BoardsActionCreators,
  ...TopicsActionCreators,
  ...PostsActionCreators,
};
