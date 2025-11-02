"use client";

import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMinus,
  faPlus,
  faShoppingBasket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { addToCartServicer } from "@/service/cart.service";
import { getAttrNameBySlug } from "@/utils/seller.util";
import { getSingleProductThunk } from "@/redux/product/thunk";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { getUserCartThunk } from "@/redux/cart/thunk";
import { onOpenOrderModal } from "@/redux/order/slice";
import { minusedPrice, nowPrice } from "@/utils/salePrice";

export default function ProductSinglePage() {
  const params = useSearchParams();
  const _info = params?.get("_info");
  const [slug, id]: (string | undefined)[] = _info?.split("_") ?? [];
  const { product } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);

  /** Component state */
  const [chooseAttr, setChooseAttr] = useState<
    { name: string; value: string; img?: string }[]
  >([]);
  const [imgPreview, setImgPreview] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  const [unSeletAttr, setUnSelectAttr] = useState<boolean>(false);

  /** Redux setup */
  const dispatch = useDispatch<AppDispatch>();
  /** Fetch product data */
  useEffect(() => {
    setChooseAttr([]);
    (async () => {
      await dispatch(getSingleProductThunk(id));
    })();
  }, [id, dispatch, slug]);

  /** Handle change attribute */
  const handleOnchangeAttr = ({
    attrName,
    itemValue,
    itemImg,
  }: {
    attrName: string;
    itemValue: string;
    itemImg?: string;
  }) => {
    const existed = chooseAttr.find(
      (f) => f.name === attrName && f.value === itemValue
    );
    const filtered = chooseAttr.filter(
      (ft) => ft.name !== attrName && ft.value !== itemValue
    );
    if (existed) return setChooseAttr([...filtered]);
    setChooseAttr([
      ...filtered,
      { name: attrName, value: itemValue, img: itemImg ?? "" },
    ]);
  };

  /** Handle Add To Cart */
  async function addToCart() {
    try {
      dispatch(onLoadingAction(true));
      if (!user) {
        dispatch(onLoadingAction(false));
        dispatch(onErrorModel({ mess: "Please login first!", onError: true }));
        return;
      }
      if (!id || !product) {
        dispatch(onLoadingAction(false));
        dispatch(onErrorModel({ mess: "Product not found!", onError: true }));
        return;
      }

      const chooseArr = chooseAttr.map((choose) => ({
        attrName: choose.name,
        itemValue: choose.value,
      }));

      if (
        chooseArr.length == 0 ||
        chooseArr.length < product.proAttributes.length
      ) {
        dispatch(onLoadingAction(false));
        setUnSelectAttr(true);
        return;
      }

      const result = await addToCartServicer({
        proId: id,
        img: product.proImg,
        name: product.proName,
        quantity,
        price: product.proPrice,
        choose: chooseArr,
      });

      if (result.resultCode == 1) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
        await dispatch(getUserCartThunk());
      } else {
        dispatch(onLoadingAction(false));
        dispatch(onErrorModel({ mess: "Add to cart failed!", onError: true }));
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ mess: `${error}`, onError: true }));
    }
  }
  /**
   * Handle Order
   */
  function handleOpenOrderModal() {
    if (!id || !product || !user) {
      return;
    }
    const orderAttribute: {
      attributeName: string;
      attributeValue: string;
    }[] = [];
    chooseAttr.map((value) => {
      orderAttribute.push({
        attributeName: value.name,
        attributeValue: value.value,
      });
    });
    if (orderAttribute.length == 0) {
      setUnSelectAttr(true);
    }
    if (orderAttribute.length > 0) {
      dispatch(
        onOpenOrderModal({
          open: true,
          items: {
            attribute: orderAttribute,
            productName: product.proName,
            productId: product._id,
            productImg: product.proImg,
            quantity,
            totalPrice: product.proPrice * quantity,
          },
        })
      );
    }
  }
  /**
   *
   */
  /** UI */
  return (
    product && (
      <section className="bg-gray-50 text-gray-700">
        <div className="mx-auto p-5 bg-white">
          {/* Product Main Section */}
          <div className="flex flex-col lg:flex-row gap-8 ">
            {/* Image Section */}
            <div className="flex-1 flex gap-3">
              <div className="flex-1 flex justify-center">
                <Image
                  src={imgPreview ?? product.proImg}
                  alt={product.proName}
                  width={400}
                  height={400}
                  className="rounded-xl border border-gray-200 object-cover h-[400px] w-[400px]"
                />
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto w-[120px]">
                {product.proImgDetails.map((img) => (
                  <Image
                    key={img._id}
                    src={img.imgUrl}
                    alt="thumbnail"
                    width={100}
                    height={100}
                    onMouseEnter={() => setImgPreview(img.imgUrl)}
                    className="rounded-lg border border-gray-200 hover:border-red-400 hover:scale-[1.05] transition-all duration-200 cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div
              className={`flex-1 flex flex-col gap-4 h-[400px] overflow-y-auto p-1`}
            >
              <h1 className="text-3xl font-bold uppercase text-gray-800">
                {product.proName}
              </h1>
              <div className="font-bold text-red-500 flex gap-1 items-center">
                <p className="text-2xl">
                  {nowPrice(product.proPrice, product.proSale)}
                  <span className="text-sm pb-3">₫</span>
                </p>
                <p className="line-through text-gray-700 ms-2">
                  {product.proSale ? (
                    <>
                      {minusedPrice(product.proPrice, product.proSale)}
                      <span className="text-sm pb-3">₫</span>
                    </>
                  ) : (
                    <></>
                  )}
                </p>
                <p className="ms-2 text-sm">{product.proSale}%</p>
              </div>

              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.proDescription}
              </p>

              {/* Attributes */}
              <div
                className={`p-1 ${
                  unSeletAttr ? "bg-red-100" : ""
                } flex flex-col gap-3`}
              >
                {product.proAttributes.map((attr) => (
                  <div key={attr._id} className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {getAttrNameBySlug(attr.attrName)}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {attr.items.map((item) => (
                        <button
                          key={item._id}
                          onClick={() => {
                            setUnSelectAttr(false);
                            handleOnchangeAttr({
                              attrName: attr.attrName,
                              itemValue: item.itemValue,
                              itemImg: item.itemImg ?? "",
                            });
                          }}
                          className={`flex flex-col items-center border p-2 rounded-lg transition-all duration-200 hover:scale-[1.03] ${
                            chooseAttr.find(
                              (ac) =>
                                ac.name === attr.attrName &&
                                ac.value === item.itemValue
                            )
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                        >
                          {item.itemImg && (
                            <Image
                              src={item.itemImg}
                              alt={item.itemValue}
                              width={70}
                              height={70}
                              className="rounded-lg object-cover"
                            />
                          )}
                          <span className="text-sm mt-1 truncate">
                            {item.itemValue}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {unSeletAttr && (
                  <p className="text-red-500 py-3">
                    Vui lòng lựa chọn phân loại hàng!
                  </p>
                )}
              </div>

              {/* Quantity + Buttons */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center">
                  <button
                    disabled={quantity == 1}
                    className="p-2 border border-gray-300 border-r-transparent"
                    onClick={() => {
                      setQuantity((prev) => prev - 1);
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="border border-gray-300 outline-0 text-center p-2 w-20"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button
                    className="p-2 border border-gray-300 border-l-transparent"
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  onClick={() => addToCart()}
                  className="flex items-center justify-center gap-2 px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all text-lg font-semibold shadow"
                >
                  Add to Cart
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>

                <button
                  onClick={() => handleOpenOrderModal()}
                  className="flex items-center justify-center gap-2 px-5 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all text-lg font-semibold shadow"
                >
                  Order Now
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-10">
            <p className="text-xl text-gray-800 font-semibold mb-2 uppercase">
              sản phẩm cùng danh mục
            </p>
            <hr className="border-amber-400 mb-4" />
            {/* <RealatedProduct related={singleProduct.related} /> */}
          </div>
        </div>
      </section>
    )
  );
}
