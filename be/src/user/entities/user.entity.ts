import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";

import { PostEntity } from "../../post/entities/post.entity";

@Unique(["username", "email"])
@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "32", unique: true })
  username: string;

  @Column({ type: "varchar", length: "64", unique: true })
  email: string;

  @Column({ type: "varchar", length: "64", select: false })
  salt: string;

  @Column({ type: "varchar", length: "64", select: false })
  password: string;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  public posts?: PostEntity[];
}
