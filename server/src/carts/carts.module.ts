import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { cartSchema } from "./model/cart.model";
import { UsersModule } from "src/users/users.module";
import { ProductSchema } from "src/products/models/product.model";

@Module({
  //import
  imports: [
    //import mongoose module
    MongooseModule.forFeature([
      { name: "Cart", schema: cartSchema },
      { name: "Product", schema: ProductSchema },
    ]),
    //service
    UsersModule,
  ],
  exports: [CartsService],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
