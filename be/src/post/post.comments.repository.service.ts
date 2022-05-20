import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOptionsWhere } from "typeorm";
import VError from "verror";

import { PostEntity } from "./entities/post.entity";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostCommentRepositoryService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: PostRepository
  ) {}

  async getPosts(
    options: FindManyOptions<PostEntity> = {},
    relations = ["author"]
  ): Promise<PostEntity[]> {
    try {
      const data = await this.postRepository.find({
        ...options,
        relations,
      });

      return data;
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying posts."
      );
    }
  }

  async findOneBy(
    options: FindOptionsWhere<PostEntity>,
    relations = ["author", "comments", "comments.author"]
  ): Promise<PostEntity> {
    try {
      return await this.postRepository.findOne({
        where: { ...options },
        relations,
        order: {
          comments: {
            createdAt: "DESC",
          },
        },
      });
    } catch (err) {
      throw new VError(
        { cause: err as Error, info: { options } },
        "An error occurred querying posts."
      );
    }
  }
}
