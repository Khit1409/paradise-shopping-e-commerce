/**
 * class up new product information Dto
 */
export class CreateNewProductInformationDto {
  name: string;
  category: string;
  slug: string;
  description: string;
  brand: string | undefined;
  constructor(parital: Partial<CreateNewProductInformationDto>) {
    Object.assign(this, parital);
  }
}
/**
 * class up new product varitant attribute dto
 */
export class CreateNewProductVaritantAttributeDto {
  name: string;
  value: string;
  image: string | undefined;
  constructor(parital: Partial<CreateNewProductVaritantAttributeDto>) {
    Object.assign(this, parital);
  }
}
/**
 * class up new product owner information dto
 */
export class CreateNewProductOwnerInformationDto {
  seller_id: string;
  store_id: string;
  constructor(parital: Partial<CreateNewProductOwnerInformationDto>) {
    Object.assign(this, parital);
  }
}
/**
 * class of up new product varitant dto
 * Dto
 */
export class CreateNewProductVaritantDto {
  sku: number;
  stoke: number;
  attributes: CreateNewProductVaritantAttributeDto[];
  constructor(parital: Partial<CreateNewProductVaritantDto>) {
    Object.assign(this, parital);
  }
}
/**
 * class up new product Dto
 */
export class CreateNewProductDto {
  info: CreateNewProductInformationDto;
  owner_info: CreateNewProductOwnerInformationDto;
  varitants: CreateNewProductVaritantDto[];
  original_price: number;
  sale: number;
  thumbnail: string;
  images: string[];
  constructor(parital: Partial<CreateNewProductDto>) {
    Object.assign(this, parital);
  }
}
