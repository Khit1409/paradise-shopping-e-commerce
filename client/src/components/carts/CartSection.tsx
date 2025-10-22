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
} from "@/api/services/product.service";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import { getUserCartThunk } from "@/api/redux/thunk/product_thunk/product.thunk";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { onOpenOrderModal } from "@/api/redux/slice/order_slice/order.slice";

export default function CartSection() {
  /**
   * Component sate
   */
  const [newQuantity, setNewQuantity] = useState<number>();
  const [newAttribute, setNewAttribute] =
    useState<{ _id: string; attrName: string; itemValue: string }[]>();
  const [selectedCart, setSelectedCart] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  /**
   * Handle delete cart by id
   * @param id
   * @returns
   */
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
  /**
   * Onchange new attribute
   */
  const handleOnchangeNewAttribute = (
    id: string,
    name: string,
    newValue: string
  ) => {
    setNewAttribute((prev) => {
      const oldData = [...(prev ?? [])];
      // check validate
      const existed = oldData.find((f) => f._id === id);
      const dif = oldData.filter((ft) => ft._id !== id);
      // update
      if (existed) {
        return [...dif, { ...existed, itemValue: newValue }];
      }
      //add new if []
      oldData.push({ _id: id, attrName: name, itemValue: newValue });

      //return
      return oldData;
    });
  };
  /**
   * handle update user cart
   */
  async function updateCart(cartId: string) {
    dispatch(onLoadingAction(true));
    if (!cartId) {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          mess: "Vui lòng tick vào giỏ hàng cần cập nhật!",
          onError: true,
        })
      );
      return;
    }
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

  return carts && carts.length !== 0 ? (
    <section className="bg-gray-50 px-3 py-4 text-gray-700">
      <div className="flex flex-col gap-3 max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-6 bg-white p-3 border border-gray-300 rounded-lg font-semibold uppercase text-center shadow-sm">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="checkAll"
              checked={selectedCart === "all"}
              onChange={() => {
                setSelectedCart(selectedCart === "all" ? "" : "all");
              }}
              className="me-2 accent-green-500"
            />
            <label htmlFor="checkAll" className="cursor-pointer">
              Tất cả
            </label>
          </div>
          <p>Sản phẩm</p>
          <p>Số lượng</p>
          <p>Đơn giá</p>
          <p>Tổng</p>
          <p>Tùy chọn</p>
        </div>

        {/* Product List */}
        {carts.map((cart) => (
          <div
            key={cart._id}
            className="grid grid-cols-6 items-center bg-white p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {/* Checkbox + Ảnh */}
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                value={cart._id}
                checked={selectedCart === "all" || selectedCart === cart._id}
                className="accent-green-500"
                onChange={(e) => {
                  setSelectedCart(
                    selectedCart === e.target.value ? "" : e.target.value
                  );
                }}
                id={`cart-${cart._id}`}
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex flex-col text-left gap-1">
              <Image
                src={cart.cartImg}
                alt={cart.cartName}
                width={80}
                height={80}
                className="rounded-md object-cover border border-gray-200"
              />
              <Link
                href={`/user/single_product?_info=_${cart.proId}`}
                className="font-semibold truncate text-base hover:underline"
              >
                {cart.cartName}
              </Link>
              <div className="text-sm text-gray-500">
                {cart.cartAttributes.map((attr) => (
                  <p key={attr._id}>
                    <span className="font-medium">{attr.attrName}</span>
                    {/* select other value */}
                    <select
                      name="newItemValue"
                      id="newItemValue"
                      className="outline-hidden"
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
                  </p>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="flex items-center justify-center font-medium">
              <input
                type="number"
                className="w-[50px] text-center cursor-pointer"
                defaultValue={cart.cartQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
              />
            </div>

            {/* Đơn giá */}
            <div className="text-center font-semibold text-gray-800">
              {cart.cartPrice.toLocaleString()}₫
            </div>

            {/* Tổng tiền */}
            <div className="text-center font-bold text-green-600">
              {cart.cartTotalPrice.toLocaleString()}₫
            </div>

            {/* Hành động */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => {
                  dispatch(
                    onOpenOrderModal({
                      open: true,
                      items: {
                        productId: cart._id,
                        productImg: cart.cartImg,
                        attribute: cart.cartAttributes,
                        totalPrice: cart.cartTotalPrice,
                        quantity: cart.cartQuantity,
                      },
                    })
                  );
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-all"
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>
        ))}

        {/* Tổng kết */}
        <div className="flex justify-end items-center mt-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm gap-3">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 text-2xl"
          />
          <p className="text-gray-700 font-medium">
            Tổng số sản phẩm:{" "}
            <span className="font-bold text-green-600">{carts.length}</span>
          </p>
          <button
            onClick={() => updateCart(selectedCart)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition-all"
          >
            Cập nhật
          </button>
          <button
            onClick={() => {
              handleDeletCartById(selectedCart);
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition-all"
          >
            Xóa
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition-all">
            Thanh toán
          </button>
        </div>
      </div>
    </section>
  ) : (
    <section className="min-h-screen flex items-center justify-center">
      <p>CHƯA CÓ GIỎ HÀNG</p>
    </section>
  );
}
