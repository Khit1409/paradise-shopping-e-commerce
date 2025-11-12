import { Module } from '@nestjs/common';
import { AuthRepository } from '@/modules/domain/repositories/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '@/infrastructure/database/sql-server/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '@/infrastructure/database/mongoodb/product.schema';
import { ProductMongooRepository } from '@/modules/domain/repositories/produc.repository';
import {
  StoreBankingEntity,
  StoreOrmEntity,
} from '@/infrastructure/database/sql-server/store.entity';
import { CartMongooRepository } from '@/modules/domain/repositories/cart.repository';
import { OrderSqlRepository } from '@/modules/domain/repositories/order.repository';
import { OrderOrmEntity } from '@/infrastructure/database/sql-server/order.entity';
import { OrderItemOrmEntity } from '@/infrastructure/database/sql-server/order-item.entity';
import { OrderContactOrmEntity } from '@/infrastructure/database/sql-server/order-contact.entity';
import { OrderVaritantSchema } from '@/infrastructure/database/mongoodb/order-attribute.schema';
import { CartSchema } from '@/infrastructure/database/mongoodb/cart.schema';
import { PaymentService } from '@/services/payments.service';
import { PayOsProvider } from '@/config/payos/payos.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserInformationSchema } from '@/infrastructure/database/mongoodb/user-info.schema';
import { OpenAIModule } from './OpenAI.module';

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
      { name: 'UserInformations', schema: UserInformationSchema },
    ]),
    OpenAIModule,
  ],

  controllers: [],
  providers: [
    PayOsProvider,
    AuthRepository,
    ProductMongooRepository,
    CartMongooRepository,
    OrderSqlRepository,
    OrderContactOrmEntity,
    PaymentService,
  ],
  exports: [
    AuthRepository,
    ProductMongooRepository,
    CartMongooRepository,
    OrderSqlRepository,
  ],
})
export class DatabaseModule {}
