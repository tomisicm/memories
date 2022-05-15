import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { CommentEntity } from "../../comments/entities/comment.entity";
import { UserEntity } from "../../user/entities/user.entity";

export enum Status {
  Private = "private",
  Public = "public",
}

@Entity("posts")
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "64" })
  title: string;

  @Column({ type: "varchar", length: "255" })
  body: string;

  @Column({ type: "enum", enum: Status, default: Status.Public })
  status: Status;

  @Column({ type: "varchar" })
  authorId: string;

  @ManyToOne(
    () => UserEntity,
    (author: Omit<UserEntity, "password" | "salt">) => author.posts
  )
  author?: Omit<UserEntity, "password" | "salt">;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post)
  comments?: CommentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
