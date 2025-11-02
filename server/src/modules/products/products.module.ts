import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./models/product.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity } from"@/modules/seller/entity/store.entity";
import { UserEntity } from"@/modules/users/entity/user.entity";
import { UsersModule } from"@/modules/users/users.module";

@Module({
  imports: [
    UsersModule,
    //typeorm
    TypeOrmModule.forFeature([StoreEntity, UserEntity]),
    //mongoodb
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
