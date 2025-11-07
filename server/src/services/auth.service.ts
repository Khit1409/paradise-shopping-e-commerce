import { UserSqlRepository } from '@/infrastructure/database/typeorm/repositories/user.sql.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserSqlRepository,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepo.login(email, password);
    const token = this.jwt.sign(
      { ...user },
      {
        privateKey: process.env.JWT_SECRET,
        expiresIn: '7d',
      },
    );
    return token;
  }
}
