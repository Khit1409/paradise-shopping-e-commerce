import Image from "next/image";
import React from "react";

/**
 * component props
 * 
 */
interface ComponentProps {
  orderItem: {
    productId: string;
    productImg: string;
    attribute: {
      attrName: string;
      itemValue: string;
      itemImg?: string | undefined;
    }[];
    totalPrice: number;
    quantity: number;
  };
}
/**
 * function component
 * @param props
 * @returns
 */

export default function OrderProductInfo(props: ComponentProps) {
  /**
   *  props
   *
   */
  const { orderItem } = props;
  /**
   * render
   */
  return (
    <div className="flex flex-col items-center mb-5">
      {orderItem.productImg && (
        <Image
          width={120}
          height={120}
          src={orderItem.productImg}
          alt="product"
          className="w-32 h-32 object-cover mb-3"
        />
      )}
      <p className="text-gray-700">
        <span className="font-semibold">Số lượng:</span> {orderItem.quantity}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Tổng giá:</span>{" "}
        <span className="text-green-600 font-semibold">
          {orderItem.totalPrice?.toLocaleString("vi-VN")} ₫
        </span>
      </p>
    </div>
  );
}
