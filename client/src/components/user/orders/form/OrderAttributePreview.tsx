"use client";

/**
 * component props
 */
interface ComponentProps {
  orderItem: {
    productName: string;
    productId: string;
    productImg: string;
    attribute: { attributeName: string; attributeValue: string }[];
    totalPrice: number;
    quantity: number;
  } | null;
}
/**
 * function component
 * @param props
 * @returns
 */
export default function OrderAttributePreview(props: ComponentProps) {
  /**
   *  props
   *
   */
  const { orderItem } = props;
  /**
   * render
   */
  return (
    orderItem && (
      <div className="border-t border-gray-200 pt-3 mb-3">
        <h3 className="text-gray-700 font-semibold mb-2">Phân loại hàng</h3>
        {orderItem.attribute?.length ? (
          <ul className="grid grid-cols-3 gap-2">
            {orderItem.attribute.map((attr, idx) => (
              <li
                key={idx}
                className="text-gray-700 flex flex-col gap-2 items-center text-center border border-gray-300 p-2"
              >
                <span className="font-semibold">{attr.attributeName}</span>

                {attr.attributeValue}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Không có thuộc tính.</p>
        )}
      </div>
    )
  );
}
