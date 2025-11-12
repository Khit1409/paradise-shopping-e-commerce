"use client";
import { onErrorModel, onLoadingAction } from "@/redux/app/slice";
import { getSingleProductThunk } from "@/redux/seller/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EXAMPLE_BRAND_JSON,
  EXAMPLE_CATEGORY_JSON,
  EXAMPLE_VARIANT_JSON,
} from "../data";
import {
  ProductVariantAttribute,
  SingleProduct,
} from "@/type/product.interface";
import { uploadImageToCloud } from "@/service/cloud.service";

export default function EditProduct() {
  const params = useSearchParams();
  const product_id = params.get("product_id");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.seller);
  const [data, setData] = useState<SingleProduct>(product!);

  // Fetch product
  useEffect(() => {
    if (product_id) {
      (async () => {
        dispatch(onLoadingAction(true));
        const result = await dispatch(getSingleProductThunk({ product_id }));
        if (getSingleProductThunk.fulfilled.match(result)) {
          setData(result.payload);
          dispatch(onLoadingAction(false));
        }
      })();
    }
  }, [product_id, dispatch]);

  // Redirect if invalid id
  useEffect(() => {
    if (!product_id || product_id.length < 24) {
      const timer = setTimeout(() => router.replace("/seller"), 2000);
      return () => clearTimeout(timer);
    }
  }, [product_id, router]);

  if (!product_id || product_id.length < 24) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center text-center text-gray-600">
        <FontAwesomeIcon
          icon={faWarning}
          className="text-yellow-500 text-3xl mb-2"
        />
        <p className="max-w-lg text-sm uppercase font-semibold">
          PRODUCT ID IS INVALID OR NOT FOUND. PLEASE DO NOT MODIFY THE URL OR
          CONTACT ADMIN.
        </p>
      </div>
    );
  }

  // helper functions
  const findDifferentAttributeValues = (
    categoryName: string,
    attrName: string,
    currentValues: string[]
  ) => {
    const category = EXAMPLE_CATEGORY_JSON.find(
      (cate) => cate.name === categoryName
    );
    if (!category) return [];
    const variantTemplate = EXAMPLE_VARIANT_JSON.find(
      (variant) => variant.category_id === category.id
    );
    if (!variantTemplate) return [];
    const attribute = variantTemplate.attributes.find(
      (attr) => attr.name === attrName
    );
    if (!attribute) return [];
    return attribute.value.filter((val) => !currentValues.includes(val));
  };

  const finDifferentAttributes = (
    category: string,
    attributes: ProductVariantAttribute[]
  ) => {
    const categorySelected = EXAMPLE_CATEGORY_JSON.find(
      (fcate) => fcate.name === category
    );
    if (!categorySelected) return [];
    const selectedAttrName = attributes.map((attr) => attr.name);
    const varitantTemple = EXAMPLE_VARIANT_JSON.find(
      (f) => f.category_id === categorySelected.id
    );
    if (!varitantTemple) return [];
    return varitantTemple.attributes.filter(
      (ft) => !selectedAttrName.includes(ft.name)
    );
  };

  const findIsChecked = (sku: string, name: string, value: string) => {
    const varitant = data.varitants.find((fv) => fv.sku === sku);
    if (!varitant) return false;
    const attribute = varitant.attributes.find((fAttr) => fAttr.name === name);
    if (!attribute) return false;
    return attribute.value.includes(value);
  };

  const onChangeAttributeValue = (sku: string, name: string, value: string) => {
    setData((prev) => {
      const newVaritants = prev.varitants.map((varitant) => {
        if (varitant.sku === sku) {
          const newAttributes = varitant.attributes.map((attribute) => {
            if (attribute.name === name) {
              let newValues = [...attribute.value];
              if (newValues.includes(value))
                newValues = newValues.filter((v) => v !== value);
              else newValues.push(value);
              return { ...attribute, value: newValues };
            }
            return attribute;
          });
          return { ...varitant, attributes: newAttributes };
        }
        return varitant;
      });
      return { ...prev, varitants: newVaritants };
    });
  };

  const onchangeThumbnail = async (file: File) => {
    dispatch(onLoadingAction(true));
    const res = await uploadImageToCloud(file);
    if (res) {
      dispatch(onLoadingAction(false));
      if (res.resultCode == 1)
        setData((prev) => ({ ...prev, thumbnail: res.url }));
      else
        dispatch(
          onErrorModel({ onError: true, mess: "Lỗi upload ảnh lên đám mây!" })
        );
    }
  };

  // Render layout
  return data ? (
    <div className="text-gray-800 mx-auto ">
      {/* --- Product Info --- */}
      <section className="bg-white mb-6">
        <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4">
          Thông tin sản phẩm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm uppercase">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  info: { ...prev.info, name: e.target.value },
                }))
              }
              defaultValue={data.info.name}
              className="border border-gray-300 outline-none p-2 h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm uppercase">
              Hãng sản xuất
            </label>
            <select
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  info: { ...prev.info, brand: e.target.value },
                }))
              }
              className="outline-none p-2 border border-gray-300"
            >
              <option defaultValue={data.info.brand}>{data.info.brand}</option>
              {EXAMPLE_BRAND_JSON.find(
                (b) =>
                  b.category_id ===
                  EXAMPLE_CATEGORY_JSON.find(
                    (c) => c.name === data.info.category
                  )?.id
              )?.brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="font-semibold text-sm uppercase">
            Mô tả sản phẩm <span className="text-red-500">*</span>
          </label>
          <textarea
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                info: { ...prev.info, description: e.target.value },
              }))
            }
            defaultValue={data.info.description}
            className="border d border-gray-300 outline-none p-2 w-full h-[200px]"
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-sm uppercase">
              Giá gốc <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={0}
              onWheel={(e) => e.preventDefault()}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  original_price: Number(e.target.value),
                }))
              }
              defaultValue={data.original_price}
              className="border border-gray-300 d outline-none p-2 w-full"
            />
          </div>

          <div>
            <label className="font-semibold text-sm uppercase">
              Giá khuyến mãi
            </label>
            <input
              type="number"
              min={0}
              max={100}
              onWheel={(e) => e.preventDefault()}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  sale: Number(e.target.value),
                }))
              }
              defaultValue={data.sale}
              className="border border-gray-300 d outline-none p-2 w-full"
            />
          </div>
        </div>
      </section>

      {/* --- Image Section --- */}
      <section className="bg-white mb-6">
        <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4">
          Hình ảnh sản phẩm
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <p className="font-semibold mb-2">Ảnh bìa</p>
            <label htmlFor="thumbnail" className="cursor-pointer block">
              <Image
                src={data.thumbnail}
                alt="thumbnail"
                width={200}
                height={180}
                className="d border border-gray-300 object-cover w-[200px] h-[180px]"
              />
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onchangeThumbnail(file);
                }}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1">
            <p className="font-semibold mb-2">Ảnh chi tiết</p>
            <div className="flex flex-wrap gap-3">
              {data.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`detail-${i}`}
                  width={150}
                  height={120}
                  className="d border border-gray-300 w-[150px] h-[120px] object-cover"
                />
              ))}
              <label className="border border-dashed border-green-400 text-green-500 w-[150px] h-[120px] flex items-center justify-center cursor-pointer d">
                + Thêm ảnh
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- Variants --- */}
      <section className="bg-white borde">
        <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4">
          Phân loại sản phẩm
        </h2>

        {data.varitants.map((variant) => (
          <div
            key={variant.sku}
            className="border- pt-4 mt-4 space-y-3"
          >
            <h4 className="font-semibold text-base">
              Mẫu: <span className="text-gray-500">{variant.sku}</span>
            </h4>

            <div className="flex items-center gap-3">
              <strong className="text-sm">Tồn kho:</strong>
              <input
                type="number"
                defaultValue={variant.stoke}
                className="border border-gray-300 d outline-none p-1 w-[100px] text-center"
              />
            </div>

            {variant.attributes.map((attr) => (
              <div key={attr.name} className="pt-2">
                <strong className="block mb-1">{attr.name}</strong>
                <div className="grid grid-cols-3 gap-1">
                  {attr.value.map((val) => (
                    <label key={val} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={findIsChecked(variant.sku, attr.name, val)}
                        onChange={() =>
                          onChangeAttributeValue(variant.sku, attr.name, val)
                        }
                      />
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  ) : (
    <div className="flex h-full items-center justify-center">
      <p className="uppercase">Sản phẩm không tồn tại.</p>
    </div>
  );
}
