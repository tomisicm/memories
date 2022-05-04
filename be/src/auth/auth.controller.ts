import {
  Controller,
  Body,
  UseGuards,
  ValidationPipe,
  Post,
  HttpStatus,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { SignInUserDto, CreateUserDto } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Successfully registered",
  })
  @Post("/signup")
  async signUp(@Body(ValidationPipe) authCredentialsDto: CreateUserDto) {
    return await this.authService.signUp(authCredentialsDto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Successfully signed in",
  })
  @Post("/signin")
  // @UseGuards(LocalAuthGuard)
  async signIn(@Body(ValidationPipe) authCredentialsDto: SignInUserDto) {
    return await this.authService.signIn(authCredentialsDto);
  }
}
