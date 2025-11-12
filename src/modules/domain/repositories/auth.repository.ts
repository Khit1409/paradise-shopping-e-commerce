import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserOrmEntity } from '@/infrastructure/database/sql-server/user.entity';
import { JwtPayloadDto, LoginDto } from '../dto/auth/authentication.dto';
import { UserInformationResponseDto } from '../dto/user/response-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInformationDoc } from '@/infrastructure/database/mongoodb/user-info.schema';
import { IAuthRepository } from '@/interfaces/repositories/auth.repo.interface';
import { UserRegisterRequestDto } from '../dto/user/request-dto';
import { GeneralHandleResponse } from '@/interfaces/repositories/general.interface';
/**
 * original handle database from schema or entity. using by service and using (mongoose or sql server) document
 * for query and response formated data to controller response to client
 */
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private userRepo: Repository<UserOrmEntity>,
    @InjectModel('UserInformations')
    private readonly infoModal: Model<UserInformationDoc>,
  ) {}
  /**
   * Login responsitory
   * @param data
   * @returns
   */
  async login(dto: LoginDto): Promise<JwtPayloadDto> {
    try {
      if (!dto.email || !dto.password) {
        throw new BadRequestException('email or password is isvalid value!');
      }
      const user = await this.userRepo.findOne({
        where: { emailAddress: dto.email },
      });
      if (!user) {
        throw new BadRequestException('user is not define');
      }
      const matchPass = await bcrypt.compare(dto.password, user.passwordHashed);
      if (!matchPass) {
        throw new BadRequestException('password not matching!');
      }
      const info = await this.getInfo(user.userId);
      return new JwtPayloadDto({
        id: user.userId,
        avatar: user.avatarUrl,
        created_at: user.createdAt,
        firtname: user.firtName,
        fullname: user.fullName,
        lastname: user.lastName,
        role: user.userRole,
        store_id: user.userStore ?? null,
        ...info,
      });
    } catch (error) {
      throw new UnauthorizedException(`${error}!`);
    }
  }
  /**
   * Get user information in mongoodb
   * @param id
   * @returns
   */
  getInfo: (id: string) => Promise<UserInformationResponseDto> = async (id) => {
    const info = await this.infoModal
      .findOne({ user_id: id.toLowerCase() })
      .select('-__v -user_id -_id')
      .lean();
    return new UserInformationResponseDto(info);
  };
  /**
   * register new user account.
   * @param dto
   * @retunrs
   */
  register: (dto: UserRegisterRequestDto) => Promise<GeneralHandleResponse> =
    async (dto) => {
      try {
        const existing = await this.userRepo.findOne({
          where: { emailAddress: dto.email },
        });
        if (existing) {
          return {
            error: 'is valid data',
            message: `user with email ${dto.email} is valid in database.`,
            success: false,
          };
        }
        /**
         * hash password
         */
        const hashPass = await bcrypt.hash(dto.password, 10);
        const newAccount = {
          emailAddress: dto.email,
          phoneNumber: dto.phone,
          firtName: dto.firtname,
          lastName: dto.lastname,
          fullName: `${dto.lastname} ${dto.firtname}`,
          userRole: 'user' as 'user' | 'seller',
          passwordHashed: hashPass,
          avatarUrl: dto.avatar ?? '',
        };
        const newUser = await this.userRepo.save(newAccount);
        if (!newUser) {
          return {
            message:
              'Handle save user is error, please check error in console log',
            error: 'save error',
            success: false,
          };
        }
        return {
          message: 'Success register new account',
          error: null,
          success: true,
        };
      } catch (error) {
        throw new InternalServerErrorException(`${error}`);
      }
    };
}
