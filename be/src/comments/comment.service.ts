import { Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm";

import { CommentManagementService } from "./comment.management.service";
import { CommentRepositoryService } from "./comment.repository.service";
import { CreateCommentDto } from "./dto/api/create-comment.dto";
import { CommentEntity } from "./entities/comment.entity";
import { UpdateCommentDto } from "./dto/api/update-comment.dto";
import { PostRepositoryService } from "../post/post.repository.service";
import { IPost } from "../post/types/post.type";
import { IUser, IUserIdentity } from "../user/types/user.type";
import { PostEntity } from "src/post/entities/post.entity";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepositoryService: CommentRepositoryService,
    private readonly commentManagementService: CommentManagementService,
    private readonly postRepositoryService: PostRepositoryService
  ) {}

  async create(
    currentUser: IUserIdentity,
    createPostDto: CreateCommentDto
  ): Promise<CommentEntity> {
    let post: PostEntity;

    try {
      post = await this.postRepositoryService.findOrFail({
        where: {
          id: createPostDto.postId,
        },
      });
    } catch (e) {
      throw new NotFoundException("Post not found!");
    }

    this.commentManagementService.userIsAllowedToCreate(currentUser, post);

    const newComment = await this.commentRepositoryService.create({
      authorId: currentUser.id,
      ...createPostDto,
    });

    return newComment;
  }

  async update(
    currentUser: IUser,
    id: string,
    updateCommentDto: UpdateCommentDto
  ) {
    let comment: CommentEntity;
    let post: PostEntity;

    try {
      comment = await this.commentRepositoryService.findOrFail({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException("Comment not found!");
    }
    try {
      post = await this.postRepositoryService.findOrFail({
        where: { id: comment.postId },
      });
    } catch (e) {
      throw new NotFoundException("Post not found!");
    }

    this.commentManagementService.userIsAllowedToUpdate(
      currentUser,
      post,
      comment,
      updateCommentDto
    );

    try {
      this.commentRepositoryService.update({
        id: id,
        fieldsToUpdate: updateCommentDto,
      });
    } catch (e) {
      // todo: throw custom exception
      console.log(e);
      return false;
    }
  }

  async delete(currentUser: IUser | null, id: string): Promise<boolean> {
    let comment: CommentEntity;
    let post: PostEntity;
    let result: DeleteResult;

    try {
      comment = await this.commentRepositoryService.findOrFail({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException("Comment not found!");
    }
    try {
      post = await this.postRepositoryService.findOrFail({
        where: { id: comment.postId },
      });
    } catch (e) {
      throw new NotFoundException("Post not found!");
    }

    this.commentManagementService.userIsAllowedToDelete(
      currentUser,
      post,
      comment
    );

    try {
      result = await this.commentRepositoryService.delete({ id });

      return result?.affected > 0;
    } catch (e) {
      // todo: throw custom exception
      console.log(e);
      return false;
    }
  }
}
