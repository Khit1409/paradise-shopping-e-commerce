"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../../service/auth.service";
import LoginForm from "../../form/user/LoginForm";
import { onErrorModel, onLoadingAction } from "../../../redux/app/slice";
import { authenticationThunk } from "../../../redux/auth/thunk";

export default function Login() {
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
      const result = await signIn({
        email: requestData.email,
        password: requestData.password,
        role: "user",
      });

      if (result) {
        dispatch(onLoadingAction(false));
        if (result.resultCode == 1) {
          const check = await dispatch(authenticationThunk());
          if (authenticationThunk.fulfilled.match(check)) {
            return router.replace(`/user`);
          }
        } else {
          dispatch(
            onErrorModel({
              mess: `${result.message}`,
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
    <LoginForm
      acceptLogin={setAccept}
      acceptLoginState={accept}
      getRequestData={setRequestData}
      handle={handleSignIn}
    />
  );
}
