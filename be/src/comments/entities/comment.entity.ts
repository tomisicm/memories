import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "../../user/entities/user.entity";
import { PostEntity } from "../../post/entities/post.entity";

export enum Status {
  PUBLIC = "public",
  PENDING_PUBLIC = "pending_acceptance",
  PENDING_DELETION = "pending_deletion",
  DELETED = "deleted",
}

@Entity("comments")
export class CommentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "255" })
  body: string;

  @Column({ type: "varchar" })
  authorId: string;

  @Column({ type: "varchar" })
  postId: string;

  @Column({ type: "enum", enum: Status, default: Status.PUBLIC })
  status: Status;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments)
  public post?: PostEntity;

  @ManyToOne(
    () => UserEntity,
    (author: Omit<UserEntity, "password" | "salt">) => author.posts
  )
  public author?: Omit<UserEntity, "password" | "salt">;
}
