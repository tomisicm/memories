import { UnauthorizedException } from "@nestjs/common";

import { CommentEntity, Status } from "./entities/comment.entity";
import { Status as PostStatus } from "../post/entities/post.entity";
import { IPost } from "../post/types/post.type";
import { IUserIdentity } from "../user/types/user.type";
import { UpdateCommentDto } from "./dto/api/update-comment.dto";

/**
 * deals with management rules
 */
export class CommentManagementService {
  userIsAllowedToRead(
    user: IUserIdentity,
    post: IPost,
    comment: CommentEntity
  ): boolean {
    if (comment.status === Status.PUBLIC) {
      return true;
    }

    return true;
  }

  userIsAllowedToCreate(user: IUserIdentity, post: IPost): boolean {
    if (this.postIsCommentable(post)) {
      return true;
    }

    throw new UnauthorizedException("Not allowed to update");
  }

  userIsAllowedToDelete(
    user: IUserIdentity,
    post: IPost,
    comment: CommentEntity
  ): boolean {
    const isCommentAuthor = this.isUserCommentAuthor(user, comment);

    if (isCommentAuthor) {
      return true;
    } else {
      throw new UnauthorizedException("Not allowed to update");
    }
  }

  userIsAllowedToUpdate(
    user: IUserIdentity,
    post: IPost,
    comment: CommentEntity,
    payload: UpdateCommentDto
  ): boolean {
    const isCommentAuthor = this.isUserCommentAuthor(user, comment);

    if (isCommentAuthor) {
      return true;
    } else {
      throw new UnauthorizedException("Not allowed to update");
    }
  }

  private postIsCommentable(post: IPost) {
    return post.status === PostStatus.Public;
  }

  private isUserPostAuthor(user: IUserIdentity, post: IPost): boolean {
    return post.authorId === user.id;
  }

  private isUserCommentAuthor(
    user: IUserIdentity,
    comment: CommentEntity
  ): boolean {
    return comment.authorId === user.id;
  }
}
