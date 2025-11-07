import { IUserRepository } from '@/domains/repositories/user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/domains/entities/user.entity';
import { UserOrmEntity } from '../entities/user.sql.entity';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class UserSqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private repo: Repository<UserOrmEntity>,
  ) {}
  /**
   * Login responsitory
   * @param data
   * @returns
   */
  async login(email: string, password: string): Promise<User> {
    try {
      if (!email || !password) {
        throw new BadRequestException('email or password is isvalid value!');
      }
      const user = await this.repo.findOne({
        where: { emailAddress: email },
      });
      if (!user) {
        throw new BadRequestException('user is not define');
      }
      const matchPass = await bcrypt.compare(password, user.passwordHashed);
      if (!matchPass) {
        throw new BadRequestException('password not matching!');
      }
      const {
        avatarUrl,
        createdAt,
        emailAddress,
        firtName,
        fullName,
        lastName,
        passwordHashed,
        phoneNumber,
        updatedAt,
        userId,
        userRole,
        userStore,
      } = user;
      return new User({
        id: userId,
        avatar: avatarUrl,
        created_at: createdAt,
        email: emailAddress,
        firtname: firtName,
        fullname: fullName,
        lastname: lastName,
        password: passwordHashed,
        phone: phoneNumber,
        role: userRole,
        store_id: userStore,
        updated_at: updatedAt,
      });
    } catch (error) {
      console.log('repositorye handle error:', error);
      throw new UnauthorizedException(`${error}!`);
    }
  }
  createNew: (data: User) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getInfor: (id: string) => Promise<User>;
}
