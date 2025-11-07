import { Module } from '@nestjs/common';
import { UserSqlRepository } from '../infrastructure/database/typeorm/repositories/user.sql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../infrastructure/database/typeorm/entities/user.sql.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../infrastructure/database/mongoose/schemas/product.schema';
import { ProductMongooRepository } from '../infrastructure/database/mongoose/repositories/product.mongoo.repository';
import {
  StoreBankingEntity,
  StoreOrmEntity,
} from '@/infrastructure/database/typeorm/entities/store.sql.entity';
import { CartMongooRepository } from '../infrastructure/database/mongoose/repositories/cart.mongoo.repository';
import { OrderSqlRepository } from '../infrastructure/database/typeorm/repositories/order.sql.repository';
import { OrderOrmEntity } from '../infrastructure/database/typeorm/entities/order.sql.entity';
import { OrderItemOrmEntity } from '../infrastructure/database/typeorm/entities/order-item.sql.entity';
import { OrderContactOrmEntity } from '../infrastructure/database/typeorm/entities/order-contact.sql.entity';
import { OrderVaritantSchema } from '../infrastructure/database/mongoose/schemas/order-attribute.schema';
import { CartSchema } from '@/infrastructure/database/mongoose/schemas/cart.schema';
import { PaymentService } from '@/services/payments.service';
import { PayOsProvider } from '@/configs/payos/payos.config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule,
    TypeOrmModule.forFeature([
      UserOrmEntity,
      StoreOrmEntity,
      StoreBankingEntity,
      OrderOrmEntity,
      OrderItemOrmEntity,
      OrderContactOrmEntity,
    ]),
    MongooseModule.forFeature([
      {
        name: 'ProductModel',
        schema: ProductSchema,
      },
      { name: 'OrderVaritantModel', schema: OrderVaritantSchema },
      { name: 'CartModel', schema: CartSchema },
    ]),
  ],
  controllers: [],
  providers: [
    PayOsProvider,
    UserSqlRepository,
    ProductMongooRepository,
    CartMongooRepository,
    OrderSqlRepository,
    OrderContactOrmEntity,
    PaymentService,
  ],
  exports: [
    UserSqlRepository,
    ProductMongooRepository,
    CartMongooRepository,
    OrderSqlRepository,
  ],
})
export class DatabaseModule {}
