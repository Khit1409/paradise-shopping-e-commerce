"use client";

import { onErrorModel, onLoadingAction } from "../../redux/app/slice";
import { AppDispatch, RootState } from "../../redux/store";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticationThunk } from "../../redux/auth/thunk";
import { getNavigationThunk } from "../../redux/app/thunk";
import Footer from "../../components/layout/Footer/Footer";
import UserHeader from "../../components/layout/Header/Header";
import SellerNavigationBar from "../../components/layout/Header/SellerNavigationBar";
import SellerHeader from "../../components/layout/Header/SellerHeader";

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
          dispatch(authenticationThunk()),
          dispatch(getNavigationThunk()),
        ]);
        /**
         * check result of authenticate and get naviagtion api
         * if use null => replace page is login
         * if successfull => set appMouted is true and render app
         */
        if (authenticationThunk.fulfilled.match(check)) {
          dispatch(onLoadingAction(false));
          setAppMounted(true);
          /**
           * check login state for user and seller
           * if not logging go to login page
           */
        } else if (authenticationThunk.rejected.match(check)) {
          dispatch(onLoadingAction(false));
          return router.replace("/login");
        } else {
          dispatch(onLoadingAction(false));
          dispatch(
            onErrorModel({
              mess: "CAN NOT RENDER THE PAGE, SERVER ERROR - STATUS:500",
              onError: true,
            })
          );
        }
      })();
    } catch (error) {
      /**
       * Error handle
       */
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ mess: `${error}`, onError: true }));
    }
  }, [dispatch, role, router]);
  //use effect handle click outside

  //don'nt render app if appMouted false
  if (!appMouted) {
    return null;
  }
  //render follow roler
  return role === "user" ? (
    <main>
      {/* left */}
      <UserHeader />
      {/* <Banner /> */}
      {children}
      <Footer />
    </main>
  ) : (
    <main className="w-full max-h-screen h-screen flex gap-1 overflow-hidden">
      <SellerNavigationBar />
      <div className="flex flex-col gap-1">
        <SellerHeader />
        <section className="border border-gray-300 h-screen overflow-y-auto p-2 ">
          {children}
        </section>
      </div>
    </main>
  );
}
