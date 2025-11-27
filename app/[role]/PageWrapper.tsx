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
  const { user } = useSelector((state: RootState) => state.auth);
  const {} = useSelector((state: RootState) => state.product);
  const {} = useSelector((state: RootState) => state.app);
  const {} = useSelector((state: RootState) => state.seller);

  //next router
  const router = useRouter();

  /**
   * manager page active
   * check user role and navigation to pages of this role
   * but role is seller is can join to user page for watching new update or new change.
   */
  useEffect(() => {
    const managerPageActive = async () => {
      dispatch(onLoadingAction(true));
      const checkAuth = await dispatch(authenticationThunk(`${role}`));
      if (checkAuth) {
        dispatch(onLoadingAction(false)); //loading animation
        try {
          if (
            authenticationThunk.fulfilled.match(checkAuth) &&
            checkAuth.payload
          ) {
            if (role === "seller" && checkAuth.payload.role === "user") {
              router.replace("/user");
            }
          } else if (authenticationThunk.rejected.match(checkAuth)) {
            const loginUrlPath = role === "seller" ? "/seller-login" : "/login";
            router.replace(loginUrlPath);
          }
        } catch (error) {
          dispatch(onErrorModel({ onError: true, mess: `${error}` }));
        }
      }
    };
    managerPageActive();
    setAppMounted(true);
  }, [role, dispatch, router]);
  /**
   * get ui api when start
   */
  useEffect(() => {
    dispatch(getUIThunk());
  }, [dispatch]);

  //don'nt render app if appMouted false
  if (!appMouted) {
    return null;
  }
  //render follow roler
  return user ? (
    role === "seller" ? (
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
    )
  ) : null;
}
