import React, { SetStateAction } from "react";
/**
 * Component props
 */
interface ComponentProps {
  userOtherPhone:
    | {
        _id: string;
        phoneNum: string;
      }[]
    | null;
  orderPhone: string;
  setOrderPhone: React.Dispatch<SetStateAction<string>>;
  setOtherPhone: React.Dispatch<SetStateAction<string>>;
}
/**
 * func compn
 * @param props
 * @returns
 */
export default function OrderSelectPhone(props: ComponentProps) {
  // props
  const { setOrderPhone, setOtherPhone, userOtherPhone, orderPhone } = props;
  // return
  return (
    <div className="py-3 border-t border-gray-300 flex flex-col gap-3">
      <h3 className="font-semibold">Số điện thoại nhận hàng</h3>
      <div className="flex flex-col gap-2">
        {userOtherPhone ? (
          userOtherPhone.map((phone) => (
            <div className="flex items-center gap-2" key={phone._id}>
              <input
                type="checkbox"
                id={phone._id}
                checked={phone.phoneNum === orderPhone}
                value={phone.phoneNum}
                onChange={(e) => {
                  setOrderPhone(
                    e.target.value === orderPhone ? "" : e.target.value
                  );
                }}
              />
              <label htmlFor={phone._id}>{phone.phoneNum}</label>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Chưa có số điện thoại nào</p>
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={"otherPhone"}
            onChange={() =>
              setOrderPhone(orderPhone === "other" ? "" : "other")
            }
            checked={orderPhone === "other"}
          />
          <label htmlFor={"otherPhone"}>Khác</label>
        </div>
        {orderPhone === "other" && (
          <input
            type="text"
            className="border border-gray-300 p-1 outline-green-300"
            onChange={(e) => {
              setOtherPhone(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
}
