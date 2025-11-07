/**
 * Type of Jwt auth gruad user data
 */
export interface JwtAuthGuardUserDataType {
  id: string;
  firtname: string;
  lastname: string;
  fullname: string;
  phone: string;
  email: string;
  role: 'user' | 'seller';
  store_id: string;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
}
/**
 * Type of request in Jwt auth guard
 */
export interface JwtAuthGuardRequestType {
  user?: JwtAuthGuardUserDataType;
  role?: string;
  token?: string;
  path: string;
  cookies: {
    seller_token?: string;
    user_token?: string;
  };
}
