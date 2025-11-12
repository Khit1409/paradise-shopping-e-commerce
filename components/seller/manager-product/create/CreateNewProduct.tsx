import React, { useState } from "react";
import {
  EXAMPLE_BRAND_JSON,
  EXAMPLE_CATEGORY_JSON,
  EXAMPLE_VARIANT_JSON,
} from "../data";
import { uploadImageToCloud } from "@/service/cloud.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import Image from "next/image";
import { createSku } from "@/utils/create-sku";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faMinus,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { ProductDataRequest } from "@/type/seller.interface";
import { createNewProduct } from "@/service/seller.service";

/**
 * --- COMPONENT START ---
 */
export default function CreateNewProduct() {
  const dispatch = useDispatch<AppDispatch>();

  // --- STATE ---
  const [data, setData] = useState<ProductDataRequest>({
    info: {
      name: "",
      slug: "",
      category: "",
      description: "",
      brand: "",
    },
    original_price: 0,
    sale: 0,
    thumbnail: "",
    images: [],
    varitants: [],
  });

  const [modelCount, setModelCount] = useState<number>(0);

  /**
   * --- HANDLER: Upload Thumbnail ---
   */
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    dispatch(onLoadingAction(true));
    const fileUrl = await uploadImageToCloud(file);

    dispatch(onLoadingAction(false));
    if (!fileUrl || fileUrl.resultCode !== 1) {
      return dispatch(
        onErrorModel({ onError: true, mess: "Lỗi tải ảnh lên đám mây!" })
      );
    }
    setData((prev) => ({ ...prev, thumbnail: fileUrl.url }));
  };

  /**
   * --- HANDLER: Upload Detail Images ---
   */
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    dispatch(onLoadingAction(true));
    const fileUrl = await uploadImageToCloud(file);
    dispatch(onLoadingAction(false));

    if (!fileUrl || fileUrl.resultCode !== 1) {
      return dispatch(
        onErrorModel({ onError: true, mess: "Lỗi tải ảnh lên đám mây!" })
      );
    }

    setData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = fileUrl.url;
      return { ...prev, images: updatedImages };
    });
  };

  /**
   * --- HANDLER: Change Variant (checkbox / value) ---
   */
  const handleVariantChange = ({
    sku,
    stoke,
    name,
    value,
  }: {
    sku: string;
    name?: string;
    stoke?: number;
    value?: string;
  }) => {
    const updatedVariants = [...(data.varitants ?? [])];
    const variantIdx = updatedVariants.findIndex((v) => v.sku === sku);
    if (variantIdx !== -1) {
      if (stoke) updatedVariants[variantIdx].stoke = stoke;
      if (name) {
        const attrIdx = updatedVariants[variantIdx].attributes.findIndex(
          (a) => a.name === name
        );
        if (attrIdx !== -1) {
          if (value) {
            const valIdx = updatedVariants[variantIdx].attributes[
              attrIdx
            ].value.findIndex((v) => v === value);
            if (valIdx !== -1) {
              updatedVariants[variantIdx].attributes[attrIdx].value.splice(
                valIdx,
                1
              );
            } else {
              updatedVariants[variantIdx].attributes[attrIdx].value.push(value);
            }
          } else {
            updatedVariants[variantIdx].attributes = updatedVariants[
              variantIdx
            ].attributes.filter((a) => a.name !== name);
          }
        } else {
          updatedVariants[variantIdx].attributes.push({
            name: name,
            value: value ? [value] : [],
          });
        }
      }
    } else {
      updatedVariants.push({
        sku,
        stoke: stoke ?? 0,
        attributes: [],
      });
    }

    setData((prev) => ({ ...prev, varitants: updatedVariants }));
  };

  /**
   * find brand list by selected category name
   * @param category
   */
  const findBrands = (category: string) => {
    const selectedCategory = EXAMPLE_CATEGORY_JSON.find(
      (cate) => cate.name === category
    );
    if (!selectedCategory) return [];
    const brandNeeded = EXAMPLE_BRAND_JSON.find(
      (fBr) => fBr.category_id === selectedCategory.id
    );
    if (!brandNeeded) return [];
    return brandNeeded.brands;
  };
  /**
   * find varitant product list by selected cate gory
   * @param category
   */
  const findVaritantAttributes = (category: string) => {
    const selectedCategory = EXAMPLE_CATEGORY_JSON.find(
      (cate) => cate.name === category
    );
    if (!selectedCategory) return [];
    const varitantNeeded = EXAMPLE_VARIANT_JSON.find(
      (fVrt) => fVrt.category_id === selectedCategory.id
    );
    if (!varitantNeeded) return [];
    return varitantNeeded.attributes;
  };
  /**
   * check is valid attribute by sku and name in data state
   * @param sku
   * @param name
   */
  const isCheckedAttribute = (sku: string, name: string) => {
    if (!data.varitants) {
      return false;
    }
    const isValidVaritant = data.varitants.find((fVr) => fVr.sku === sku);
    if (!isValidVaritant) return false;

    const isValidAttribute = isValidVaritant.attributes.find(
      (fAttr) => fAttr.name === name
    );
    if (!isValidAttribute) return false;
    return true;
  };
  /**
   * check is valid  attribute value by sku, name , value in data state
   * @param sku
   * @param name
   * @param value
   */
  const isCheckedValue = (sku: string, name: string, value: string) => {
    const isValidVaritant = data.varitants.find((fVar) => fVar.sku === sku);
    if (!isValidVaritant) return false;
    const isValidAttribute = isValidVaritant.attributes.find(
      (fAttr) => fAttr.name === name
    );
    if (!isValidAttribute) return false;
    const isValidValue = isValidAttribute.value.find((fVl) => fVl === value);
    if (!isValidValue) return false;
    return true;
  };
  /**
   * check validate value before handle request add new product
   * @param data
   * @returns
   */
  const checkValidateRequest = (data: ProductDataRequest) => {
    let errorMessage: string | null = null;
    if (data.images.length == 0) {
      errorMessage = "Vui lòng thêm ít nhất 1 ảnh mô tả sản phẩm";
    } else if (data.original_price <= 0) {
      errorMessage = "Giá sản phẩm bạn nhập không hợp lệ";
    } else if (data.sale > 100 || data.sale < 0) {
      errorMessage = "Giá khuyến mại quá lớn hoặc quá nhỏ. Hãy chọn giá hợp lệ";
    } else if (!data.thumbnail) {
      errorMessage = "Vui lòng thêm ảnh bìa cho sản phẩm";
    } else if (data.varitants.length == 0) {
      errorMessage = "Vui lòng thêm ít nhất 1 phân loại sản phẩm.";
    } else if (data.varitants.find((f) => f.sku === "")) {
      errorMessage = "Lỗi tạo mã định danh cho phân loại";
    }
    if (errorMessage !== null) {
      dispatch(
        onErrorModel({
          onError: true,
          mess: errorMessage,
        })
      );
      return false;
    }
    return true;
  };

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();
    /**
     * start handle
     */
    dispatch(onLoadingAction(true));
    const check = checkValidateRequest(data);
    if (!check) {
      dispatch(onLoadingAction(false));
      return;
    }
    const result = await createNewProduct(data);
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.success) {
        dispatch(onSuccessfulModel(true));
      } else {
        dispatch(onErrorModel({ mess: result.message, onError: true }));
      }
    }
  }

  /**
   * cancel change
   */
  const onStopHandle = () => {
    setData({
      info: {
        name: "",
        slug: "",
        category: "",
        description: "",
        brand: "",
      },
      original_price: 0,
      sale: 0,
      thumbnail: "",
      images: [],
      varitants: [],
    });
    setModelCount(0);
  };
  // --- RENDER ---
  return (
    <form onSubmit={createProduct} className="w-full text-gray-700">
      {/* ================= PRODUCT INFO SECTION ================= */}
      <div className="border border-gray-300 p-4 mb-4">
        <h2 className="font-semibold uppercase text-lg mb-3">
          Thông tin sản phẩm
        </h2>

        {/* --- Product Name --- */}
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="font-semibold text-sm uppercase">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <textarea
            required={true}
            id="name"
            placeholder="Nhập tên sản phẩm mới. Lưu ý tên sản phẩm rất quan trọng để tăng độ phổ biến cho sản phẩm."
            value={data.info.name}
            className="border border-gray-300 outline-0 p-1"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                info: { ...prev.info, name: e.target.value },
              }))
            }
          />
        </div>

        {/* --- Description --- */}
        <div className="flex flex-col mb-3">
          <label
            htmlFor="description"
            className="font-semibold text-sm uppercase"
          >
            Mô tả sản phẩm <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            required={true}
            placeholder="Bạn có thể dùng các công cụ hoặc trang web AI để viết mô tả cho sản phẩm."
            value={data.info.description}
            className="border border-gray-300 outline-0 p-1 h-[200px]"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                info: { ...prev.info, description: e.target.value },
              }))
            }
          />
        </div>

        {/* --- Pricing --- */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label
              htmlFor="original_price"
              className="font-semibold text-sm uppercase"
            >
              Giá gốc <span className="text-red-500">*</span>
            </label>
            <input
              id="original_price"
              type="number"
              required={true}
              min={0}
              onWheel={(e) => {
                e.preventDefault();
              }}
              value={data.original_price}
              className="border border-gray-300 outline-0 p-1 w-full"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  original_price: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="sale" className="font-semibold text-sm uppercase">
              Giá khuyến mãi
            </label>
            <input
              id="sale"
              min={0}
              max={100}
              type="number"
              onWheel={(e) => {
                e.preventDefault();
              }}
              value={data.sale}
              className="border border-gray-300 outline-0 p-1 w-full"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  sale: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>

        {/* --- Category & Brand --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="font-semibold text-sm uppercase"
            >
              Danh mục sản phẩm <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              required={true}
              className="border border-gray-300 outline-0 p-1 w-full"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  info: { ...prev.info, category: e.target.value },
                  varitants: [],
                }))
              }
            >
              <option value="">Chọn danh mục</option>
              {EXAMPLE_CATEGORY_JSON.map((cate) => (
                <option key={cate.id} value={cate.name}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand" className="font-semibold text-sm uppercase">
              Hãng sản xuất
            </label>
            <select
              id="brand"
              className="border border-gray-300 outline-0 p-1 w-full"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  info: { ...prev.info, brand: e.target.value },
                }))
              }
            >
              <option value="">
                {data.info.category
                  ? "Chọn hãng sản xuất"
                  : "Vui lòng chọn danh mục trước"}
              </option>
              {findBrands(data.info.category).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ================= IMAGES SECTION ================= */}
      <div className="border border-gray-300 p-4 mb-4">
        <h2 className="font-semibold uppercase text-lg mb-3">Ảnh sản phẩm</h2>
        {/* Thumbnail */}
        <div className="mb-4 block">
          <strong className="text-center">Ảnh bìa</strong>
          <div>
            {data.thumbnail ? (
              <label
                className="w-max h-max flex items-center justify-center"
                htmlFor="thumbnail"
              >
                <Image
                  src={data.thumbnail}
                  alt=""
                  width={200}
                  height={150}
                  className="h-[180px]"
                  objectFit="cover"
                />
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
              </label>
            ) : (
              <label
                className="w-max h-max flex items-center justify-center border border-green-500"
                htmlFor="thumbnail"
              >
                <p className="w-[200px] h-[180px] flex items-center justify-center text-green-500">
                  +Ảnh
                </p>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Detail Images */}
        <div className="mb-4">
          <strong className="text-center">Ảnh chi tiết</strong>
          <div className="flex gap-3 flex-wrap">
            {data.images.map((img, i) => (
              <label key={i} className="cursor-pointer w-max h-max">
                <Image
                  src={img}
                  alt={`detail-${i}`}
                  width={200}
                  height={180}
                  className="w-[200px] h-[180px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, i)}
                />
              </label>
            ))}
            <label
              htmlFor={`img-${data.images.length}`}
              className="cursor-pointer w-max border border-green-500 text-green-500"
            >
              <div className="w-[200px] flex items-center justify-center h-[180px] ">
                + Ảnh
              </div>
              <input
                id={`img-${data.images.length}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, data.images.length)}
              />
            </label>
          </div>
        </div>
      </div>

      {/* ================= VARIANT SECTION ================= */}
      <div className="border border-gray-300 p-4 mb-4">
        <h2 className="font-semibold uppercase text-lg mb-3">
          Phân loại sản phẩm
        </h2>
        {/* Model quantity */}
        <div className="flex items-center mb-4">
          <button
            type="button"
            className="border border-gray-300 px-2"
            disabled={modelCount === 0}
            onClick={() => setModelCount((prev) => prev - 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            type="number"
            readOnly
            value={modelCount}
            className="border border-gray-300 outline-0 w-[50px] text-center"
          />
          <button
            type="button"
            className="border border-gray-300 px-2"
            onClick={() => setModelCount((prev) => prev + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Warning */}
        {(!data.info.category || !data.info.name) && modelCount > 0 && (
          <p className="text-red-500">
            * Vui lòng nhập tên và chọn danh mục trước
          </p>
        )}

        {/* Render variant models */}
        {modelCount > 0 &&
          data.info.name &&
          data.info.category &&
          Array.from({ length: modelCount }).map((_, i) => (
            <div key={i} className="border-t border-gray-300 py-3 mt-3">
              <h4 className="font-semibold mb-2">
                {createSku(data.info.name)}-MOD-{i + 1}
              </h4>
              {/* stock */}
              <label
                htmlFor={`stock-${createSku(data.info.name)}-MOD-${i + 1}`}
                className="flex gap-1 w-max mb-3"
              >
                <strong>Số lượng tồn kho</strong>
                <input
                  type="number"
                  className="border outline-0 w-[100px] text-center"
                  required={true}
                  onChange={(e) => {
                    handleVariantChange({
                      sku: `${`${createSku(data.info.name)}-MOD-${i + 1}`}`,
                      stoke: Number(e.target.value),
                    });
                  }}
                  id={`stock-${createSku(data.info.name)}-MOD-${i + 1}`}
                  name={`stock-${createSku(data.info.name)}-MOD-${i + 1}`}
                />
              </label>
              {findVaritantAttributes(data.info.category).map(
                (attribute, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="flex items-center gap-2 w-max">
                      <input
                        type="checkbox"
                        value={attribute.name}
                        checked={isCheckedAttribute(
                          `${createSku(data.info.name)}-MOD-${i + 1}`,
                          attribute.name
                        )}
                        onChange={() =>
                          handleVariantChange({
                            sku: `${createSku(data.info.name)}-MOD-${i + 1}`,
                            name: attribute.name,
                          })
                        }
                      />
                      <strong>{attribute.name}</strong>
                    </label>
                    <div className="grid grid-cols-3 mt-1">
                      {attribute.value.map((val) => (
                        <label key={val} className="flex gap-2">
                          <input
                            type="checkbox"
                            checked={isCheckedValue(
                              `${createSku(data.info.name)}-MOD-${i + 1}`,
                              attribute.name,
                              val
                            )}
                            onChange={() =>
                              handleVariantChange({
                                sku: `${createSku(data.info.name)}-MOD-${i + 1}`,
                                name: attribute.name,
                                value: val,
                              })
                            }
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
      </div>

      {/* ================= VARIANT PREVIEW SECTION ================= */}
      <div className="border border-gray-300 p-4">
        <h2 className="font-semibold uppercase text-lg mb-3">
          Phân loại đã chọn
        </h2>
        {data.varitants.length ? (
          data.varitants.map((v) => (
            <div key={v.sku} className="mb-3 border-b border-gray-200 pb-2">
              <p className="font-semibold">{v.sku}</p>
              <p className="font-semibold">{v.stoke}</p>
              {v.attributes.map((a, i) => (
                <div key={i} className="mt-2">
                  <strong>{a.name}:</strong>
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {a.value.map((val) => (
                      <span key={val}>{val}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Chưa chọn.</p>
        )}
      </div>
      {/* ======Button action====== */}
      <div className="flex gap-3 p-4 mt-4 border border-gray-300">
        <button
          type="submit"
          className="border border-green-500 hover:text-white hover:bg-green-500 uppercase px-2 py-1"
        >
          xác nhận
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button
          type="button"
          onClick={() => onStopHandle()}
          className="border border-red-500 hover:text-white hover:bg-red-500 uppercase px-2 py-1"
        >
          Hủy
          <FontAwesomeIcon icon={faCancel} />
        </button>
      </div>
    </form>
  );
}
