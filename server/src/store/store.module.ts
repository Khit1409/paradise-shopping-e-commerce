import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "src/products/products.module";
import { ProductSchema } from "src/products/models/product.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreBankingEntity, StoreEntity } from "./entity/store.entity";
import { UserEntity } from "src/users/entity/user.entity";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    //sql
    TypeOrmModule.forFeature([StoreEntity, StoreBankingEntity, UserEntity]),
    //jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
    }),
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
