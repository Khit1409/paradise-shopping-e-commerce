import { ProductController } from '@/controller/product.controller';
import { ProductSchema } from '@/infrastructure/database/mongoodb/product.schema';
import { StoreOrmEntity } from '@/infrastructure/database/sql-server/store.entity';
import { ProductMongooRepository } from '@/modules/domain/repositories/product.repository';
import { ProductService } from '@/services/product.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAIModule } from './OpenAI.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreOrmEntity]),
    MongooseModule.forFeature([
      { name: 'ProductModel', schema: ProductSchema },
    ]),
    //other module
    OpenAIModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductMongooRepository],
  exports: [MongooseModule, ProductService, ProductMongooRepository],
})
export class ProductModule {}
