import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { SellerController } from './controller/seller.controller';
import { ProductModule } from './product.module';
import { OrderModule } from './order.module';

@Module({
  imports: [DatabaseModule, ProductModule, OrderModule],
  controllers: [SellerController],
  providers: [],
  exports: [],
})
export class SellerModule {
  constructor() {}
}
