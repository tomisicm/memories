import { IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class SignInUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  @MinLength(6)
  @MaxLength(64)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
