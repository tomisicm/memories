import { UserEntity } from "../../user/entities/user.entity";

import { PostEntity } from "../../post/entities/post.entity";

interface PrivateDetails {
  salt: string;
  password: string;
}

export interface IUserIdentity {
  id: string;
  username: string;
  email: string;
}

export interface IUser extends IUserIdentity {
  posts: PostEntity[];
}
