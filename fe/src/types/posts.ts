import { IComment } from "./coments";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostAndComments extends IPost {
  comments: IComment[];
}
