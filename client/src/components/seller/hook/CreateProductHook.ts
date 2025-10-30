import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import { AppDispatch } from "@/api/redux/store";
import { createNewProduct } from "@/api/services/seller.service";
import { useState } from "react";
import { useDispatch } from "react-redux";
/**
 * type
 */
export type ProductInformation = {
  name: string;
  price: number;
  sale: number;
  description: string;
};
export type ProductAttributeItem = {
  itemValue: string;
  itemImg?: string;
};
export type ProductAttribute = {
  attrName: string;
  items: ProductAttributeItem[];
};
export type ProductImageDetail = {
  imgUrl: string;
};
/**
 * hook function
 */
export const CreateProductHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [productInformation, setProductInformation] =
    useState<ProductInformation>({
      name: "",
      price: 0,
      sale: 0,
      description: "",
    });
  const [attribute, setAttribute] = useState<ProductAttribute[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productThumbnail, setProductThumbnail] = useState<string>("");
  const [productImageDetail, setProductImageDetail] = useState<
    ProductImageDetail[]
  >([]);
  /**
   * === Onchange====
   */
  const onchangeInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  /**
   * send request to server
   */
  async function submitCreate() {
    if (
      !productInformation ||
      !attribute ||
      productImageDetail.length == 0 ||
      !productThumbnail ||
      !selectedCategory
    ) {
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Vui lòng nhập thông tin sản phẩm!",
        })
      );
      return;
    }
    dispatch(onLoadingAction(true));
    const { description, name, price, sale } = productInformation;
    const res = await createNewProduct({
      attribute,
      cate_slug: selectedCategory,
      description,
      img: productThumbnail,
      imgDetail: productImageDetail,
      name,
      price,
      sale,
    });
    if (res) {
      dispatch(onLoadingAction(false));
      const { message, resultCode } = res;
      if (resultCode !== 1) {
        return dispatch(onErrorModel({ onError: true, mess: message }));
      } else {
        return dispatch(
          onSuccessfulModel(true)
        );
      }
    }
  }
  return {
    onchangeInformation,
    productInformation,
    setProductInformation,
    attribute,
    setAttribute,
    selectedCategory,
    dispatch,
    setSelectedCategory,
    productImageDetail,
    productThumbnail,
    setProductImageDetail,
    setProductThumbnail,
    submitCreate,
  };
};
