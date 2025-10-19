import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  // Req,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import {
  getProductSellerDto,
  getSingleProductSellerDto,
} from "./dto/store.dto";
import { UpProductDto } from "src/products/dto/product.dto";
import { UsersService } from "src/users/users.service";

@Controller("store")
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UsersService,
  ) {}

  @Get("get_product_seller")
  @HttpCode(200)
  async getProductSellerController(
    @Query() dto: getProductSellerDto,
    @Req() req: { cookies: { seller_token: string } },
  ) {
    try {
      const token = req.cookies.seller_token;
      const user = await this.userService.authenticationUser(token);
      const sellerId = user.userId;
      const result = await this.storeService.getProductSellerService(
        dto,
        sellerId,
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  @Get("get_single_product_seller")
  @HttpCode(200)
  async getSingleProductSellerController(
    @Query() dto: getSingleProductSellerDto,
    @Req() req: { cookies: { seller_token: string } },
  ) {
    try {
      const token = req.cookies.seller_token;
      const user = await this.userService.authenticationUser(token);

      return await this.storeService.getSingleProductSellerService(
        dto,
        user.userId,
      );
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  @Post("up_new_product")
  @HttpCode(HttpStatus.CREATED)
  async upNewProductToStore(
    @Body() dto: UpProductDto,
    @Req() req: { cookies: { seller_token: string } }, //    @Req() req: { cookies: { user_token: string } },
  ) {
    const token = req.cookies.seller_token;
    const user = await this.userService.authenticationUser(token);
    const sellerId = user.userId;
    const storeId = user.userStore;
    if (!storeId) {
      throw new BadRequestException("Authentication not response storeId!");
    }
    return this.storeService.upNewProduct(dto, sellerId, storeId);
  }
  @Get("test")
  test() {
    return "hello";
  }
}
