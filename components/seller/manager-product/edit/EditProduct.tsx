"use client";
import React from "react";

import EditProductInformation from "./EditProductInformation";
import EditProductCategory from "./EditProductCategory";
import EditImageDetailt from "./EditImageDetailt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditProductHook } from "@/hook/seller/product/EditProductHook";

export default function EditProduct() {
  const {
    product,
    editProductAttribute,
    editProductImageDetail,
    editProductInformation,
    setEditProductAttribute,
    setEditProductImageDetail,
    setEditProductInformation,
    submitUpdate,
    deleteProductAction,
  } = EditProductHook();

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="uppercase">sản phẩm không tồn tại</p>
      </div>
    );
  }
  return (
    <section className="p-2 text-gray-700">
      <EditProductInformation
        setEditProductInformation={setEditProductInformation}
        editProductInformation={editProductInformation}
      />
      <EditImageDetailt
        editProductImageDetail={editProductImageDetail}
        setEditProductImageDetail={setEditProductImageDetail}
      />
      <EditProductCategory
        category={editProductInformation.proCateSlug}
        editProductAttribute={editProductAttribute}
        setEditProductAttribute={setEditProductAttribute}
        setEditProductInformation={setEditProductInformation}
      />
      <div className="border-t border-gray-300 pt-5 flex gap-3">
        <button
          className="border border-gray-300 px-2 py-1 hover:bg-green-500 hover:text-white"
          onClick={() => {
            submitUpdate();
          }}
        >
          XÁC NHẬN THAY ĐỔI <FontAwesomeIcon icon={faSave} />
        </button>
        <button
          className="border border-red-500 px-2 py-1 hover:bg-red-500 hover:text-white"
          onClick={() => deleteProductAction()}
        >
          XÓA SẢN PHẨM <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </section>
  );
}
