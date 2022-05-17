import { IAuthor } from "./author";

// todo: update?
export enum Status {
  PUBLIC = "public",
  PENDING_PUBLIC = "pending_acceptance",
  PENDING_DELETION = "pending_deletion",
  DELETED = "deleted",
}

export interface IComment {
  id: string;
  body: string;
  postId: string;
  authorId: string;
  author?: IAuthor;
  status: Status;
  deletedAt: Date | undefined;
  createdAt: Date;
}
