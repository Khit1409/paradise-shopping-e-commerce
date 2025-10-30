import React, { SetStateAction } from "react";
import { PRODUCT_ATTRIBUT_FOLLOW_CATEGORY } from "./api/create-product-attribute";
import Image from "next/image";
import {
  ProductAttributeUpdate,
  ProductInformationUpdate,
} from "../hook/EditProductHook";
import { uploadImageToCloud } from "@/feature/upload";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/api/redux/store";
import {
  onErrorModel,
  onLoadingAction,
} from "@/api/redux/slice/app_slice/app.slice";
type ComponentProps = {
  category: string;
  editProductAttribute: ProductAttributeUpdate[];
  setEditProductAttribute: React.Dispatch<
    SetStateAction<ProductAttributeUpdate[]>
  >;
  setEditProductInformation: React.Dispatch<
    SetStateAction<ProductInformationUpdate>
  >;
};

export default function EditProductCategory(props: ComponentProps) {
  const {
    editProductAttribute,
    setEditProductAttribute,
    category,
    setEditProductInformation,
  } = props;

  const dispatch = useDispatch<AppDispatch>();

  const upAttributeItemImageByIndex = async (
    indexOfItem: number,
    indexOfAttr: number,
    file: File
  ) => {
    dispatch(onLoadingAction(true));
    const res = await uploadImageToCloud(file);
    if (res) {
      const { resultCode, url } = res;
      if (resultCode == 1) {
        setEditProductAttribute((prev) => {
          return prev.map((m, index) =>
            index === indexOfAttr
              ? {
                  ...m,
                  items: m.items.map((mi, idx) =>
                    idx == indexOfItem ? { ...mi, itemImg: url } : mi
                  ),
                }
              : m
          );
        });
      } else {
        dispatch(
          onErrorModel({
            onError: true,
            mess: "Lỗi cập nhật ảnh cho phân loại hàng!",
          })
        );
      }
      dispatch(onLoadingAction(false));
    }
  };

  console.log(editProductAttribute);
  return (
    <section className="gap-3 py-2 flex flex-col text-gray-700 mb-3 border-t border-gray-300">
      <div>
        <p className="text-yellow-500 mb-3 text-sm">
          *Lưu lý khi cập nhật danh mục sản phẩm thì các phân loại cũ sẽ thay
          thế bằng phân loại khác phù hợp với danh mục vừa chọn{" "}
          {"(bạn phải cập nhật lại phân loại)"}, hãy cân nhắc và thay đổi phù
          hợp nhé.
        </p>
        <h4 className="font-bold uppercase mb-3">
          CẬP NHẬT DANH MỤC SẢN PHẨM - danh mục hiện tại: {category}
        </h4>
        <div className="grid grid-cols-5 gap-3">
          {PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.filter(
            (ft) => ft.slug !== category
          ).map((cate) => (
            <button
              key={cate.category}
              onClick={() => {
                setEditProductInformation((prev) => ({
                  ...prev,
                  proCateSlug: cate.slug,
                }));
                setEditProductAttribute([]);
              }}
              className="border border-gray-300 px-2 py-1"
            >
              {cate.category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h5 className="font-bold uppercase mb-3">
          CẬP NHẬT PHÂN LOẠI SẢN PHẨM
        </h5>
        <div className="flex flex-col gap-2">
          {/* attr  */}
          {editProductAttribute.map((attr, indexOfAttr) => (
            <div className=" px-2 py-1" key={attr._id}>
              <strong className="mb-3">
                {
                  PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.find(
                    (f) => f.slug === category
                  )?.attribute.find((f) => f.slug === attr.attrName)?.name
                }
              </strong>
              <div className="flex flex-col gap-3 mb-3">
                <div className="grid grid-cols-5 gap-3 mb-3">
                  {/* attr item */}
                  {attr.items.map((item, indexOfItem) => (
                    <div className="flex flex-col gap-2" key={item._id}>
                      <span className="text-center">{item.itemValue}</span>
                      <label
                        className="w-[200px] h-[115px] flex items-center justify-center border border-green-500 text-green-500"
                        htmlFor={`attr-${indexOfAttr}item-img-${indexOfItem}`}
                      >
                        {item.itemImg ? (
                          <Image
                            src={item.itemImg}
                            alt=""
                            width={200}
                            className="border border-gray-300 h-[115px]"
                            height={100}
                          />
                        ) : (
                          "+Ảnh"
                        )}
                        <input
                          id={`attr-${indexOfAttr}item-img-${indexOfItem}`}
                          onChange={async (e) => {
                            const { files } = e.target;
                            if (files) {
                              const file = files[0];
                              await upAttributeItemImageByIndex(
                                indexOfItem,
                                indexOfAttr,
                                file
                              );
                            } else {
                              return;
                            }
                          }}
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  ))}
                </div>
                {/* thêm mới attr item */}
                <div className="flex flex-col">
                  <strong className="mb-3 text-sm">
                    THÊM MỚI GIÁ TRỊ PHÂN LOẠI
                  </strong>
                  <div className="grid grid-cols-5 gap-3">
                    {PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.find(
                      (f) => f.slug === category
                    )
                      ?.attribute.find((f) => f.slug == attr.attrName)
                      ?.value.filter(
                        (ft) =>
                          !attr.items.some((item) => item.itemValue === ft)
                      )
                      .map((m) => (
                        <button
                          className="border border-gray-300 px-2 py-1"
                          onClick={() => {
                            setEditProductAttribute((prev) => {
                              return prev.map((attrUp) => {
                                if (attrUp._id === attr._id) {
                                  return {
                                    ...attrUp,
                                    items: [
                                      ...attrUp.items,
                                      {
                                        _id: `${Date.now().toLocaleString()}`,
                                        itemValue: m,
                                        itemImg: "",
                                      },
                                    ],
                                  };
                                }
                                return attrUp;
                              });
                            });
                          }}
                          key={m}
                        >
                          {m}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* thêm mới attribute */}

          <div className="flex flex-col">
            <strong className="mb-3 text-sm">THÊM MỚI PHÂN LOẠI HÀNG</strong>
            <div className="grid grid-cols-5 gap-3">
              {PRODUCT_ATTRIBUT_FOLLOW_CATEGORY.find((f) => f.slug === category)
                ?.attribute.filter(
                  (ft) =>
                    !editProductAttribute.some((s) => s.attrName === ft.slug)
                )
                .map((m) => (
                  <button
                    onClick={() => {
                      setEditProductAttribute((prev) => {
                        return [
                          ...prev,
                          {
                            attrName: m.slug,
                            items: [],
                            _id: Date.now().toLocaleString(),
                          },
                        ];
                      });
                    }}
                    className="border border-gray-300 px-2 py-1"
                    key={m.name}
                  >
                    {m.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
