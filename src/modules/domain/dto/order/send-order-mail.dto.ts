import { IsEmail, IsNumber, IsString } from 'class-validator';

/**
 * dto of send mail when success in order handle
 */
export class SendOrderMailDto {
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  orderCode: string;
  @IsNumber()
  price: number;
  constructor(partial: Partial<SendOrderMailDto>) {
    Object.assign(this, partial);
  }
}
