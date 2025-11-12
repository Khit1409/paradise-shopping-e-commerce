import { JwtPayloadDto } from '@/modules/domain/dto/auth/authentication.dto';
import { UserInformationResponseDto } from '@/modules/domain/dto/user/response-dto';

export interface IUserRepository {
  login: (email: string, password: string) => Promise<JwtPayloadDto>;
  getInfor: (id: string) => Promise<UserInformationResponseDto>;
  // createNew: (dto: UserRegisterRequestDto) => Promise<void>;
  // delete: (id: string) => Promise<void>;
}
