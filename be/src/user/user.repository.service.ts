import { ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import VError from "verror";

// TODO:
// import * as bcrypt from 'bcryptjs'

import { UserRepository } from "./user.repository";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/auth-credentials.dto";
import { PostgresErrorCode } from "./errors/error.constraint";

export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository
  ) {}

  async create(authCredentialsDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { username, email, password } = authCredentialsDto;
      const salt = await this.getSalt();
      const passwordHash = await this.hashPassword(password, salt);

      const user = await this.userRepository.save({
        username,
        email,
        salt: salt,
        password: passwordHash,
      });

      return user;
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException(
          "User entity with these credentials has already exists."
        );
      } else {
        throw new VError(
          {
            cause: err as Error,
            info: {
              username: authCredentialsDto.username,
              email: authCredentialsDto.email,
            },
          },
          "An error occurred creating user"
        );
      }
    }
  }

  async findOneOrFail(username: string): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({ where: { username } });
  }

  async validateUserPassword({
    userPasswordHash,
    incomingPassword,
  }: {
    userPasswordHash: string;
    incomingPassword: string;
  }): Promise<boolean> {
    const salt = await this.getSalt();

    const incomingPasswordHash = await this.hashPassword(
      incomingPassword,
      salt
    );

    return userPasswordHash === incomingPasswordHash;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    // return await bcrypt.hash(password, salt)
    return password;
  }

  private async getSalt(): Promise<string> {
    // return await bcrypt.genSalt()
    return "secret_salt";
  }
}
