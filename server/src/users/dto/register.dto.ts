import { IsEmail, IsOptional, IsString, Length } from "class-validator";
export class RegisterDto {
  @IsString()
  @Length(10, 200)
  user_firtname: string;
  @Length(10, 200)
  user_lastname: string;
  @IsString()
  @Length(16, 200)
  user_password: string;
  @IsString()
  @Length(4, 6)
  user_role: "seller" | "user";
  @IsEmail()
  user_email: string;
  @IsString()
  @Length(20)
  user_phone: string;
  @IsOptional()
  @IsString()
  user_avatar?: string;
  @IsOptional()
  user_address?: string;
}
