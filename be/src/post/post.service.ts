import { Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm";

import { PostRepositoryService } from "./post.repository.service";
import { PostManagementService } from "./post.management.service";
import { IPost } from "./types/post.type";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsFilterDto } from "./dto/post-filter.dto";
import { PostEntity, Status } from "./entities/post.entity";
import { IUser } from "../user/types/user.type";
import { PostCommentRepositoryService } from "./post.comments.repository.service";

@Injectable()
export class PostService {
  constructor(
    private readonly postRepositoryService: PostRepositoryService,
    private readonly postManagementService: PostManagementService,
    private readonly postCommentRepositoryService: PostCommentRepositoryService
  ) {}

  async filterPosts(
    currentUser: IUser | null,
    filterDto: PostsFilterDto
  ): Promise<IPost[]> {
    let posts: PostEntity[];
    const query = [];

    if (currentUser) {
      if (filterDto?.authorId) {
        query.push({ status: Status.Public, authorId: filterDto.authorId });
      } else {
        query.push({ status: Status.Public });
      }

      if (filterDto.includePrivate) {
        query.push({ status: Status.Private, authorId: currentUser.id });
      }
    } else {
      // TODO: for users which are not logged in
      // create query builder function
    }

    try {
      posts = await this.postCommentRepositoryService.getPosts({
        where: query,
      });

      return posts;
    } catch (e) {
      // todo: throw custom exception
      console.log(e);
      return [];
    }
  }

  async getPostById(currentUser: IUser | null, id: string): Promise<IPost> {
    let post: IPost;

    try {
      post = await this.postCommentRepositoryService.findOneBy({ id });
    } catch (e) {
      throw new NotFoundException("Post not found!");
    }

    this.postManagementService.userIsAllowedToRead(currentUser.id, post);

    return post;
  }

  async create(
    currentUser: IUser | null,
    createPostDto: CreatePostDto
  ): Promise<IPost> {
    const post = await this.postRepositoryService.createPost({
      ...createPostDto,
      authorId: currentUser.id,
    });

    return post;
  }

  async update(
    currentUser: IUser | null,
    id: string,
    updatePostDto: UpdatePostDto
  ): Promise<PostEntity | false> {
    let post: IPost;

    try {
      post = await this.postRepositoryService.findOneBy({ id });
    } catch (e) {
      throw new NotFoundException("Post not found!");
    }

    this.postManagementService.userIsAllowedToUpdate(currentUser.id, post);

    try {
      const result = await this.postRepositoryService.update({
        id,
        fieldsToUpdate: updatePostDto,
      });

      if (result?.affected > 0) {
        return this.postRepositoryService.findOneBy({ id });
      }

      return false;
    } catch (e) {
      // todo: throw custom exception
      console.log(e);
      return false;
    }
  }

  async delete(currentUser: IUser | null, id: string): Promise<boolean> {
    let post: IPost;
    let result: DeleteResult;

    try {
      post = await this.postRepositoryService.findOneBy({ id });
    } catch (e) {
      throw new NotFoundException("Post not found!");
    }

    this.postManagementService.userIsAllowedToDelete(currentUser.id, post);

    try {
      result = await this.postRepositoryService.delete({ id });
      return result?.affected > 0;
    } catch (e) {
      // todo: throw custom exception
      console.log(e);
      return false;
    }
  }
}
