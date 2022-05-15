import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions } from "typeorm";
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
    relations = ["author", "comments"]
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
}
