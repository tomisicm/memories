import { IPost } from "../../types/posts";

export const getDummyPost = (overrides?: Partial<IPost>): IPost => ({
  userId: 1,
  id: 1,
  title: "title",
  body: "body",
  ...overrides,
});
