import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./entities/order.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from"@/modules/products/models/product.model";
import { UserEntity } from"@/modules/users/entity/user.entity";
import { UsersModule } from"@/modules/users/users.module";
import { PaymentsModule } from"@/modules/payments/payments.module";
import { EmailsModule } from"@/modules/emails/emails.module";
import { OrderItems } from "./entities/order-item.entity";
import { OrderPersonContacts } from "./entities/order-contact.entity";
import { orderAttrSchema } from "./models/order-attribute.model";
import { SellerModule } from"@/modules/seller/seller.module";
import { StoreEntity } from"@/modules/seller/entity/store.entity";

@Module({
  imports: [
    //module
    UsersModule,
    SellerModule,
    EmailsModule,
    //
    MongooseModule.forFeature([
      {
        name: "Product",
        schema: ProductSchema,
      },
      { name: "OrderAttribute", schema: orderAttrSchema },
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
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
