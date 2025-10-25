import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import {
  UserAddressSchema,
  userEmailSchema,
  userPhoneSchema,
} from "src/users/model/user.model";

@Module({
  imports: [
    //Entity
    TypeOrmModule.forFeature([UserEntity]),
    //jwt module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
    }),
    //mongoodb module
    MongooseModule.forFeature([
      { name: "userAddress", schema: UserAddressSchema },
      { name: "userPhone", schema: userPhoneSchema },
      { name: "userEmail", schema: userEmailSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
