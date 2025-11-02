import { IsEmail, IsOptional, IsString, Length } from "class-validator";
export class RegisterDto {
  @IsString()
  @Length(10, 200)
  firtname: string;
  @Length(10, 200)
  lastname: string;
  @IsString()
  @Length(16, 200)
  password: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(20)
  phone: string;
  @IsOptional()
  @IsString()
  avatar?: string;
}
