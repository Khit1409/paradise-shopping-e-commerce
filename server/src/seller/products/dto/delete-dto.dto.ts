import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class DeleteImageDetail {
  @IsString()
  _id: string;
}
export class DeleteAttribute {
  @IsString()
  _id: string;
}
export class DeleteAttributeItem {
  @IsString()
  attrId: string;
  @IsString()
  _id: string;
}

export class DeleteProductPartDto{
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
