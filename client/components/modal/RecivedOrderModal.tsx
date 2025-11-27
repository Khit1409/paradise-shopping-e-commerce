"use client";
import { getAddressThunk } from "@/redux/app/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { ProvinceApiType, WardApiType } from "@/type/app.interface";
import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
export default function RecivedOrderModal(props: ComponentProps) {
  // State
  const [tab, setTab] = useState<"ward" | "province">("province");
  const [wardName, setWardName] = useState<string>("");
  const [provinceName, setProvinceName] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [onSelect, setOnSelect] = useState<boolean>(false);
  const [unselect, setUnSelect] = useState<string>("");
  const { getContact, submitOrder, onCloseModal, selectedContact } = props;
  const [addressAPI, setAddressAPI] = useState<{
    ward: WardApiType[];
    province: ProvinceApiType[];
  }>({
    ward: [],
    province: [],
  });

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    /**
     * call address api
     */
    const getAddressApi = async () => {
      const address = await dispatch(getAddressThunk());
      if (getAddressThunk.fulfilled.match(address)) {
        setAddressAPI({
          ward: address.payload.ward,
          province: address.payload.province,
        });
      }
    };
    getAddressApi();
  }, [dispatch]);

  // Update parent address whenever input changes
  useEffect(() => {
    if (specificAddress || provinceName || wardName) {
      getContact((prev) => ({
        ...prev,
        address: `${specificAddress} ${wardName} ${provinceName}`.trim(),
      }));
    }
  }, [specificAddress, wardName, provinceName, getContact]);

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
            `${provinceName} ${wardName} ${specificAddress}`.trim() ||
            selectedContact.address
          }
          placeholder="Nhập Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
          className="border border-gray-300 p-2  w-full cursor-pointer outline-0"
          onClick={() => setOnSelect(true)}
        />
        {unselect === "province" && !provinceName && (
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
              {tab === "province"
                ? addressAPI.province.map((data) => (
                    <button
                      key={data.code}
                      className="text-left px-3 py-2 hover:bg-orange-100"
                      onClick={() => {
                        setProvinceName(data.name);
                      }}
                    >
                      {data.name}
                    </button>
                  ))
                : addressAPI.ward
                    .filter((ft) =>
                      provinceName
                        ? ft.province_code ===
                          addressAPI.province.find(
                            (f) => f.name === provinceName
                          )?.code
                        : ft
                    )
                    .map((data) => (
                      <button
                        key={data.code}
                        className="text-left px-3 py-2 hover:bg-orange-100"
                        onClick={() => {
                          if (!provinceName) return setUnSelect("province");
                          setWardName(data.name);
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
            if (!provinceName || !wardName) return setUnSelect("ward");
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
