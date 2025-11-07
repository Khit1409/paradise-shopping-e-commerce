import { Metadata } from "next";
import Login from "../../components/auth/page/Login";

export const metadata: Metadata = {
  title: "Đăng nhập Paradise Shopping",
  keywords: [
    "Đăng nhập paradise shopping",
    "paradise shopping đăng nhập",
    "Paradise shopping login",
    "login paradise shopping",
  ],
  description: "Trang đăng nhập cho người dùng",
};

export default function page() {
  return <Login />;
}
