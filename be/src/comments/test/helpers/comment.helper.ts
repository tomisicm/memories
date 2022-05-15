import { createDummyPost } from "../../../post/test/helpers/post.helper";
import { createDummyUser } from "../../../post/test/helpers/user.helper";
import { CommentEntity, Status } from "../../entities/comment.entity";

export const createDummyComment = (
  override?: Partial<CommentEntity>
): CommentEntity => {
  return {
    id: "id",
    body: "body",
    status: Status.PUBLIC,
    authorId: "string",
    author: createDummyUser(),
    postId: "postId",
    post: createDummyPost(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...override,
  };
};
