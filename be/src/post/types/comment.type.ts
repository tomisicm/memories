import { Status } from "../../comments/entities/comment.entity";
import { IUser } from "src/user/types/user.type";
import { IPost } from "./post.type";
import { UserEntity } from "src/user/entities/user.entity";
import { PostEntity } from "../entities/post.entity";

export interface IComment {
  id: string;
  postId: string;
  authorId: string;
  body: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  author?: IUser;
  post?: IPost;
}
