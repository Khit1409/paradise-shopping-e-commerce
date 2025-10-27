import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import {
  checkoutAction,
  onOpenOrderModal,
} from "@/api/redux/slice/order_slice/order.slice";
import { AppDispatch, RootState } from "@/api/redux/store";
import { addNewOrder } from "@/api/services/order.service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 *
 * @returns
 */
export const useOrderModal = () => {
  /** Redux setup */
  const dispatch = useDispatch<AppDispatch>();
  const { orderState } = useSelector((state: RootState) => state.order);
  const { user } = useSelector((state: RootState) => state.auth);

  /** Local state */
  const [kindOfShip, setKindOfShip] = useState<"COD" | "FLASH">("COD");
  const [kindOfPay, setKindOfPay] = useState<"ONLINE" | "COD">("COD");
  const [orderAddress, setOrderAddress] = useState<string>("");
  const [orderEmail, setOrderEmail] = useState<string>("");
  const [orderPhone, setOrderPhone] = useState<string>("");
  const [otherEmail, setOtherEmail] = useState<string>("");
  const [otherPhone, setOtherPhone] = useState<string>("");
  /**
   * Props state
   */
  const [otherAddress, setOtherAddress] = useState<string>("");

  /**
   * function reset component state when finished a handle
   */
  const resetDefaultValue = () => {
    setOrderAddress("");
    setKindOfPay("COD");
    setKindOfShip("COD");
    setOtherAddress("");
    setOrderPhone("");
    setOrderEmail("");
    setOrderPhone("");
  };
  /** Close modal handler */
  const closeModal = () => {
    resetDefaultValue();
    dispatch(
      onOpenOrderModal({
        open: false,
        items: null,
      })
    );
  };

  /** Handle address select */
  const onchangeAddress = (address: string) => {
    setOrderAddress((prev) => (prev === address ? "" : address));
  };

  /**
   * handle add to order
   * @param param0
   */
  async function addToOrder() {
    try {
      /**
       * check validate importain value
       */
      if (!user || !orderState || !orderState.items) {
        dispatch(
          onErrorModel({
            onError: true,
            mess: "Hình như bạn chưa đăng nhập, hoặc có lỗi gì đó khi chọn các phân loại hàng, vui lòng thử lại",
          })
        );
        return;
      }
      /**
       * start handle with loading animation
       */
      dispatch(onLoadingAction(true));
      /**
       * send request to server
       */
      const result = await addNewOrder({
        contact: {
          address: orderAddress === "other" ? otherAddress : orderAddress,
          email: orderEmail === "other" ? otherEmail : orderEmail,
          phone: orderPhone === "other" ? otherPhone : orderPhone,
          userName: `${user.userFirtName}-${user.userLastName}`,
        },
        item: {
          orderImg: orderState.items.productImg,
          proId: orderState.items.productId,
          kindOfShip,
          kindOfPay,
          orderName: orderState.items.productName,
          orderStatus: "PENDING",
          payStatus: "PAID",
          quantity: orderState.items.quantity,
          totalPrice: orderState.items.totalPrice,
        },
        attribute: orderState.items.attribute,
      });
      /**
       * check result order
       */
      if (result.resultCode === 1) {
        dispatch(onLoadingAction(false));
        resetDefaultValue();
        dispatch(onOpenOrderModal({ items: null, open: false }));
        /**
         * check payment if not null open checkout modal
         */
        if (result.payment !== null) {
          dispatch(checkoutAction({ openModal: true, value: result.payment }));
        }
        /**
         * if just pay code => open successfull modal
         */
        dispatch(onSuccessfulModel(true));
      } else {
        /**
         * else handle
         */
        dispatch(onLoadingAction(false));
        resetDefaultValue();
        dispatch(onOpenOrderModal({ items: null, open: false }));
        dispatch(onErrorModel({ mess: "Đơn hàng thất bại!", onError: true }));
      }
    } catch (error) {
      /**
       * catch handle
       */
      dispatch(onLoadingAction(false));
      resetDefaultValue();
      dispatch(onErrorModel({ onError: true, mess: `${error}` }));
    }
  }

  /**
   * return state and set state action
   */
  return {
    kindOfPay,
    setOrderEmail,
    setKindOfPay,
    kindOfShip,
    setKindOfShip,
    orderAddress,
    setOrderAddress,
    orderEmail,
    setOtherEmail,
    otherAddress,
    setOtherAddress,
    orderPhone,
    setOrderPhone,
    otherEmail,
    otherPhone,
    setOtherPhone,
    closeModal,
    onchangeAddress,
    addToOrder,
    orderState,
    user,
  };
};
