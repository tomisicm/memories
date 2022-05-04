import { UserEntity } from "../../user/entities/user.entity";

import { PostEntity } from "../../post/entities/post.entity";

interface PrivateDetails {
  salt: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  posts: PostEntity[];
}
