"use client";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "@/api/redux/store";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import axios from "axios";
import { checkoutAction } from "@/api/redux/slice/order_slice/order.slice";
import { apiAction } from "@/config/axios";
/**
 * Checkout modal with QR code
 * or click button for using payos page
 * or cancel payment
 * @returns
 */
export default function CheckoutModal() {
  /**
   * redux root state
   */
  const { checkoutState } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  /**
   * check checkoutstate from checkout slice
   */
  if (!checkoutState.openModal || !checkoutState.value) return null;

  const {
    qrCode,
    orderCode,
    accountName,
    accountNumber,
    amount,
    currency,
    checkoutUrl,
    paymentLinkId,
  } = checkoutState.value;

  /**
   * cancel checkout
   */
  console.log(paymentLinkId);
  async function cancelCheckout() {
    try {
      if (!paymentLinkId) {
        dispatch(
          onErrorModel({
            onError: true,
            mess: "Hủy thanh toán thất bại đợi 5p để hệ thống tự động hủy!",
          })
        );
        return;
      }
      dispatch(onLoadingAction(true));
      const res = await apiAction.post(`payments/cancel-payment`, {
        paymentLinkId,
        cancellationReason: "user cancel",
      });
      const data = res.data;
      if (data) {
        dispatch(onLoadingAction(false));
        if (data.resultCode === 1) {
          dispatch(onSuccessfulModel(true));
          dispatch(checkoutAction({ openModal: false, value: null }));
          return;
        } else {
          dispatch(onErrorModel({ mess: "Server error", onError: true }));
          dispatch(checkoutAction({ openModal: false, value: null }));
          return;
        }
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ mess: `${error}`, onError: true }));
    }
  }
  //render
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full flex gap-5 relative ">
        {/* QR Code */}

        <div className="flex flex-col">
          <QRCode value={qrCode} size={220} />
          {/* PayOS button */}
        </div>

        {/* Order Info */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-semibold">Mã đơn: {orderCode}</p>
          <p>Tên TK: {accountName}</p>
          <p>Số TK: {accountNumber}</p>
          <p>
            Số tiền: {amount} {currency}
          </p>
          <p className="text-sm text-gray-600">Quét mã QR để thanh toán</p>
          <Link
            href={checkoutUrl}
            target="_blank"
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thanh toán bằng PayOS
          </Link>
          <button
            onClick={() => cancelCheckout()}
            role="button"
            className="mt-3 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Hủy thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
