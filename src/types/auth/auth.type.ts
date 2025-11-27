import { AuthenticatedUserReponseDto } from '@/modules/domain/dto/user/response-dto';

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
export interface JwtAuthGuardRequest {
  user?: AuthenticatedUserReponseDto;
  role?: string;
  token?: string;
  path: string;
  cookies: {
    auth_token?: string;
  };
}
/**
 * type of login request
 */
export type LoginRequest = {
  email: string;
  role: 'user' | 'seller';
  password: string;
};
