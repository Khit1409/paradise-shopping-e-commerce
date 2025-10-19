import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

/**
 * create new cart
 */

export class AddToCartDto {
  @IsString()
  proId: string;
  @IsNumber()
  quantity: number;
  @IsString()
  img: string;
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsArray()
  @Type(() => CartAttribute)
  choose: CartAttribute[];
}

class CartAttribute {
  @IsString()
  attrName?: string;
  @IsString()
  itemValue?: string;
}
