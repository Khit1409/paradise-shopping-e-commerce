"use client";
import { AppDispatch } from "@/redux/store";

import {
  faList,
  faLocationDot,
  faWallet,
  faPercent,
  faDeleteLeft,
  faTable,
  faEyeSlash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProvinceApiType } from "@/type/app.interface";
import { getAddressThunk } from "@/redux/app/thunk";

/**
 * props type
 */
type ComponentProps = {
  clear: () => void;
  setCateSlug: React.Dispatch<React.SetStateAction<string>>;
  setCostFilter: (
    value: React.SetStateAction<{
      price?: { max_price?: number; min_price?: number };
      sale?: { max_sale?: number; min_sale?: number };
    }>
  ) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};
/**
 * product filter section
 * @param param0
 * @returns
 */
export default function ProductFilter(props: ComponentProps) {
  /**
   * props
   */
  const { clear, setCateSlug, setCostFilter, setLocation } = props;
  /**
   * component state
   */
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [savedCostFilter, setSavedCostFilter] = useState<{
    price?: { max_price?: number; min_price?: number };
    sale?: { max_sale?: number; min_sale?: number };
  }>({});
  const [savedLocation, setSavedLocation] = useState<string>("");
  const [provinceApi, setProvinceApi] = useState<ProvinceApiType[]>([]);
  const [savedCateSlug, setSavedCateSlug] = useState<string>("");
  /**
   * redux dispatch
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   * onchange price filter
   * @param e
   */
  const onchangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSavedCostFilter((prev) => {
      if (Number(value) > 0) {
        return { ...prev, price: { ...prev.price, [name]: Number(value) } };
      } else {
        return { ...prev, price: {} };
      }
    });
  };
  /**
   * onchange sale filter
   * @param e
   */
  const onchangeSale = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSavedCostFilter((prev) => {
      if (Number(value) > 0) {
        return { ...prev, sale: { ...prev.sale, [name]: value } };
      } else {
        return { ...prev, sale: {} };
      }
    });
  };
  /**
   * onchange location select
   */
  const onchangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const thisProvince = provinceApi.find((f) => f.name === selected);
    if (thisProvince) {
      setSavedLocation(thisProvince.codename);
    } else {
      setSavedLocation("");
    }
  };
  /**
   * submit filter value
   */
  const submitFilter = () => {
    setCostFilter(savedCostFilter);
    setLocation(savedLocation);
    setCateSlug(savedCateSlug);
    setSavedCateSlug("");
    setSavedCostFilter({});
    setSavedLocation("");
  };
  /**
   * call api when start mount
   */
  useEffect(() => {
    (async () => {
      const address = await dispatch(getAddressThunk());
      if (getAddressThunk.fulfilled.match(address)) {
        setProvinceApi(address.payload.province);
      }
    })();
  }, [dispatch]);
  /**
   * render
   */
  return (
    <section className="bg-white p-2 justify-center border border-gray-200 text-gray-700 flex flex-col gap-3">
      <div>
        <button
          className="text font-bold text-gray-800"
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faTable} className="me-2" />
          LỌC SẢN PHẨM
        </button>
      </div>
      {openModal && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* KHU VỰC */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="font-semibold text-gray-700 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faLocationDot} />
                Khu vực
              </label>
              <select
                id="location"
                name="location"
                onChange={(e) => {
                  onchangeLocation(e);
                }}
                className="border border-gray-300  p-2 outline-none "
              >
                <option value="">Chọn khu vực gần bạn nhất</option>
                {provinceApi.map((p) => (
                  <option value={p.name} key={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GIÁ SẢN PHẨM */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faWallet} />
                Giá sản phẩm
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  name="min_price"
                  onChange={onchangePrice}
                  value={savedCostFilter.price?.min_price ?? ""}
                  placeholder="Từ"
                  className="w-1/2 border border-gray-300  p-2 outline-none "
                />
                <input
                  type="number"
                  name="max_price"
                  value={savedCostFilter.price?.max_price ?? ""}
                  onChange={onchangePrice}
                  placeholder="Đến"
                  className="w-1/2 border border-gray-300  p-2 outline-none "
                />
              </div>
            </div>

            {/* KHUYẾN MÃI */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faPercent} />
                Khuyến mãi (%)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={savedCostFilter.sale?.min_sale ?? ""}
                  name="min_sale"
                  onChange={onchangeSale}
                  placeholder="Từ"
                  className="w-1/2 border border-gray-300  p-2 outline-none "
                />
                <input
                  type="number"
                  name="max_sale"
                  value={savedCostFilter.sale?.max_sale ?? ""}
                  onChange={onchangeSale}
                  placeholder="Đến"
                  className="w-1/2 border border-gray-300  p-2 outline-none "
                />
              </div>
            </div>

            {/* DANH MỤC */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faList} />
                Danh mục
              </label>
              <select
                id="category_select"
                onChange={(e) => setSavedCateSlug(e.target.value)}
                className="border border-gray-300  p-2 outline-none "
              >
                <option value="">Chọn danh mục bạn cần</option>
                {/* {PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.map((cate) => (
                  <option value={cate.slug} key={cate.category}>
                    {cate.category.toUpperCase()}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          {/* button action */}
          <div className="flex gap-3 items-center justify-end">
            <button
              className="border border-green-500 px-2 py-1
            hover:bg-green-600
            hover:text-white
            "
              onClick={() => {
                submitFilter();
              }}
            >
              Tìm <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              className="border border-gray-300 py-1 px-2
              hover:text-white hover:bg-gray-500
              "
              onClick={() => clear()}
            >
              Mặc định
              <FontAwesomeIcon icon={faDeleteLeft} className="ms-2" />
            </button>
            <button
              className="border text-red-500 border-red-500 py-1 px-2
              hover:text-white hover:bg-red-600
              "
              onClick={() => {
                clear();
                setOpenModal(false);
              }}
            >
              Ẩn
              <FontAwesomeIcon icon={faEyeSlash} className=" ms-2" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
