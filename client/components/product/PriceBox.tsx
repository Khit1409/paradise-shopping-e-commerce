import React from "react";

type ComponentProps = {
  price: number;
  sale: number;
};

export default function PriceBox(props: ComponentProps) {
  /**
   * props
   */
  const { price, sale } = props;
  /**
   * tsx
   */
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xl text-red-500">
        {sale
          ? (price - (price * sale) / 100).toLocaleString("vi-VN")
          : price.toLocaleString("vi-VN")}
        $
      </p>
      <p className="line-through">
        {sale ? (
          <>
            {(price - (price - (price * sale) / 100)).toLocaleString("vi-VN")}$
          </>
        ) : null}
      </p>
      <p className="flex px-1 items-center gap-1 text-white bg-red-500">
        {sale}
        <span className="text-sm">%</span>
      </p>
    </div>
  );
}
