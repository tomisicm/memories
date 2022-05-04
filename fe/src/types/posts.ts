import { IComment } from "./coments";

export interface IPost {
  authorId: number;
  id: number;
  title: string;
  body: string;
  img?: string;
  createdAt: string;
}

export interface IPostAndComments extends IPost {
  comments: IComment[];
}
