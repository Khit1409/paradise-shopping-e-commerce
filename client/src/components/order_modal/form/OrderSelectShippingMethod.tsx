import React from "react";
import { shippingMethod } from "./list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIconByName } from "@/ultis/ultis";

/**
 * COMPONENT PROPS
 */
interface ComponentProps {
  setKindOfShip: (value: React.SetStateAction<"COD" | "FLASH">) => void;
  kindOfShip: "COD" | "FLASH";
}
/**
 * func component
 * @returns
 */
export default function OrderSelectShippingMethod(props: ComponentProps) {
  // props
  const { setKindOfShip, kindOfShip } = props;
  /**
   * return
   */
  return (
    <section className="py-3 border-t border-gray-200">
      <h3 className="font-semibold text-gray-700 mb-2">Hình thức vận chuyển</h3>
      <div className="flex flex-wrap gap-3">
        {shippingMethod.map((s) => (
          <button
            onClick={() => setKindOfShip(s.value)}
            key={s.id}
            value={s.value}
            className={`p-3 border text-gray-700 flex items-center gap-2 ${
              s.value === kindOfShip
                ? "border-green-600 bg-green-100"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={getIconByName(s.icon)} />
            {s.name}
          </button>
        ))}
      </div>
    </section>
  );
}
