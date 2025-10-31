"use client";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/../redux/app/slice";
import { AppDispatch, RootState } from "../../redux/store";
import { getSingleProductThunk } from "@/../redux/seller/thunk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateProduct } from "../../service/seller.service";

export type ProductAttributeItemUpdate = {
  _id: string;
  itemValue: string;
  itemImg?: string;
};
export type ProductAttributeUpdate = {
  _id: string;
  attrName: string;
  items: ProductAttributeItemUpdate[];
};
export type ProductInformationUpdate = {
  proName: string;
  proPrice: number;
  proSale: number;
  proCateSlug: string;
  proImg: string;
  proDescription: string;
};
export type ProductImageDetailUpdate = {
  _id: string;
  imgUrl: string;
};
export const EditProductHook = () => {
  const query = useSearchParams();
  const product_id = query?.get("product_id");
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.seller);
  const { reRender } = useSelector((state: RootState) => state.app);
  /**
   * component state
   */

  const [editProductInformation, setEditProductInformation] =
    useState<ProductInformationUpdate>({
      proCateSlug: "",
      proDescription: "",
      proImg: "",
      proName: "",
      proPrice: 0,
      proSale: 0,
    });
  const [editProductAttribute, setEditProductAttribute] = useState<
    ProductAttributeUpdate[]
  >([]);
  const [editProductImageDetail, setEditProductImageDetail] = useState<
    ProductImageDetailUpdate[]
  >([]);
  /**
   * call api
   */
  useEffect(() => {
    (async () => {
      if (!product_id) {
        return;
      }
      const get = await dispatch(getSingleProductThunk({ product_id }));
      if (getSingleProductThunk.fulfilled.match(get)) {
        const { payload } = get;
        const {
          proAttributes,
          proCateSlug,
          proDescription,
          proImg,
          proImgDetails,
          proName,
          proPrice,
          proSale,
        } = payload;
        setEditProductAttribute(proAttributes);
        setEditProductInformation({
          proCateSlug: proCateSlug,
          proImg: proImg,
          proName: proName,
          proPrice: proPrice,
          proSale: proSale,
          proDescription: proDescription,
        });
        setEditProductImageDetail(proImgDetails);
      }
    })();
  }, [dispatch, product_id, reRender]);

  async function submitUpdate() {
    dispatch(onLoadingAction(true));
    if (!product_id) {
      dispatch(onLoadingAction(false));
      return dispatch(
        onErrorModel({ onError: true, mess: "Error get product id!" })
      );
    }
    const { proCateSlug, proDescription, proImg, proName, proPrice, proSale } =
      editProductInformation;
    const res = await updateProduct({
      id: product_id,
      body: {
        deleteValue: { attribute: [], attributeItem: [], imgDetail: [] },
        updateValue: {
          attribute: editProductAttribute,
          imgDetail: editProductImageDetail,
          proCateSlug,
          proDescription,
          proImg,
          product_id,
          proName,
          proPrice,
          proSale,
        },
      },
    });
    const { message, resultCode } = res;
    if (res) {
      dispatch(onLoadingAction(false));
      if (resultCode == 1) {
        return dispatch(onSuccessfulModel(true));
      } else {
        return dispatch(onErrorModel({ onError: true, mess: message }));
      }
    }
  }

  async function deleteProductAction() {
    dispatch(onLoadingAction(true));
    if (!product_id) {
      dispatch(onLoadingAction(false));
      return dispatch(
        onErrorModel({ onError: true, mess: "Error get product id!" })
      );
    }
    const res = await deleteProduct(product_id);
    const { message, resultCode } = res;
    if (res) {
      dispatch(onLoadingAction(false));
      if (resultCode == 1) {
        return dispatch(onSuccessfulModel(true));
      } else {
        return dispatch(
          onErrorModel({
            onError: true,
            mess: message ?? "Error delete product!",
          })
        );
      }
    }
  }

  return {
    editProductInformation,
    editProductAttribute,
    setEditProductAttribute,
    setEditProductInformation,
    setEditProductImageDetail,
    editProductImageDetail,
    submitUpdate,
    deleteProductAction,
    product,
  };
};
