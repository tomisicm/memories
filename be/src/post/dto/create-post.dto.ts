import { IsString, MinLength, MaxLength, IsEnum, IsIn } from "class-validator";

import { Status } from "../entities/post.entity";

export interface ICreatePostDto {
  title: string;
  body: string;
  status: Status;
}

export class CreatePostDto implements ICreatePostDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  body: string;

  @IsEnum(Status)
  @IsIn([Status.Private, Status.Public])
  status: Status;
}
