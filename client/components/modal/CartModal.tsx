"use client";

import { RootState } from "../../redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

type ComponentProps = {
  ref: React.RefObject<HTMLDivElement | null>;
};

export default function CartModal({ ...props }: ComponentProps) {
  const { carts } = useSelector((state: RootState) => state.cart);

  const totalPrice = carts.reduce((acc, item) => acc + item.cartTotalPrice, 0);

  return (
    <div
      ref={props.ref}
      className="absolute z-50 right-0 mt-2 w-[320px] bg-white shadow-xl rounded-2xl border border-gray-200 p-3 animate-in fade-in slide-in-from-top-3"
    >
      {/* header */}
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <h3 className="font-semibold text-gray-800">Giỏ hàng của bạn</h3>
        <span className="text-sm text-gray-500">{carts.length} sản phẩm</span>
      </div>

      {/* list */}
      <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto">
        {carts.length === 0 ? (
          <p className="text-sm text-center text-gray-500 py-6">
            Giỏ hàng trống
          </p>
        ) : (
          carts.map((cart) => (
            <Link
              href={"/user/my-cart"}
              key={cart._id}
              className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              {/* image */}
              <div className="shrink-0">
                <Image
                  src={cart.cartImg}
                  alt={cart.cartName}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover border"
                />
              </div>

              {/* info */}
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {cart.cartName}
                </p>
                <p className="text-xs text-gray-500">SL: {cart.cartQuantity}</p>
                <p className="text-sm font-semibold text-red-500">
                  {cart.cartTotalPrice.toLocaleString()} ₫
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* footer */}
      {carts.length > 0 && (
        <div className="mt-3 border-t pt-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Tổng cộng:</span>
            <span className="font-semibold text-gray-800">
              {totalPrice.toLocaleString()} ₫
            </span>
          </div>
          <Link
            href="/user/my-cart"
            className="block w-full text-center bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition-all"
          >
            Xem giỏ hàng
          </Link>
        </div>
      )}
    </div>
  );
}
