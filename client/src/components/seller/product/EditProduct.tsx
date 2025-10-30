"use client";
import React from "react";
import { EditProductHook } from "../hook/EditProductHook";
import EditProductInformation from "./EditProductInformation";
import EditProductCategory from "./EditProductCategory";
import EditImageDetailt from "./EditImageDetailt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct() {
  const {
    editProductAttribute,
    editProductImageDetail,
    editProductInformation,
    setEditProductAttribute,
    setEditProductImageDetail,
    setEditProductInformation,
    submitUpdate,
  } = EditProductHook();

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
      <div className="border-t border-gray-300 py-2">
        <button
          className="border border-gray-300 px-2 py-1 hover:bg-green-500 hover:text-white"
          onClick={() => {
            submitUpdate();
          }}
        >
          XÁC NHẬN THAY ĐỔI <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
    </section>
  );
}
