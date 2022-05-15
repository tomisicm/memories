import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsIn,
  IsOptional,
} from "class-validator";

import { Status } from "../../entities/comment.entity";

export interface IUpdateCommentDto {
  body?: string;
  status?: Status;
}

export class UpdateCommentDto implements IUpdateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  body: string;

  @IsOptional()
  @IsEnum(Status)
  @IsIn([Status.PUBLIC, Status.PENDING_DELETION])
  status?: Status;
}
