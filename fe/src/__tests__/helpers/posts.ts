import { IAuthor } from "../../types/author";
import { IPost } from "../../types/posts";

const author: IAuthor = {
  id: "authorId",
  email: "email@email.com",
  username: "username",
};

export const getDummyPost = (overrides?: Partial<IPost>): IPost => ({
  authorId: "1",
  id: "1",
  title: "title",
  body: "body",
  createdAt: new Date().toLocaleString(),
  ...overrides,
});
