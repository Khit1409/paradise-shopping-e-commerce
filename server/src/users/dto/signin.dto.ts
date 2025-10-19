import { IsEmail, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: "user" | "seller";
}
