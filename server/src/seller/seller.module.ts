import { Module } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { SellerController } from "./seller.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "src/products/models/product.model";
import { StoreModule } from "src/store/store.module";
import { ProductsModule } from "src/products/products.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
    StoreModule,
    ProductsModule,
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
