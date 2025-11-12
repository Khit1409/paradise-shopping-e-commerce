import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from '@/services/payments.service';
import { PaymentController } from '@/controller/payment.controller';
import { OrderModule } from './order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderVaritantSchema } from '@/infrastructure/database/mongoodb/order-attribute.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from '@/infrastructure/database/sql-server/order.entity';
import { OrderContactOrmEntity } from '@/infrastructure/database/sql-server/order-contact.entity';
import { OrderItemOrmEntity } from '@/infrastructure/database/sql-server/order-item.entity';
import { PayOsProvider } from '@/config/payos/payos.config';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    MongooseModule.forFeature([
      { name: 'OrderVaritantModel', schema: OrderVaritantSchema },
    ]),
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      OrderItemOrmEntity,
      OrderContactOrmEntity,
    ]),
  ],
  controllers: [PaymentController],
  providers: [PayOsProvider, PaymentService],
  exports: ['PAYOS_CLIENT', PaymentService],
})
export class PaymentModule {}
