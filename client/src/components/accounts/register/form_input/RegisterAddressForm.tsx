"use client";

import { ProvinceApiType, WradApiType } from "@/api/interfaces/app.interface";
import { AppDispatch } from "@/api/Redux/store";
import { getAddressThunk } from "@/api/Redux/Thunk/App/app.thunk";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type ComponentProps = {
  getAddress: React.Dispatch<SetStateAction<string>>;
};

export default function RegisterAddressForm({ ...props }: ComponentProps) {
  /**
   * Component state
   */
  const [provinceApi, setProvinceApi] = useState<ProvinceApiType[]>([]);
  const [wardApi, setWardApi] = useState<WradApiType[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [specificAddress, setSpecificAddress] = useState<string>("");
  /**
   * redux
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   * Call api
   */
  useEffect(() => {
    (async () => {
      const address = await dispatch(getAddressThunk());
      if (getAddressThunk.fulfilled.match(address)) {
        setWardApi(address.payload.ward);
        setProvinceApi(address.payload.province);
      }
    })();
  }, [dispatch]);
  /**
   * Auto change address
   */
  useEffect(() => {
    props.getAddress(`${specificAddress}-${selectedWard}-${selectedProvince}`);
  }, [specificAddress, selectedWard, selectedProvince, props]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-xl text-gray-700">Tỉnh / Thành Phố</label>
        <div>
          <FontAwesomeIcon icon={faCity} className="me-2" />
          <input
            type={"text"}
            placeholder="Chọn Tỉnh / Thành Phố"
            onChange={(e) => setSelectedProvince(e.target.value)}
            list="provinceList"
            className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
          />
          <datalist id="provinceList">
            {provinceApi.map((p) => (
              <option key={p.code} value={p.name} />
            ))}
          </datalist>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl text-gray-700">Xã / Phường</label>
        <div>
          <FontAwesomeIcon icon={faCity} className="me-2" />
          <input
            type={"text"}
            list="wardList"
            onChange={(e) => setSelectedWard(e.target.value)}
            placeholder="Chọn Xã / Phường"
            className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
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
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl text-gray-700">Địa chỉ cụ thể</label>
        <div>
          <FontAwesomeIcon icon={faCity} className="me-2" />
          <input
            type={"text"}
            onChange={(e) => setSpecificAddress(e.target.value)}
            placeholder="Địa chỉ cụ thể"
            className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
          />
        </div>
      </div>
    </>
  );
}
