export class GetProductByQueryDto {
  page: number;
  brand?: string;
  max_price?: number;
  min_price?: number;
  max_sale?: number;
  min_sale: number;
  category?: string;
  location?: string;
}
