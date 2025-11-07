import { ProductController } from '@/controllers/product.controller';
import { ProductMongooRepository } from '@/infrastructure/database/mongoose/repositories/product.mongoo.repository';
import { ProductSchema } from '@/infrastructure/database/mongoose/schemas/product.schema';
import { StoreOrmEntity } from '@/infrastructure/database/typeorm/entities/store.sql.entity';
import { ProductService } from '@/services/product.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreOrmEntity]),
    MongooseModule.forFeature([
      { name: 'ProductModel', schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductMongooRepository],
  exports: [MongooseModule, ProductService, ProductMongooRepository],
})
export class ProductModule {}
