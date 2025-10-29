import { Module } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { SellerController } from "./seller.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "src/products/models/product.model";
import { ProductsModule } from "src/products/products.module";
import { SellerProductController } from "./products/seller.product.controller";
import { sellerProductService } from "./products/seller.product.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
    ProductsModule,
  ],
  controllers: [SellerController, SellerProductController],
  providers: [SellerService, sellerProductService],
})
export class SellerModule {}
