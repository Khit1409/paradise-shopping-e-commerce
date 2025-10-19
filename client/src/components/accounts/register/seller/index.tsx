"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/api/Redux/store";
import { getAddressThunk } from "@/api/Redux/Thunk/App/app.thunk";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/Redux/Slice/App/app.slice";
import { createNewStoreThunk } from "@/api/Redux/Thunk/User/user.thunk";
import { authenticationThunk } from "@/api/Redux/Thunk/Auth/auth.thunk";
import RegisterStoreForm from "../form_input/RegisterStoreForm";

type BasicInput = {
  store_name: string;
  store_phone: string;
  store_email: string;
  store_specific_address: string;
  store_password: string;
};

type AddressInput = {
  wrad: string;
  province: string;
  store_area_slug: string;
};

export default function RegisterSellerAccountPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [basicInput, setBasicInput] = useState<BasicInput>({
    store_email: "",
    store_phone: "",
    store_name: "",
    store_password: "",
    store_specific_address: "",
  });

  const [addressInput, setAddressInput] = useState<AddressInput>({
    wrad: "",
    province: "",
    store_area_slug: "",
  });

  const handleOnchangeAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options, selectedIndex } = e.target;
    const selectedOption = options[selectedIndex] as HTMLOptionElement;

    const store_area_slug = selectedOption.dataset.store_area_slug;

    setAddressInput((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "province" && { store_area_slug }),
    }));
  };

  const handleOnchangeBasicInput = (e: ChangeEvent<HTMLInputElement>) => {
    setBasicInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAddressThunk());
      await dispatch(authenticationThunk({ role: "seller" }));
    })();
  }, [dispatch]);

  /**
   * handle register
   */

  async function registerAccountSeller(e: FormEvent) {
    e.preventDefault();
    try {
      dispatch(onLoadingAction(true));
      if (!user) {
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({
            mess: "Có vẻ bạn chưa đăng nhập, hãy đăng nhập trước",
            onError: true,
          })
        );
        return;
      }
      const result = await dispatch(
        createNewStoreThunk({
          owner_id: String(user.userId),
          store_address: `${basicInput.store_specific_address}-${addressInput.wrad}-${addressInput.province}`,
          store_area: addressInput.province,
          store_area_slug: addressInput.store_area_slug,
          store_email: basicInput.store_email,
          store_name: basicInput.store_name,
          store_password: basicInput.store_password,
          store_phone: basicInput.store_phone,
        })
      );
      if (createNewStoreThunk.fulfilled.match(result)) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
      } else {
        dispatch(onLoadingAction(false));
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      console.error(error);
    }
  }

  return (
    <div className="md:w-screen md:h-screen text-gray-700 p-3">
      <div className="w-full h-full flex-col gap-2 flex items-center justify-center">
        <h2>ĐĂNG KÝ BÁN HÀNG</h2>
        {addressInput.province}-{addressInput.wrad}
        <RegisterStoreForm
          onchangeBasicInput={handleOnchangeBasicInput}
          onchangeAddress={handleOnchangeAddress}
        />
        <div>
          <button
            onClick={(e) => registerAccountSeller(e)}
            className="border border-gray-300 px-2 py-1 hover:scale-[1.02] hover:bg-green-400 font-semibold"
          >
            ĐĂNG KÝ <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}
