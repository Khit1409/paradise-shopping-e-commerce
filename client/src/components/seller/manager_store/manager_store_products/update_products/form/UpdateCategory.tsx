import { categories } from "@/api/category_api";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";

type ComponentProps = {
  setCateSlug: Dispatch<SetStateAction<string>>;
};

export default function UpdateCategory({ setCateSlug }: ComponentProps) {
  return (
    <section className="w-full flex flex-col gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-800">
      {/* Label */}
      <label htmlFor="category" className="font-semibold text-sm text-gray-700">
        Danh mục sản phẩm
      </label>

      {/* Warning note */}
      <p className="text-yellow-600 text-sm flex items-center gap-2">
        <FontAwesomeIcon icon={faWarning} className="text-yellow-500" />
        <span>Sản phẩm sẽ chuyển sang danh mục khác nếu bạn thay đổi.</span>
      </p>

      {/* Dropdown */}
      <select
        name="category"
        required
        id="category"
        onChange={(e) => setCateSlug(e.target.value)}
        className="border border-gray-300 rounded-xl p-2.5 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
      >
        <option value="">-- Chọn danh mục --</option>
        {categories.map((c) => (
          <option value={c.slug} key={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </section>
  );
}
