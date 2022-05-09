import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  UpdateResult,
} from "typeorm";
import VError from "verror";

import { CreatePostDto } from "./dto/create-post.dto";
import { PostEntity } from "./entities/post.entity";
import { PostRepository } from "./post.repository";

interface AuthorIdentity {
  authorId: string;
}

interface CreatePostEntity extends AuthorIdentity, CreatePostDto {}

@Injectable()
export class PostRepositoryService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: PostRepository
  ) {}

  async createPost<T extends CreatePostEntity>(
    postEntity: T
  ): Promise<PostEntity> {
    try {
      return await this.postRepository.save({
        ...postEntity,
        author: postEntity.authorId,
      });
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { postEntity } },
        "An error occurred saving post."
      );
    }
  }

  async update({
    id,
    fieldsToUpdate,
  }: {
    id: string;
    fieldsToUpdate: Partial<PostEntity>;
  }): Promise<UpdateResult> {
    try {
      return await this.postRepository.update({ id }, { ...fieldsToUpdate });
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { id, fieldsToUpdate } },
        "An error occurred updating post."
      );
    }
  }

  async find(options: FindManyOptions<PostEntity> = {}): Promise<PostEntity[]> {
    try {
      return await this.postRepository.find(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying posts."
      );
    }
  }

  async findOneBy(options: FindOptionsWhere<PostEntity>): Promise<PostEntity> {
    try {
      return await this.postRepository.findOneBy(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying posts."
      );
    }
  }

  async delete(
    options: FindOptionsWhere<PostEntity> = {}
  ): Promise<DeleteResult> {
    try {
      return await this.postRepository.delete(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying posts."
      );
    }
  }
}
