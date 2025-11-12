"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { OrderKindOfPay, OrderKindOfShipping } from "@/type/order.interface";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecivedOrderModal from "./RecivedOrderModal";
import { onOpenOrderModal } from "@/redux/order/slice";
import { createOrder } from "@/service/order.service";
import { changeCheckoutValue } from "@/redux/checkout/slice";
import { useRouter } from "next/navigation";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";

type OrderContactState = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export default function SelectionOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [shippingType, setShippingType] = useState<OrderKindOfShipping>("COD");
  const [payType, setPayType] = useState<OrderKindOfPay>("COD");
  const { orderState } = useSelector((state: RootState) => state.order);

  const [contact, setContact] = useState<OrderContactState>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  async function submitOrder() {
    if (!orderState) {
      return;
    }
    const checkContact = Object.entries(contact).find((f) => f[1] === "");
    if (checkContact) {
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Vui lòng điền phương thức liên hệ!",
        })
      );
      return;
    } else if (!contact.address) {
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Vui lòng điền địa chỉ nhận hàng!",
        })
      );
      return;
    }
    dispatch(onLoadingAction(true));
    const order = await createOrder({
      contacts: {
        address: contact.address,
        email: contact.email,
        phone: contact.phone,
        user_name: contact.name,
      },
      items: {
        img: orderState.img,
        name: orderState.name,
        pay_type: payType,
        product_id: orderState.product_id,
        quantity: orderState.quantity,
        shipping_type: shippingType,
        total_price: orderState.total_price,
      },
      varitants: {
        sku: orderState.varitants.sku,
        attributes: orderState.varitants.attributes,
      },
    });
    if (order) {
      onCloseModal();
      dispatch(onLoadingAction(false));
      if (order.success) {
        dispatch(onSuccessfulModel(true));
        if (order.payment) {
          dispatch(changeCheckoutValue(order.payment));
          return router.replace("/user/checkout");
        }
      } else {
        onErrorModel({
          onError: true,
          mess: order.message,
        });
      }
    } else {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Xử lý đơn hàng của bạn thất bại! Xin thử lại.",
        })
      );
    }
  }
  /**
   * close order model or cancel order model
   */
  const onCloseModal = () => {
    dispatch(onOpenOrderModal(null));
  };
  return (
    orderState && (
      <div className="text-gray-700 h-full w-full bg-effect fixed z-999 flex items-center justify-center">
        <div className="flex flex-col gap-3 bg-white p-5  overflow-y-auto h-[500px]">
          {/* preview value of order state */}
          <div className="flex flex-col gap-3">
            <p>Tên sản phẩm: {orderState.name}</p>
            <p>Mã sản phẩm: {orderState.product_id}</p>
            <p>Mã phân loại hàng: {orderState.varitants.sku}</p>
            <Image src={orderState.img} alt="" width={100} height={100} />
            <p>
              Tổng tiền {orderState.total_price}
              <span className="text-sm">$</span> X {orderState.quantity}
            </p>
          </div>
          {/* shipping type */}
          <div className="flex gap-2 mb-3">
            <button
              className={`border border-gray-300 hover:bg-gray-200 hover:text-gray-800 px-2 py-1 ${
                shippingType === "COD" ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                setShippingType("COD");
              }}
            >
              Giao thường
            </button>
            <button
              className={`border border-gray-300 hover:bg-gray-200 hover:text-gray-800 px-2 py-1 ${
                shippingType === "FLASH" ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                setShippingType("FLASH");
              }}
            >
              Giao hỏa tốc
            </button>
          </div>
          {/* payment type */}
          <div className="flex gap-2 mb-3">
            <button
              className={`border border-gray-300 hover:bg-gray-200 hover:text-gray-800 px-2 py-1 ${
                payType === "COD" ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                setPayType("COD");
              }}
            >
              Thanh toán khi nhận hàng
            </button>
            <button
              className={`border border-gray-300 hover:bg-gray-200 hover:text-gray-800 px-2 py-1 ${
                payType === "ONLINE" ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                setPayType("ONLINE");
              }}
            >
              Thanh toán online
            </button>
          </div>
          {/* select contact toggle */}
          <RecivedOrderModal
            getContact={setContact}
            onCloseModal={onCloseModal}
            submitOrder={submitOrder}
            selectedContact={contact}
          />
        </div>
      </div>
    )
  );
}
