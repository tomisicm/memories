import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserRepositoryService } from "../../user/user.repository.service";
import { UserEntity } from "../../user/entities/user.entity";
import { JwtPayload } from "../types/auth-payload.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepositoryService: UserRepositoryService) {
    super();
  }

  async validate({
    username,
  }: JwtPayload): Promise<Omit<UserEntity, "password" | "salt">> {
    let user: UserEntity;

    try {
      user = await this.userRepositoryService.findOneOrFail(username);
    } catch (e) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    if (!user) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    delete user.password;
    delete user.salt;

    return user;
  }
}
