export interface IComment {
  id: string;
  postId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
