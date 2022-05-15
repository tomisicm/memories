import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import type { transport } from "winston";

import { AuthModule } from "./auth/auth.module";
import { CommentModule } from "./comments/comments.module";
import { PostModule } from "./post/post.module";
import { configureTypeORM } from "./utils/config-type-orm";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env.development"],
    }),
    configureTypeORM(),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        // TODO:
        // const transports: transport[] = [backendConsoleTransport];
        const transports: transport[] = [];
        return {
          transports,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    PostModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
