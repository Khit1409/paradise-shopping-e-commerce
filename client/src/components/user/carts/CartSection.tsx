"use client";

import { AppDispatch, RootState } from "@/api/redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteUserCartService,
  updateUserCart,
} from "@/api/services/cart.service";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import { getUserCartThunk } from "@/api/redux/thunk/cart_thunk/cart.thunk";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { onOpenOrderModal } from "@/api/redux/slice/order_slice/order.slice";

export default function CartSection() {
  const [newQuantity, setNewQuantity] = useState<number>();
  const [newAttribute, setNewAttribute] =
    useState<{ _id: string; attrName: string; itemValue: string }[]>();

  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleDeletCartById = async (id: string) => {
    if (!id) {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          mess: "Vui lòng tick vào giỏ hàng cần xóa!",
          onError: true,
        })
      );
      return;
    }
    if (!user) {
      router.replace("/login");
      return;
    } else {
      const result = await deleteUserCartService(id);
      if (result.resultCode == 1) {
        dispatch(onSuccessfulModel(true));
        await dispatch(getUserCartThunk());
      } else {
        dispatch(onErrorModel({ mess: `${result.message}`, onError: true }));
      }
    }
  };

  const handleOnchangeNewAttribute = (
    id: string,
    name: string,
    newValue: string
  ) => {
    setNewAttribute((prev) => {
      const oldData = [...(prev ?? [])];
      const existed = oldData.find((f) => f._id === id);
      const dif = oldData.filter((ft) => ft._id !== id);
      if (existed) {
        return [...dif, { ...existed, itemValue: newValue }];
      }
      oldData.push({ _id: id, attrName: name, itemValue: newValue });
      return oldData;
    });
  };

  async function updateCart(cartId: string) {
    dispatch(onLoadingAction(true));
    const result = await updateUserCart({
      cartId,
      newAttributes: newAttribute,
      newQuantity,
    });
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.resultCode == 1) {
        dispatch(onSuccessfulModel(true));
      } else if (result.resultCode == 0) {
        dispatch(onErrorModel({ onError: false, mess: result.message }));
      } else {
        const error = new Error();
        dispatch(onErrorModel({ mess: `${error}`, onError: true }));
      }
    }
  }

  function addToOrder({
    ...value
  }: {
    proName: string;
    productId: string;
    productImg: string;
    attribute: { attributeName: string; attributeValue: string }[];
    totalPrice: number;
    quantity: number;
  }) {
    dispatch(
      onOpenOrderModal({
        open: true,
        items: {
          productName: value.proName,
          productId: value.productId,
          attribute: value.attribute,
          productImg: value.productImg,
          quantity: value.quantity,
          totalPrice: value.totalPrice,
        },
      })
    );
  }

  return carts && carts.length !== 0 ? (
    <section className="bg-gray-50 px-2 sm:px-4 py-4 text-gray-700">
      <div className="flex flex-col gap-5 w-full">
        {/* Product List */}
        {carts.map((cart) => (
          <div
            key={cart._id}
            className="flex justify-between border rouned p-2 border-gray-300"
          >
            {/* Product Info */}
            <div className="flex gap-3">
              <Image
                src={cart.cartImg}
                alt={cart.cartName}
                width={180}
                height={100}
                className="object-cover"
              />
              <div className="flex flex-col">
                <Link
                  href={`/user/single-product?_info=_${cart.proId}`}
                  className="uppercase hover:underline"
                >
                  {cart.cartName}
                </Link>
                <div className="text-gray-500 flex flex-col gap-1">
                  {cart.cartAttributes.map((attr) => (
                    <div key={attr._id} className="flex gap-1">
                      <span>{attr.attrName}:</span>
                      <select
                        name="newItemValue"
                        id="newItemValue"
                        className=""
                        onChange={(e) =>
                          handleOnchangeNewAttribute(
                            attr._id,
                            attr.attrName,
                            e.target.value
                          )
                        }
                      >
                        <option value={attr.itemValue}>{attr.itemValue}</option>
                        {attr.otherValue.map((other) => (
                          <option value={other.value} key={other._id}>
                            {other.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="text-gray-500">
                  x
                  <input
                    name="quantity"
                    id="quantity"
                    type="number"
                    className="text-center w-[30px]"
                    defaultValue={cart.cartQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              {/* Unit Price */}
              <div className="block text-xl">
                <p>{cart.cartTotalPrice.toLocaleString()}₫</p>
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    addToOrder({
                      productId: cart.proId,
                      attribute: cart.cartAttributes.map((cart) => ({
                        attributeName: cart.attrName,
                        attributeValue: cart.itemValue,
                      })),
                      productImg: cart.cartImg,
                      quantity: cart.cartQuantity,
                      totalPrice: cart.cartTotalPrice,
                      proName: cart.cartName,
                    });
                  }}
                  className="border border-gray-300 hover:text-white hover:bg-green-600 px-2 py-1"
                >
                  MUA <FontAwesomeIcon icon={faCartShopping} />
                </button>
                <button
                  onClick={() => updateCart(cart._id)}
                  className=" hover:bg-green-500 border uppercase border-gray-300 hover:text-white px-2 py-1 transition-all"
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => handleDeletCartById(cart._id)}
                  className="hover:bg-red-600 hover:text-white uppercase text-red-500 border border-red-500  px-2 py-1 transition-all"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 bg-white border border-gray-200 p-3 gap-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green-500 text-2xl"
            />
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              Tổng số sản phẩm:{" "}
              <span className="font-bold text-green-600">{carts.length}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button className="bg-green-300 hover:bg-green-600 uppercase hover:text-white border border-green-500 px-5 py-2 text-sm transition-all">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="min-h-[60vh] flex items-center justify-center text-gray-500 text-center px-4">
      <p className="text-lg font-medium">CHƯA CÓ GIỎ HÀNG</p>
    </section>
  );
}
