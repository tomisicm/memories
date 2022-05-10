import { UserEntity } from "../../../user/entities/user.entity";
import { IUser } from "../../../user/types/user.type";

export const createDummyUser = (override?: Partial<IUser>): UserEntity => {
  return {
    id: "string",
    username: "string",
    email: "string",
    salt: "string",
    password: "string",
    posts: [],
    hasId: () => null,
    save: () => null,
    remove: () => null,
    softRemove: () => null,
    recover: () => null,
    reload: () => null,
    ...override,
  };
};
