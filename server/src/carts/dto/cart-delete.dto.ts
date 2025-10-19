import { IsString } from "class-validator";

export class DeleteCartUserDto {
  @IsString()
  cartId: string;
}
