import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
/**
 * login dto
 */
export class LoginDto {
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  @IsIn(['seller', 'user'])
  role: 'seller' | 'user';
  @IsEmail()
  email: string;

  constructor(partial: Partial<LoginDto>) {
    Object.assign(this, partial);
  }
}
