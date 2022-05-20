import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsIn,
  IsUUID,
  IsOptional,
} from "class-validator";

import { Status } from "../../entities/comment.entity";

export interface ICreateCommentDto {
  body: string;
  status?: Status;
  postId: string;
}

export class CreateCommentDto implements ICreateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  body: string;

  @IsOptional()
  @IsEnum(Status)
  @IsIn([Status.PUBLIC])
  status: Status;

  @IsString()
  @IsUUID()
  postId: string;
}
