import React, { SetStateAction } from "react";
import { PRODUCT_ATTRIBUT_FOLLOW_CATEGORY } from "./api/create-product-attribute";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { ProductAttribute } from "../hook/CreateProductHook";
import { AppDispatch } from "@/api/redux/store";
import {
  onErrorModel,
  onLoadingAction,
} from "@/api/redux/slice/app_slice/app.slice";
import { uploadImageToCloud } from "@/feature/upload";
/**
 * props type
 */
type ComponentProps = {
  setAttribute: React.Dispatch<SetStateAction<ProductAttribute[]>>;
  setSelectedCategory: React.Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  attribute: ProductAttribute[];
};

export default function CreateProductCategory(props: ComponentProps) {
  /**
   * props
   */
  const { attribute, setAttribute, selectedCategory, setSelectedCategory } =
    props;
  /**
   * redux
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   * hanlde update value
   * @param insertValue
   * @param items
   * @returns
   */
  const updateItemValue = (
    insertValue: string,
    items: { itemValue: string; itemImg?: string }[]
  ) => {
    const existed = items.find((f) => f.itemValue === insertValue);
    if (existed) {
      return items.filter((ft) => ft.itemValue !== insertValue);
    } else {
      return [...items, { itemValue: insertValue }];
    }
  };
  /**
   * handle update img
   * @param insertValue
   * @param items
   * @returns
   */
  const updateItemImage = async (
    insertValue: File,
    index: number,
    items: { itemValue: string; itemImg?: string }[]
  ) => {
    dispatch(onLoadingAction(true));
    const up = await uploadImageToCloud(insertValue);
    const { url, resultCode } = up;
    if (resultCode !== 1) {
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Quá trình tải ảnh lên đám mây bị lỗi!",
        })
      );
      return items;
    }
    dispatch(onLoadingAction(false));
    return items.map((item, i) =>
      i === index ? { ...item, itemImg: url } : item
    );
  };

  return (
    <section className="flex flex-col gap-3 text-gray-700 mb-3">
      <div>
        <h5 className="mb-3 font-bold">DANH MỤC SẢN PHẨM</h5>
        <div className="grid grid-cols-5 gap-2">
          {PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.map((cate) => (
            <button
              key={cate.category}
              onClick={() => {
                setSelectedCategory(cate.slug);
                setAttribute([]);
              }}
              className={`min-w-[100px]
            hover:bg-gray-300 hover:text-white
            font-semibold 
            px-2 py-1 truncate border border-gray-300
            ${selectedCategory === cate.slug ? "bg-gray-300" : ""}
            `}
            >
              {cate.category}
            </button>
          ))}
        </div>
      </div>
      {selectedCategory && (
        <div>
          <h5 className="mb-3 font-bold">CHỌN PHÂN LOẠI HÀNG</h5>
          <div className="grid grid-cols-5 gap-2">
            {PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.find(
              (f) => f.slug === selectedCategory
            )?.attribute.map((attr) => (
              <button
                key={attr.name}
                onClick={() => {
                  setAttribute((prev) => {
                    const existed = prev.find((f) => f.attrName === attr.name);
                    if (existed) {
                      return prev.filter((ft) => ft.attrName !== attr.name);
                    } else {
                      return [...prev, { attrName: attr.name, items: [] }];
                    }
                  });
                }}
                className={`min-w-[100px]
            hover:bg-gray-300 hover:text-white
            font-semibold 
            px-2 py-1 truncate border border-gray-300
            ${
              attribute.find((f) => f.attrName === attr.name)
                ? "bg-gray-300"
                : ""
            }
            `}
              >
                {attr.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* attribute item */}
      {attribute.length > 0 && (
        <div>
          <h5 className="mb-3 font-bold">CHỌN GIÁ TRỊ PHÂN LOẠI</h5>
          <div className="">
            {(() => {
              const needAttribute = PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.find(
                (f) => f.slug === selectedCategory
              )?.attribute;
              if (needAttribute) {
                const list = needAttribute.filter((ft) =>
                  attribute.find((f) => f.attrName === ft.name)
                );
                if (list) {
                  return (
                    <div className="grid grid-cols-2 gap-3">
                      {list.map((attr, i) => (
                        <div key={i} className="flex flex-col">
                          <strong className="mb-3">{attr.name}</strong>
                          <div className="grid grid-cols-5 gap-3">
                            {attr.value.map((v, index) => (
                              <div key={index} className="flex gap-1">
                                <label
                                  htmlFor={`${attr.name}-item-${index}-${v}`}
                                  className={`border border-gray-300 px-2 py-1 font-semibold text-nowrap ${
                                    attribute
                                      .find((f) => f.attrName === attr.name)
                                      ?.items.find((f) => f.itemValue === v)
                                      ? "bg-gray-300 text-white"
                                      : ""
                                  } `}
                                >
                                  <input
                                    id={`${attr.name}-item-${index}-${v}`}
                                    name={`${attr.name}-item-${index}-${v}`}
                                    type="checkbox"
                                    className="hidden"
                                    checked={
                                      attribute
                                        .find((f) => f.attrName === attr.name)
                                        ?.items.find((f) => f.itemValue === v)
                                        ? true
                                        : false
                                    }
                                    onChange={() => {
                                      setAttribute((prev) => {
                                        return prev.map((m) =>
                                          m.attrName === attr.name
                                            ? {
                                                ...m,
                                                items: updateItemValue(
                                                  v,
                                                  m.items
                                                ),
                                              }
                                            : m
                                        );
                                      });
                                    }}
                                    value={v}
                                  />
                                  {v}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  return <></>;
                }
              }
            })()}
          </div>
        </div>
      )}
      {/* preview attribute and edit item */}
      {attribute.length > 0 && (
        <section className="border-t border-gray-300 py-2">
          <h5 className="font-bold mb-3">PHÂN LOẠI ĐÃ CHỌN</h5>
          <div className="">
            {attribute.map((attr) => (
              <div key={attr.attrName} className="mb-3">
                <strong>{attr.attrName}</strong>
                <div className="flex gap-3">
                  {attr.items.map((i, index) => (
                    <div key={i.itemValue} className="flex flex-col">
                      <span className="text-center mb-3">{i.itemValue}</span>
                      {i.itemImg ? (
                        <Image
                          src={i.itemImg}
                          alt=""
                          width={100}
                          height={100}
                        />
                      ) : (
                        <label
                          htmlFor={`img-${i}`}
                          className="border border-green-500 w-[100px] h-[100px] flex items-center justify-center text-green-500"
                        >
                          + Ảnh
                          <input
                            onChange={async (e) => {
                              const files = e.target.files;
                              if (files) {
                                const file = files[0];

                                // gọi upload và đợi kết quả
                                const updatedItems = await updateItemImage(
                                  file,
                                  index,
                                  attr.items
                                );

                                // sau khi có kết quả thật, set lại state
                                setAttribute((prev) =>
                                  prev.map((m) =>
                                    m.attrName === attr.attrName
                                      ? {
                                          ...m,
                                          items: updatedItems,
                                        }
                                      : m
                                  )
                                );
                              }
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id={`img-${i}`}
                            name={`img-${i}`}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
