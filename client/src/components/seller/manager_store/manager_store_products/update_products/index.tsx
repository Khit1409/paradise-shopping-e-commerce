"use client";

import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/Redux/Slice/App/app.slice";
import { AppDispatch, RootState } from "@/api/Redux/store";
import {
  deleteActionSingleProductThunk,
  getSingleProductSellerThunk,
  updateProductThunk,
} from "@/api/Redux/Thunk/Seller/seller.thunk";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Child components
import BasicInput from "./form/UpdateBasicInput";
import ImgInput from "./form/UpdateImg";
import AttributeInput from "./form/UpdateAttribute";
import UpdateCategory from "./form/UpdateCategory";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faDatabase,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteSingleProduct } from "@/api/services/seller.service";

/**
 * Type definitions for local state
 */
type BasicInputType = {
  proName?: string;
  proPrice?: number;
  proSale?: number;
  proDescription?: string;
};

type AttributeInputType = {
  _id?: string;
  attrName: string;
  items?: { _id?: string; itemValue: string; itemImg?: string }[];
};

type ImageDetailType = {
  _id?: string;
  imgUrl?: string;
};

/**
 * Main page: Update Product
 */
export default function UpdateProductSinglePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { spSeller } = useSelector((state: RootState) => state.seller);
  // Get product_id from URL params
  const params = useSearchParams();
  const product_id = params.get("product_id");

  /**
   * Local states (data for child components)
   */
  const [reloadFlag, setReloadFlag] = useState(false);
  const [basicInput, setBasicInput] = useState<BasicInputType>();
  const [imgInput, setImgInput] = useState<string>();
  const [imgDetail, setImgDetail] = useState<ImageDetailType[]>([]);
  const [attributeInput, setAttributeInput] = useState<AttributeInputType[]>(
    []
  );
  const [newCate, setNewCate] = useState("");
  /**
   * Fetch product detail when component mounts
   * and prefill child component states
   */
  useEffect(() => {
    (async () => {
      dispatch(onLoadingAction(true));
      if (!user || !user.userStore) {
        return;
      }
      const rs = await dispatch(
        getSingleProductSellerThunk({
          product_id: product_id ?? "",
        })
      );

      if (getSingleProductSellerThunk.fulfilled.match(rs)) {
        // Prefill local states with old product data
        setBasicInput({
          proDescription: rs.payload.proDescription,
          proName: rs.payload.proName,
          proPrice: rs.payload.proPrice,
          proSale: rs.payload.proSale,
        });
        setNewCate(rs.payload.proCateSlug);
        setImgInput(rs.payload.proImg);
        setImgDetail(rs.payload.proImgDetails);
        setAttributeInput(rs.payload.proAttributes);
      }
      dispatch(onLoadingAction(false));
    })();
  }, [dispatch, product_id, user, reloadFlag]);

  /**
   * Submit updated product to server
   */
  async function updateProduct() {
    dispatch(onLoadingAction(true));

    // Validate required ids
    if (!product_id || !user?.userStore) {
      dispatch(onLoadingAction(false));
      return;
    }

    // handle update with promise all
    const [resultUp, resultDelete] = await Promise.all([
      dispatch(
        //update
        updateProductThunk({
          attribute: attributeInput,
          product_id: product_id,
          imgDetail: imgDetail,
          proCateSlug: newCate,
          proDescription: basicInput?.proDescription,
          proImg: imgInput,
          proName: basicInput?.proName,
          proPrice: basicInput?.proPrice,
          proSale: basicInput?.proSale,
        })
      ),
      //delete choseen
      dispatch(
        deleteActionSingleProductThunk({
          proId: product_id,
          attribute: attrIdRemove ?? [],
          attributeItem: attrItemIdRemove ?? [],
          imgDetail: imgIdRemove ?? [],
        })
      ),
    ]);

    //check result
    if (
      updateProductThunk.fulfilled.match(resultUp) &&
      deleteActionSingleProductThunk.fulfilled.match(resultDelete)
    ) {
      dispatch(onLoadingAction(false));
      dispatch(onSuccessfulModel(true));
      setReloadFlag(true);
      //call again product api for set new product data
      await dispatch(
        getSingleProductSellerThunk({
          product_id: product_id ?? "",
        })
      );
      //error action
    } else {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({ mess: "Cập nhật sản phẩm bị lỗi", onError: true })
      );
    }
  }
  //======delete====//
  /**
   * state
   */
  const [attrIdRemove, setAttrIdRemove] = useState<{ _id: string }[]>([]);
  const [imgIdRemove, setImgIdRemove] = useState<{ _id: string }[]>([]);
  const [attrItemIdRemove, setAttrItemIdRemove] = useState<
    { attrId: string; _id: string }[]
  >([]);
  /**
   * Delete single product
   * @param param0
   */
  async function deleteProduct() {
    dispatch(onLoadingAction(true));
    if (!product_id) {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({ mess: "Id của sản phẩm không tìm thấy!", onError: true })
      );
      return;
    }
    const result = await deleteSingleProduct(product_id);
    if (result.resultCode === 1) {
      dispatch(onLoadingAction(false));
      setReloadFlag(true);
      dispatch(onSuccessfulModel(true));
    } else {
      dispatch(
        onErrorModel({ onError: true, mess: "Không xóa được sản phẩm" })
      );
    }
  }
  /**
   * Render
   */
  return spSeller ? (
    <section className="flex flex-col gap-3">
      {/* Category selector */}
      <UpdateCategory setCateSlug={setNewCate} />
      {/* Basic inputs (name, price, description, etc.) */}
      <BasicInput basicInputValue={basicInput} setBasicInput={setBasicInput} />
      {/* Image upload + gallery */}
      <ImgInput
        imgDetail={imgDetail}
        imgUrl={imgInput}
        setDeleteImg={setImgIdRemove}
        setImg={setImgInput}
        setImgDetail={setImgDetail}
      />

      {/* Attributes editor */}
      <AttributeInput
        setDeleteAttr={setAttrIdRemove}
        setDeleteAttrItem={setAttrItemIdRemove}
        attribute={attributeInput}
        setSavedAttribute={setAttributeInput}
      />

      {/* Action buttons */}
      <div className="flex gap-3 bg-white rounded shadow-md p-2 border border-gray-200">
        <button
          type="button"
          role="button"
          className="bg-red-500 text-white p-2 rounded"
        >
          Hủy <FontAwesomeIcon icon={faCancel} />
        </button>

        <button
          type="button"
          onClick={() => deleteProduct()}
          role="button"
          className="bg-red-500 text-white p-2 rounded"
        >
          Xóa sản phẩm <FontAwesomeIcon icon={faTrash} />
        </button>

        <button
          type="submit"
          className="bg-green-500 p-2 text-white rounded"
          onClick={updateProduct}
        >
          Gửi lên dữ liệu server
          <FontAwesomeIcon icon={faSave} className="mx-1" />
          <FontAwesomeIcon icon={faDatabase} />
        </button>
      </div>
    </section>
  ) : (
    <section className="flex justify-center items-center h-[500px]">
      <p className="text-gray-700">SẢN PHẨM KHÔNG TỒN TẠI</p>
    </section>
  );
}
