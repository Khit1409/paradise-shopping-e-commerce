import { AddToCartRequest } from "@/type/cart.interface";
import { addToCart } from "@/service/cart.service";

export const SingleProductHook = () => {
  /**
   * handle add to cart and check result ok or failed
   * @param data
   * @returns
   */
  const handleCart = async (data: AddToCartRequest) => {
    const { info, original_price, quantity, thumbnail, varitants } = data;
    if (!varitants) {
      return "failed";
    }
    const res = await addToCart({
      info,
      original_price,
      quantity,
      thumbnail,
      varitants,
    });
    if (res) {
      if (res.resultCode == 1) {
        return "ok";
      } else {
        return "failed";
      }
    } else {
      return "failed";
    }
  };
  /**
   * check out handle
   * add to cart => navigation to checkout page add on success modal
   * @param data
   * @returns
   */
  /**
   * handle add to cart
   */
  /**
   * return
   */
  return { handleCart};
};
