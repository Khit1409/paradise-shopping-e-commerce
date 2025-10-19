"use client";

import { categories } from "@/api/category_api";
import { ProvinceApiType } from "@/api/interfaces/app.interface";
import { AppDispatch } from "@/api/Redux/store";
import { getAddressThunk } from "@/api/Redux/Thunk/App/app.thunk";
import {
  faCancel,
  faList,
  faLocationDot,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const filterList = [
  {
    id: 1,
    title: "Giá tiền",
    name: "price",
    content: [
      {
        name: "0 - 100.000 vnd",
        value: 100000,
      },
      {
        name: "100.000 vnd - 500.000",
        value: 500000,
      },
      {
        name: "500.000 trở lên",
        value: 600000,
      },
    ],
  },
  {
    id: 2,
    title: "Khuyến mại",
    name: "sale",
    content: [
      {
        name: "0 - 20%",
        value: 20,
      },
      {
        name: "20 - 50%",
        value: 50,
      },
      {
        name: "50% trở lên",
        value: 99,
      },
    ],
  },
];

export default function ProductFilter({
  location,
  setLocation,
  setCostFilter,
  setCateSlug,
}: {
  setCateSlug: React.Dispatch<React.SetStateAction<string>>;
  location?: string;
  setCostFilter: (
    value: React.SetStateAction<{
      price?: number;
      sale?: number;
    }>
  ) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) {
  /**
   * component state
   */
  const [provinceApi, setProvinceApi] = useState<ProvinceApiType[]>([]);
  const [showMore, setShowMore] = useState<number>(10);
  const onChangeCostFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setCostFilter((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };
  /**
   *
   */
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      const address = await dispatch(getAddressThunk());
      if (getAddressThunk.fulfilled.match(address)) {
        setProvinceApi(address.payload.province);
      }
    })();
  }, [dispatch]);
  return (
    <section className="w-[300px] flex-1 p-3 bg-white text-gray-700 h-screen overflow-y-auto">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
          <div>
            <button
              className="px-2 py-1 border border-yellow-500"
              onClick={() => {
                setCateSlug("");
                setLocation("");
                setCostFilter({});
              }}
            >
              Hủy <FontAwesomeIcon icon={faCancel} className="text-red-500" />
            </button>
          </div>
          {/* khu vực */}
          <div className="flex flex-col gap-3 mt-2">
            <p className="text-gray-700 font-semibold">
              <FontAwesomeIcon icon={faLocationDot} />
              KHU VỰC
            </p>
            {provinceApi.slice(0, showMore).map((prov) => (
              <div key={prov.code} className="">
                <input
                  type="checkbox"
                  className="me-1"
                  onDoubleClick={() => setLocation("")}
                  value={prov.codename}
                  checked={location === prov.codename}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {prov.name}
              </div>
            ))}
            {showMore == 10 ? (
              <button
                className="text-start text-gray-700 opacity-50"
                onClick={() => setShowMore(provinceApi.length)}
              >
                Xem thêm {">"}
              </button>
            ) : (
              <button
                className="text-start text-gray-700 opacity-50"
                onClick={() => setShowMore(10)}
              >
                {"<"} Ẩn
              </button>
            )}
          </div>
          {/* giá sản phẩm */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-gray-700">
              <FontAwesomeIcon icon={faWallet} />
              Giá tiền
            </p>
            {filterList.map((ft) => (
              <select
                className="border border-gray-300 p-1"
                name={ft.name}
                onChange={onChangeCostFilter}
                key={ft.id}
              >
                <option value={0}>{ft.title}</option>
                {ft.content.map((c, idx) => (
                  <option value={c.value} key={idx}>
                    {c.name}
                  </option>
                ))}
              </select>
            ))}
          </div>
          {/* Danh mục */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-gray-700">
              <FontAwesomeIcon icon={faList} /> DANH MỤC
            </p>
            {categories.map((cate) => (
              <button
                className="text-start hover:underline hover:text-blue-500"
                onClick={() => setCateSlug(cate.slug)}
                key={cate.id}
              >
                {cate.name.toLocaleUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
