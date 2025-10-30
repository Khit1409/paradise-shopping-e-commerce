"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { CreateProductHook } from "../hook/CreateProductHook";
import CreateProductInformtaion from "../product/CreateProductInformtaion";
import CreateProductCategory from "../product/CreateProductCategory";
import CreateProductImage from "../product/CreateProductImage";

export default function CreateNewProduct() {
  /**
   * use hook
   */
  const {
    onchangeInformation,
    attribute,
    setAttribute,
    selectedCategory,
    setSelectedCategory,
    productImageDetail,
    setProductImageDetail,
    productThumbnail,
    setProductThumbnail,
    submitCreate,
  } = CreateProductHook();
  /**
   * tsx
   */
  return (
    <section className="p-1">
      <CreateProductInformtaion onchange={onchangeInformation} />
      <CreateProductCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        attribute={attribute}
        setAttribute={setAttribute}
      />
      <CreateProductImage
        productImageDetail={productImageDetail}
        productThumbnail={productThumbnail}
        setProductImageDetail={setProductImageDetail}
        setProductThumbnail={setProductThumbnail}
      />
      <section className="border-t border-gray-300 py-2">
        <button
          className="border border-green-500 px-2 py-1 hover:text-white hover:bg-green-600"
          onClick={() => submitCreate()}
        >
          THÊM MỚI <FontAwesomeIcon icon={faSave} />
        </button>
      </section>
    </section>
  );
}
