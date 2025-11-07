import { UserLoginResponseDto } from '../dto/user/response-dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  login: (email: string, password: string) => Promise<UserLoginResponseDto>;
  getInfor: (id: string) => Promise<User>;
  createNew: (data: User) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
