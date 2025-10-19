import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Types } from "mongoose";

/**
 * create new store by seller
 */
export class CreateStoreDto {
  @IsString()
  @Length(5, 200)
  store_name: string;
  @IsString()
  @Length(5, 200)
  store_area_slug: string;
  @IsString()
  @Length(5, 200)
  store_area: string;
  @IsString()
  @Length(5, 200)
  @IsString()
  @Length(16, 200)
  store_password: string;
  @IsEmail()
  store_email: string;
  @IsString()
  @Length(20)
  store_phone: string;
  @IsString()
  @Length(50, 300)
  store_address: string;
  @IsString()
  owner_id: string;
}
/**
 * get all product in store
 */
/**
 * get product for manager
 */
export class getProductSellerDto {
  @IsOptional()
  @IsString()
  cate_id?: string | Types.ObjectId;
  @IsOptional()
  @IsString()
  cate_slug?: string;
}
/**
 * get single product for update
 */
export class getSingleProductSellerDto {
  @IsNumber()
  store_id: number;
  @IsString()
  product_id: string;
}
