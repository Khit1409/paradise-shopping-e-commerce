import { OrderController } from '@/controllers/order.controller';
import { OrderVaritantSchema } from '@/infrastructure/database/mongoose/schemas/order-attribute.schema';
import { OrderContactOrmEntity } from '@/infrastructure/database/typeorm/entities/order-contact.sql.entity';
import { OrderItemOrmEntity } from '@/infrastructure/database/typeorm/entities/order-item.sql.entity';
import { OrderOrmEntity } from '@/infrastructure/database/typeorm/entities/order.sql.entity';
import { OrderService } from '@/services/order.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment.module';
import { ProductSchema } from '@/infrastructure/database/mongoose/schemas/product.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from './database.module';

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
    ]),
    MailerModule,
    DatabaseModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
