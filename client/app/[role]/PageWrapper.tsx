"use client";

import { onErrorModel, onLoadingAction } from "@/redux/app/slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticationThunk } from "@/redux/auth/thunk";
import { getUIThunk } from "@/redux/app/thunk";
import Footer from "@/components/layout/Footer/Footer";
import UserHeader from "@/components/layout/Header/Header";
import SellerNavbar from "@/components/layout/Navbar/Seller/SellerNavbar";
import SellerHeader from "@/components/layout/Header/Seller/SellerHeader";

export default function PageWrapper({
  role,
  children,
}: {
  role: "user" | "seller";
  children: React.ReactNode;
}) {
  const [appMouted, setAppMounted] = useState<boolean>(false);

  //dispatch && app root state
  const dispatch = useDispatch<AppDispatch>();
  const {} = useSelector((state: RootState) => state.auth);
  const {} = useSelector((state: RootState) => state.product);
  const {} = useSelector((state: RootState) => state.app);
  const {} = useSelector((state: RootState) => state.seller);

  //next router
  const router = useRouter();

  //use effect call api when starting render app page
  useEffect(() => {
    try {
      /**
       * Call all importaint or needing api
       * when role component start render
       */
      (async () => {
        //loading effect
        dispatch(onLoadingAction(true));
        /**
         * Call get user data api and get navigation api for start using web
         */
        const [check] = await Promise.all([
          dispatch(authenticationThunk(role)),
          dispatch(getUIThunk()),
        ]);
        /**
         * check result of authenticate and get naviagtion api
         * if use null => replace page is login
         * if successfull => set appMouted is true and render app
         */
        if (check.payload) {
          dispatch(onLoadingAction(false));
          if (authenticationThunk.fulfilled.match(check)) {
            setAppMounted(true);
            if (role === "seller" && check.payload.role === "user") {
              return router.replace("/user");
            } else {
              return;
            }
          } else {
            return router.replace(
              role === "seller" ? "/seller-login" : "/login"
            );
          }
        }
      })();
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ mess: `${error}`, onError: true }));
    }
  }, [dispatch, role, router]);

  //don'nt render app if appMouted false
  if (!appMouted) {
    return null;
  }
  //render follow roler
  return role === "seller" ? (
    <main className="w-full max-h-screen h-screen flex gap-1 overflow-hidden">
      <SellerNavbar />
      <div className="flex flex-1 flex-col gap-1">
        <SellerHeader />
        <section className="border border-gray-300 bg-white overflow-y-auto p-3 min-h-[530px]">
          {children}
        </section>
      </div>
    </main>
  ) : (
    <main>
      {/* left */}
      <UserHeader />
      {/* <Banner /> */}
      {children}
      <Footer />
    </main>
  );
}
