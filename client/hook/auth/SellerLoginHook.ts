import { useState } from "react";
import { SellerLoginRequest } from "@/type/auth.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { checkValidateLoginRequest, signIn } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { authenticationThunk } from "@/redux/auth/thunk";

export const SellerLoginHook = () => {
  const [requestData, setRequestData] = useState<SellerLoginRequest>({
    email: "",
    password: "",
    role: "seller",
  });
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    /**
     * check validate request
     */
    const { email, password, role } = requestData;
    const checkError = checkValidateLoginRequest(email, password);
    if (checkError !== null) {
      dispatch(onErrorModel({ onError: true, mess: checkError }));
      return;
    }
    dispatch(onLoadingAction(true));
    try {
      const res = await signIn({ role, password, email });
      if (res) {
        dispatch(onLoadingAction(false));
        if (res.success) {
          await dispatch(authenticationThunk("seller"));
          dispatch(onSuccessfulModel(true));
          return router.replace(`/seller`);
        } else {
          return dispatch(
            onErrorModel({
              onError: true,
              mess: res.message ?? "Server Error: Error login status:500",
            })
          );
        }
      }
    } catch (error) {
      return dispatch(
        onErrorModel({
          onError: true,
          mess: `${error ?? "Server Error: Error login status:500"}`,
        })
      );
    }
  }

  return { requestData, setRequestData, submitLogin, onchange };
};
