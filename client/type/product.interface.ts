/**
 * =====================================
 * PRODUCT TYPES DEFINITION
 * =====================================
 */

/**
 * Request: Filter product and get limited products by page.
 *
 * @property {number} page - Current page number.
 */
export type GetProductQueryType = {
  page: number;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  maxSale?: number;
  minSale?: number;
  area?: string;
};
/**
 * Product global type — used for preview or product list display.
 *
 * @property {_id} _id - Unique product ID.
 * @property {string} cateId - Category ID of the product.
 * @property {string} proName - Product name.
 * @property {number} proPrice - Original price.
 * @property {number} proSale - Sale price or discount percentage.
 * @property {string} proTag - Tag or label for the product.
 * @property {string} proSlug - SEO-friendly product slug.
 * @property {string} proImg - Main product image URL.
 * @property {string} proDescription - Short product description.
 */
export type Products = {
  _id: string;
  cateId: string;
  proName: string;
  proPrice: number;
  proSale: number;
  proTag: string;
  proSlug: string;
  proImg: string;
  proDescription: string;
};
/**
 * Product image detail type — for additional product images.
 *
 * @property {_id} _id - Unique image ID.
 * @property {string} proId - Related product ID.
 * @property {string} imgUrl - Image URL.
 */
export type ImgDetail = {
  _id: string;
  imgUrl: string;
};

/**
 * Product attribute type — e.g. Size, Color, Material, etc.
 *
 * @property {_id} _id - Unique attribute ID.
 * @property {string} proId - Related product ID.
 * @property {string} attrName - Attribute name (e.g. "Color").
 * @property {AttributeItem[]} items - List of attribute items.
 */
export type Attribute = {
  _id: string;
  attrName: string;
  items: AttributeItem[];
};

/**
 * Item inside product attributes type — e.g. Size: M, Color: Red, etc.
 *
 * @property {_id} _id - Unique attribute item ID.
 * @property {string} attrId - Related attribute ID.
 * @property {string} itemValue - Value of the attribute (e.g. "Red").
 * @property {string} [itemImg] - Optional image for this attribute item.
 */
export type AttributeItem = {
  _id: string;
  attrId: string;
  itemValue: string;
  itemImg?: string;
};

/**
 * API response type for single product details page.
 *
 * @property {SingleProduct} product - The main product details.
 * @property {Product[]} related - List of related products.
 */
/**
 * Single product full data — used when fetching one product by slug or id.
 *
 * @property {_id} _id - Product ID.
 * @property {string} cateId - Category ID.
 * @property {string} proName - Product name.
 * @property {number} proSale - Discount or sale value.
 * @property {number} proPrice - Original product price.
 * @property {string} proTag - Tag or label for the product.
 * @property {string} proSlug - SEO-friendly slug.
 * @property {string} proImg - Main image.
 * @property {string} proDescription - Product description.
 * @property {ImgDetail[]} proImgDetails - List of additional images.
 * @property {Attribute[]} proAttributes - List of attributes.
 * @property {string} createdAt - Creation date (ISO string).
 * @property {string} updatedAt - Last updated date (ISO string).
 */
export type SingleProduct = {
  _id: string;
  proName: string;
  proSale: number;
  proCateSlug: string;
  proPrice: number;
  proTag: string;
  proSlug: string;
  proImg: string;
  proDescription: string;
  proImgDetails: ImgDetail[];
  proAttributes: Attribute[];
  createdAt: string;
  updatedAt: string;
};

/**
 * =====================================
 * SHOP PAGE PRODUCT FILTER
 * =====================================
 */

/**
 * Query request type for filtering products on shop page.
 *
 * @property {number|string} [pro_sale] - Sale filter value.
 * @property {string} [cate_slug] - Category slug filter.
 * @property {number|string} [pro_price] - Price filter value.
 * @property {string} [area] - Area filter.
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
 * @property {number} storeId - Store ID.
 * @property {string} storeName - Store name.
 * @property {string} storeArea - Store area.
 * @property {string} storeAreaSlug - Store area slug.
 * @property {string} storeAvatar - Store avatar URL.
 * @property {string} storeAddress - Store address.
 * @property {Product[]} products - List of products in the store.
 */
export type ProductShopPage = {
  storeId: number;
  storeName: string;
  storeArea: string;
  storeAreaSlug: string;
  storeAvatar: string;
  storeAddress: string;
  products: Products[];
};

/**
 * =====================================
 * CART TYPES DEFINITION
 * =====================================
 */

/**
 * Chosen attribute in "Add to Cart" action.
 *
 * @property {string} attrName - Attribute name.
 * @property {string} itemValue - Chosen attribute value.
 */
export type AddToCartChooseType = {
  attrName: string;
  itemValue: string;
};

/**
 * Request type for adding a product to cart.
 *
 * @property {string} proId - Product ID.
 * @property {string} name - Product name.
 * @property {number} quantity - Quantity added.
 * @property {number} price - Price per unit.
 * @property {string} img - Product image.
 * @property {AddToCartChooseType[]} choose - Chosen attributes.
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
 * Type of product attributes displayed inside the cart.
 *
 * @property {_id} _id - Attribute ID.
 * @property {string} attrName - Attribute name.
 * @property {string} itemValue - Selected attribute value.
 * @property {{ value: string; _id: string }[]} otherValue - Options for attribute changes.
 */
export type CartAttribute = {
  _id: string;
  attrName: string;
  itemValue: string;
  otherValue: { value: string; _id: string }[];
};

/**
 * Type for user's cart item or list of cart items.
 *
 * @property {_id} _id - Cart item ID.
 * @property {string} cartImg - Product image.
 * @property {string} cartName - Product name.
 * @property {number} cartPrice - Price per unit.
 * @property {string} proId - Related product ID.
 * @property {number} cartQuantity - Quantity selected.
 * @property {number} cartTotalPrice - Total price for this cart item.
 * @property {CartAttribute[]} cartAttributes - Attributes of product in cart.
 */
export type UserCart = {
  _id: string;
  cartImg: string;
  cartName: string;
  cartPrice: number;
  proId: string;
  cartQuantity: number;
  cartTotalPrice: number;
  cartAttributes: CartAttribute[];
};

/**
 * =====================================
 * PRODUCT / CART OPERATIONS
 * =====================================
 */

/**
 * Request type to get single product by ID or slug.
 *
 * @property {string} id - Product ID.
 * @property {string} [slug] - Optional product slug.
 */
export type GetSingleProductRequest = {
  id: string;
  slug?: string;
};

/**
 * Request type to update cart item.
 *
 * @property {string} cartId - Cart item ID.
 * @property {number} [newQuantity] - Updated quantity.
 * @property {{ _id: string; attrName?: string; itemValue?: string }[]} [newAttributes] - Updated attributes.
 */
export type UpdateCartType = {
  cartId: string;
  newQuantity?: number;
  newAttributes?: {
    _id: string;
    attrName?: string;
    itemValue?: string;
  }[];
};
