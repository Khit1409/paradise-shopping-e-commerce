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
