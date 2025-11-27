import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * dto of register action request
 */
export class UserRegisterRequestDto {
  @IsString()
  firtname: string;
  @IsString()
  lastname: string;
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  @IsOptional()
  avatar: string | null;
  constructor(partial: Partial<UserRegisterRequestDto>) {
    Object.assign(this, partial);
  }
}
