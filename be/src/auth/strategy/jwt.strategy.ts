import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { JwtPayload } from "../types/auth-payload.interface";
import { UserRepositoryService } from "../../user/user.repository.service";
import { UserEntity } from "../../user/entities/user.entity";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly configService: ConfigService
  ) {
    // TODO: this.configService.get or configService.get?
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
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
