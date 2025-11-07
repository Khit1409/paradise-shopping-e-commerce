"use client";
import React, { SetStateAction, useEffect, useState } from "react";

type ComponentProps = {
  getAddress?: React.Dispatch<
    SetStateAction<{ name: string; type: "company" | "home" }>
  >;
  getContact?: React.Dispatch<
    SetStateAction<{
      name: string;
      phone: string;
      email: string;
    }>
  >;
  submitOrder: () => Promise<void>;
  onCloseModal: () => void;
};

const EXAMPLE_PROVINCE_API = [
  { id: 1, name: "province1" },
  { id: 3, name: "province2" },
  { id: 2, name: "province3" },
  { id: 4, name: "province4" },
  { id: 5, name: "province5" },
  { id: 6, name: "province6" },
  { id: 7, name: "province7" },
];
const EXAMPLE_WARD_API = [
  { id: 1, name: "ward1" },
  { id: 3, name: "ward2" },
  { id: 2, name: "ward3" },
  { id: 5, name: "ward4" },
  { id: 4, name: "ward5" },
  { id: 6, name: "ward6" },
  { id: 8, name: "ward7" },
  { id: 10, name: "ward9" },
  { id: 22, name: "ward8" },
  { id: 85, name: "ward10" },
];

const EXAMPLE_ADDRESS_API = {
  ward: EXAMPLE_WARD_API,
  province: EXAMPLE_PROVINCE_API,
};

export type UserAddress = {
  id: string;
  type: "home" | "company";
  isActive: boolean;
  address: string[];
};

export default function RecivedOrderModal(props: ComponentProps) {
  const { getAddress, getContact, submitOrder, onCloseModal } = props;

  const [tab, setTab] = useState<"ward" | "province">("province");
  const [wardName, setWardName] = useState<string>("");
  const [proVinceName, setProvinceName] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [onSelect, setOnSelect] = useState<boolean>(false);
  const [unselect, setUnSelect] = useState<string>("");
  const [typeAddress, setTypeAddress] = useState<"company" | "home">("home");

  useEffect(() => {
    if (!getAddress) {
      return;
    }
    getAddress({
      name: `${specificAddress} ${wardName} ${proVinceName}`,
      type: typeAddress,
    });
  }, [specificAddress, wardName, proVinceName, typeAddress, getAddress]);
  
  return (
    <div className="flex flex-col gap-3 justify-around h-full">
      <div className="flex gap-5 ">
        {/* name and phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="full_name">
            Họ & Tên
          </label>
          <input
            type="text"
            onChange={(e) => {
              if (!getContact) {
                return;
              }
              getContact((prev) => ({ ...prev, name: e.target.value }));
            }}
            name="full_name"
            id="full_name"
            className="border border-gray-300 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="phone">
            Số điện thoại
          </label>
          <input
            type="text"
            onChange={(e) => {
              if (!getContact) {
                return;
              }
              getContact((prev) => ({ ...prev, phone: e.target.value }));
            }}
            name="phone"
            id="phone"
            className="border border-gray-300 p-1"
          />
        </div>
      </div>
      {/* email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm">
          Địa chỉ email
        </label>
        <input
          type="email"
          onChange={(e) => {
            if (!getContact) {
              return;
            }
            getContact((prev) => ({ ...prev, email: e.target.value }));
          }}
          name="email"
          id="email"
          className="p-1 border border-gray-300 outline-0"
        />
      </div>
      {/* address */}
      <div className="flex gap-3 flex-col">
        <div className="flex flex-col gap-1">
          <label htmlFor="select_province_ward" className="text-sm">
            Chọn địa chỉ của bạn
          </label>
          <input
            type="text"
            id="select_province_ward"
            name="select_province_ward"
            readOnly
            value={`${proVinceName} ${wardName} ${specificAddress}`}
            onClick={() => {
              setOnSelect(true);
            }}
            className="border border-gray-300 p-1 w-full"
            placeholder="Nhập Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
          />
          {unselect === "province" && !proVinceName ? (
            <p className="text-sm mt-2 text-center text-red-500">
              Vui lòng chọn Tỉnh/Thành Phố trước
            </p>
          ) : null}
          {unselect === "ward" && !wardName ? (
            <p className="text-sm mt-2 text-center text-red-500">
              Vui lòng chọn Phường/Xã trước
            </p>
          ) : null}
        </div>
        {onSelect && (
          <div>
            <div className="flex border border-gray-300 p-2 justify-around">
              <button
                onClick={() => {
                  setTab("province");
                }}
              >
                Tỉnh/Thành Phố
              </button>
              <button
                onClick={() => {
                  setTab("ward");
                }}
              >
                Phường/Xã
              </button>
            </div>

            <div className="border border-t-transparent border-gray-300 overflow-y-auto max-h-[200px] flex flex-col gap-2">
              {EXAMPLE_ADDRESS_API[tab].map((data) => (
                <button
                  className=""
                  key={data.id}
                  onClick={() => {
                    if (tab === "province") {
                      setProvinceName(data.name);
                    } else {
                      if (!proVinceName) {
                        return setUnSelect("province");
                      }
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
        <div className="flex flex-col gap-1">
          <label htmlFor="specifice_address" className="text-sm">
            Địa chỉ cụ thể
          </label>
          <input
            id="specific_address"
            name="specific_address"
            onChange={(e) => {
              if (!proVinceName || !wardName) {
                return setUnSelect("ward");
              }
              setSpecificAddress(e.target.value);
            }}
            type="text"
            className="border border-gray-300 p-1 outline-0"
          />
        </div>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => {
              setTypeAddress("home");
            }}
            className={`px-2 py-1 border border-gray-300 ${
              typeAddress === "home" ? "bg-gray-300" : ""
            }`}
          >
            Nhà riêng
          </button>
          <button
            onClick={() => {
              setTypeAddress("company");
            }}
            className={`px-2 py-1 border border-gray-300 ${
              typeAddress === "company" ? "bg-gray-300" : ""
            }`}
          >
            Công ty
          </button>
        </div>
        <div className="flex items-center justify-end gap-3 mb-3">
          <button
            className="px-2 py-1 border-red-500 hover:bg-red-500 hover:text-white text-red-500 border"
            onClick={() => {
              onCloseModal();
            }}
          >
            HỦY
          </button>
          <button
            onClick={async () => {
              await submitOrder();
            }}
            className="bg-[orangered] border border-[orangered] px-2 py-1 text-white hover:text-gray-300"
          >
            XÁC NHẬN
          </button>
        </div>
      </div>
    </div>
  );
}
