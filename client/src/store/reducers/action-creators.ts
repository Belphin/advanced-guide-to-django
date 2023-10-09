import { AuthActionCreators } from "./auth/action-creators";
import { BoardsActionCreators } from "./boards/action-creators";

export default { ...AuthActionCreators, ...BoardsActionCreators };
