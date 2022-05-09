import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserEntity } from "../user/entities/user.entity";
import { CreateUserDto, SignInUserDto } from "./dto/auth-credentials.dto";
import { UserRepositoryService } from "../user/user.repository.service";
import { JwtPayload } from "./types/auth-payload.interface";
import { IUserIdentity } from "src/user/types/user.type";

@Injectable()
export class AuthService {
  constructor(
    private userRepositorySerice: UserRepositoryService,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<IUserIdentity> {
    const user = await this.userRepositorySerice.create(createUserDto);

    const selectedUserProps: IUserIdentity = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return selectedUserProps;
  }

  async signIn(
    authCredentialsDto: SignInUserDto
  ): Promise<{ accessToken: string }> {
    let user: UserEntity;
    const { username, password } = authCredentialsDto;

    try {
      user = await this.userRepositorySerice.findOneOrFail(username);
    } catch (e) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const isValid = await this.userRepositorySerice.validateUserPassword({
      userPasswordHash: user.password,
      incomingPassword: password,
    });

    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
