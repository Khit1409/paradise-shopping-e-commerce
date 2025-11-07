import { CartController } from '@/controllers/cart.controller';
import { CartMongooRepository } from '@/infrastructure/database/mongoose/repositories/cart.mongoo.repository';
import { CartSchema } from '@/infrastructure/database/mongoose/schemas/cart.schema';
import { ProductSchema } from '@/infrastructure/database/mongoose/schemas/product.schema';
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
