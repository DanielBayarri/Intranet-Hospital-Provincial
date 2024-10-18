import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  dni: string;

  @MinLength(6)
  password: string;
}
