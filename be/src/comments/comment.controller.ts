import {
  Body,
  Controller,
  Param,
  Post,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ControllerTag } from "../utils/controller-tags.enum";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CommentService } from "./comment.service";
import { CurrentUser } from "../auth/current-user.decorator";
import { IComment } from "../post/types/comment.type";
import { CreateCommentDto } from "./dto/api/create-comment.dto";
import { UpdateCommentDto } from "./dto/api/update-comment.dto";
import { IUserIdentity } from "src/user/types/user.type";

@ApiTags(ControllerTag.Comments)
@Controller("comments")
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: "Create comment" })
  @Post()
  @UsePipes(ValidationPipe)
  async createComment(
    @Body(ValidationPipe) createPostDto: CreateCommentDto,
    @CurrentUser() user: IUserIdentity
  ): Promise<IComment> {
    return await this.commentService.create(user, createPostDto);
  }

  @ApiOperation({ summary: "Update comment" })
  @Patch("/:id")
  @UsePipes(ValidationPipe)
  async updateComment(
    @Param("id") id: string,
    @Body(ValidationPipe) createPostDto: UpdateCommentDto,
    @CurrentUser() user: IUserIdentity
  ): Promise<IComment | boolean> {
    return await this.commentService.update(user, id, createPostDto);
  }

  @ApiOperation({ summary: "Delete comment by id" })
  @Delete("/:id")
  async deleteComment(
    @Param("id", ParseUUIDPipe) id: string,
    @CurrentUser() user: IUserIdentity
  ): Promise<IComment | boolean> {
    return await this.commentService.delete(user, id);
  }
}
