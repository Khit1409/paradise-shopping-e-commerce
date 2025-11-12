import {
  JwtPayloadDto,
  LoginDto,
} from '@/modules/domain/dto/auth/authentication.dto';
import { UserRegisterRequestDto } from '@/modules/domain/dto/user/request-dto';
import { UserInformationResponseDto } from '@/modules/domain/dto/user/response-dto';
import { GeneralHandleResponse } from './general.interface';

/**
 * result of login function
 */
export interface IAuthRepository {
  /**
   * login follow role from body of request
   * send cookie and respose result for client handle
   * @param dto
   * @returns
   */
  login: (dto: LoginDto) => Promise<JwtPayloadDto>;
  /**
   * register new account for use login in website
   * @param dto
   * @returns
   */
  register: (dto: UserRegisterRequestDto) => Promise<GeneralHandleResponse>;
  /**
   * get information after success checking password and email in login
   * handle.
   * @param id
   * @returns
   */
  getInfo: (id: string) => Promise<UserInformationResponseDto>;
}
