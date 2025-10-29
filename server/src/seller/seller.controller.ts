import { Controller } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/models/product.model";

@Controller("seller")
export class SellerController {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>,
    private readonly sellerService: SellerService
  ) {}
}
