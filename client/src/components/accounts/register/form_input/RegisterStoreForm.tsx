import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { registerStoreList } from "./form_list";
import { RootState } from "@/api/redux/store";
import { useSelector } from "react-redux";

type ComponentProp = {
  onchangeBasicInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onchangeAddress: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function RegisterStoreForm({
  onchangeBasicInput,
  onchangeAddress,
}: ComponentProp) {
  const { wardApi } = useSelector((state: RootState) => state.app);
  return (
    <div className="min-w-[600px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-5">
      {registerStoreList.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 ">
          <label htmlFor={item.name} className="font-semibold">
            {item.title}
          </label>
          <div>
            <FontAwesomeIcon icon={faPen} className="me-1" />
            <input
              type={item.type}
              name={item.name}
              onChange={(e) => onchangeBasicInput(e)}
              id={item.name}
              className="outline-0"
              placeholder="............."
            />
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1">
        <label htmlFor="wrad" className="font-semibold">
          Phường / Xã
        </label>
        <select
          onChange={(e) => onchangeAddress(e)}
          name="wrad"
          className="border border-gray-300 p-1"
          id=""
        >
          <option value="">Chọn Phường / Xã</option>
          {wardApi.map((w) => (
            <option value={w.name} key={w.code}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="province" className="font-semibold">
          Tỉnh / Thành Phố
        </label>

        <select
          onChange={(e) => onchangeAddress(e)}
          name="province"
          required
          className="border border-gray-300 p-1"
        >
          <option value="">Chọn Tỉnh / Thành phố</option>
        </select>
      </div>
    </div>
  );
}
