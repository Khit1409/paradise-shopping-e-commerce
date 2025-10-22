import { ProvinceApiType, WradApiType } from "@/api/interfaces/app.interface";
import { AppDispatch } from "@/api/redux/store";
import { getAddressThunk } from "@/api/redux/thunk/app_thunk/app.thunk";
import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/** Props từ component cha */
type ComponentProps = {
  getValue: React.Dispatch<SetStateAction<string>>;
};

export default function SelectAddressForm({ getValue }: ComponentProps) {
  /** Local state */
  const [provinceApi, setProvinceApi] = useState<ProvinceApiType[]>([]);
  const [wardApi, setWardApi] = useState<WradApiType[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");

  /** Redux dispatch */
  const dispatch = useDispatch<AppDispatch>();

  /** Gọi API lấy dữ liệu tỉnh & xã */
  useEffect(() => {
    (async () => {
      const address = await dispatch(getAddressThunk());
      if (getAddressThunk.fulfilled.match(address)) {
        setWardApi(address.payload.ward);
        setProvinceApi(address.payload.province);
      }
    })();
  }, [dispatch]);

  /** Xác nhận địa chỉ và gửi lên component cha */
  const setValue = () => {
    getValue(`${specificAddress} - ${selectedWard} - ${selectedProvince}`);
    setSelectedProvince("");
    setSelectedWard("");
    setSpecificAddress("");
  };

  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-md">
      {/* Province */}
      <div className="flex flex-col gap-2 mb-3">
        <label className="font-semibold text-gray-700" htmlFor="province">
          Tỉnh / Thành phố
        </label>
        <input
          type="text"
          list="provinceList"
          id="province"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="border border-gray-400 p-2 focus:outline-none focus:border-green-600"
          placeholder="Nhập hoặc chọn tỉnh/thành..."
        />
        <datalist id="provinceList">
          {provinceApi.map((pro) => (
            <option value={pro.name} key={pro.code} />
          ))}
        </datalist>
      </div>

      {/* Ward */}
      {selectedProvince && (
        <div className="flex flex-col gap-2 mb-3">
          <label className="font-semibold text-gray-700" htmlFor="ward">
            Phường / Xã
          </label>
          <input
            type="text"
            list="wardList"
            id="ward"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="border border-gray-400 p-2 focus:outline-none focus:border-green-600"
            placeholder="Nhập hoặc chọn phường/xã..."
          />
          <datalist id="wardList">
            {(() => {
              const selected = provinceApi.find(
                (f) => f.name === selectedProvince
              );
              return selected
                ? wardApi
                    .filter((ft) => ft.province_code == selected.code)
                    .map((w) => <option key={w.code} value={w.name} />)
                : null;
            })()}
          </datalist>
        </div>
      )}

      {/* Specific address */}
      {selectedWard && (
        <div className="flex flex-col gap-2 mb-3">
          <label className="font-semibold text-gray-700" htmlFor="specific">
            Địa chỉ cụ thể
          </label>
          <input
            type="text"
            id="specific"
            value={specificAddress}
            onChange={(e) => setSpecificAddress(e.target.value)}
            className="border border-gray-400 p-2 focus:outline-none focus:border-green-600"
            placeholder="Nhập địa chỉ cụ thể..."
          />
        </div>
      )}

      {/* Submit */}
      {selectedWard && selectedProvince && specificAddress && (
        <button
          onClick={setValue}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
        >
          Xác nhận
        </button>
      )}
    </div>
  );
}
