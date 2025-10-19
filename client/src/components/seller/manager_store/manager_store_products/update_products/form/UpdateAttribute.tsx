import { onLoadingAction } from "@/api/Redux/Slice/App/app.slice";
import { AppDispatch } from "@/api/Redux/store";
import { uploadImageToCloud } from "@/feature/upload";

import {
  faHistory,
  faPlus,
  faSave,
  faTrashAlt,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Type definitions
 */
type AttributeInputType = {
  _id?: string;
  attrName: string;
  items?: { _id?: string; itemValue: string; itemImg?: string }[];
};

type NewAttributeValue = {
  _id?: string;
  itemValue: string;
  itemImg?: string;
};

type DeleteType = {
  _id: string;
};
type DeleteItemType = {
  attrId: string;
  _id: string;
};
type ComponentProps = {
  attribute: AttributeInputType[];
  setSavedAttribute: React.Dispatch<SetStateAction<AttributeInputType[]>>;
  setDeleteAttr: React.Dispatch<SetStateAction<DeleteType[]>>;
  setDeleteAttrItem: React.Dispatch<SetStateAction<DeleteItemType[]>>;
};

/**
 * Attribute Input Component
 * - update attribute name + value
 * - thêm item mới vào attribute có sẵn
 * - tạo attribute mới
 */
export default function AttributeInput({ ...props }: ComponentProps) {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * State quản lý thêm item mới vào attr đã có
   */
  const [newItem, setNewItem] = useState<{
    _id?: string;
    itemValue: string;
    itemImg?: string;
  }>({
    _id: "",
    itemValue: "",
    itemImg: "",
  });

  // Toggle trạng thái "thêm item mới"
  const [isAddNew, setIsAddNew] = useState<{ open: boolean; attrId: string }>({
    open: false,
    attrId: "",
  });

  /**
   * State quản lý tạo attribute mới
   */
  const [lenghtItemInput, setLenghtItemInput] = useState<number>(1);
  const [newAttrName, setNewAttrName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<
    NewAttributeValue[]
  >([]);

  // ========================= HANDLERS =========================

  /**
   * Upload + set value cho newItem
   */
  async function onchangeNewItem(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name, files } = e.target;
    if (name === "itemImg") {
      dispatch(onLoadingAction(true));
      const file = files?.[0];
      const url = (await uploadImageToCloud(file)) ?? "";
      if (url) {
        setNewItem((prev) => ({ ...prev, itemImg: url }));
        dispatch(onLoadingAction(false));
      }
    } else {
      setNewItem((prev) => ({
        ...prev,
        _id: `${new Date()}`,
        itemValue: value,
      }));
    }
  }

  /**
   * Thêm item mới vào attribute có sẵn
   */
  function addNewItem({ attrId }: { attrId?: string }) {
    if (!attrId) return;
    props.setSavedAttribute((prev) =>
      prev.map((m) =>
        m._id === attrId ? { ...m, items: [...(m.items ?? []), newItem] } : m
      )
    );
    // reset newItem
    setNewItem({ _id: "", itemValue: "", itemImg: "" });
  }

  /**
   * Update attribute hoặc item con
   */
  async function onChangeAttribute({
    indexOfItem,
    indexOfAttr,
    changeAttrName,
    changeItem,
  }: {
    indexOfItem?: number;
    indexOfAttr?: number;
    changeItem?: { _id?: string; itemValue?: string; itemImg?: string };
    changeAttrName?: { _id?: string; attrName: string };
  }) {
    props.setSavedAttribute((prev) =>
      prev.map((m, index) =>
        index === indexOfAttr
          ? {
              ...m,
              attrName: changeAttrName?.attrName ?? m.attrName,
              items: m.items?.map((mItem, idx) =>
                idx === indexOfItem
                  ? {
                      ...mItem,
                      itemValue: changeItem?.itemValue ?? mItem.itemValue,
                      itemImg: changeItem?.itemImg ?? mItem.itemImg,
                    }
                  : mItem
              ),
            }
          : m
      )
    );
  }

  /**
   * Onchange cho từng item khi tạo attribute mới
   */
  function onchangeCreateNewAttributeValue({
    indexItem,
    itemValue,
    itemImg,
  }: {
    indexItem: number;
    itemValue?: string;
    itemImg?: string;
  }) {
    setNewAttributeValue((prev) => {
      const updated = [...(prev ?? [])];
      if (!updated[indexItem]) {
        updated[indexItem] = {
          _id: `${new Date().toLocaleString("vi-VN")}`,
          itemValue: "",
          itemImg: "",
        };
      }
      if (itemValue) updated[indexItem].itemValue = itemValue;
      if (itemImg) updated[indexItem].itemImg = itemImg;
      return updated;
    });
  }

  /**
   * Submit tạo attribute mới
   */
  function submitNewAttributeValue() {
    props.setSavedAttribute((prev) => [
      ...prev,
      {
        _id: `${new Date().toLocaleString("vi-VN")}`,
        attrName: newAttrName,
        items: newAttributeValue ?? [],
      },
    ]);
    setNewAttributeValue([]);
    setNewAttrName("");
    setLenghtItemInput(1);
  }

  /**
   * delete new object of newAttrValue[]
   */
  function prevObjectOfNewAttrValue(index: number) {
    setNewAttributeValue((prev) => {
      return prev.filter((_, idx) => idx !== index);
    });
    setLenghtItemInput((prev) => prev - 1);
  }
  /**
   * Thao tac xoa san pham || Xoa cac truong co san trong san pham
   */

  function handleDeleteProductAttribute(attrId: string) {
    props.setDeleteAttr((prev) => [...prev, { _id: attrId }]);
    props.setSavedAttribute((prev) => {
      const dif = prev.filter((ft) => ft._id !== attrId);
      return dif;
    });
  }
  // delete product attribute item
  function handleDeleteProductAttributeItem(idOfAttr: string, itemId: string) {
    props.setDeleteAttrItem((prev) => [
      ...prev,
      { attrId: idOfAttr, _id: itemId },
    ]);
    props.setSavedAttribute((prev) => {
      return prev.map((attr) =>
        attr._id === idOfAttr
          ? {
              ...attr,
              items: attr.items?.filter((ft) => ft._id !== itemId),
            }
          : attr
      );
    });
  }

  // ========================= RENDER =========================

  return (
    <>
      {/* Update attribute cũ */}
      <section className="text-gray-700 flex flex-col gap-6">
        {props.attribute?.map((attr, indexName) => (
          <div
            key={indexName}
            className="flex flex-col gap-4 bg-white shadow-md p-5 rounded-2xl border border-gray-200"
          >
            {/* Attribute name */}
            <div className="flex items-center justify-between">
              <label className="font-semibold text-lg">
                Attribute: {attr.attrName}
              </label>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
                onClick={() => handleDeleteProductAttribute(String(attr._id))}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>

            <input
              value={props.attribute[indexName].attrName}
              type="text"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400 w-[250px]"
              placeholder="Nhập tên mới..."
              onChange={(e) =>
                onChangeAttribute({
                  indexOfAttr: indexName,
                  changeAttrName: { attrName: e.target.value },
                })
              }
            />

            {/* Items */}
            <div className="flex flex-wrap gap-4">
              {attr.items?.map((item, indexItem) => (
                <div
                  key={`${item._id}-${indexItem}`}
                  className="flex flex-col items-center gap-2 border border-gray-300 rounded-lg p-3 shadow-sm"
                >
                  <div className="relative">
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 text-xs"
                      onClick={() =>
                        handleDeleteProductAttributeItem(
                          attr._id ?? "",
                          item._id ?? ""
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>

                    {item.itemImg ? (
                      <Image
                        src={item.itemImg}
                        alt="item_img"
                        width={100}
                        height={100}
                        className="rounded-md border border-gray-200 object-cover"
                      />
                    ) : (
                      <label
                        htmlFor={`${item._id}-${indexItem}`}
                        className="w-[100px] h-[100px] flex items-center justify-center border-2 border-dashed border-green-400 rounded-md text-green-500 cursor-pointer hover:bg-green-50"
                      >
                        +Ảnh
                      </label>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      id={`${item._id}-${indexItem}`}
                      accept="image/*"
                      onChange={async (e) => {
                        dispatch(onLoadingAction(true));
                        const itemImgUrl = await uploadImageToCloud(
                          e.target.files?.[0]
                        );
                        dispatch(onLoadingAction(false));
                        onChangeAttribute({
                          indexOfAttr: indexName,
                          indexOfItem: indexItem,
                          changeItem: { itemImg: itemImgUrl },
                        });
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    value={item.itemValue}
                    className="border border-gray-300 p-1 rounded-md w-[120px] text-center"
                    placeholder="Value..."
                    onChange={(e) =>
                      onChangeAttribute({
                        indexOfAttr: indexName,
                        indexOfItem: indexItem,
                        changeItem: { itemValue: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>

            {/* Add new item */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  onClick={() =>
                    setIsAddNew({ open: true, attrId: attr._id ?? "" })
                  }
                >
                  +Thêm giá trị
                </button>
                {isAddNew.open && isAddNew.attrId === attr._id && (
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                    onClick={() => setIsAddNew({ open: false, attrId: "" })}
                  >
                    Hide
                  </button>
                )}
              </div>

              {isAddNew.open && isAddNew.attrId === attr._id && (
                <div className="flex flex-col gap-3 mt-2">
                  <label htmlFor="newattr" className="cursor-pointer">
                    {newItem.itemImg ? (
                      <Image
                        src={newItem.itemImg}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    ) : (
                      <div className="w-[100px] h-[100px] flex items-center justify-center border-2 border-dashed border-green-500 rounded-md text-green-500 hover:bg-green-50">
                        +Ảnh
                      </div>
                    )}
                    <input
                      type="file"
                      id="newattr"
                      name="itemImg"
                      className="hidden"
                      accept="image/*"
                      onChange={onchangeNewItem}
                    />
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="itemValue"
                      className="border border-gray-300 p-2 rounded-md w-[200px]"
                      placeholder="Nhập giá trị mới..."
                      onChange={onchangeNewItem}
                    />
                    <button
                      type="button"
                      className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                      onClick={() => addNewItem({ attrId: attr._id })}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
      {/* Create new attribute */}
      <section className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 text-gray-700 mt-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Thêm Lựa Chọn Mới
          </h2>

          {/* Attribute name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Tên lựa chọn</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="Nhập tên lựa chọn..."
              value={newAttrName}
              onChange={(e) => setNewAttrName(e.target.value)}
            />
          </div>

          {/* Attribute items */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
            {Array.from({ length: lenghtItemInput }).map((_, inputIdx) => (
              <div
                key={inputIdx}
                className="flex relative flex-col gap-3 border border-gray-200 p-4 rounded-xl shadow-sm"
              >
                <div className="right-1 top-1 absolute">
                  {inputIdx > 0 ? (
                    <button
                      className="bg-red-500 text-white rounded-full w-5 flex items-center justify-center h-5"
                      onClick={() => {
                        prevObjectOfNewAttrValue(inputIdx);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                {/* Value */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Giá trị</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="Tên lựa chọn..."
                    value={`${newAttributeValue[inputIdx]?.itemValue ?? ""}`}
                    onChange={(e) =>
                      onchangeCreateNewAttributeValue({
                        indexItem: inputIdx,
                        itemValue: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col gap-2 items-center">
                  <label
                    htmlFor={`${inputIdx}-img`}
                    className="font-semibold text-sm text-gray-600"
                  >
                    Ảnh
                  </label>
                  {newAttributeValue[inputIdx]?.itemImg ? (
                    <Image
                      src={newAttributeValue[inputIdx]?.itemImg}
                      width={100}
                      height={100}
                      alt=""
                      className="rounded-md border border-gray-200 object-cover"
                    />
                  ) : (
                    <label
                      htmlFor={`${inputIdx}-img`}
                      className="w-[100px] h-[100px] border-2 border-dashed border-green-400 flex items-center justify-center text-green-500 rounded-lg cursor-pointer hover:bg-green-50 transition"
                    >
                      + Ảnh
                    </label>
                  )}
                  <input
                    type="file"
                    id={`${inputIdx}-img`}
                    className="hidden"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      dispatch(onLoadingAction(true));
                      const fileUrl = await uploadImageToCloud(file);
                      dispatch(onLoadingAction(false));
                      onchangeCreateNewAttributeValue({
                        indexItem: inputIdx,
                        itemImg: fileUrl ?? "",
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <button
              role="button"
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              onClick={() => setLenghtItemInput((prev) => prev + 1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              role="button"
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              onClick={() => {
                setLenghtItemInput(1);
                setNewAttributeValue([]);
                setNewAttrName("");
              }}
            >
              <FontAwesomeIcon icon={faHistory} />
            </button>
            <button
              role="button"
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              onClick={() => {
                submitNewAttributeValue();
              }}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
          {/* note */}
          <div className="mt-4 text-yellow-500">
            <p>
              <FontAwesomeIcon icon={faWarning} />* Lưu ý khi thêm lựa chọn mới
              vui lòng nhấn nút lưu ở trên để cập nhật, nhấn nút + để thêm giá
              trị khác, nút quay lại để loại bỏ. Sau khi hoàn tất thay đổi hãy
              nhất nút xác nhận bên dưới
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
