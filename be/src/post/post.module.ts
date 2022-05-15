import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { AuthModule } from "../auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { PostManagementService } from "./post.management.service";
import { PostRepositoryService } from "./post.repository.service";
import { PostEntity } from "./entities/post.entity";
import { CommentEntity } from "../comments/entities/comment.entity";
import { PostCommentRepositoryService } from "./post.comments.repository.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostEntity, CommentEntity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepositoryService,
    PostCommentRepositoryService,
    PostManagementService,
  ],
})
export class PostModule {}
