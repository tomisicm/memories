import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  UpdateResult,
} from "typeorm";
import VError from "verror";

import { AuthorIdentity } from "../user/types/author-identity";
import { CreateCommentDto } from "./dto/api/create-comment.dto";
import { UpdateCommentDto } from "./dto/api/update-comment.dto";
import { CommentRepository } from "./comment.repository";
import { CommentEntity } from "./entities/comment.entity";

interface CreateCommentEntity extends AuthorIdentity, CreateCommentDto {}

@Injectable()
export class CommentRepositoryService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: CommentRepository
  ) {}

  async create<T extends CreateCommentEntity>(
    postEntity: T
  ): Promise<CommentEntity> {
    try {
      return await this.commentRepository.save({
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
    fieldsToUpdate: Partial<UpdateCommentDto>;
  }): Promise<UpdateResult> {
    try {
      return await this.commentRepository.update({ id }, { ...fieldsToUpdate });
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { id, fieldsToUpdate } },
        "An error occurred updating comment."
      );
    }
  }

  async find(
    options: FindManyOptions<CommentEntity> = {}
  ): Promise<CommentEntity[]> {
    try {
      return await this.commentRepository.find(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying comments."
      );
    }
  }

  async findOrFail(
    options: FindManyOptions<CommentEntity>
  ): Promise<CommentEntity> {
    try {
      return await this.commentRepository.findOneOrFail(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying comments."
      );
    }
  }

  async findOneBy(
    options: FindOptionsWhere<CommentEntity>
  ): Promise<CommentEntity> {
    try {
      return await this.commentRepository.findOneBy(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying comments."
      );
    }
  }

  async delete(
    options: FindOptionsWhere<CommentEntity> = {}
  ): Promise<DeleteResult> {
    try {
      return await this.commentRepository.delete(options);
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying comments."
      );
    }
  }
}
