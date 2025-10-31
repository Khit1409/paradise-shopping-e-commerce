"use client";

import { uploadImageToCloud } from "../../service/cloud.service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "../../redux/app/slice";
import { updateUserAccount } from "../../service/auth.service";

interface UpdateAddressType {
  _id: string;
  addressName: string;
}
interface UpdatePhoneType {
  _id: string;
  phoneNum: string;
}
interface UpdateEmailType {
  _id: string;
  emailAddress: string;
}

export const ProfileSettingHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * component state
   */
  const { user } = useSelector((state: RootState) => state.auth);
  const [avatar, setAvatar] = useState<string>("");
  const [updateAddress, setUpdateAddress] = useState<UpdateAddressType[]>([]);
  const [updatePhone, setUpdatePhone] = useState<UpdatePhoneType[]>([]);
  const [updateEmail, setUpdateEmail] = useState<UpdateEmailType[]>([]);
  const [newFirtName, setNewFirtName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  /**
   * onchange
   */
  const onchangeAvatar = async (file: File) => {
    dispatch(onLoadingAction(true));
    const res = await uploadImageToCloud(file);

    const { resultCode, url } = res;
    if (res) {
      dispatch(onLoadingAction(false));
      if (resultCode == 1) {
        setAvatar(url);
      } else {
        dispatch(onErrorModel({ onError: true, mess: "error upload img!" }));
      }
    }
  };

  const onchangeAddress = (id: string, value: string) => {
    setUpdateAddress((prev) => {
      const existed = prev.find((m) => m._id === id);
      if (existed) {
        return prev.map((m) =>
          m._id === id ? { ...m, addressName: value } : m
        );
      } else {
        return [...prev, { _id: id, addressName: value }];
      }
    });
  };

  const onchangePhone = (id: string, value: string) => {
    setUpdatePhone((prev) => {
      const existed = prev.find((m) => m._id === id);
      if (existed) {
        return prev.map((m) => (m._id === id ? { ...m, phoneNum: value } : m));
      } else {
        return [...prev, { _id: id, phoneNum: value }];
      }
    });
  };

  const onchangeEmail = (id: string, value: string) => {
    setUpdateEmail((prev) => {
      const existed = prev.find((f) => f._id === id);
      if (existed) {
        return prev.map((m) =>
          m._id === id ? { ...m, emailAddress: value } : m
        );
      } else {
        return [...prev, { _id: id, emailAddress: value }];
      }
    });
  };

  async function submitChange() {
    try {
      dispatch(onLoadingAction(true));
      const res = await updateUserAccount({
        address: updateAddress,
        phone: updatePhone,
        email: updateEmail,
        avatar: avatar,
        firtName: newFirtName,
        lastName: newLastName,
      });
      if (res) {
        dispatch(onLoadingAction(false));
        if (res.resultCode == 1) {
          dispatch(onSuccessfulModel(true));
        } else {
          dispatch(onErrorModel({ mess: res.message, onError: true }));
        }
      } else {
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({ mess: "Error update account!", onError: true })
        );
        return;
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ mess: `${error}`, onError: true }));
    }
  }

  return {
    user,
    onchangeAvatar,
    onchangeAddress,
    onchangePhone,
    onchangeEmail,
    submitChange,
    setNewFirtName,
    setNewLastName,
  };
};
