import { CartController } from '@/controller/cart.controller';
import { CartSchema } from '@/infrastructure/database/mongoodb/cart.schema';
import { ProductSchema } from '@/infrastructure/database/mongoodb/product.schema';
import { CartMongooRepository } from '@/modules/domain/repositories/cart.repository';
import { CartService } from '@/services/cart.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CartModel', schema: CartSchema },
      { name: 'ProductModel', schema: ProductSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, CartMongooRepository],
  exports: [MongooseModule, CartService],
})
export class CartModule {}
