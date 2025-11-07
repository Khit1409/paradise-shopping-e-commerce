import { AuthController } from '@/controllers/auth.controller';
import { DatabaseModule } from '@/modules/database.module';
import { UserInformationSchema } from '@/infrastructure/database/mongoose/schemas/user-info.schema';
import { UserOrmEntity } from '@/infrastructure/database/typeorm/entities/user.sql.entity';
import { AuthService } from '@/services/auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import mongoose from 'mongoose';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: 'userInformations',
        schema: UserInformationSchema as mongoose.Schema,
        collection: 'user_informations',
      },
    ]),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
