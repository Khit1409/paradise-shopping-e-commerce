"use client";
import {
  onSuccessfulModel,
  onLoadingAction,
  onErrorModel,
} from "@/api/Redux/Slice/App/app.slice";
import { AppDispatch, RootState } from "@/api/Redux/store";
import { upNewProductThunk } from "@/api/Redux/Thunk/Seller/seller.thunk";
import { uploadImageToCloud } from "@/feature/upload";
import { faDatabase, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpNewProductBasicInput from "./form/CreateBasicInput";
import UpNewProductImg from "./form/CreateImg";
import UpNewProductAttribute from "./form/CreateAttribute";
import CategoryInput from "./form/CreateCategorySelect";

interface SavedAttributeValue {
  value: string;
  img?: File;
}

interface BasicInputRequest {
  name: string;
  hashtag: string;
  sale: number;
  price: number;
  description: string;
}

export default function UpNewProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  /**
   * input state
   * các input dạng text và number đơn giản
   */
  const [cateSlug, setCateSlug] = useState<string>("");
  const [basicReq, setBasicReq] = useState<BasicInputRequest>({
    description: "",
    hashtag: "",
    name: "",
    price: 0,
    sale: 0,
  });
  /**
   * Tạo các state để lưu tạm các giá trị dạng array
   * và các giá trị ảnh dạng file trước trị upload và nhận url từ clound
   */

  //img file state
  const [savedImg, setSavedImg] = useState<File>();
  const [savedImgDetail, setSavedImgDetail] = useState<File[]>([]);
  //attributes state
  const [attribute, setAttribute] = useState<
    { name: string; item: { value: string; img?: File }[] }[]
  >([]);
  const [savedAttrName, setSavedAttrName] = useState<string>();
  const [savedAttrValue, setSavedAttrValue] = useState<SavedAttributeValue[]>(
    []
  );
  /**
   * Handle
   */
  //save a object and push to main array
  const handleSubmitAttribute = useCallback(() => {
    const name = savedAttrName ?? "Lựa chọn";
    const value = savedAttrValue;
    setAttribute((prev) => [...prev, { name: name, item: value }]);
    setSavedAttrValue([]);
    setSavedAttrName("");
  }, [savedAttrName, savedAttrValue]);

  // onchange each attribute object
  const handleOnchangeAttrValue = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      type: "img" | "value",
      index: number
    ) => {
      const newValue = e.target.value;
      const newFile = e.target.files?.[0];

      setSavedAttrValue((prev) => {
        // lấy obj cũ
        const updated = [...prev];
        //check tại index hiện tại
        if (!updated[index]) updated[index] = { value: "", img: undefined };
        //thêm mới các filed
        if (type === "value") {
          updated[index].value = newValue;
        } else if (type === "img") {
          updated[index].img = newFile;
        }
        return updated;
      });
    },
    []
  );

  /**
   * Up products to databse
   * @returns
   */
  const handleUpNewProduct = async () => {
    try {
      //loading effect for wait up function successful
      dispatch(onLoadingAction(true));
      //
      const mainImgUrl = await uploadImageToCloud(savedImg);
      const imgDetailUrl: { imgUrl?: string }[] = [];
      //upload avatar product and product img detail
      for (const img of savedImgDetail) {
        const newUrl = await uploadImageToCloud(img);
        imgDetailUrl.push({ imgUrl: newUrl });
      }
      const newAttribute: {
        name: string;
        item: { value: string; img?: string }[];
      }[] = [];
      //upload attribute item img
      for (const attr of attribute) {
        const items = await Promise.all(
          attr.item.map(async (it) => {
            const itemImgUrl = it.img ? await uploadImageToCloud(it.img) : "";
            return { value: it.value, img: itemImgUrl };
          })
        );
        //push new array to new Attribute
        newAttribute.push({ name: attr.name, item: items });
      }

      // failed when two flied mixiss
      if (!user?.userStore || !user.userId) {
        dispatch(onLoadingAction(false));
        return;
      }
      if (!basicReq) {
        dispatch(onLoadingAction(false));
        return;
      }
      //gửi dispatch
      const result = await dispatch(
        upNewProductThunk({
          cate_slug: cateSlug,
          description: basicReq.description,
          name: basicReq.name,
          price: basicReq.price,
          sale: basicReq.sale,
          hashtag: basicReq.hashtag,
          img: mainImgUrl,
          imgDetail: imgDetailUrl,
          attribute: newAttribute,
        })
      );
      if (upNewProductThunk.fulfilled.match(result)) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
      } else {
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({ onError: true, mess: result.payload as string })
        );
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleUpNewProduct}>
      {/* select category */}
      <CategoryInput setCateSlug={setCateSlug} />
      {/* basic input */}
      <UpNewProductBasicInput setBasicReq={setBasicReq} />
      {/* img input */}
      <UpNewProductImg
        setSavedImg={setSavedImg}
        setSavedImgDetail={setSavedImgDetail}
        savedImg={savedImg}
        savedImgDetail={savedImgDetail}
      />
      {/* attributes input*/}
      <UpNewProductAttribute
        savedAttrValue={savedAttrValue}
        savedAttrName={savedAttrName}
        handleOnchangeAttrValue={handleOnchangeAttrValue}
        handleSubmitAttribute={handleSubmitAttribute}
        setSavedAttrName={setSavedAttrName}
        setSavedAttrValue={setSavedAttrValue}
      />
      {/* button */}
      <section className="p-3 shadow-md bg-white rounded">
        <button
          type="submit"
          role="button"
          className="px-2 py-1 bg-green-500 text-white"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          <FontAwesomeIcon icon={faDatabase} />
          Thêm sản phẩm
        </button>
      </section>
    </form>
  );
}
