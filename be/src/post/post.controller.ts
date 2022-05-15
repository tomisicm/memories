import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { ControllerTag } from "../utils/controller-tags.enum";
import { PostService } from "./post.service";
import { IPost } from "./types/post.type";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsFilterDto } from "./dto/post-filter.dto";
import { CurrentUser } from "../auth/current-user.decorator";
import { UserEntity } from "../user/entities/user.entity";

@ApiTags(ControllerTag.Posts)
@Controller("posts")
@UseGuards(JwtAuthGuard)
// @UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  // TODO
  @ApiOperation({ summary: "Get posts" })
  @Get()
  async getPostFeed(
    @Query(ValidationPipe) filterDto: PostsFilterDto,
    @CurrentUser() user: UserEntity
  ): Promise<IPost[]> {
    return this.postService.filterPosts(user, filterDto);
  }

  @ApiOperation({ summary: "Get post by id" })
  @Get("/:id")
  getPostById(
    @Param("id", ParseUUIDPipe) id: string,
    @CurrentUser() user: UserEntity
  ): Promise<IPost> {
    return this.postService.getPostById(user, id);
  }

  @ApiOperation({ summary: "Create post" })
  @Post()
  @UsePipes(ValidationPipe)
  async createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @CurrentUser() user: UserEntity
  ): Promise<IPost> {
    return await this.postService.create(user, createPostDto);
  }

  @ApiOperation({ summary: "Update post by id" })
  @Patch("/:id")
  async updatePost(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updatePostDto: CreatePostDto,
    @CurrentUser() user: UserEntity
  ): Promise<IPost | false> {
    return await this.postService.update(user, id, updatePostDto);
  }

  @ApiOperation({ summary: "Delete post by id" })
  @Delete("/:id")
  async deletePost(
    @Param("id", ParseUUIDPipe) id: string,
    @CurrentUser() user: UserEntity
  ): Promise<boolean> {
    return await this.postService.delete(user, id);
  }
}
