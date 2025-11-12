"use client";

import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import Link from "next/link";
import { useState } from "react";
import { deleteCart, patchCart } from "@/service/cart.service";
import { CartPatchRequest } from "@/type/cart.interface";

export interface UpdateAttribute {
  name: string;
  value: string;
}
export default function CartList() {
  const [newQuantity, setNewQuantity] = useState<number>();
  const [varitantUpdated, setVaritantUpdated] = useState<CartPatchRequest>({
    sku: "",
    attributes: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.cart);

  const onchangeUpdate = (sku: string, name: string, value: string) => {
    setVaritantUpdated((prev) => {
      let varitants = { ...prev };
      if (!varitants.sku) varitants.sku = sku;
      let attributes = [...(varitants.attributes ?? [])];
      const index = attributes.findIndex((f) => f.name === name);
      if (index !== -1) {
        attributes[index] = { ...attributes[index], value };
      } else {
        attributes = [...attributes, { name, value }];
      }
      const checkEnogreValue = carts.find((f) => f.varitants.sku === sku);
      if (checkEnogreValue) {
        if (attributes.length < checkEnogreValue.varitants.attributes.length) {
          const diff = checkEnogreValue.varitants.attributes.filter((ft) =>
            attributes.some((f) => f.name !== ft.name)
          );
          console.log(diff);
          attributes = [...attributes, ...diff];
        }
      }
      varitants = { ...varitants, sku, attributes: attributes };
      return varitants;
    });
  };

  const onDelete = async (id: string) => {
    const result = await deleteCart(id);
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.success) {
        return dispatch(onSuccessfulModel(true));
      } else {
        return dispatch(onErrorModel({ onError: true, mess: result.message }));
      }
    } else {
      return dispatch(
        onErrorModel({ onError: true, mess: "Lỗi Server:500, thử lại!" })
      );
    }
  };

  const onUpdate = async (req: {
    id: string;
    quantity?: number;
    varitants: CartPatchRequest;
  }) => {
    dispatch(onLoadingAction(true));
    const result = await patchCart(req);
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.success) {
        return dispatch(onSuccessfulModel(true));
      } else {
        return dispatch(onErrorModel({ onError: true, mess: result.message }));
      }
    } else {
      dispatch(onLoadingAction(false));
      return dispatch(onErrorModel({ onError: true, mess: "Server error!" }));
    }
  };
  /**
   * return
   */
  return carts && carts.length !== 0 ? (
    <section className="bg-gray-50 px-2 sm:px-4 py-4 text-gray-700">
      <div className="flex flex-col gap-5 w-full">
        {/* Product List */}
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="flex justify-between border rouned p-2 border-gray-300"
          >
            {/* Product Info */}
            {cart.info && (
              <div className="flex gap-3">
                <Image
                  src={cart.thumbnail}
                  alt={cart.info.name}
                  width={180}
                  height={100}
                  className="object-cover border border-gray-300"
                />
                <div className="flex flex-col">
                  <Link
                    href={`/user/single-product?info=${cart.info.product_id}`}
                    className="uppercase hover:underline"
                  >
                    <p className="w-[600px] truncate">{cart.info.name}</p>
                  </Link>
                  <div className="text-gray-500 flex flex-col gap-1">
                    {cart.varitants.attributes.map((attr) => (
                      <div key={attr.name} className="flex gap-1">
                        <span>{attr.name}</span>
                        <select
                          name={attr.name}
                          id="ovether-value"
                          onChange={(e) => {
                            const { name, value } = e.target;
                            onchangeUpdate(cart.varitants.sku, name, value);
                          }}
                        >
                          <option value={attr.value}>{attr.value}</option>
                          {attr.other.map((diff) => (
                            <option value={diff} key={diff}>
                              {diff}
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
                      defaultValue={cart.quantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-between items-end">
              {/* Unit Price */}
              <div className="block text-xl">
                <p>{cart.total_price?.toLocaleString()}₫</p>
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <button className="border border-gray-300 hover:text-white hover:bg-green-600 px-2 py-1">
                  MUA <FontAwesomeIcon icon={faCartShopping} />
                </button>
                <button
                  onClick={() => {
                    onUpdate({
                      id: cart.id,
                      varitants: varitantUpdated,
                      quantity: newQuantity,
                    });
                  }}
                  className=" hover:bg-green-500 border uppercase border-gray-300 hover:text-white px-2 py-1 transition-all"
                >
                  Cập nhật
                </button>
                <button
                  onClick={async () => {
                    await onDelete(cart.id);
                  }}
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
