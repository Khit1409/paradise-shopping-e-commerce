import { UserResponse } from "@/api/services/auth.service";
import SelectAddressForm from "@/components/user/forms/SelectAddressForm";
import React from "react";

/**
 * interface componet prop
 */
interface ComponentProps {
  user: UserResponse;
  orderAddress: string;
  onchange: (address: string) => void;
  setOtherAddress: React.Dispatch<React.SetStateAction<string>>;
}
/**
 * function component
 * @param props
 * @returns
 */
export default function OrderSelectAddress(props: ComponentProps) {
  // props
  const { onchange, orderAddress, user, setOtherAddress } = props;
  //return jsx
  return (
    <div className="py-3 border-t border-gray-200 flex flex-col gap-3">
      <h3 className="font-semibold text-gray-700 mb-1">Địa chỉ nhận hàng</h3>
      <div className="flex flex-col gap-2">
        {user.userAddress ? (
          user.userAddress.map((address) => (
            <label key={address._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={orderAddress === address.addressName}
                value={address.addressName}
                onChange={(e) => onchange(e.target.value)}
              />
              <span>{address.addressName}</span>
            </label>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Chưa có địa chỉ nào</p>
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={orderAddress === "other"}
            value="other"
            onChange={(e) => onchange(e.target.value)}
          />
          <span>Khác</span>
        </label>
      </div>

      {/* Nếu chọn khác thì hiện form */}
      {orderAddress === "other" && (
        <SelectAddressForm getValue={setOtherAddress} />
      )}
    </div>
  );
}
