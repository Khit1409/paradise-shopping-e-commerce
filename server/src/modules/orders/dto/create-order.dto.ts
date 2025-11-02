import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateOrderItemsDto {
  @IsString()
  orderImg: string;
  @IsString()
  proId: string;
  @IsString()
  orderName: string;
  @IsNumber()
  totalPrice: number;
  @IsString()
  kindOfPay: "COD" | "ONLINE";
  @IsString()
  kindOfShip: "COD" | "FLASH";
  @IsNumber()
  quantity: number;
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
export class CreateOrderAttribute {
  @IsString()
  attributeName: string;
  @IsString()
  attributeValue: string;
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
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderAttribute)
  attribute: CreateOrderAttribute[];
}
