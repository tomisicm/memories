import { Status } from "../entities/post.entity";
import { HasComments } from "../../comments/interfaces/commentable";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthorIdentity } from "../../user/types/author-identity";

// TODO: img url
export interface IPost extends AuthorIdentity, HasComments {
  id: string;
  title: string;
  body: string;
  status: Status;
  author?: Omit<UserEntity, "salt" | "password">;
  createdAt: Date;
  updatedAt: Date;
}
