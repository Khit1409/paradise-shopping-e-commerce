import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePhone {
  @IsString()
  _id: string;
  @IsString()
  phoneNum: string;
}
export class UpdateAddress {
  @IsString()
  _id: string;
  @IsString()
  addressName: string;
}
export class UpdateEmail {
  @IsString()
  _id: string;
  @IsString()
  emailAddress: string;
}

export class UpdateAuth {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}
export class UpdateUserAccountDto {
  @IsOptional()
  @IsString()
  firtName: string;
  @IsOptional()
  @IsString()
  avatar: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsOptional()
  @IsArray()
  @Type(() => UpdatePhone)
  phone: UpdatePhone[];
  @IsOptional()
  @IsArray()
  @Type(() => UpdateAddress)
  address: UpdateAddress[];
  @IsOptional()
  @IsArray()
  @Type(() => UpdateEmail)
  email: UpdateEmail[];
}
