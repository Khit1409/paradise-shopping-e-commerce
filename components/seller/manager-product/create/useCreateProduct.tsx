import { createProductDescriptionHtmlElement } from "@/feature/open-api";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { getEditProductApiThunk } from "@/redux/seller/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadImageToCloud } from "@/service/cloud.service";
import { createNewProduct } from "@/service/seller.service";
import { ProductDataRequest } from "@/type/seller.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCreateProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editProduct } = useSelector((state: RootState) => state.seller);

  // --- STATE ---
  const [data, setData] = useState<ProductDataRequest>({
    info: {
      name: "",
      slug: "",
      category: "",
      description: "",
      brand: "",
    },
    original_price: 0,
    sale: 0,
    thumbnail: "",
    images: [],
    varitants: [],
  });
  const [wating, setWating] = useState<boolean>(false);
  const [modelCount, setModelCount] = useState<number>(0);

  /**
   * call create product api
   */
  useEffect(() => {
    const getEditApi = async () => {
      await dispatch(getEditProductApiThunk());
    };
    getEditApi();
  }, [dispatch, data]);
  /**
   * --- HANDLER: Upload Thumbnail ---
   */
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    dispatch(onLoadingAction(true));
    const fileUrl = await uploadImageToCloud(file);

    dispatch(onLoadingAction(false));
    if (!fileUrl || fileUrl.resultCode !== 1) {
      return dispatch(
        onErrorModel({ onError: true, mess: "Lỗi tải ảnh lên đám mây!" })
      );
    }
    setData((prev) => ({ ...prev, thumbnail: fileUrl.url }));
  };

  /**
   * --- HANDLER: Upload Detail Images ---
   */
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    dispatch(onLoadingAction(true));
    const fileUrl = await uploadImageToCloud(file);
    dispatch(onLoadingAction(false));

    if (!fileUrl || fileUrl.resultCode !== 1) {
      return dispatch(
        onErrorModel({ onError: true, mess: "Lỗi tải ảnh lên đám mây!" })
      );
    }

    setData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = fileUrl.url;
      return { ...prev, images: updatedImages };
    });
  };

  /**
   * --- HANDLER: Change Variant (checkbox / value) ---
   */
  const handleVariantChange = ({
    sku,
    stoke,
    name,
    value,
  }: {
    sku: string;
    name?: string;
    stoke?: number;
    value?: string;
  }) => {
    const updatedVariants = [...(data.varitants ?? [])];
    const variantIdx = updatedVariants.findIndex((v) => v.sku === sku);
    if (variantIdx !== -1) {
      if (stoke) updatedVariants[variantIdx].stoke = stoke;
      if (name) {
        const attrIdx = updatedVariants[variantIdx].attributes.findIndex(
          (a) => a.name === name
        );
        if (attrIdx !== -1) {
          if (value) {
            const valIdx = updatedVariants[variantIdx].attributes[
              attrIdx
            ].value.findIndex((v) => v === value);
            if (valIdx !== -1) {
              updatedVariants[variantIdx].attributes[attrIdx].value.splice(
                valIdx,
                1
              );
            } else {
              updatedVariants[variantIdx].attributes[attrIdx].value.push(value);
            }
          } else {
            updatedVariants[variantIdx].attributes = updatedVariants[
              variantIdx
            ].attributes.filter((a) => a.name !== name);
          }
        } else {
          updatedVariants[variantIdx].attributes.push({
            name: name,
            value: value ? [value] : [],
          });
        }
      }
    } else {
      updatedVariants.push({
        sku,
        stoke: stoke ?? 0,
        attributes: [],
      });
    }

    setData((prev) => ({ ...prev, varitants: updatedVariants }));
  };

  /**
   * find brand list by selected category name
   * @param category
   */
  const findBrands = () => {
    if (!data.info.category) return [];
    const selectedCategory = editProduct.find(
      (edit) => edit.category === data.info.category
    );
    if (!selectedCategory) {
      return [];
    }
    const brandNeeded = selectedCategory.brands;
    return brandNeeded;
  };
  /**
   * find varitant product list by selected cate gory
   * @param category
   */
  const findVaritantAttributes = (category: string) => {
    const selectedCategory = editProduct.find(
      (cate) => cate.category === category
    );
    if (!selectedCategory) return [];
    return selectedCategory.attributes;
  };
  /**
   * check is valid attribute by sku and name in data state
   * @param sku
   * @param name
   */
  const isCheckedAttribute = (sku: string, name: string) => {
    if (!data.varitants) {
      return false;
    }
    const isValidVaritant = data.varitants.find((fVr) => fVr.sku === sku);
    if (!isValidVaritant) return false;

    const isValidAttribute = isValidVaritant.attributes.find(
      (fAttr) => fAttr.name === name
    );
    if (!isValidAttribute) return false;
    return true;
  };
  /**
   * check is valid  attribute value by sku, name , value in data state
   * @param sku
   * @param name
   * @param value
   */
  const isCheckedValue = (sku: string, name: string, value: string) => {
    const isValidVaritant = data.varitants.find((fVar) => fVar.sku === sku);
    if (!isValidVaritant) return false;
    const isValidAttribute = isValidVaritant.attributes.find(
      (fAttr) => fAttr.name === name
    );
    if (!isValidAttribute) return false;
    const isValidValue = isValidAttribute.value.find((fVl) => fVl === value);
    if (!isValidValue) return false;
    return true;
  };
  /**
   * check validate value before handle request add new product
   * @param data
   * @returns
   */
  const checkValidateRequest = (data: ProductDataRequest) => {
    let errorMessage: string | null = null;
    if (data.images.length == 0) {
      errorMessage = "Vui lòng thêm ít nhất 1 ảnh mô tả sản phẩm";
    } else if (data.original_price <= 0) {
      errorMessage = "Giá sản phẩm bạn nhập không hợp lệ";
    } else if (data.sale > 100 || data.sale < 0) {
      errorMessage = "Giá khuyến mại quá lớn hoặc quá nhỏ. Hãy chọn giá hợp lệ";
    } else if (!data.thumbnail) {
      errorMessage = "Vui lòng thêm ảnh bìa cho sản phẩm";
    } else if (data.varitants.length == 0) {
      errorMessage = "Vui lòng thêm ít nhất 1 phân loại sản phẩm.";
    } else if (data.varitants.find((f) => f.sku === "")) {
      errorMessage = "Lỗi tạo mã định danh cho phân loại";
    }
    if (errorMessage !== null) {
      dispatch(
        onErrorModel({
          onError: true,
          mess: errorMessage,
        })
      );
      return false;
    }
    return true;
  };

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();
    /**
     * start handle
     */
    dispatch(onLoadingAction(true));
    const check = checkValidateRequest(data);
    if (!check) {
      dispatch(onLoadingAction(false));
      return;
    }
    const result = await createNewProduct(data);
    if (result) {
      dispatch(onLoadingAction(false));
      if (result.success) {
        dispatch(onSuccessfulModel(true));
      } else {
        dispatch(onErrorModel({ mess: result.message, onError: true }));
      }
    }
  }

  /**
   * create product description by ai
   */
  const createDescripionByAi = async () => {
    if (
      Object.entries(data.info).some(
        ([key, value]) => key !== "slug" && key !== "description" && !value
      )
    )
      return;
    setWating(true);
    const descByAi = await createProductDescriptionHtmlElement(
      JSON.stringify(data)
    );
    setData((prev) => {
      return { ...prev, info: { ...prev.info, description: descByAi } };
    });
    setWating(false);
  };
  /**
   * cancel change
   */
  const onStopHandle = () => {
    setData({
      info: {
        name: "",
        slug: "",
        category: "",
        description: "",
        brand: "",
      },
      original_price: 0,
      sale: 0,
      thumbnail: "",
      images: [],
      varitants: [],
    });
    setModelCount(0);
  };

  return {
    data,
    setData,
    editProduct,
    wating,
    modelCount,
    setModelCount,
    handlers: {
      handleThumbnailUpload,
      handleImageUpload,
      handleVariantChange,
      createProduct,
      createDescripionByAi,
      onStopHandle,
    },
    helpers: {
      findBrands,
      findVaritantAttributes,
      isCheckedAttribute,
      isCheckedValue,
    },
  };
};
