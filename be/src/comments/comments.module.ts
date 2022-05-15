import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import { AuthModule } from "../auth/auth.module";
import { CommentService } from "./comment.service";
import { CommentRepositoryService } from "./comment.repository.service";
import { PostRepositoryService } from "src/post/post.repository.service";
import { CommentController } from "./comment.controller";
import { CommentEntity } from "./entities/comment.entity";
import { PostEntity } from "../post/entities/post.entity";
import { UserEntity } from "../user/entities/user.entity";
import { CommentManagementService } from "./comment.management.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CommentEntity, PostEntity, UserEntity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepositoryService,
    CommentManagementService,
    PostRepositoryService,
  ],
})
export class CommentModule {}
