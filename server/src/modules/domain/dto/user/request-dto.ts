/**
 * dto of register action request
 */
export class UserRegisterRequestDto {
  firtname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  avatar: string | null;
  constructor(partial: Partial<UserRegisterRequestDto>) {
    Object.assign(this, partial);
  }
}
