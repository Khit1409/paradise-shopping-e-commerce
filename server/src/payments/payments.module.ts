import { forwardRef, Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { ConfigService } from "@nestjs/config";
import { PayOS } from "@payos/node";
import { OrdersModule } from "src/orders/orders.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/orders/entities/order.entity";
import { OrderPersonContacts } from "src/orders/entities/order-contact.entity";
import { OrderItems } from "src/orders/entities/order-item.entity";

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    TypeOrmModule.forFeature([Orders, OrderItems, OrderPersonContacts]),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: "PAYOS_CLIENT",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new PayOS({
          clientId: config.get("PAYOS_CLIENT_ID"),
          apiKey: config.get("PAYOS_API_KEY"),
          checksumKey: config.get("PAYOS_CHECKSUM_KEY"),
        });
      },
    },
  ],
  exports: ["PAYOS_CLIENT", PaymentsService],
})
export class PaymentsModule {}
