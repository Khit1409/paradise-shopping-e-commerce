import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { AppDispatch } from "@/redux/store";
import { clietnRegisterService } from "@/service/auth.service";
import { OnchangeImage } from "../../utils/onchangeImage";
import { useState } from "react";
import { useDispatch } from "react-redux";

export type RegisterInputState = {
  firtname: string;
  email: string;
  phone: string;
  lastname: string;
  password: string;
  repassword: string;
  avatar?: string;
};

export const RegisterHook = () => {
  /**
   * redux
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   * component state
   */
  const [registerInput, setRegisterInput] = useState<RegisterInputState>({
    firtname: "",
    email: "",
    phone: "",
    lastname: "",
    password: "",
    repassword: "",
    avatar: "",
  });
  /**
   * Register onchange
   * @param e
   */
  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { email, firtname, lastname, password, phone, repassword, avatar } =
        registerInput;
      const isValid = !Object.entries(registerInput).some(
        ([key, value]) => key !== "avatar" && !value
      );
      if (isValid) {
        dispatch(
          onErrorModel({
            mess: "Vui lòng nhập đầy đủ thông tin đăng ký!",
            onError: true,
          })
        );
        return;
      }
      if (password !== repassword) {
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
        email,
        firtname,
        lastname,
        password,
        phone,
        avatar,
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
      dispatch(onLoadingAction(false));
      setRegisterInput((prev) => ({ ...prev, avatar: url }));
    } else {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Error up load pricture to cloud",
        })
      );
    }
  };
  return {
    handleRegister,
    registerInput,
    setRegisterInput,
    onchangeAvatar,
  };
};
