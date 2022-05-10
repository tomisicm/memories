import { UserEntity } from "../../../user/entities/user.entity";
import { Status } from "../../entities/post.entity";
import { IPost } from "../../types/post.type";

const userEntity: Omit<UserEntity, "salt" | "password"> = {
  id: "",
  username: "",
  email: "",
  posts: [],
  hasId: () => null,
  save: () => null,
  remove: () => null,
  softRemove: () => null,
  recover: () => null,
  reload: () => null,
};

export const createDummyPost = (override?: Partial<IPost>): IPost => {
  return {
    id: "id",
    title: "title",
    body: "body",
    status: Status.Public,
    createdAt: new Date(),
    author: userEntity,
    updatedAt: new Date(),
    authorId: "string",
    ...override,
  };
};
