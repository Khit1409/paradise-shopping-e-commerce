export class UserLoginResponseDto {
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
