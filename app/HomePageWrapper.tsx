"use client";

import { AppDispatch, RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUIThunk } from "../redux/app/thunk";
import { authenticationThunk } from "../redux/auth/thunk";
/**
 * Component props
 */
type ComponentProps = {
  children: React.ReactNode;
};
/**
 *
 * @param param0
 * @returns
 */
export default function HomePageWrapper({
  children,
}: Readonly<ComponentProps>) {
  //app navigation (router)
  const router = useRouter();

  //redux root state
  const {} = useSelector((state: RootState) => state.auth);
  const {} = useSelector((state: RootState) => state.product);
  const {} = useSelector((state: RootState) => state.app);
  //dispatch
  const dispatch = useDispatch<AppDispatch>();
  /**
   * call importian api before render component
   */
  useEffect(() => {
    (async () => {
      //authentication user for navigation if is logged in
      await dispatch(getUIThunk());
      const check = await dispatch(authenticationThunk("user"));
      if (authenticationThunk.fulfilled.match(check) && check.payload) {
        return router.push(`/user`);
      } else {
        return;
      }
    })();
  }, [router, dispatch]);

  //render
  return <>{children}</>;
}
