import { Status } from "../entities/post.entity";

export interface UpdatePostDto {
  title: string;
  body: string;
  status: Status;
}
