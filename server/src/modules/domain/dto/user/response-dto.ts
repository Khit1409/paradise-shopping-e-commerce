/**
 * dto of user information when verify token and response by controller: authentication
 */
export class AuthenticatedUserReponseDto {
  id: string;
  firtname: string;
  lastname: string;
  fullname: string;
  role: 'user' | 'seller';
  store_id: string;
  avatar: string | null;
  address: string[]; //from mongoose
  phone: string[]; //from mongoose
  email: string[]; //from mongoose
  created_at: Date;
  constructor(partial: Partial<AuthenticatedUserReponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * user information dto
 */
export class UserInformationResponseDto {
  address: string[];
  phone: string[];
  email: string[];
  constructor(partial: Partial<UserInformationResponseDto>) {
    Object.assign(this, partial);
  }
}
