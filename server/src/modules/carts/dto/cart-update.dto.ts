import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Update quantity of attribute
 */
export class UpdateUserCartDto {
  @IsString()
  cartId: string;
  @IsOptional()
  @IsNumber()
  newQuantity?: number;
  @IsOptional()
  @IsArray()
  @Type(() => UpdateUserCartAttrDto)
  newAttributes?: UpdateUserCartAttrDto[];
}

class UpdateUserCartAttrDto {
  @IsString()
  _id: string;
  @IsString()
  attrName: string;
  @IsString()
  itemValue: string;
}
