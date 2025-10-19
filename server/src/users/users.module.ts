import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "src/cloudinaray/cloudinary.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { StoreEntity } from "src/store/entity/store.entity";
import {
  UserAddressSchema,
  userEmailSchema,
  userPhoneSchema,
} from "./model/user.model";

@Module({
  imports: [
    //sql server module
    TypeOrmModule.forFeature([UserEntity, StoreEntity]),
    //mongoodb module
    MongooseModule.forFeature([
      { name: "userAddress", schema: UserAddressSchema },
      { name: "userPhone", schema: userPhoneSchema },
      { name: "userEmail", schema: userEmailSchema },
    ]),
    //jwt module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
    }),
    //
    CloudinaryModule,
  ],
  //
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
