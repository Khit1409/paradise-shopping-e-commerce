"use client";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import {
  getEditProductApiThunk,
  getSingleProductThunk,
} from "@/redux/seller/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faBoxOpen,
  faCancel,
  faDeleteLeft,
  faHistory,
  faSave,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleProduct } from "@/type/product.interface";
import {
  deleteProduct,
  stopProductActive,
  updateProduct,
} from "@/service/seller.service";
import { createProductDescriptionHtmlElement } from "@/feature/open-api";
import EditVaritant from "./EditVaritant";
import EditImage from "./EditImage";

export default function EditProduct() {
  const product_id = localStorage.getItem("selected_product_id") as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { product, editProduct } = useSelector(
    (state: RootState) => state.seller
  );
  const { reRender } = useSelector((state: RootState) => state.app);
  const [data, setData] = useState<SingleProduct | null>(null);
  const [wating, setWating] = useState<boolean>(false);

  /**
   * Redirect if invalid id and fetch api if valid id
   */
  useEffect(() => {
    if (!product_id || product_id.length < 24) {
      const timer = setTimeout(() => router.replace("/seller"), 2000);
      return () => clearTimeout(timer);
    } else {
      (async () => {
        dispatch(onLoadingAction(true));
        const result = await dispatch(getSingleProductThunk(product_id));
        if (getSingleProductThunk.fulfilled.match(result)) {
          dispatch(onLoadingAction(false));
          setData(result.payload);
        }
      })();
    }
  }, [product_id, router, dispatch, reRender]);
  /**
   * call edit api
   */
  useEffect(() => {
    const getEditApi = async (category?: string) => {
      await dispatch(getEditProductApiThunk(category ?? "all"));
    };
    if (data && data.info.category) {
      getEditApi(data?.info.category);
    }
  }, [dispatch, data]);
  /**
   * preview component notification error when id is not right format object id
   */
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
  /**
   * find other brand by selected brand and category
   * @param category
   * @param selected
   */
  const findOtherBrand = (selectedBrand: string) => {
    return editProduct[0]?.brands.filter((ft) => ft !== selectedBrand);
  };
  /**
   * update handle
   * @param e
   */
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!data) return;
      dispatch(onLoadingAction(true));
      const result = await updateProduct(data);
      if (result) {
        dispatch(onLoadingAction(false));
        if (!result.success) {
          dispatch(onErrorModel({ onError: true, mess: result.message }));
        }
        dispatch(onSuccessfulModel(true));
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ onError: true, mess: `${error}` }));
    }
  }
  /**
   * delete product action
   * @returns
   */
  async function handleDelete() {
    try {
      if (!product_id) return;
      dispatch(onLoadingAction(true));
      const result = await deleteProduct(product_id);
      if (result) {
        dispatch(onLoadingAction(false));
        if (!result.success) {
          dispatch(onErrorModel({ onError: true, mess: result.message }));
        } else {
          dispatch(onSuccessfulModel(true));
        }
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ onError: true, mess: error as string }));
    }
  }
  /**
   * stop product active
   */
  async function handleStopActiveProduct() {
    try {
      if (!product_id || !data) return;
      dispatch(onLoadingAction(true));
      const result = await stopProductActive(product_id, !data.isActive);
      if (result) {
        dispatch(onLoadingAction(false));
        if (!result.success) {
          dispatch(onErrorModel({ onError: true, mess: result.message }));
        } else {
          dispatch(onSuccessfulModel(true));
        }
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ onError: true, mess: error as string }));
    }
  }
  /**
   * create product description by ai
   */
  const createDescripionByAi = async () => {
    if (!data) return;
    setWating(true);
    const descByAi = await createProductDescriptionHtmlElement(
      JSON.stringify(data)
    );
    setData((prev) => {
      if (!prev) {
        return null;
      }
      return { ...prev, info: { ...prev.info, description: descByAi } };
    });
    setWating(false);
  };
  // Render layout
  return data ? (
    <form
      className="text-gray-700 mx-auto"
      onSubmit={async (e) => {
        await handleUpdate(e);
      }}
    >
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
                setData((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    info: { ...prev.info, name: e.target.value },
                  };
                })
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
                setData((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    info: { ...prev.info, brand: e.target.value },
                  };
                })
              }
              className="outline-none p-2 border border-gray-300"
            >
              <option defaultValue={data.info.brand}>{data.info.brand}</option>
              {findOtherBrand(data.info.brand)?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-sm">
            <strong className="uppercase me-1">Mô tả sản phẩm</strong>
            <span className="text-red-500">*</span>
            <p className="text-yellow-500  text-sm">
              * Nếu bạn sử dụng AI để tạo mô tả. Hệ thống sẽ tự tạo ra 1 đoạn
              code để tạo giao diện đẹp cho mô tả. Nếu bạn có đội ngũ phát triển
              riêng, bạn có thể tự tạo HTML mô tả cho mình.
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
            onChange={(e) =>
              setData((prev) => {
                if (!prev) return null;
                return {
                  ...prev,
                  info: { ...prev.info, description: e.target.value },
                };
              })
            }
            value={
              wating ? "Vui lòng chờ trong giây lát...." : data.info.description
            }
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
                setData((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    original_price: Number(e.target.value),
                  };
                })
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
                setData((prev) => {
                  if (!prev) return null;
                  return {
                    ...prev,
                    sale: Number(e.target.value),
                  };
                })
              }
              defaultValue={data.sale}
              className="border border-gray-300 d outline-none p-2 w-full"
            />
          </div>
        </div>
      </section>
      {/* --- Image Section --- */}
      <EditImage setData={setData} data={data} />
      {/* --- Variants --- */}
      <EditVaritant data={data} editProduct={editProduct} setData={setData} />
      {/* action */}
      <section className="bg-white mb-6 flex flex-col gap-2">
        <h4 className="uppercase">Tùy chọn</h4>
        <div className="flex gap-5">
          <button
            type="submit"
            className="px-2 py-1 border border-green-500 hover:bg-green-500 hover:text-white uppercase"
          >
            Lưu chỉnh sửa <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            onClick={async () => {
              await handleDelete();
            }}
            type="button"
            className="px-2 py-1 border border-red-500 hover:bg-red-500 hover:text-white uppercase"
          >
            Xóa sản phẩm <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
          <button
            type="button"
            onClick={() => {
              setData(product!);
            }}
            className="px-2 py-1 border border-gray-500 hover:bg-gray-500 hover:text-white uppercase"
          >
            hủy thay đổi <FontAwesomeIcon icon={faHistory} />
          </button>
          <button
            type="button"
            onClick={async () => {
              await handleStopActiveProduct();
            }}
            className="px-2 py-1 border border-gray-300 uppercase hover:bg-gray-400 hover:text-white"
          >
            {data.isActive ? "Ngừng" : "Mở"} bán sản phẩm này
            {data.isActive ? (
              <FontAwesomeIcon icon={faCancel} />
            ) : (
              <FontAwesomeIcon icon={faBoxOpen} />
            )}
          </button>
        </div>
      </section>
    </form>
  ) : (
    <div className="flex h-full items-center justify-center">
      <p className="uppercase">Sản phẩm không tồn tại.</p>
    </div>
  );
}
