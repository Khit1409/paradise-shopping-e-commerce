import { UserResponse } from "@/api/services/auth.service";
import { faCheck, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SetStateAction, useEffect, useState } from "react";

type ComponentProps = {
  user: UserResponse;
  getAddressValue: React.Dispatch<
    SetStateAction<{ _id: string; addressName: string }[]>
  >;
  getPhoneValue: React.Dispatch<
    SetStateAction<{ _id: string; phoneNum: string }[]>
  >;
  getEmailValue: React.Dispatch<
    SetStateAction<{ _id: string; emailAddress: string }[]>
  >;
  submitChange: React.Dispatch<SetStateAction<boolean>>;
  isSubmit: boolean;
};

export default function UserUpdateContact({ ...props }: ComponentProps) {
  /**
   * Component state
   */
  const [updateAddress, setUpdateAddress] = useState<
    { _id: string; addressName: string }[]
  >([]);
  const [updatePhone, setUpdatePhone] = useState<
    { _id: string; phoneNum: string }[]
  >([]);
  const [updateEmail, setUpdateEmail] = useState<
    { _id: string; emailAddress: string }[]
  >([]);

  /**
   * Set default value state
   */

  useEffect(() => {
    setUpdateAddress(props.user.userAddress);
    setUpdatePhone(props.user.userOtherPhone);
    setUpdateEmail(props.user.userOtherEmail);
  }, [props.user]);

  /**
   * Onchange email, address, phone
   */
  //email
  const onchangeEmail = (index: number, value: string) => {
    setUpdateEmail((prev) => {
      const valueList = [...(prev ?? [])];
      if (!valueList[index]) {
        const newObj: { _id: string; emailAddress: string } = {
          _id: "",
          emailAddress: "",
        };
        newObj._id = crypto.randomUUID();
        newObj.emailAddress = value;
        valueList[index] = newObj;
      }
      return valueList.map((m, idx) =>
        idx === index ? { ...m, emailAddress: value } : m
      );
    });
  };
  //address
  const onchangeAddress = (index: number, value: string) => {
    setUpdateAddress((prev) => {
      const valueList = [...(prev ?? [])];
      if (!valueList[index]) {
        const newObj: { _id: string; addressName: string } = {
          _id: "",
          addressName: "",
        };
        newObj._id = crypto.randomUUID();
        newObj.addressName = value;
        valueList[index] = newObj;
      }
      return valueList.map((m, idx) =>
        idx === index ? { ...m, addressName: value } : m
      );
    });
  };
  //phone
  const onchangePhone = (index: number, value: string) => {
    setUpdatePhone((prev) => {
      const valueList = [...(prev ?? [])];
      if (!valueList[index]) {
        const newObj: { _id: string; phoneNum: string } = {
          _id: "",
          phoneNum: "",
        };
        newObj._id = crypto.randomUUID();
        newObj.phoneNum = value;
        valueList[index] = newObj;
      }
      return valueList.map((m, idx) =>
        idx === index ? { ...m, phoneNum: value } : m
      );
    });
  };

  return (
    <section className="p-4 bg-white rounded shadow-md">
      <h3 className="uppercase font-semibold border-b">Thông tin liên lạc</h3>
      <div className="flex flex-col gap-3 p-2 mt-4">
        <h5 className="border-b uppercase">cập nhật địa chỉ</h5>
        {/* address */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, indexForm) => (
            <div key={indexForm} className="flex flex-col gap-3">
              <label htmlFor={`address_${indexForm}`} className="font-semibold">
                Địa chỉ {indexForm + 1}
              </label>
              <input
                className="border border-gray-300 outline-hidden p-1"
                type="text"
                onChange={(e) => onchangeAddress(indexForm, e.target.value)}
                id={`address_${indexForm}`}
                name={`address_${indexForm}`}
                defaultValue={
                  updateAddress?.[indexForm]
                    ? updateAddress[indexForm].addressName
                    : ""
                }
              />
            </div>
          ))}
        </div>
        <h5 className="border-b uppercase">cập nhật số điện thoại</h5>
        {/* phone */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, indexForm) => (
            <div key={indexForm} className="flex flex-col gap-3">
              <label htmlFor={`phone_${indexForm}`} className="font-semibold">
                Số điện thoại {indexForm + 1}
              </label>
              <input
                className="border border-gray-300 outline-hidden p-1"
                type="tel"
                id={`phone_${indexForm}`}
                onChange={(e) => onchangePhone(indexForm, e.target.value)}
                name={`phone_${indexForm}`}
                defaultValue={
                  updatePhone?.[indexForm]
                    ? updatePhone[indexForm].phoneNum
                    : ""
                }
              />
            </div>
          ))}

          <h5 className="border-b uppercase">cập nhật địa chỉ email</h5>
          {/* email */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, indexForm) => (
              <div key={indexForm} className="flex flex-col gap-3">
                <label htmlFor={`email_${indexForm}`} className="font-semibold">
                  Địa chỉ Email {indexForm + 1}
                </label>
                <input
                  className="border border-gray-300 outline-hidden p-1"
                  type="email"
                  id={`email_${indexForm}`}
                  onChange={(e) => onchangeEmail(indexForm, e.target.value)}
                  name={`email_${indexForm}`}
                  defaultValue={
                    updateEmail?.[indexForm]
                      ? updateEmail[indexForm].emailAddress
                      : ""
                  }
                />
              </div>
            ))}
          </div>
          <h5 className="border-b uppercase">Xác nhận thay đổi</h5>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                props.getEmailValue(updateEmail);
                props.getAddressValue(updateAddress);
                props.getPhoneValue(updatePhone);
                props.submitChange(true);
              }}
              className="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
            >
              Xác nhận{" "}
              {props.isSubmit ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )}
            </button>
            <span className="text-yellow-500">
              *Lưu ý khi bạn thay đổi thông tin liên lạc phải nhấn nút xác nhận
              để lưu thay đổi ( Không áp dụng cho thay đổi khác ) !
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
