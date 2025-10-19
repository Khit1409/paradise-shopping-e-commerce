"use client";
import { globalStore } from "@/api/Redux/store";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={globalStore}>
      <>{children}</>
    </Provider>
  );
}
