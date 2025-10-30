import React, { SetStateAction } from "react";

/**
 * component props
 */
interface ComponentProps {
  userOtherEmail:
    | {
        _id: string;
        emailAddress: string;
      }[]
    | null;
  orderEmail: string;
  setOrderEmail: React.Dispatch<SetStateAction<string>>;
  setOtherEmail: React.Dispatch<SetStateAction<string>>;
}
/**
 * func compn
 * @returns
 */
export default function OrderSelectEmail(props: ComponentProps) {
  /**
   * props
   */
  const { userOtherEmail, orderEmail, setOrderEmail, setOtherEmail } = props;
  //   return
  return (
    <section className="py-3 border-t border-gray-300 flex flex-col gap-3">
      <h3 className="font-semibold">Email nhận hàng</h3>
      <div className="flex flex-col gap-2">
        {userOtherEmail ? (
          userOtherEmail.map((email) => (
            <div className="flex items-center gap-2" key={email._id}>
              <input
                type="checkbox"
                id={email._id}
                checked={email.emailAddress === orderEmail}
                value={email.emailAddress}
                onChange={(e) => {
                  setOrderEmail(
                    e.target.value === orderEmail ? "" : e.target.value
                  );
                }}
              />
              <label htmlFor={email._id}>{email.emailAddress}</label>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Chưa có email nào!</p>
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={"otherEmail"}
            onChange={() =>
              setOrderEmail(orderEmail === "other" ? "" : "other")
            }
            checked={orderEmail === "other"}
          />
          <label htmlFor={"otherEmail"}>Khác</label>
        </div>
        {orderEmail === "other" && (
          <input
            type="text"
            className="border border-gray-300 p-1 outline-green-300"
            onChange={(e) => {
              setOtherEmail(e.target.value);
            }}
          />
        )}
      </div>
    </section>
  );
}
