import React from "react";
import { payMethod } from "./list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIconByName } from "@/ultis/ultis";
/**
 * component props
 */
interface ComponentProps {
  setKindOfPay: (value: "ONLINE" | "COD") => void;
  kindOfPay: "COD" | "ONLINE";
}
/**
 *
 * @returns
 */
export default function OrderSelectPaymentMethod(props: ComponentProps) {
  //prop
  const { setKindOfPay, kindOfPay } = props;
  //return
  return (
    <div className="py-3 border-t border-gray-200">
      <h3 className="font-semibold text-gray-700 mb-2">Hình thức thanh toán</h3>
      <div className="flex flex-wrap gap-3">
        {payMethod.map((pay) => (
          <button
            onClick={() => setKindOfPay(pay.value)}
            key={pay.id}
            className={`p-3 border text-gray-700 flex items-center gap-2 ${
              pay.value === kindOfPay
                ? "border-green-600 bg-green-100"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={getIconByName(pay.icon)} />
            {pay.name}
          </button>
        ))}
      </div>
    </div>
  );
}
