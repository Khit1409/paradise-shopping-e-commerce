import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateOrderItemsDto {
  @IsString()
  proId: string;
  @IsString()
  orderName: string;
  @IsString()
  orderStatus:
    | "PENDING"
    | "ACCEPTED"
    | "SHIPPING"
    | "RECEIVED"
    | "SHIPPINGFAILED";
  @IsNumber()
  totalPrice: number;
  @IsString()
  kindOfPay: "COD" | "ONLINE";
  @IsString()
  kindOfShip: "COD" | "FLASH";
  @IsNumber()
  quantity: number;
  @IsString()
  payStatus: "PAID" | "UNPAID";
}

export class CreateOrderContactDto {
  @IsString()
  userName: string;
  @IsString()
  address: string;
  @IsString()
  phone: string;
  @IsString()
  email: string;
}

export class CreateOrderDto {
  @IsString()
  storeId: string;
  @ValidateNested()
  @Type(() => CreateOrderItemsDto)
  item: CreateOrderItemsDto;
  @ValidateNested()
  @Type(() => CreateOrderContactDto)
  contact: CreateOrderContactDto;
}
