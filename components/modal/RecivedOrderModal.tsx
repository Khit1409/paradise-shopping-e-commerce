"use client";
import { RootState } from "@/redux/store";
import React, { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type ComponentProps = {
  getContact: React.Dispatch<
    SetStateAction<{
      name: string;
      phone: string;
      email: string;
      address: string;
    }>
  >;
  selectedContact: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  submitOrder: () => Promise<void>;
  onCloseModal: () => void;
};

// Example data
const EXAMPLE_PROVINCE_API = [
  { id: 1, name: "province1" },
  { id: 2, name: "province2" },
  { id: 3, name: "province3" },
];
const EXAMPLE_WARD_API = [
  { id: 1, name: "ward1" },
  { id: 2, name: "ward2" },
  { id: 3, name: "ward3" },
];

const EXAMPLE_ADDRESS_API = {
  ward: EXAMPLE_WARD_API,
  province: EXAMPLE_PROVINCE_API,
};

export default function RecivedOrderModal(props: ComponentProps) {
  const { getContact, submitOrder, onCloseModal, selectedContact } = props;

  // State
  const [tab, setTab] = useState<"ward" | "province">("province");
  const [wardName, setWardName] = useState<string>("");
  const [proVinceName, setProvinceName] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [onSelect, setOnSelect] = useState<boolean>(false);
  const [unselect, setUnSelect] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);

  // Update parent address whenever input changes
  useEffect(() => {
    if (specificAddress || proVinceName || wardName) {
      getContact((prev) => ({
        ...prev,
        address: `${specificAddress} ${wardName} ${proVinceName}`.trim(),
      }));
    }
  }, [specificAddress, wardName, proVinceName, getContact]);

  return (
    <div className="flex flex-col gap-4">
      {/* Name & Phone */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-1">
          <label className="text-sm font-medium" htmlFor="full_name">
            Họ & Tên
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className="border border-gray-300 p-2  outline-none outline-0"
            onChange={(e) =>
              getContact((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <label className="text-sm font-medium" htmlFor="phone">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            value={selectedContact.phone ?? ""}
            name="phone"
            className="border border-gray-300 p-2  outline-none outline-0"
            onChange={(e) =>
              getContact((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={selectedContact.email ?? ""}
          name="email"
          className="border border-gray-300 p-2  outline-none outline-0"
          onChange={(e) =>
            getContact((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      {/* Address Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Chọn địa chỉ của bạn</label>
        <input
          type="text"
          readOnly
          value={
            `${proVinceName} ${wardName} ${specificAddress}`.trim() ||
            selectedContact.address
          }
          placeholder="Nhập Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
          className="border border-gray-300 p-2  w-full cursor-pointer outline-0"
          onClick={() => setOnSelect(true)}
        />
        {unselect === "province" && !proVinceName && (
          <p className="text-sm text-red-500">
            Vui lòng chọn Tỉnh/Thành Phố trước
          </p>
        )}
        {unselect === "ward" && !wardName && (
          <p className="text-sm text-red-500">Vui lòng chọn Phường/Xã trước</p>
        )}

        {/* Dropdown select */}
        {onSelect && (
          <div className="border border-gray-300  mt-2">
            {/* Tabs */}
            <div className="flex">
              <button
                className={`flex-1 py-2 border-b-2 ${
                  tab === "province"
                    ? "border-gray-400 font-semibold"
                    : "border-transparent"
                }`}
                onClick={() => setTab("province")}
              >
                Tỉnh/Thành Phố
              </button>
              <button
                className={`flex-1 py-2 border-b-2 ${
                  tab === "ward"
                    ? "border-gray-400 font-semibold"
                    : "border-transparent"
                }`}
                onClick={() => setTab("ward")}
              >
                Phường/Xã
              </button>
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto flex flex-col">
              {EXAMPLE_ADDRESS_API[tab].map((data) => (
                <button
                  key={data.id}
                  className="text-left px-3 py-2 hover:bg-orange-100"
                  onClick={() => {
                    if (tab === "province") {
                      setProvinceName(data.name);
                    } else {
                      if (!proVinceName) return setUnSelect("province");
                      setWardName(data.name);
                    }
                  }}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Specific Address */}
      <div className="flex flex-col gap-1">
        <label htmlFor="specific_address" className="text-sm font-medium">
          Địa chỉ cụ thể
        </label>
        <input
          id="specific_address"
          name="specific_address"
          className="border border-gray-300 p-2  outline-none outline-0"
          onChange={(e) => {
            if (!proVinceName || !wardName) return setUnSelect("ward");
            setSpecificAddress(e.target.value);
          }}
        />
      </div>

      {/* Default user info */}
      <div className="mt-3 border-t border-gray-300 pt-2 flex flex-col gap-3">
        <p className="text-sm font-medium">
          Bạn cũng có thể dùng thông tin mặc định
        </p>

        {/* Addresses */}
        <div className="flex flex-col gap-1">
          {user?.address.map((a) => (
            <label key={a} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={a}
                checked={selectedContact.address === a}
                value={a}
                onChange={(e) => {
                  if (!getContact) {
                    return;
                  } else {
                    setProvinceName("");
                    setWardName("");
                    setSpecificAddress("");
                    setOnSelect(false);
                    setUnSelect("");
                    getContact((prev) =>
                      prev.address !== a
                        ? { ...prev, address: e.target.value }
                        : { ...prev, address: "" }
                    );
                  }
                }}
              />
              {a}
            </label>
          ))}
        </div>

        {/* Phones */}
        <div className="flex flex-col gap-1">
          {user?.phone.map((p) => (
            <label key={p} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={p}
                checked={selectedContact.phone === p}
                value={p}
                onChange={(e) =>
                  getContact((prev) =>
                    prev.phone !== p
                      ? { ...prev, phone: e.target.value }
                      : { ...prev, phone: "" }
                  )
                }
              />
              {p}
            </label>
          ))}
        </div>

        {/* Emails */}
        <div className="flex flex-col gap-1">
          {user?.email.map((mail) => (
            <label key={mail} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={mail}
                checked={selectedContact.email === mail}
                value={mail}
                onChange={(e) =>
                  getContact((prev) =>
                    prev.email !== mail
                      ? { ...prev, email: e.target.value }
                      : { ...prev, email: "" }
                  )
                }
              />
              {mail}
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          className="px-4 py-2 border border-red-500 text-red-500  hover:bg-red-500 hover:text-white transition"
          onClick={onCloseModal}
        >
          HỦY
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white  border border-orange-500 hover:bg-orange-600 transition"
          onClick={async () => await submitOrder()}
        >
          XÁC NHẬN
        </button>
      </div>
    </div>
  );
}
