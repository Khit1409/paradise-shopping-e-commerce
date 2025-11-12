/**
 * dto of send mail when success in order handle
 */
export class SendOrderMailDto {
  email: string;
  name: string;
  orderCode: string | number;
  price: number;
  constructor(partial: Partial<SendOrderMailDto>) {
    Object.assign(this, partial);
  }
}
