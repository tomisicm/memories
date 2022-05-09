import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
  public author: Omit<UserEntity, "password" | "salt">;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
