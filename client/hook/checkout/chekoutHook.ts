import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { cancelCheckout } from "@/service/order.service";
import { checkoutAction } from "@/redux/order/slice";

export const ChekoutHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkoutState } = useSelector((state: RootState) => state.order);
  const { value } = checkoutState;
  /**
   * check validate
   */
  if (!value) return null;
  /**
   * value of check state
   */
  const { paymentLinkId } = value;
  console.log(value);
  /**
   * handle
   */
  //cancel payment
  async function cancel() {
    try {
      if (!paymentLinkId) {
        dispatch(
          onErrorModel({
            onError: true,
            mess: "Hủy thanh toán thất bại đợi 5p để hệ thống tự động hủy!",
          })
        );
      }
      dispatch(onLoadingAction(true));
      const res = await cancelCheckout(
        paymentLinkId,
        "Người dùng hủy thanh toán"
      );
      const data = res;
      if (data) {
        dispatch(onLoadingAction(false));
        if (data.resultCode === 1) {
          dispatch(onSuccessfulModel(true));
          dispatch(checkoutAction({ value: null }));
        } else {
          dispatch(onErrorModel({ mess: "Server error", onError: true }));
          dispatch(checkoutAction({ value: null }));
        }
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ mess: `${error}`, onError: true }));
    }
  }
  /**
   * return state , hook, handel onchange here
   */
  return {
    cancel,
    value,
  };
};
