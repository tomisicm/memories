import { CommentEntity } from "../entities/comment.entity";

export interface HasComments {
  comments?: CommentEntity[];
}
