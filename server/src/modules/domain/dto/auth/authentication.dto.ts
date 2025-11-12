/**
 * token payload in login
 */
export class JwtPayloadDto {
  id: string;
  firtname: string;
  fullname: string;
  lastname: string;
  role: 'user' | 'seller';
  phone: string[];
  email: string[];
  address: string[];
  store_id: string | null;
  avatar: string | null;
  created_at: Date;
  constructor(partial: Partial<JwtPayloadDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of payload decoded
 */
export class JwtVerifyDto {
  id: string;
  firtname: string;
  fullname: string;
  lastname: string;
  role: 'user' | 'seller';
  phone: string[];
  email: string[];
  address: string[];
  store_id: string | null;
  avatar: string | null;
  created_at: Date;
  constructor(partial: Partial<JwtVerifyDto>) {
    Object.assign(this, partial);
  }
}
/**
 * Login dto
 */
export class LoginDto {
  email: string;
  password: string;
  role: 'user' | 'seller';
  constructor(partial: Partial<LoginDto>) {
    Object.assign(this, partial);
  }
}
