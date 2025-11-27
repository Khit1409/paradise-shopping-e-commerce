import { AuthRepository } from '@/modules/domain/repositories/auth.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../domain/dto/auth/authentication.dto';
import { UserRegisterRequestDto } from '../domain/dto/user/request-dto';
import { JwtAuthGuardRequest } from '@/types/auth/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Authentication user information and response to client
   * @param req
   * @param role_param
   */
  authentication(req: JwtAuthGuardRequest, role_param: 'user' | 'seller') {
    try {
      const { role } = req.user;
      if (role_param === 'seller' && role === 'user') return null;
      return req.user;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * login service => using auth repository name is login.
   * Get result and create token => return for controller send to cookie
   * @param dto
   * @returns
   */
  async login(dto: LoginDto) {
    const user = await this.authRepo.login(dto);
    const token = this.jwt.sign(
      { ...user },
      {
        privateKey: process.env.JWT_SECRET,
        expiresIn: '7d',
      },
    );
    return token;
  }
  /**
   * register new account
   * @param dto
   * @returns
   */
  async register(dto: UserRegisterRequestDto) {
    const result = await this.authRepo.register(dto);
    return result;
  }
}
