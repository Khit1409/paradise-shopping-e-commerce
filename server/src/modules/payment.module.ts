import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from '@/services/payments.service';
import { PaymentController } from '@/controllers/payment.controller';
import { OrderModule } from './order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderVaritantSchema } from '@/infrastructure/database/mongoose/schemas/order-attribute.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from '@/infrastructure/database/typeorm/entities/order.sql.entity';
import { OrderContactOrmEntity } from '@/infrastructure/database/typeorm/entities/order-contact.sql.entity';
import { OrderItemOrmEntity } from '@/infrastructure/database/typeorm/entities/order-item.sql.entity';
import { PayOsProvider } from '@/configs/payos/payos.config';

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
