/**
 * Dto of get product by query from client request url.
 * Some property can undifine => function handle formated request will be
 * format it
 */
export class GetProductByQueryDto {
  page: number;
  brand: string | undefined;
  max_price: number | undefined;
  min_price: number | undefined;
  max_sale: number | undefined;
  min_sale: number | undefined;
  category: string | undefined;
  location: string | undefined;
  constructor(partial: Partial<GetProductByQueryDto>) {
    Object.assign(this, partial);
  }
}
