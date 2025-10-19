import { categories } from "@/api/category_api";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";

type ComponentProps = {
  setCateSlug: Dispatch<SetStateAction<string>>;
};

export default function CategoryInput({setCateSlug}:ComponentProps) {
  return (
    <section className="p-3 bg-white rounded shadow-md">
      <label htmlFor="category" className="font-semibold">
        Danh mục sản phẩm
      </label>
      <p className="text-yellow-600">
        <FontAwesomeIcon icon={faWarning} />
        {"Danh mục sản phẩm bắt buộc phải chọn."}
      </p>
      <select
        name="category"
        required
        onChange={(e) => setCateSlug(e.target.value)}
        id="category"
        className="border border-gray-300 p-2 w-full"
      >
        <option value="">Chọn danh mục</option>
        {categories.map((c) => (
          <option value={c.slug} key={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </section>
  );
}
