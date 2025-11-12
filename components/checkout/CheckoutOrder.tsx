"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import QRCode from "react-qr-code";
import { cancelCheckout } from "@/service/order.service";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { changeCheckoutValue } from "@/redux/checkout/slice";

export default function CheckoutOrder() {
  const { checkoutValue } = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (checkoutValue) {
      if (checkoutValue.expiredAt) {
        const now = Date.now();
        if (now === checkoutValue.expiredAt) {
          window.location.reload();
        }
      }
    }
  }, [checkoutValue]);

  if (!checkoutValue)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Không có thông tin thanh toán.
      </div>
    );

  const {
    accountName,
    accountNumber,
    amount,
    checkoutUrl,
    currency,
    description,
    orderCode,
    qrCode,
    expiredAt,
    paymentLinkId,
  } = checkoutValue;

  const expiredDate = new Date(expiredAt! * 1000).toLocaleString("vi-VN");
  const cancel = async () => {
    dispatch(onLoadingAction(true));
    const result = await cancelCheckout(paymentLinkId);
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.success) {
        dispatch(changeCheckoutValue(null));
        return dispatch(onSuccessfulModel(true));
      } else {
        return dispatch(onErrorModel({ mess: result.message, onError: true }));
      }
    } else {
      dispatch(onLoadingAction(false));
      return dispatch(onErrorModel({ mess: "Lỗi Server!", onError: true }));
    }
  };
  return (
    <div className="min-h-screen text-gray-900 p-8 checkout-bg">
      <div className="max-w-md mx-auto bg-white border border-gray-300 p-6">
        <h1 className="text-xl font-semibold text-center mb-6">
          Xác nhận thanh toán
        </h1>

        <div className="flex flex-col items-center gap-4">
          <QRCode value={qrCode} size={180} />
          <p className="text-sm text-gray-500 text-center">
            Quét mã để thanh toán đơn hàng
          </p>
        </div>

        <div className="border-t border-gray-300 mt-6 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Mã đơn hàng:</span>
            <span className="font-medium">{orderCode}</span>
          </div>
          <div className="flex justify-between">
            <span>Số tài khoản:</span>
            <span className="font-medium">{accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Tên tài khoản:</span>
            <span className="font-medium">{accountName}</span>
          </div>
          <div className="flex justify-between">
            <span>Số tiền:</span>
            <span className="font-semibold">
              {amount.toLocaleString()} {currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Mô tả:</span>
            <span className="text-right">{description}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Hết hạn lúc:</span>
            <span>{expiredDate}</span>
          </div>
        </div>

        <div className="mt-6 text-center flex gap-2  justify-center">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Mở liên kết thanh toán
          </a>
          <button
            className="hover:underline text-red-500 text-sm"
            onClick={() => {
              cancel();
            }}
          >
            Hủy thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
