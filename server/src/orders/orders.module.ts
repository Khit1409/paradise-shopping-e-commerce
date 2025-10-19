import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  OrderItems,
  OrderPersonContacts,
  Orders,
} from "./entities/order.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "src/products/models/product.model";
import { UserEntity } from "src/users/entity/user.entity";
import { StoreEntity } from "src/store/entity/store.entity";
import { UsersModule } from "src/users/users.module";
import { PaymentsModule } from "src/payments/payments.module";

@Module({
  imports: [
    //module
    UsersModule,
    MongooseModule.forFeature([
      {
        name: "Product",
        schema: ProductSchema,
      },
    ]),
    forwardRef(() => PaymentsModule),
    //typeorm
    TypeOrmModule.forFeature([
      Orders,
      OrderItems,
      OrderPersonContacts,
      UserEntity,
      StoreEntity,
    ]),
    //mongoose
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
