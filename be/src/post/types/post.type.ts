import { UserEntity } from "../../user/entities/user.entity";

import { AuthorIdentity } from "../../user/types/author-identity";
import { Status } from "../entities/post.entity";
import { IComment } from "./comment.type";

export interface IPost extends AuthorIdentity {
  id: string;
  title: string;
  body: string;
  status: Status;
  author: UserEntity;
  img?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostFeed extends IPost {
  comments: IComment[];
}
