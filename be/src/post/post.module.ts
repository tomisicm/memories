import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { AuthModule } from "../auth/auth.module";
import { PostEntity } from "./entities/post.entity";
import { PassportModule } from "@nestjs/passport";
import { PostManagementService } from "./post.management.service";
import { PostRepositoryService } from "./post.repository.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostEntity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepositoryService, PostManagementService],
})
export class PostModule {}
