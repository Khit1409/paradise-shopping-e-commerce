import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/../redux/app/slice";
import { AppDispatch } from "@/../redux/store";
import { clietnRegisterService } from "@/../service/auth.service";
import { OnchangeImage } from "../../utils/onchangeImage";
import { useState } from "react";
import { useDispatch } from "react-redux";

export type RegisterRequestType = {
  firtname: string;
  email: string;
  phone: string;
  lastname: string;
  password: string;
  repassword: string;
};

export const RegisterHook = () => {
  /**
   * redux
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   * component state
   */
  const [avt, setAvt] = useState<string>("");
  const [registerInput, setRegisterInput] = useState<RegisterRequestType>({
    firtname: "",
    email: "",
    phone: "",
    lastname: "",
    password: "",
    repassword: "",
  });
  /**
   * Register onchange
   * @param e
   */
  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (registerInput.password !== registerInput.repassword) {
        dispatch(
          onErrorModel({
            mess: "Hai mật khẩu bạn nhập không trùng khớp",
            onError: true,
          })
        );
        return;
      }

      dispatch(onLoadingAction(true));

      const result = await clietnRegisterService({
        email: registerInput.email,
        firtname: registerInput.firtname,
        lastname: registerInput.lastname,
        password: registerInput.password,
        phone: registerInput.phone,
        avatar: avt ?? "",
      });
      if (result.resultCode == 1) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
      } else {
        const error = new Error();
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({
            mess: `${error}`,
            onError: true,
          })
        );
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          mess: `${error}`,
          onError: true,
        })
      );
    }
  };

  const onchangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(onLoadingAction(true));
    const url: string | null = await OnchangeImage(e);
    if (url) {
      setAvt(url);
    } else {
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Error up load pricture to cloud",
        })
      );
    }
  };
  return {
    avt,
    handleRegister,
    setAvt,
    setRegisterInput,
    onchangeAvatar,
  };
};
