"use client";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/api/Redux/store";

export default function CheckoutModal() {
  const { checkoutState } = useSelector((state: RootState) => state.order);

  if (!checkoutState.openModal || !checkoutState.value) return null;

  const {
    qrCode,
    orderCode,
    accountName,
    accountNumber,
    amount,
    currency,
    checkoutUrl,
  } = checkoutState.value;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col items-center gap-5 relative ">
        {/* QR Code */}
        <QRCode value={qrCode} size={220} />

        {/* Order Info */}
        <div className="flex flex-col gap-2 text-center">
          <p className="font-semibold">Mã đơn: {orderCode}</p>
          <p>Tên TK: {accountName}</p>
          <p>Số TK: {accountNumber}</p>
          <p>
            Số tiền: {amount} {currency}
          </p>
        </div>

        <p className="text-sm text-gray-600">Quét mã QR để thanh toán</p>

        {/* PayOS button */}
        <Link
          href={checkoutUrl}
          target="_blank"
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thanh toán bằng PayOS
        </Link>
      </div>
    </div>
  );
}
