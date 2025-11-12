"use client";

import ProductInfoTable from "../ProductInfoTable";
import ProductImage from "../ProductImage";
import HashtagList from "../HashtagList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMinus,
  faPlus,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleProductThunk } from "@/redux/product/thunk";
import { CartVaritantRequest } from "@/type/cart.interface";
import { SingleProductHook } from "@/hook/product/SingleProductHook";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { OrderSliceState } from "@/type/order.interface";
import { onOpenOrderModal } from "@/redux/order/slice";

export default function SingleProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.product);
  const params = useSearchParams();
  const id = params.get("info");
  /**
   *
   */
  useEffect(() => {
    if (id) {
      (async () => {
        await dispatch(getSingleProductThunk(id));
      })();
    }
  }, [id, dispatch]);
  /**
   * react hook
   */

  const [quantity, setQuantity] = useState<number>(0);
  const [selectedVaritant, setSelectedVaritant] =
    useState<CartVaritantRequest>();

  const hook = SingleProductHook();

  /**
   * return not found product before create function
   */
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="uppercase">NOT FOUND PRODUCT WITH ID: {id}</p>
      </div>
    );
  }
  /**
   * handle
   * @returns
   */
  const handleCheckValidate = () => {
    if (quantity == 0) {
      dispatch(
        onErrorModel({ onError: true, mess: "Vui lòng chọn số lượng!" })
      );
      return false;
    }
    if (
      !selectedVaritant ||
      !selectedVaritant.sku ||
      selectedVaritant.attributes.length == 0
    ) {
      dispatch(
        onErrorModel({
          mess: "Vui lòng chọn phân loại hàng và giá trị phân loại!",
          onError: true,
        })
      );
      return false;
    }
    const varitant = product.varitants.find(
      (f) => f.sku === selectedVaritant.sku
    );
    if (varitant) {
      if (varitant.attributes.length > selectedVaritant.attributes.length) {
        dispatch(
          onErrorModel({
            mess: "Vui lòng chọn đủ giá trị phân loại hàng",
            onError: true,
          })
        );
        return false;
      }
    }
    return true;
  };
  const submitAddCart = async () => {
    const handled = handleCheckValidate();
    if (!handled) {
      return;
    }
    const { info, thumbnail, original_price, id } = product!;
    const data = {
      info: {
        product_id: id,
        name: info.name,
        slug: info.slug,
      },
      varitants: selectedVaritant!,
      thumbnail,
      original_price,
      quantity,
      total_price: original_price * quantity,
    };
    dispatch(onLoadingAction(true));
    const result = await hook.handleCart(data);
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.success) {
        return dispatch(onSuccessfulModel(true));
      } else {
        return dispatch(
          onErrorModel({
            onError: true,
            mess: result.message,
          })
        );
      }
    }
  };
  /**
   * calculator price with sale
   * @returns
   */
  const calculatorTotalPirce = (): number => {
    const { original_price, sale } = product!;
    const minusSale = original_price - (original_price * sale) / 100;
    const totalPrice = (original_price - minusSale) * quantity;
    return totalPrice;
  };
  /** UI */
  const handleOrderValue = (): OrderSliceState | null => {
    const check = handleCheckValidate();
    if (!check) {
      return null;
    }
    const { info, thumbnail, id } = product!;
    const { attributes, sku } = selectedVaritant!;
    const item = {
      name: info.name,
      img: thumbnail,
      product_id: id,
      quantity: quantity,
      total_price: calculatorTotalPirce(),
    };

    return { ...item, varitants: { sku, attributes } };
  };
  const submitOrder = async () => {
    const payload = handleOrderValue();
    if (!payload) {
      return;
    }
    dispatch(onOpenOrderModal(payload));
  };
  /** UI */
  return (
    <section className="bg-gray-50 text-gray-700">
      <div className="mx-auto p-5 bg-white">
        {/* Product Main Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <ProductImage images={product.images} thumbnail={product.thumbnail} />
          {/* Product Info */}
          <div className="w-1/2">
            <ProductInfoTable
              selectedVaritant={selectedVaritant}
              setSelectedVaritant={setSelectedVaritant}
              varitants={product.varitants}
              info={product.info}
              rating={product.rating}
              price={product.original_price}
              sale={product.sale}
            />
            <div className="flex border-t border-gray-300 pt-2">
              <button
                disabled={quantity == 0}
                className="px-2 border border-gray-300 border-r-transparent"
                onClick={() => {
                  setQuantity((prev) => prev - 1);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                name="quanity"
                id="quantity"
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
                max={100}
                className="border p-1 border-gray-300 text-center outline-0"
                min={0}
                value={quantity}
              />
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
                className="px-2 border border-gray-300 border-l-transparent"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            {/* action */}
            <div className="flex gap-3 py-4">
              <button
                className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-white"
                onClick={async () => {
                  await submitAddCart();
                }}
              >
                THÊM VÀO GIỎ HÀNG <FontAwesomeIcon icon={faCartPlus} />
              </button>
              <button
                className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-white"
                onClick={async () => {
                  await submitOrder();
                }}
              >
                MUA <FontAwesomeIcon icon={faShoppingBag} />
              </button>
            </div>
            {/* hashtag */}
            <HashtagList tags={product.tags} />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <p className="text-xl text-gray-800 font-semibold mb-2 uppercase">
            sản phẩm cùng danh mục
          </p>
          <hr className="mb-4" />
        </div>
      </div>
    </section>
  );
}
