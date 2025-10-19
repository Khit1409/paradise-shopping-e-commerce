"use client";
import { useDispatch } from "react-redux";
import UserLoginForm from "../form/UserLoginFrom";
import { AppDispatch } from "@/api/Redux/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { onErrorModel, onLoadingAction } from "@/api/Redux/Slice/App/app.slice";
import {
  authenticationThunk,
  signInThunk,
} from "@/api/Redux/Thunk/Auth/auth.thunk";

export default function UserLoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * App state
   */
  const [accept, setAccept] = useState<boolean>(false);
  const [requestData, setRequestData] = useState({
    email: "",
    password: "",
  });

  /**
   * App router
   */
  const router = useRouter();

  /**
   * handle sign in
   * @param e
   */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //start sending
      dispatch(onLoadingAction(true));
      //send dispatch
      const result = await dispatch(
        signInThunk({
          email: requestData.email,
          password: requestData.password,
          role: "user",
        })
      );
      //check state login
      if (signInThunk.fulfilled.match(result)) {
        //auth user if successfull
        const check = await dispatch(authenticationThunk({ role: "user" }));
        if (authenticationThunk.fulfilled.match(check)) {
          dispatch(onLoadingAction(false));
          router.replace("/user");
        } else {
          // stop loading and start open error modal if error
          dispatch(onLoadingAction(false));
          //
          dispatch(
            onErrorModel({
              mess: "Đăng nhập bị lỗi, vui lòng kiểm tra lại email và mât khẩu",
              onError: true,
            })
          );
        }
      }
    } catch (error) {
      //catch error
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          mess: `${error}`,
          onError: true,
        })
      );
    }
  };
  //render
  return (
    <UserLoginForm
      acceptLogin={setAccept}
      acceptLoginState={accept}
      getRequestData={setRequestData}
      handle={handleSignIn}
    />
  );
}
