import { OrderController } from '@/controller/order.controller';
import { OrderVaritantSchema } from '@/infrastructure/database/mongoodb/order-attribute.schema';
import { OrderContactOrmEntity } from '@/infrastructure/database/sql-server/order-contact.entity';
import { OrderItemOrmEntity } from '@/infrastructure/database/sql-server/order-item.entity';
import { OrderOrmEntity } from '@/infrastructure/database/sql-server/order.entity';
import { OrderService } from '@/services/order.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment.module';
import { ProductSchema } from '@/infrastructure/database/mongoodb/product.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from '../modules/database.module';
import { NotificationModule } from './notification.module';
import { NotificationSchema } from '@/infrastructure/database/mongoodb/notification.schema';

@Module({
  imports: [
    forwardRef(() => PaymentModule),
    TypeOrmModule.forFeature([
      OrderItemOrmEntity,
      OrderOrmEntity,
      OrderContactOrmEntity,
    ]),
    MongooseModule.forFeature([
      { name: 'OrderVaritantModel', schema: OrderVaritantSchema },
      { name: 'ProductModel', schema: ProductSchema },
      { name: 'Notification', schema: NotificationSchema },
    ]),
    MailerModule,
    NotificationModule,
    DatabaseModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
