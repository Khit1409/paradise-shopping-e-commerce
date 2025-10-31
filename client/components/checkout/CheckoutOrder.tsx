"use client";
import QRCode from "react-qr-code";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Banner from "@/../components/layout/Header/Banner";
import ProductList from "../product/ProductList";
import { ChekoutHook } from "../../hook/checkout/chekoutHook";

/**
 * Checkout modal with QR code
 * or click button for using payos page
 * or cancel payment
 * @returns
 */
export default function CheckoutOrder() {
  const { products } = useSelector((state: RootState) => state.product);
  /**
   * hook
   */
  const hook = ChekoutHook();
  if (!hook) {
    return null;
  }
  const { cancel, value } = hook;
  const {
    qrCode,
    accountName,
    accountNumber,
    orderCode,
    amount,
    currency,
    checkoutUrl,
  } = value;
  //render
  return (
    <>
      <Banner />
      <div className="bg-white p-6 w-full text-gray-700">
        <div className="flex items-center justify-around border-b py-3 border-gray-300">
          {/* QR Code */}
          <div className="flex border items-center gap-2 flex-col p-1 justify-center border-gray-300 rounded">
            <QRCode value={qrCode} size={220} />
            <p className="text-gray-500 text-sm">QR Code thanh toán</p>
            {/* PayOS button */}
          </div>
          {/* Order Info */}
          <div className="flex flex-col gap-2 p-2 border border-gray-300 text-gray-700">
            <h4 className="font-bold uppercase text-center">
              Thông tin đơn hàng
            </h4>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Mã đơn: {orderCode}</p>
              <p>Tên TK: {accountName}</p>
              <p>Số TK: {accountNumber}</p>
              <p>
                Số tiền: {amount} {currency}
              </p>
              <p className="text-sm text-gray-600">Quét mã QR để thanh toán</p>
            </div>

            <div className="flex gap-2 items-center">
              <Link
                href={checkoutUrl}
                target="_blank"
                className="border-green-500 hover:bg-green-500 py-[6px] px-2 hover:text-white border text-green-500 text-sm transition"
              >
                Thanh toán bằng PayOS
              </Link>
              <button
                onClick={() => cancel()}
                role="button"
                className="py-1 border  px-1 border-red-500 text-red-600 hover:text-white hover:bg-red-500"
              >
                Hủy thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductList data={products} />
    </>
  );
}
