import { IBoard } from "./IBoard";
import { IUser } from "./IUser";

export interface ITopic {
  id: string;
  message: string;
  subject: string;
  postsCount: number;
  views: number;
  lastUpdated: string;
  board: IBoard;
  starter: IUser;
}
