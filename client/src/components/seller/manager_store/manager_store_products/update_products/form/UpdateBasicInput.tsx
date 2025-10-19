"use client";

import { Dispatch, SetStateAction } from "react";

type BasicInputType = {
  proName?: string;
  proPrice?: number;
  proSale?: number;
  proDescription?: string;
};

type ComponentProps = {
  basicInputValue: BasicInputType | undefined;
  setBasicInput: Dispatch<SetStateAction<BasicInputType | undefined>>;
};

export default function BasicInput({
  setBasicInput,
  basicInputValue,
}: ComponentProps) {
  /**
   * Handle changes for both <input> and <textarea>
   */
  const handleOnchangeBasicInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBasicInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="flex flex-col gap-5 p-4 text-gray-800 bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">
            Tên sản phẩm
          </label>
          <input
            type="text"
            onChange={handleOnchangeBasicInput}
            name="proName"
            defaultValue={basicInputValue?.proName}
            className="border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            placeholder="Nhập tên sản phẩm..."
          />
        </div>

        {/* Product Price */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">
            Giá sản phẩm
          </label>
          <input
            type="number"
            min={0}
            onChange={handleOnchangeBasicInput}
            name="proPrice"
            defaultValue={basicInputValue?.proPrice}
            className="border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            placeholder="Nhập giá sản phẩm..."
          />
        </div>

        {/* Product Sale */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">
            Giá khuyến mại (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            onChange={handleOnchangeBasicInput}
            name="proSale"
            defaultValue={basicInputValue?.proSale}
            className="border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            placeholder="Nhập % khuyến mại..."
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-700">
            Mô tả sản phẩm
          </label>
          <textarea
            onChange={handleOnchangeBasicInput}
            name="proDescription"
            defaultValue={basicInputValue?.proDescription}
            className="border border-gray-300 rounded-xl p-2.5 min-h-[180px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            placeholder="Nhập mô tả chi tiết sản phẩm..."
          />
        </div>
      </section>
    </>
  );
}
