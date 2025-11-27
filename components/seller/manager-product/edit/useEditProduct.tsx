import { createProductDescriptionHtmlElement } from "@/feature/open-api";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { getSingleProductThunk } from "@/redux/product/thunk";
import { getEditProductApiThunk } from "@/redux/seller/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import {
  deleteProduct,
  stopProductActive,
  updateProduct,
} from "@/service/seller.service";
import { SingleProduct } from "@/type/product.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useEditProduct = () => {
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

  return {
    data,
    product,
    setData,
    handleUpdate,
    handleDelete,
    handleStopActiveProduct,
    findOtherBrand,
    createDescripionByAi,
    wating,
    product_id,
    editProduct,
  };
};
