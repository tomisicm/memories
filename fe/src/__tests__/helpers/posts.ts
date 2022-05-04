import { IPost } from "../../types/posts";

export const getDummyPost = (overrides?: Partial<IPost>): IPost => ({
  authorId: 1,
  id: 1,
  title: "title",
  body: "body",
  createdAt: new Date().toLocaleString(),
  ...overrides,
});
