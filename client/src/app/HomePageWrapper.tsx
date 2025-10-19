import { AppDispatch, RootState } from "@/api/Redux/store";
import { authenticationThunk } from "@/api/Redux/Thunk/Auth/auth.thunk";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      const check = await dispatch(authenticationThunk({ role: "user" }));
      if (authenticationThunk.rejected.match(check)) {
        const checkAgain = await dispatch(
          authenticationThunk({ role: "seller" })
        );
        // check state 
        if (authenticationThunk.fulfilled.match(checkAgain)) {
          router.replace(`/${checkAgain.payload.role}`);
        }
      } else if (authenticationThunk.fulfilled.match(check)) {
        router.replace(`/user`);
      } else {
        return;
      }
    })();
  }, [router, dispatch]);

  //render 
  return <>{children}</>;
}
