/**
 * =====================================
 * PRODUCT TYPES DEFINITION
 * =====================================
 */

/**
 * Request: Filter product and get limited products by page.
 *
 */
export type GetProductQueryType = {
  page: number;
  category?: string;
  max_price?: number;
  min_price?: number;
  max_sale?: number;
  min_sale?: number;
  location?: string;
  brand?: string;
};
/**
 * Product global type — used for preview or product list display.
 *
 */
export type ProductList = {
  id: string;
  info: {
    name: string;
    brand: string;
    slug: string;
    description: string;
    category: string;
  };
  thumbnail: string;
  sale: number;
  original_price: number;
  isActive: boolean;
  sold: number;
  rating: number;
};
/**
 * Product image detail type — for additional product images.
 *
 *
 */
export type ImgDetail = {
  id: string;
  imgUrl: string;
};

/**
 * Product attribute type — e.g. Size, Color, Material, etc.
 *
 */
export type Attribute = {
  id: string;
  attrName: string;
  items: AttributeItem[];
};

/**
 * Item inside product attributes type — e.g. Size: M, Color: Red, etc.
 *
 */
export type AttributeItem = {
  id: string;
  attrId: string;
  itemValue: string;
  itemImg?: string;
};

/**
 * API response type for single product details page.
 *
 */
/**
 * product varitant attribute of product response
 */
export interface ProductVariantAttribute {
  name: string;
  value: string[];
}
/**
 * product varitant of product response
 */
export interface ProductVariant {
  sku: string;
  stoke: number;
  attributes: ProductVariantAttribute[];
  image: string;
}
/**
 * product information of product response
 */
export interface ProductInformation {
  name: string;
  brand: string;
  slug: string;
  description: string;
  category: string;
}
/**
 * single product of product response
 */
export interface SingleProduct {
  id: string;
  info: ProductInformation;
  varitants: ProductVariant[];
  rating: number;
  sale: number;
  sold: number;
  original_price: number;
  isActive: boolean;
  tags: string[];
  images: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * =====================================
 * SHOP PAGE PRODUCT FILTER
 * =====================================
 */

/**
 * Query request type for filtering products on shop page.
 */
export type GetProductShopRequest = {
  cate_slug?: string;
  max_price?: number | string;
  min_price?: number | string;
  min_sale?: number | string;
  max_sale?: number | string;
  area?: string;
};

/**
 * API response type for shop page — each shop includes product list.
 *
 */
export type ProductShopPage = {
  storeId: number;
  storeName: string;
  storeArea: string;
  storeAreaSlug: string;
  storeAvatar: string;
  storeAddress: string;
  products: ProductList[];
};

/**
 * =====================================
 * CART TYPES DEFINITION
 * =====================================
 */

/**
 * Chosen attribute in "Add to Cart" action.
 *
 */
export type AddToCartChooseType = {
  attrName: string;
  itemValue: string;
};

/**
 * Request type for adding a product to cart
 */
export type AddToCartType = {
  proId: string;
  name: string;
  quantity: number;
  price: number;
  img: string;
  choose: AddToCartChooseType[];
};

/**
 * =====================================
 * PRODUCT / CART OPERATIONS
 * =====================================
 */

/**
 * Request type to get single product by ID or slug.
 */
export type GetSingleProductRequest = {
  id: string;
  slug?: string;
};

/**
 * Request type to update cart item.
 *
 */
export type UpdateCartType = {
  cartId: string;
  newQuantity?: number;
  newAttributes?: {
    id: string;
    attrName?: string;
    itemValue?: string;
  }[];
};