import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

/**
 * delete type of request from client
 */
export class DeleteActionSingleProductDto {
  @IsOptional()
  @IsString()
  proId?: string;
  @IsOptional()
  @IsArray()
  @Type(() => DeleteImageDetail)
  imgDetail?: DeleteImageDetail[];
  @IsOptional()
  @IsArray()
  @Type(() => DeleteAttribute)
  attribute?: DeleteAttribute[];
  @IsOptional()
  @IsArray()
  @Type(() => DeleteAttributeItem)
  attributeItem?: DeleteAttributeItem[];
}
/**
 * part type of delete image detal
 */
export class DeleteImageDetail {
  @IsString()
  _id: string;
}
/**
 * part type of delete attribute
 */
export class DeleteAttribute {
  @IsString()
  _id: string;
}
/**
 * part type of delete attribute item
 */
export class DeleteAttributeItem {
  @IsString()
  attrId: string;
  @IsString()
  _id: string;
}
