"use client";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import { AppDispatch } from "@/api/redux/store";
import { getSingleProductThunk } from "@/api/redux/thunk/seller_thunk/seller.thunk";
import { updateProduct } from "@/api/services/seller.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
  }, [dispatch, product_id]);

  async function submitUpdate() {
    if (!product_id) {
      return;
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
        dispatch(onSuccessfulModel(true));
      } else {
        dispatch(onErrorModel({ onError: true, mess: message }));
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
  };
};
