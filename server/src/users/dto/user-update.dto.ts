import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

class UpdatePhone {
  @IsString()
  _id: string;
  @IsString()
  phoneNum: string;
}
class UpdateAddress {
  @IsString()
  _id: string;
  @IsString()
  addressName: string;
}
class UpdateEmail {
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
