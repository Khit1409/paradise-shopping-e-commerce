export class UpdateCartDto {
  id: string;
  sku: string;
  attributes: {
    name: string;
    value: string;
  }[];
  quantity: number | undefined;
}
