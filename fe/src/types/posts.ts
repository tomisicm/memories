import { IAuthor } from "./author";
import { IComment } from "./coments";

export interface IPost {
  id: string;
  authorId: string;
  title: string;
  body: string;
  img?: string;
  createdAt: string;
  author: IAuthor;
}

export interface IPostAndComments extends IPost {
  comments: IComment[];
}
