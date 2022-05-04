import { UnauthorizedException } from "@nestjs/common";
import { PostEntity, Status } from "./entities/post.entity";

/**
 * deals with management rules
 */
export class PostManagementService {
  userIsAllowedToRead(currentUserId: string, post: PostEntity): boolean {
    if (post.status === Status.Public) {
      return true;
    }

    if (currentUserId !== post.authorId && post.status === Status.Private) {
      throw new UnauthorizedException("Not allowed to read");
    }

    return true;
  }

  userIsAllowedToUpdate(currentUserId: string, post: PostEntity): boolean {
    if (currentUserId === post.authorId) {
      return true;
    } else {
      throw new UnauthorizedException("Not allowed to update");
    }
  }

  userIsAllowedToDelete(currentUserId: string, post: PostEntity): boolean {
    if (currentUserId === post.authorId) {
      return true;
    } else {
      throw new UnauthorizedException("Not allowed to delete");
    }
  }
}
