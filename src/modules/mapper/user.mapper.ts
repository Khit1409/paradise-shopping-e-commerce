import { UserRegisterRequest } from '@/types/user/user.type';
import { UserRegisterRequestDto } from '../domain/dto/user/request-dto';

export class UserMapper {
  constructor() {}
  /**
   * Format register dto before using handle logic code
   * @param req
   * @returns
   */
  static formatRegisterRequest(
    req: UserRegisterRequest,
  ): UserRegisterRequestDto {
    return new UserRegisterRequestDto({
      firtname: req.firtname,
      lastname: req.lastname,
      email: req.email,
      password: req.password,
      avatar: req.avatar,
    });
  }
}
