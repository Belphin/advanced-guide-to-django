import { IPost } from "./IPost";

export interface IBoard {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  postsCount: number;
  latestPost: IPost;
}
