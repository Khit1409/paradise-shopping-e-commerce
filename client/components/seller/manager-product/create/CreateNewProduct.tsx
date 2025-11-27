import React from "react";
import Image from "next/image";
import { createSku } from "@/utils/create-sku";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faMinus,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useCreateProduct } from "./useCreateProduct";
/**
 * --- COMPONENT START ---
 */
export default function CreateNewProduct() {
  const {
    data,
    handlers,
    helpers,
    modelCount,
    setData,
    setModelCount,
    editProduct,
    wating,
  } = useCreateProduct();

  const {
    createDescripionByAi,
    createProduct,
    handleImageUpload,
    handleThumbnailUpload,
    handleVariantChange,
    onStopHandle,
  } = handlers;

  const {
    findBrands,
    findVaritantAttributes,
    isCheckedAttribute,
    isCheckedValue,
  } = helpers;
  return (
    <form onSubmit={createProduct} className="w-full text-gray-700">
      {/* ================= PRODUCT INFO SECTION ================= */}
      <div className="border border-gray-300 p-4 mb-4">
        <h2 className="font-bold uppercase text-lg mb-3">Thông tin sản phẩm</h2>
        {/* --- Product Name --- */}
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="font-bold text-sm uppercase">
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

        {/* --- Pricing --- */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label
              htmlFor="original_price"
              className="font-bold text-sm uppercase"
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
            <label htmlFor="sale" className="font-bold text-sm uppercase">
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
            <label htmlFor="category" className="font-bold text-sm uppercase">
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
              {editProduct.map((cate) => (
                <option key={cate.id} value={cate.category}>
                  {cate.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand" className="font-bold text-sm uppercase">
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
              {findBrands().map((brand) => (
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
        <h2 className="font-bold uppercase text-lg mb-3">Ảnh sản phẩm</h2>
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
        <h2 className="font-bold uppercase text-lg mb-3">Phân loại sản phẩm</h2>
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
              <h4 className="font-bold mb-2">
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
      {/* --- Description --- */}
      <div className="flex flex-col mb-3">
        <label className="text-sm">
          <strong className="uppercase me-1">Mô tả sản phẩm</strong>
          <span className="text-red-500">*</span>
          <p className="text-yellow-500  text-sm">
            * Nếu bạn sử dụng AI để tạo mô tả. Hệ thống sẽ tự tạo ra 1 đoạn code
            để tạo giao diện đẹp cho mô tả. Nếu bạn có đội ngũ phát triển riêng,
            bạn có thể tự tạo HTML mô tả cho mình.
          </p>
        </label>
        <div className="flex justify-start gap-3">
          <button
            type="button"
            onClick={async () => await createDescripionByAi()}
            className="p-1 text-sm underline"
          >
            Tạo mô tả bằng AI
          </button>
        </div>
        <textarea
          id="description"
          required={true}
          placeholder="Bạn có thể dùng các công cụ hoặc trang web AI để viết mô tả cho sản phẩm."
          value={
            wating
              ? "Vui lòng chờ, quá trình có thể mất 1 khoảng thời gian...."
              : data.info.description
          }
          className="border border-gray-300 outline-0 p-1 h-[200px]"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              info: { ...prev.info, description: e.target.value },
            }))
          }
        />
      </div>

      {/* ================= VARIANT PREVIEW SECTION ================= */}
      <div className="border border-gray-300 p-4">
        <h2 className="font-bold uppercase text-lg mb-3">Phân loại đã chọn</h2>
        {data.varitants.length ? (
          data.varitants.map((v) => (
            <div key={v.sku} className="mb-3 border-b border-gray-200 pb-2">
              <p className="font-bold">{v.sku}</p>
              <p className="font-bold">{v.stoke}</p>
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
